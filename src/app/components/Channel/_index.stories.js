import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import React               from 'react'

import Channel             from './index.js'

storiesOf('Channel', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ width: '360px', height: '300px', display: 'flex' }}>
        <Channel />
        <Channel />
        <Channel />
      </div>
    )
  })
