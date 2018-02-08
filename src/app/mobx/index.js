import { Sequencer }          from 'app/mixer'
import { action, observable } from 'mobx'

export default {
  sequencer: new Sequencer({
    tracks: [
      {
        label: 'SAMPLE',
        clips: { 0: { label: 'clip' }, 3: { label: 'clipper' } },
      },
      {},
      {},
    ],
  }),
}
