import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import React               from 'react'

import List                from './index.js'

const renderRow = i => {
  return <div style={{ width: '5em', height: '5em' }}>{i}</div>
}

storiesOf('VirtualizedLayouts/List', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <List renderRow={renderRow} count={1000} />
  })
