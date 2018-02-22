import { observable } from 'mobx'

export default class Clip {
  @observable label = ''

  constructor({ label }) {
    this.label = label
  }
}
