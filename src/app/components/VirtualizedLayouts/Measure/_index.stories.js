import { withKnobs, number } from '@storybook/addon-knobs'
import { storiesOf }         from '@storybook/react'
import { times }             from 'lodash'
import React                 from 'react'

import Measure               from './index.js'

export default class Example extends React.Component {
  state = {
    show: {},
  }

  setShow = key => {
    const { show } = this.state
    show[key] = true
    this.setState({ show })
  }

  render() {
    const { show } = this.state
    return (
      <div>
        {times(number('items', 100), i => {
          return (
            <Measure key={i} onMeasure={() => this.setShow(i)} show={show[i]}>
              <div
                style={{ width: 100, height: 100, border: '1px solid black' }}
              >
                hi {i}
              </div>
            </Measure>
          )
        })}
      </div>
    )
  }
}

storiesOf('Measure', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Example />
  })
