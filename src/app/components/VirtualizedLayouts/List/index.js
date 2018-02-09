import { times } from 'lodash'
import PropTypes from 'prop-types'
import React     from 'react'

export default class List extends React.PureComponent {
  static propTypes = {
    count: PropTypes.number,
  }

  state = {
    ready: false,
  }

  componentDidMount() {
    this.setState({ ready: true })
  }

  render() {
    const { count, renderRow } = this.props
    const { ready } = this.state
    return <div>{!ready ? renderRow(0) : times(count, renderRow)}</div>
  }
}
