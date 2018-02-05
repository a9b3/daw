import audioContext from './audioContext'

export default class Channel {
  input = audioContext.createGain()
  panPosition = 0
  panner = audioContext.createPanner()
  output = audioContext.createGain()

  constructor({ outputSource }) {
    this.input.connect(this.panner)
    this.panner.connect(this.output)
    this.output.connect(outputSource)
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
}
