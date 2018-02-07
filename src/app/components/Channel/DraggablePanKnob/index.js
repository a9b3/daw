import { observer } from 'mobx-react'
import PropTypes from 'prop-types'
import React from 'react'

import DragSelect from 'components/DragSelect'

import PanKnob from './PanKnob'

@observer
export default class DraggablePanKnob extends React.Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
  }

  setPanPosition = delta => {
    const { channel } = this.props
    const gain = channel.panPosition - delta * 0.2 / 50
    if (gain <= -1 || gain >= 1) {
      return
    }
    channel.setPanPosition(gain)
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
