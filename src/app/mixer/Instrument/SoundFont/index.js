import { action, observable, computed }             from 'mobx'

import { URLTOArrayBuffer, fileToArrayBuffer }      from 'mixer/utils'

import { parseSoundFontFile, createAllInstruments } from './riff'

import audioContext                                 from '../../audioContext'

export default class SoundFont {
  activeNotes = observable.map()
  data = undefined
  // return from createAllInstruments
  // only indexes 0 and 128 are occupied
  instruments = []
  @observable loading = false
  @observable selectedInstrumentIndex = undefined
  @observable selectedBankIndex = undefined

  @computed
  get selectedInstrument() {
    const bank = this.instruments[this.selectedBankIndex]
    if (!bank) return
    const instrument = bank[this.selectedInstrumentIndex]
    return instrument
  }

  /* ---------- Instrument API ---------- */

  @action
  noteOn = ({ note, velocity = 1 } = {}) => {
    // array<array<{sample, ...}>>
    const instrument = this.selectedInstrument
    if (!instrument) return
    const instData = instrument[note]
    if (!instData) return
    const {
      initialFilterQ,
      basePlaybackRate,
      loopStart,
      sampleRate,
      loopEnd,
      end,
      modAttack,
      modSustain,
      modDecay,
    } = instData

    if (this.activeNotes.get(note)) {
      return
    }

    // these will all be connected at the end
    const noteNodes = {
      bufferSource: audioContext.createBufferSource(),
      filter: audioContext.createBiquadFilter(),
      gain: audioContext.createGain(),
    }
    const { bufferSource, filter, gain } = noteNodes
    this.activeNotes.set(note, noteNodes)
    const now = audioContext.currentTime

    // sample
    let sample = instData.sample
    sample = sample.subarray(0, sample.length + end)
    const buffer = audioContext.createBuffer(1, sample.length, sampleRate)
    buffer.getChannelData(0).set(sample)

    // buffer source
    bufferSource.buffer = buffer
    bufferSource.loop = true
    bufferSource.loopStart = loopStart / sampleRate
    bufferSource.loopEnd = loopEnd / sampleRate

    // pitch
    const computedPlaybackRate =
      basePlaybackRate * Math.pow(Math.pow(2, 1 / 12), 0)
    bufferSource.playbackRate.setValueAtTime(computedPlaybackRate, now)

    // filter
    filter.type = 'lowpass'
    filter.Q.setValueAtTime(initialFilterQ * Math.pow(10, 200), now)
    const baseFreq = amountToFreq(instData.initialFilterQ)
    const peekFreq = amountToFreq(
      instData.initialFilterQ + instData.modEnvToFilterFc,
    )
    const sustainFreq = baseFreq + (peekFreq - baseFreq) * (1 - modSustain)
    filter.frequency.setValueAtTime(baseFreq, now)
    filter.frequency.linearRampToValueAtTime(peekFreq, now + modAttack)
    filter.frequency.linearRampToValueAtTime(
      sustainFreq,
      now + modAttack + modDecay,
    )

    // volume
    const volume = 1 / 127
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(volume, now + instData.volAttack)
    gain.gain.linearRampToValueAtTime(
      volume * (1 - instData.volSustain),
      now + instData.volDecay,
    )

    // connect all nodes
    bufferSource.connect(filter)
    filter.connect(gain)
    gain.connect(audioContext.destination)

    bufferSource.start(0, instData.start / sampleRate)
  }

  @action
  noteOff = ({ note }) => {
    if (!this.activeNotes.get(note)) {
      return
    }
    const instrument = this.selectedInstrument
    if (!instrument) return
    const instData = instrument[note]
    if (!instData) return

    const now = audioContext.currentTime
    const endTime = now + 0.15

    const { gain, bufferSource, filter } = this.activeNotes.get(note)

    gain.gain.cancelScheduledValues(now)
    gain.gain.setTargetAtTime(0, now, 0.11)

    bufferSource.playbackRate.cancelScheduledValues(now)
    const computedPlaybackRate =
      instData.basePlaybackRate * Math.pow(Math.pow(2, 1 / 12), 0)
    bufferSource.playbackRate.setTargetAtTime(computedPlaybackRate, now, 0.11)

    bufferSource.loop = false
    bufferSource.stop(endTime)

    this.activeNotes.delete(note)
    setTimeout(() => {
      bufferSource.disconnect(0)
      filter.disconnect(0)
      gain.disconnect(0)
    }, 0.13 * 1000)
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

  @action
  selectBankIndex = index => {
    this.selectedBankIndex = index
  }
}

function amountToFreq(value) {
  return Math.pow(2, (value - 6900) / 1200) * 440
}
