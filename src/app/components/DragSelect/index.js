import PropTypes from 'prop-types'
import React     from 'react'

export default class DragSelect extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func,
  }

  _mouseClickOffset = null
  _selectorDOMRef = null

  handleMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()

    this._mouseClickOffset = event.clientY

    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  _setPosition = (event, _mouseClickOffset) => {
    const diff = event.clientY - _mouseClickOffset
    this.props.onSelect(diff * 0.01)
  }

  onMouseMove = event => {
    event.preventDefault()
    event.stopPropagation()

    window.requestAnimationFrame(() => {
      this._setPosition(event, this._mouseClickOffset)
    })
  }

  render() {
    const { children } = this.props
    return <div onMouseDown={this.handleMouseDown}>{children}</div>
  }
}
