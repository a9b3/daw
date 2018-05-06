import { action, observable } from 'mobx'

import Analyser               from './Analyser'
import RMS                    from './RMS'
import audioContext           from './audioContext'

export default class Channel {
  input = audioContext.createGain()
  @observable panPosition = 0
  @observable gain = 1
  @observable isMute = false
  panner = audioContext.createPanner()
  output = audioContext.createGain()
  rms = new RMS()
  analyser = new Analyser()

  constructor({ outputSource } = {}) {
    this.input.connect(this.panner)
    this.panner.connect(this.output)
    this.output.connect(this.analyser.input)
    this.output.connect(this.rms.input)
    if (outputSource) {
      this.output.connect(outputSource)
    }
  }

  /**
   * https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createPanner
   *
   * @param {number} value - between -1 and 1, 0 is center
   */
  @action
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
  @action
  setGain = value => {
    this.gain = value
    this.output.gain.setTargetAtTime(this.gain, audioContext.currentTime, 0)
    if (this.isMute) {
      this.isMute = false
    }
  }

  @action
  toggleMute = () => {
    this.isMute = !this.isMute
    if (this.isMute) {
      this.output.gain.setTargetAtTime(0, audioContext.currentTime, 0)
    } else {
      this.output.gain.setTargetAtTime(this.gain, audioContext.currentTime, 0)
    }
  }
}
