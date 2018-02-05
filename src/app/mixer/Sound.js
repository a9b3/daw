import { getAudioBuffer } from './audioBuffer'
import audioContext       from './audioContext'

export default class Sound {
  url = undefined
  audioBuffer = undefined
  // allows multiple instances of audioBuffer
  activeBufferSources = []
  output = audioContext.createGain()

  /**
   * load will get audioBuffer from given url
   *
   * @param {string} url
   */
  async load(url) {
    this.url = url
    this.audioBuffer = await getAudioBuffer(url)
  }

  /**
   * play will start playing the loaded sound
   *
   * https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode/start
   *
   * @param {=number} when - delayed time to start in seconds
   * @param {=number} offset - play sound starting at offset in seconds
   * @param {=number} duration - how long to play sound for default plays til
   * end
   */
  play({ when = 0, offset = 0, duration } = {}) {
    if (!this.audioBuffer) {
      return
    }
    const bufferSource = audioContext.createBufferSource()
    bufferSource.buffer = this.audioBuffer
    this.activeBufferSources.push(bufferSource)
    bufferSource.connect(this.output)
    bufferSource.start(when, offset, duration)
    bufferSource.onended = () => {
      this.activeBufferSources.shift()
    }
  }

  /**
   * stop will stop playback of currently playing buffers
   *
   * @param {=number} when - delayed time to stop playback of sound
   */
  stop({ when = 0 } = {}) {
    this.activeBufferSources.forEach(bufferSource => {
      bufferSource.stop(when)
      bufferSource.disconnect(this.output)
    })
    this.activeBufferSources.length = 0
  }
}
