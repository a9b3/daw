import audioContext from './audioContext'

// this node does not output audio, connect to this node to get analyser data
// from it
export default class Analyser {
  stereoAnalysers = [
    audioContext.createAnalyser(),
    audioContext.createAnalyser(),
  ]
  splitter = audioContext.createChannelSplitter()
  input = audioContext.createGain()

  constructor() {
    this.input.connect(this.splitter)
    this.stereoAnalysers.forEach((analyser, i) => {
      // https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/smoothingTimeConstant
      // value has to be 0 - 1 (0 meaning no time averaging) default is 0.8 if
      // not set
      analyser.smoothingTimeConstant = 0.8
      analyser.fftSize = 1024
      this.splitter.connect(analyser, i, 0)
    })
  }

  /**
   * getByteFrequencyData
   * size of array returned is half of fftSize. values in array range from 0 - 255
   *
   * @returns {array<number>} [left: [], right: []]
   */
  // these are for memory optimization
  _getByteFrequencyDataArrays = [
    new Uint8Array(this.stereoAnalysers[0].frequencyBinCount),
    new Uint8Array(this.stereoAnalysers[1].frequencyBinCount),
  ]
  getByteFrequencyData() {
    return this.stereoAnalysers.map((analyser, i) => {
      analyser.getByteFrequencyData(this._getByteFrequencyDataArrays[i])
      return this._getByteFrequencyDataArrays[i]
    })
  }

  _getByteTimeDomainDataArrays = [
    new Uint8Array(this.stereoAnalysers[0].fftSize),
    new Uint8Array(this.stereoAnalysers[1].fftSize),
  ]
  getByteTimeDomainData() {
    return this.stereoAnalysers.map((analyser, i) => {
      analyser.getByteTimeDomainData(this._getByteTimeDomainDataArrays[i])
      return this._getByteTimeDomainDataArrays[i]
    })
  }

  _getFloatFrequencyDataArrays = [
    new Float32Array(this.stereoAnalysers[0].frequencyBinCount),
    new Float32Array(this.stereoAnalysers[1].frequencyBinCount),
  ]
  getFloatFrequencyData() {
    return this.stereoAnalysers.map((analyser, i) => {
      analyser.getFloatFrequencyData(this._getFloatFrequencyDataArrays[i])
      return this._getFloatFrequencyDataArrays[i]
    })
  }

  _getFloatTimeDomainDataArrays = [
    new Float32Array(this.stereoAnalysers[0].fftSize),
    new Float32Array(this.stereoAnalysers[1].fftSize),
  ]
  getFloatTimeDomainData() {
    return this.stereoAnalysers.map((analyser, i) => {
      analyser.getFloatTimeDomainData(this._getFloatFrequencyDataArrays[i])
      return this._getFloatFrequencyDataArrays[i]
    })
  }

  getDecibel() {
    const [left, right] = this.getFloatFrequencyData()
    let leftSum = 0
    let rightSum = 0
    for (let i = 0; i < this.stereoAnalysers[0].frequencyBinCount; i++) {
      leftSum += (left[i] + 140) * 2
      rightSum += (right[i] + 140) * 2
    }
    const leftAvg = leftSum / left.length
    const rightAvg = rightSum / right.length
    return [leftAvg > 0 ? leftAvg : 0, rightAvg > 0 ? rightAvg : 0]
  }
}
