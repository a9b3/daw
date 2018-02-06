import Channel      from './Channel'
import audioContext from './audioContext'

export default class Mixer {
  master = new Channel({ outputSource: audioContext.destination })
  channels = []
  sends = []

  constructor({ channels = [] } = {}) {
    channels.forEach(channel => {
      this.addChannel()
    })
  }

  addChannel() {
    const channel = new Channel({ outputSource: this.master.input })
    this.channels.push(channel)
    return channel
  }
}
