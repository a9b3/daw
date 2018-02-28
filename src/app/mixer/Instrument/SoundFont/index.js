import { action, observable, computed }             from 'mobx'

import { URLTOArrayBuffer, fileToArrayBuffer }      from 'mixer/utils'

import { parseSoundFontFile, createAllInstruments } from './riff'

import audioContext                                 from '../../audioContext'

export default class SoundFont {
  activeNotes = {}
  data = undefined
  // return from createAllInstruments
  // only indexes 0 and 128 are occupied
  instruments = []
  @observable loading = false
  @observable selectedInstrumentIndex = undefined

  @computed
  get selectedInstrument() {
    const bank = this.instruments[0]
    const instrument = bank[this.selectedInstrumentIndex]
    return instrument
  }

  /* ---------- Instrument API ---------- */

  noteOn = ({ note, velocity = 1 } = {}) => {
    // array<array<{sample, ...}>>
    const instrument = this.selectedInstrument
    const instrumentKey = instrument[note]

    if (this.activeNotes[note]) {
      return
    }

    // these will all be connected at the end
    const noteNodes = {
      bufferSource: audioContext.createBufferSource(),
      filter: audioContext.createBiquadFilter(),
      gain: audioContext.createGain(),
    }
    this.activeNotes[note] = noteNodes
    const now = audioContext.currentTime

    // sample
    let sample = instrumentKey.sample
    sample = sample.subarray(0, sample.length + instrumentKey.end)
    const buffer = audioContext.createBuffer(
      1,
      sample.length,
      instrumentKey.sampleRate,
    )
    buffer.getChannelData(0).set(sample)

    // buffer source
    noteNodes.bufferSource.buffer = buffer
    bufferSource.loop = true
    bufferSource.loopStart = instrumentKey.loopStart / instrumentKey.sampleRate
    bufferSource.loopEnd = instrumentKey.loopEnd / instrumentKey.sampleRate
    // TODO update pitch bend

    // filter
    noteNodes.filter.type = 'lowpass'
    noteNodes.filter.Q.setValueAtTime(
      instrumentKey.initialFilterQ * Math.pow(10, 200),
      now,
    )
    const baseFreq = amountToFreq(instrumentKey.initialFilterQ)
    const peekFreq = amountToFreq(
      instrumentKey.initialFilterQ + instrumentKey.modEnvToFilterFc,
    )
    const sustainFreq =
      baseFreq + (peekFreq - baseFreq) * (1 - instrumentKey.modSustain)
    noteNodes.filter.frequency.setValueAtTime(baseFreq, now)
    noteNodes.filter.frequency.linearRampToValueAtTime(
      peekFreq,
      now + instrumentKey.modAttack,
    )
    noteNodes.filter.frequency.linearRampToValueAtTime(
      sustainFreq,
      now + instrumentKey.modAttack + instrumentKey.modDecay,
    )

    // volume
    const volume = velocity / 127
    noteNodes.gain.gain.setValueAtTime(0, now)
    noteNodes.gain.gain.linearRampToValueAtTime(
      volume * (volume / 127),
      now + instrumentKey.volAttack,
    )
    noteNodes.gain.gain.linearRampToValueAtTime(
      volume * (1 - instrumentKey.volSustain),
      now + instrumentKey.volDecay,
    )

    // connect all nodes
    noteNodes.bufferSource.connect(noteNodes.filter)
    noteNodes.filter.connect(noteNodes.gain)
    noteNodes.gain.connect(audioContext.destination)

    noteNodes.bufferSource.start(
      0,
      instrumentKey.start / instrumentKey.sampleRate,
    )
  }

  noteOff = ({ note }) => {
    if (!this.activeNotes[note]) {
      return
    }
    const instrument = this.selectedInstrument
    const instrumentKey = instrument[note]

    const now = audioContext.currentTime
    const noteNodes = this.activeNotes[note]
    noteNodes.gain.gain.cancelScheduledValues(0)
    noteNodes.gain.gain.linearRampToValueAtTime(
      0,
      now + instrumentKey.volRelease,
    )

    noteNodes.bufferSource.loop = false
    noteNodes.bufferSource.stop(now + instrumentKey.volRelease)

    noteNodes.bufferSource.disconnect(0)
    noteNodes.filter.disconnect(0)
    noteNodes.gain.disconnect(0)
  }

  /* ---------- SoundFont API ---------- */

  /**
   * @param {string} url - url of sf file to load (either url or file must be
   * provided)
   * @param {File|Blob} file - sf file to load obtained via file type input
   * (either url or file must be provided)
   */
  @action
  load = async ({ url, file } = {}) => {
    this.loading = true
    const arrayBuffer = url
      ? await URLTOArrayBuffer(url)
      : await fileToArrayBuffer(file)
    this.data = parseSoundFontFile(arrayBuffer)
    this.instruments = createAllInstruments(this.data.pdta)
    this.loading = false
  }

  @action
  selectInstrumentIndex = index => {
    this.selectedInstrumentIndex = index
  }
}

function amountToFreq(value) {
  return Math.pow(2, (value - 6900) / 1200) * 440
}
