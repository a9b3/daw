import { action, observable }                       from 'mobx'

import { URLTOArrayBuffer, fileToArrayBuffer }      from 'mixer/utils'

import { parseSoundFontFile, createAllInstruments } from './riff'

import Sound                                        from '../../Sound'
import audioContext                                 from '../../audioContext'

export default class SoundFont {
  activeNotes = {}
  data = undefined
  // return from createAllInstruments
  // only indexes 0 and 128 are occupied
  instruments = []
  @observable loading = false
  @observable selectedInstrumentIndex = undefined

  /* ---------- Instrument API ---------- */

  noteOn = ({ note, velocity = 1 } = {}) => {
    // array<array<{sample, ...}>>
    const bank = this.instruments[0]
    const instrument = bank[this.selectedInstrumentIndex]
    const instrumentKey = instrument[note]

    let sample = instrumentKey.sample
    sample = sample.subarray(0, sample.length + instrumentKey.end)
    const buffer = audioContext.createBuffer(
      1,
      sample.length,
      instrumentKey.sampleRate,
    )
    buffer.getChannelData(0).set(sample)

    // buffer source
    const bufferSource = audioContext.createBufferSource()
    bufferSource.buffer = buffer
    bufferSource.loop = false
    bufferSource.loopStart = instrumentKey.loopStart / instrumentKey.sampleRate
    bufferSource.loopEnd = instrumentKey.loopEnd / instrumentKey.sampleRate
    // TODO update pitch bend

    const now = audioContext.currentTime
    const output = audioContext.createGain()

    // filter
    const filter = audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.Q.setValueAtTime(
      instrumentKey.initialFilterQ * Math.pow(10, 200),
      now,
    )
    const baseFreq = amountToFreq(instrumentKey.initialFilterQ)
    const peekFreq = amountToFreq(
      instrumentKey.initialFilterQ + instrumentKey.modEnvToFilterFc,
    )
    const sustainFreq =
      baseFreq + (peekFreq - baseFreq) * (1 - instrumentKey.modSustain)
    filter.frequency.setValueAtTime(baseFreq, now)
    filter.frequency.linearRampToValueAtTime(
      peekFreq,
      now + instrumentKey.modAttack,
    )
    filter.frequency.linearRampToValueAtTime(
      sustainFreq,
      now + instrumentKey.modAttack + instrumentKey.modDecay,
    )

    // volume
    const volume = velocity / 127
    output.gain.setValueAtTime(0, now)
    output.gain.linearRampToValueAtTime(
      volume * (volume / 127),
      now + instrumentKey.volAttack,
    )
    output.gain.linearRampToValueAtTime(
      volume * (1 - instrumentKey.volSustain),
      now + instrumentKey.volDecay,
    )

    bufferSource.connect(filter)
    filter.connect(output)
    output.connect(audioContext.destination)
    bufferSource.start(0, instrumentKey.start / instrumentKey.sampleRate)
  }

  nodeOff = ({ note, velocity, duration }) => {}

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
