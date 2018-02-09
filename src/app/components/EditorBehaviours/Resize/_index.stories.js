import { storiesOf } from '@storybook/react'
import React         from 'react'

import Resize        from './index.js'

export default class ResizeExample extends React.Component {
  state = {
    width: 100,
    height: 100,
  }

  handleDeltaChange = delta => {
    const { width, height } = this.state
    this.setState({ width: width + delta.x, height: height + delta.y })
  }

  render() {
    const { width, height } = this.state
    return (
      <Resize
        onDeltaChange={this.handleDeltaChange}
        render={({ getProps }) => (
          <div
            style={{ cursor: 'move', width, height, border: '1px solid black' }}
            {...getProps()}
          >
            {`${width}px ${height}px`}
            <div>Drag to resize</div>
          </div>
        )}
      />
    )
  }
}

storiesOf('EditorBehaviours/Resize', module).add('default', () => {
  return <ResizeExample />
})
