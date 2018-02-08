import { withKnobs, number } from '@storybook/addon-knobs'
import { storiesOf }         from '@storybook/react'
import React                 from 'react'

import HorizontalMeter       from './index.js'

storiesOf('HorizontalMeter', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ height: 10, width: 200 }}>
        <HorizontalMeter value={number('value', 10)} />
      </div>
    )
  })
