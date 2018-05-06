import { number, withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }               from '@storybook/react'
import React                       from 'react'

import Meter                       from './index.js'

storiesOf('Meter', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ height: '200px', width: '10px' }}>
        <Meter
          main={number('main', 50)}
          secondary={number('secondary', 60)}
          peak={number('peak', 70)}
        />
      </div>
    )
  })
