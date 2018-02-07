import PropTypes from 'prop-types'
import React     from 'react'

export default class DragSelect extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func,
  }

  _mouseDownClientYLast = 0

  handleMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()

    this._mouseDownClientYLast = event.clientY
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
    this._mouseDownClientYLast = 0
  }

  _setPosition = event => {
    const delta = event.clientY - this._mouseDownClientYLast
    this._mouseDownClientYLast = event.clientY
    console.log(delta)
    this.props.onSelect(delta)
  }

  onMouseMove = event => {
    event.preventDefault()
    event.stopPropagation()

    window.requestAnimationFrame(() => this._setPosition(event))
  }

  render() {
    const { children } = this.props
    return <div onMouseDown={this.handleMouseDown}>{children}</div>
  }
}
