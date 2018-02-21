import { action, observable } from 'mobx'
import tinycolor              from 'tinycolor2'

import Channel                from './Channel'
import Clip                   from './Clip'

const TYPES = {
  midi: 'midi',
  audio: 'audio',
}

export default class Track {
  type = undefined
  @observable label = ''
  clips = observable.map()
  channel = new Channel()
  @observable
  colorRGB = Object.values(tinycolor.random().toRgb())
    .slice(0, 3)
    .join(', ')

  constructor({
    type = TYPES.midi,
    label = '',
    outputSource,
    clips = {},
  } = {}) {
    this.type = type
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
  insertClip = (key, args = {}) => {
    const clip = new Clip(args)
    this.clips.set(key, clip)
  }
}
