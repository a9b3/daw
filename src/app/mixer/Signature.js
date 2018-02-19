import { action, observable } from 'mobx'

export default class Signature {
  @observable bpm = 120
  // 4 of beatType per bar (top part of time signature)
  @observable beatsPerBar = 4
  // 1 is a whole note, 4 is a quarter note, 8 is a eighth note etc.
  // (bottom part of time signature)
  @observable beatType = 4

  constructor({ bpm = 120, beatsPerBar = 4, beatType = 4 } = {}) {
    this.setBPM(bpm)
    this.setBeatsPerBar(beatsPerBar)
    this.setBeatType(beatType)
  }

  @action
  setBPM = bpm => {
    this.bpm = bpm
  }

  @action
  setBeatsPerBar = beatsPerBar => {
    this.beatsPerBar = beatsPerBar
  }

  @action
  setBeatType = beatType => {
    this.beatType = beatType
  }
}
