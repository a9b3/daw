import { withKnobs, text, number } from '@storybook/addon-knobs'
import { storiesOf }               from '@storybook/react'
import React                       from 'react'

import Knob                        from './index.js'

storiesOf('Knob', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ width: '50px' }}>
        <Knob value={number('value', 0)} rotate={number('rotate', 90)} />
      </div>
    )
  })
