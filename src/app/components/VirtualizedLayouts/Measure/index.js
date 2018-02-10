import { noop }    from 'lodash'
import { compose } from 'lodash/fp'
import PropTypes   from 'prop-types'
import React       from 'react'

export default class Measure extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    onMeasure: PropTypes.func,
  }

  _ref = undefined
  _setRef = el => {
    this._ref = el
  }

  componentDidMount() {
    const { onMeasure } = this.props
    onMeasure(this.getDimensions())
  }

  getDimensions = () => {
    return {
      width: this._ref.offsetWidth,
      height: this._ref.offsetHeight,
    }
  }

  render() {
    const { children, show } = this.props
    return React.cloneElement(children, {
      ...children.props,
      style: {
        ...children.props.style,
        ...(show
          ? {}
          : { visibility: 'hidden', position: 'fixed', top: '-1000px' }),
      },
      ref: compose(children.props.ref || noop, this._setRef),
    })
  }
}
