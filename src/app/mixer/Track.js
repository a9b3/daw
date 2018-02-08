import { action, observable } from 'mobx'

import Channel                from './Channel'
import Clip                   from './Clip'

export default class Track {
  @observable label = ''
  @observable clips = {}
  @observable colorRGB = '0, 0, 0'
  channel = new Channel()

  constructor({ label = '', outputSource, clips = {} } = {}) {
    this.channel.output.connect(outputSource)
    this.setLabel(label)
    Object.entries(clips).forEach(([key, clip]) => {
      this.insertClip(key, clip)
    })
  }

  @action
  setLabel = label => {
    this.label = label
  }

  @action
  insertClip(key, args) {
    const clip = new Clip(args)
    this.clips[key] = clip
  }
}
