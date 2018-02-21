import { noop }               from 'lodash'
import { action, observable } from 'mobx'

import { setInterval }        from 'utils/intervalWorker'

import audioContext           from './audioContext'

export default class Scheduler {
  getBPM = noop
  // resolution, ex. 8 would be 8 ticks per beat meaning each tick is a 32nd note
  @observable ticksPerWholeNote = 64

  @observable isPlaying = false
  currentTick = 0
  nextTickTime = 0
  // in seconds
  scheduleAheadTime = 0.1

  // interval ms
  lookAhead = 25
  // function to cancel interval
  _cancelInterval = undefined

  _handlers = []

  constructor({ getBPM, handlers = [] } = {}) {
    this.getBPM = getBPM
    handlers.forEach(this.addHandler)
  }

  addHandler = handler => {
    if (this._handlers.includes(handler)) {
      return
    }
    this._handlers.push(handler)
  }

  removeHandler(handler) {
    const index = this._handlers.indexOf(handler)
    this._handlers.splice(index, 1)
  }

  _schedule = () => {
    while (
      this.nextTickTime <
      audioContext.currentTime + this.scheduleAheadTime
    ) {
      const handlerArg = {
        currentTick: this.currentTick,
        nextTickTime: this.nextTickTime,
        ticksPerWholeNote: this.ticksPerWholeNote,
      }
      this._handlers.forEach(handler => handler(handlerArg))
      // advance tick
      const secondsPerWholeNote = 60 / this.getBPM()
      this.nextTickTime += 1 / this.ticksPerWholeNote * secondsPerWholeNote
      this.currentTick++
    }
  }

  @action
  start = async () => {
    this.stop()
    this.nextTickTime = audioContext.currentTime
    this._cancelInterval = await setInterval(this._schedule, this.lookAhead)
    this.isPlaying = true
  }

  @action
  stop = () => {
    if (this._cancelInterval) {
      this.currentTick = 0
      this._cancelInterval()
      this._cancelInterval = undefined
      this.isPlaying = false
    }
  }
}
