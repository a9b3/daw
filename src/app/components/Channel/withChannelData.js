import hoistNonReactStatics from 'hoist-non-react-statics'
import PropTypes            from 'prop-types'
import React                from 'react'

import raf                  from 'utils/raf'

// this hoc will update the WrappedComponent with the prop channelData
export default function withChannelData(WrappedComponent) {
  class Wrapper extends React.Component {
    static displayName = `withChannelData(${WrappedComponent.displayName ||
      WrappedComponent.name})`

    static propTypes = {
      channel: PropTypes.object.isRequired,
    }

    componentDidMount() {
      this.cancelRaf = raf(this.handleUpdate)
    }

    componentWillUnmount() {
      this.cancelRaf()
    }

    handleUpdate = () => {
      this.setState({})
    }

    render() {
      const { channel } = this.props
      const [left, right] = channel.analyser.getDecibel()
      const channelData = {
        left: { main: left, peak: channel.rms.peaks[0] * 100 },
        right: { main: right, peak: channel.rms.peaks[1] * 100 },
      }

      return <WrappedComponent {...this.props} channelData={channelData} />
    }
  }

  return hoistNonReactStatics(Wrapper, WrappedComponent)
}
