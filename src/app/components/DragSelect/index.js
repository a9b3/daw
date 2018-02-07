import PropTypes from 'prop-types'
import React     from 'react'

export default class DragSelect extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    onSelect: PropTypes.func,
  }

  _mouseDownClientY = null

  handleMouseDown = event => {
    event.preventDefault()
    event.stopPropagation()

    this._mouseDownClientY = event.clientY
    document.addEventListener('mousemove', this.onMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    document.removeEventListener('mousemove', this.onMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  _setPosition = event => {
    const diff = (event.clientY - this._mouseDownClientY) * -1
    this.props.onSelect(diff)
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
