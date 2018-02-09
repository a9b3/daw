import PropTypes from 'prop-types'
import React     from 'react'

export default class ScrollSync extends React.Component {
  static propTypes = {
    scrollTopPercent: PropTypes.number,
    scrollLeftPercent: PropTypes.number,
    onScroll: PropTypes.func,
    children: PropTypes.node,
  }

  _DOMRef = undefined

  componentWillReceiveProps({ scrollTopPercent, scrollLeftPercent }) {
    this.scrollToPosition(scrollTopPercent, scrollLeftPercent)
  }

  scrollToPosition = (scrollTopPercent, scrollLeftPercent) => {
    const { scrollHeight, scrollWidth } = this._DOMRef
    this._DOMRef.scrollTop = scrollTopPercent * scrollHeight
    this._DOMRef.scrollLeft = scrollLeftPercent * scrollWidth
  }

  render() {
    const { onScroll, children } = this.props

    return (
      <div
        ref={el => (this._DOMRef = el)}
        onScroll={onScroll}
        style={{ width: '100%', height: '100%', overflow: 'auto' }}
      >
        {children}
      </div>
    )
  }
}
