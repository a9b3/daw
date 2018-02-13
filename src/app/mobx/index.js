import faker                  from 'faker'
import { action, observable } from 'mobx'

import { Sequencer }          from 'app/mixer'

export default {
  sequencer: new Sequencer({
    tracks: [
      {
        label: faker.name.firstName(),
        clips: { 0: { label: 'intro' }, 3: { label: 'chorus' } },
      },
      {
        label: faker.name.firstName(),
        clips: {
          1: { label: 'a' },
          2: { label: 'b' },
          3: { label: 'c' },
        },
      },
      {
        label: faker.name.firstName(),
      },
      {
        label: faker.name.firstName(),
        clips: { 0: { label: 'voice' }, 5: { label: 'bg' } },
      },
      {
        label: faker.name.firstName(),
      },
      {
        label: faker.name.firstName(),
      },
    ],
    sends: [
      {
        label: 'Delay',
      },
    ],
  }),
}
