import { observable } from 'mobx'

import Analyser       from './Analyser'
import RMS            from './RMS'
import audioContext   from './audioContext'

export default class Channel {
  input = audioContext.createGain()
  @observable panPosition = 0
  @observable gain = 1
  panner = audioContext.createPanner()
  output = audioContext.createGain()
  rms = new RMS()
  analyser = new Analyser()

  constructor({ outputSource }) {
    this.input.connect(this.panner)
    this.panner.connect(this.output)
    this.output.connect(outputSource)
    this.output.connect(this.analyser.input)
    this.output.connect(this.rms.input)
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createPanner
   *
   * @param {number} value - between -1 and 1, 0 is center
   */
  setPanPosition = value => {
    const x = value
    const y = 0
    const z = 1 - Math.abs(x)
    this.panPosition = value
    this.panner.setPosition(x, y, z)
  }

  /**
   * @param {Number} value - between 0 - 1
   */
  setGain = value => {
    this.gain = value
    return this.output.setGain(value)
  }
}
