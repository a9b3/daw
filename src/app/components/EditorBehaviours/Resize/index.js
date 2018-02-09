import { noop }    from 'lodash'
import { compose } from 'lodash/fp'
import PropTypes   from 'prop-types'
import React       from 'react'

export default class Resize extends React.Component {
  static propTypes = {
    render: PropTypes.func,
    // ( delta: {x: number, y: number} ) => void
    onResize: PropTypes.func,
  }

  _deltas = { x: 0, y: 0 }
  _isDragging = false

  _calculateDeltas = event => {
    return {
      x: event.clientX - this._deltas.x,
      y: event.clientY - this._deltas.y,
    }
  }

  handleMouseMove = event => {
    if (!this._isDragging) {
      return
    }
    const { onResize } = this.props
    onResize(this._calculateDeltas(event))
    this._deltas = { x: event.clientX, y: event.clientY }
  }

  handleMouseDown = event => {
    this._isDragging = true
    this._deltas = { x: event.clientX, y: event.clientY }
  }

  handleMouseUp = () => {
    this._isDragging = false
  }

  handleMouseOut = () => {
    this._isDragging = false
  }

  getProps = ({
    onMouseUp = noop,
    onMouseMove = noop,
    onMouseDown = noop,
    onMouseOut = noop,
  } = {}) => {
    return {
      onMouseDown: compose(onMouseDown, this.handleMouseDown),
      onMouseMove: compose(onMouseMove, this.handleMouseMove),
      onMouseUp: compose(onMouseUp, this.handleMouseUp),
      onMouseOut: compose(onMouseOut, this.handleMouseOut),
    }
  }

  render() {
    const { render } = this.props
    return render({ getProps: this.getProps })
  }
}
