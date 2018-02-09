import { withKnobs, number } from '@storybook/addon-knobs'
import { storiesOf }         from '@storybook/react'
import React                 from 'react'

import List                  from './index.js'

storiesOf('VirtualizedLayouts/List', module)
  .addDecorator(withKnobs)
  .add('static row height', () => {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <List
          renderRow={i => (
            <div
              style={{
                border: '1px solid black',
                width: '10em',
                height: '100px',
              }}
            >
              {i}
            </div>
          )}
          total={number('total', 100000)}
        />
      </div>
    )
  })
  .add('dynamic row height', () => {
    return (
      <div style={{ width: '100%', height: '500px' }}>
        <List
          renderRow={i => (
            <div
              style={{
                border: '1px solid black',
                width: '10em',
                height: `${50 + Math.random() * 50}px`,
              }}
            >
              {i}
            </div>
          )}
          total={number('total', 100000)}
        />
      </div>
    )
  })
