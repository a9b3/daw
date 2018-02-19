import PropTypes from 'prop-types'
import React     from 'react'

export default class CurrentPosition extends React.Component {
  static propTypes = {}

  componentDidMount() {
    const { scheduler } = this.props
    scheduler.addHandler(this.handler)
  }

  componentWillUnmount() {
    const { scheduler } = this.props
    scheduler.removeHandler(this.handler)
  }

  handler = ({ currentTick, ticksPerWholeNote }) => {}

  render() {
    return <div>hi</div>
  }
}
