import { observable }  from 'mobx'

import { setInterval } from 'utils/intervalWorker'

import audioContext    from './audioContext'

export default class Scheduler {
  @observable bpm = 120
  // resolution, ex. 8 would be 8 ticks per beat meaning each tick is a 32nd note
  @observable ticksPerBeat = 64

  currentTick = 0
  nextTickTime = 0
  // in seconds
  scheduleAheadTime = 0.1

  // interval ms
  lookAhead = 25
  // function to cancel interval
  _cancelInterval = undefined

  _handlers = []

  constructor({ bpm = 120 } = {}) {
    this.bpm = bpm
  }

  addHandler(handler) {
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
        ticksPerBeat: this.ticksPerBeat,
      }
      this._handlers.forEach(handler => handler(handlerArg))
      // advance tick
      const secondsPerBeat = 60 / this.bpm
      this.nextTickTime += 1 / this.ticksPerBeat * secondsPerBeat
      this.currentTick++
    }
  }

  start() {
    if (this._cancelInterval) {
      return
    }
    this._currentTick = 0
    this.nextTickTime = audioContext.currentTime
    this._cancelInterval = setInterval(this._schedule, this.lookAhead)
  }

  stop() {
    if (this._cancelInterval) {
      this._cancelInterval()
      this._cancelInterval = undefined
    }
  }
}
