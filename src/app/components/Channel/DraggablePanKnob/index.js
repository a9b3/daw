import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import React        from 'react'

import DragSelect   from 'components/DragSelect'

import PanKnob      from './PanKnob'

@observer
export default class DraggablePanKnob extends React.Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
  }

  setPanPosition = value => {
    const { channel } = this.props
    const adjustedValue = channel.panPosition - value * 0.1 / 50
    if (adjustedValue <= -1 || adjustedValue >= 1) {
      return
    }
    channel.setPanPosition(adjustedValue)
  }

  reset = () => {
    const { channel } = this.props
    channel.setPanPosition(0)
  }

  render() {
    const { channel, ...rest } = this.props
    return (
      <DragSelect
        onSelect={this.setPanPosition}
        renderProps={{
          panPosition: channel.panPosition,
          onDoubleClick: this.reset,
          ...rest,
        }}
        render={PanKnob}
      />
    )
  }
}
