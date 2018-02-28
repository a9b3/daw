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

  play = ({ note, velocity, duration } = {}) => {
    // array<array<{sample, ...}>>
    const bank = this.instruments[0]
    const instrument = bank[this.selectedInstrumentIndex]
    const instrumentKey = instrument[note]

    console.log(instrumentKey)

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

    const output = audioContext.createGain()

    const filter = audioContext.createBiquadFilter()
    // filter.type = filter.LOWPASS

    const volume = 1 / 127
    console.log(volume, now + instrumentKey.volAttack)
    const now = audioContext.currentTime
    output.gain.setValueAtTime(0, now)
    output.gain.linearRampToValueAtTime(
      volume * (volume / 127),
      now + instrumentKey.volAttack,
    )
    output.gain.linearRampToValueAtTime(
      volume * (1 - instrumentKey.volSustain),
      now + instrumentKey.volDecay,
    )

    function amountToFreq(val) {
      return Math.pow(2, (val - 6900) / 1200) * 440
    }

    // filter.Q.setValueAtTime(
    //   instrumentKey.initialFilterQ * Math.pow(10, 200),
    //   now,
    // )
    // filter.frequency.setValueAtTime(amountToFreq(instrumentKey.initialFilterFc))
    // filter.frequency.linearRampToValueAtTime(
    //   amountToFreq(
    //     instrumentKey.initialFilterFc + instrumentKey.modEnvToFilterFc,
    //   ),
    //   now + instrumentKey.modAttack,
    // )

    bufferSource.connect(filter)
    filter.connect(output)
    output.connect(audioContext.destination)
    bufferSource.start(0, instrumentKey.start / instrumentKey.sampleRate)

    // const sound = new Sound()
    // sound.output.connect(audioContext.destination)
    // sound.audioBuffer = audioContext.createBuffer(
    //   1,
    //   sample.length,
    //   instrumentKey.sampleRate,
    // )
    // sound.audioBuffer.getChannelData(0).set(sample)
    // console.log(sound.audioBuffer, sample.length, instrumentKey.sampleRate)
    // sound.play()
  }

  edit = ({ note, velocity, duration }) => {}

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
