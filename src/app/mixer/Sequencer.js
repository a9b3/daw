import { action, observable } from 'mobx'

import Track                  from './Track'
import audioContext           from './audioContext'

export default class Sequencer {
  @observable tracks = []
  master = new Track({ outputSource: audioContext.destination })

  constructor({ tracks = [] } = {}) {
    tracks.forEach(track => {
      this.addTrack(track)
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
}
