import PropTypes from 'prop-types'
import React     from 'react'

export default class List extends React.PureComponent {
  static propTypes = {
    renderRow: PropTypes.func,
    total: PropTypes.number,
    buffer: PropTypes.number,
  }

  static defaultProps = {
    buffer: 5,
  }

  state = {
    range: [0, 10],
    spacers: {
      top: 0,
      bottom: 1000,
    },
    averageRowHeight: 100,
  }

  componentDidMount() {
    // hydrate state
    this._updateState()
  }

  /* --------------- DOM Refs --------------- */
  _viewBoxDOM = undefined
  _setViewBoxDOM = el => {
    this._viewBoxDOM = el
  }

  /* --------------- Helpers --------------- */

  _renderRange = range => {
    const { renderRow } = this.props
    const nodes = []
    for (let i = range[0]; i < range[1]; i++) {
      nodes.push(renderRow(i))
    }
    return nodes
  }

  _calcRangeInViewBox = (
    scrollTop,
    viewBoxHeight,
    buffer,
    total,
    averageRowHeight,
  ) => {
    const estimatedTopRows = Math.round(scrollTop / averageRowHeight)
    const estimatedViewBoxRows = Math.round(viewBoxHeight / averageRowHeight)
    return [
      estimatedTopRows - buffer > 0 ? estimatedTopRows - buffer : 0,
      estimatedTopRows + estimatedViewBoxRows + buffer < total
        ? estimatedTopRows + estimatedViewBoxRows + buffer
        : total,
    ]
  }

  _updateState = (scrollTop = 0) => {
    const { total, buffer } = this.props
    const { averageRowHeight } = this.state
    const range = this._calcRangeInViewBox(
      scrollTop,
      this._viewBoxDOM.offsetHeight,
      buffer,
      total,
      averageRowHeight,
    )
    const spacers = {
      top: Math.abs(0 - range[0]) * averageRowHeight,
      bottom: Math.abs(total - range[1]) * averageRowHeight,
    }

    this.setState({ range, spacers })
  }

  handleScroll = event => {
    this._updateState(event.target.scrollTop)
  }

  render() {
    const { range, spacers } = this.state

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
        onScroll={this.handleScroll}
        ref={this._setViewBoxDOM}
      >
        <div
          style={{
            paddingTop: spacers.top,
            position: 'relative',
            paddingBottom: spacers.bottom,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: range[0] * 100,
            }}
          >
            {this._renderRange(range)}
          </div>
        </div>
      </div>
    )
  }
}
