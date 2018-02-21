import PropTypes from 'prop-types'
import React     from 'react'

import Scheduler from 'mixer/Scheduler'
import Signature from 'mixer/Signature'

export default class CurrentPosition extends React.Component {
  static propTypes = {
    scheduler: PropTypes.instanceOf(Scheduler),
    signature: PropTypes.instanceOf(Signature),
    render: PropTypes.func,
  }

  state = {
    currentBeatType: 0,
    currentBeatsPerBar: 0,
    currentBar: 0,
  }

  componentDidMount() {
    const { scheduler } = this.props
    scheduler.addHandler(this.handler)
  }

  componentWillUnmount() {
    const { scheduler } = this.props
    scheduler.removeHandler(this.handler)
  }

  handler = ({ currentTick, ticksPerWholeNote }) => {
    const { signature } = this.props
    const ticksPerBeatType = ticksPerWholeNote / signature.beatType
    const currentBeatType = Math.floor(currentTick / ticksPerBeatType)
    const currentBeatsPerBar = Math.floor(
      currentBeatType / signature.beatsPerBar,
    )
    const currentBar = Math.floor(currentBeatsPerBar / signature.beatsPerBar)

    this.setState({
      currentBeatType: currentBeatType % signature.beatType,
      currentBeatsPerBar: currentBeatsPerBar % signature.beatsPerBar,
      currentBar,
    })
  }

  render() {
    const { render } = this.props
    const { currentBar, currentBeatType, currentBeatsPerBar } = this.state
    return render({ currentBar, currentBeatType, currentBeatsPerBar })
  }
}
