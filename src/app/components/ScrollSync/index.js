import PropTypes from 'prop-types'
import React     from 'react'

export default class ScrollSyncManager extends React.Component {
  static propTypes = {
    render: PropTypes.func,
  }

  state = {
    scrollLeftPercent: 0,
    scrollTopPercent: 0,
  }

  handleScroll = event => {
    const { scrollHeight, scrollWidth, scrollTop, scrollLeft } = event.target
    const scrollLeftPercent = scrollLeft / scrollWidth
    const scrollTopPercent = scrollTop / scrollHeight
    this.setState({ scrollTopPercent, scrollLeftPercent })
  }

  render() {
    const { render } = this.props
    const { scrollTopPercent, scrollLeftPercent } = this.state
    return render({
      onScroll: this.handleScroll,
      scrollLeftPercent,
      scrollTopPercent,
    })
  }
}
