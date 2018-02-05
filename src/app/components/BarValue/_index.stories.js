import { number, withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }               from '@storybook/react'
import React                       from 'react'

import BarValue                    from './index.js'

storiesOf('BarValue', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ height: '200px', width: '10px' }}>
        <BarValue value={number('value', 50)} />
      </div>
    )
  })
