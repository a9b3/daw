import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import React               from 'react'

import Channel             from './index.js'

storiesOf('Channel', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ width: '200px', height: '320px', display: 'flex' }}>
        <Channel channelIndex={1}  />
        <Channel channelIndex={2}  />
      </div>
    )
  })
