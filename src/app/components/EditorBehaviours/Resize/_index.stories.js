import { storiesOf } from '@storybook/react'
import React         from 'react'

import Resize        from './index.js'

export default class ResizeExample extends React.Component {
  state = {
    width: 100,
  }

  handleResize = delta => {
    const { width } = this.state
    this.setState({ width: width + delta.x })
  }

  render() {
    const { width } = this.state
    return (
      <Resize
        resize={this.handleResize}
        render={({ getProps }) => (
          <div style={{ width, border: '1px solid black' }}>
            hi
            <div {...getProps()}>DRAG THIS</div>
          </div>
        )}
      />
    )
  }
}

storiesOf('EditorBehaviours/Resize', module).add('default', () => {
  return <ResizeExample />
})
