import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import React               from 'react'

import Clip                from './index.js'

storiesOf('Clip', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ width: 150, height: 40 }}>
        <Clip label={text('label', 'label')} />
      </div>
    )
  })
