import { action, observable } from 'mobx'
import tinycolor              from 'tinycolor2'

import Channel                from './Channel'
import AudioClip              from './Clip/AudioClip'
import MidiClip               from './Clip/MidiClip'

const TYPES = {
  midi: 'midi',
  audio: 'audio',
}

function getClipType(type) {
  switch (type) {
    case TYPES.midi:
      return MidiClip
    case TYPES.audio:
      return AudioClip
  }
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
    const clip = new (getClipType(this.type))(args)
    this.clips.set(key, clip)
  }
}
