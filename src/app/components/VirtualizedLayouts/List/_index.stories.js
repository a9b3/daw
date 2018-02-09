import { withKnobs, number } from '@storybook/addon-knobs'
import { storiesOf }         from '@storybook/react'
import React                 from 'react'

import List                  from './index.js'

const renderRow = i => {
  return (
    <div
      style={{
        border: '1px solid black',
        width: '10em',
        height: `100px`,
      }}
    >
      {i}
    </div>
  )
}

storiesOf('VirtualizedLayouts/List', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <List renderRow={renderRow} total={number('total', 100000)} />
      </div>
    )
  })
