import { noop }    from 'lodash'
import { compose } from 'lodash/fp'
import PropTypes   from 'prop-types'
import React       from 'react'

export default class DragSelect extends React.PureComponent {
  static propTypes = {
    onSelect: PropTypes.func,
    render: PropTypes.func,
    renderProps: PropTypes.object,
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
    this.props.onSelect(delta)
  }

  onMouseMove = event => {
    event.preventDefault()
    event.stopPropagation()
    window.requestAnimationFrame(() => this._setPosition(event))
  }

  render() {
    const { renderProps = {}, render } = this.props
    return render({
      ...renderProps,
      onMouseDown: compose(
        renderProps.onMouseDown || noop,
        this.handleMouseDown,
      ),
    })
  }
}
