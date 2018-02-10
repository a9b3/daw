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

  _handleMouseMove = event => {
    if (!this._isDragging) {
      return
    }
    const { onResize } = this.props
    onResize(this._calculateDeltas(event))
    this._deltas = { x: event.clientX, y: event.clientY }
  }

  _handleMouseUp = () => {
    this._isDragging = false
    document.removeEventListener('mousemove', this._handleMouseMove)
    document.removeEventListener('mouseup', this._handleMouseUp)
  }

  handleMouseDown = event => {
    this._deltas = { x: event.clientX, y: event.clientY }
    this._isDragging = true
    document.addEventListener('mousemove', this._handleMouseMove)
    document.addEventListener('mouseup', this._handleMouseUp)
  }

  getProps = ({ onMouseDown = noop, ...rest } = {}) => {
    return { ...rest, onMouseDown: compose(onMouseDown, this.handleMouseDown) }
  }

  render() {
    const { render } = this.props
    return render({ getProps: this.getProps })
  }
}
