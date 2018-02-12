import { Sequencer }          from 'app/mixer'
import { action, observable } from 'mobx'

export default {
  sequencer: new Sequencer({
    tracks: [
      {
        label: 'SAMPLE',
        clips: { 0: { label: 'intro' }, 3: { label: 'chorus' } },
      },
      {
        label: 'SAMPLE',
        clips: {
          1: { label: 'a' },
          2: { label: 'b' },
          3: { label: 'c' },
        },
      },
      {},
      {
        label: 'SAMPLE',
        clips: { 0: { label: 'voice' }, 5: { label: 'bg' } },
      },
      {},
      {},
    ],
    sends: [
      {
        label: 'Delay',
      },
    ],
  }),
}
