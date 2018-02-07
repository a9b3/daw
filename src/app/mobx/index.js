import { Mixer }              from 'app/mixer'
import { action, observable } from 'mobx'

export default {
  mixer: new Mixer({
    channels: [{}, {}, {}],
  }),
}
