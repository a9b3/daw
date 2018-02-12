import { action, observable } from 'mobx'

import Track                  from './Track'
import audioContext           from './audioContext'

export default class Sequencer {
  @observable tracks = []
  @observable sends = []
  master = new Track({
    outputSource: audioContext.destination,
    label: 'master',
  })

  constructor({ tracks = [], sends = [] } = {}) {
    tracks.forEach(track => {
      this.addTrack(track)
    })

    sends.forEach(send => {
      this.addSend(send)
    })
  }

  @action
  addTrack(args) {
    const track = new Track({
      outputSource: this.master.channel.input,
      ...args,
    })
    this.tracks.push(track)
    return track
  }

  @action
  addSend(args) {
    const send = new Track({
      outputSource: this.master.channel.input,
      ...args,
    })
    this.sends.push(send)
    return send
  }
}
