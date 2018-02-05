import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'

import Channel             from './index.js'

storiesOf('Channel', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Channel />
  })
