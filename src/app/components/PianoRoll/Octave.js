import styles          from './Octave.scss'
import cx              from 'classnames'
import { noop, times } from 'lodash'
import PropTypes       from 'prop-types'
import React           from 'react'

const BLACK_KEYS = {
  1: true,
  3: true,
  6: true,
  8: true,
  10: true,
}

const KEY_TO_NOTE = {
  0: 'C',
  1: 'C#',
  2: 'D',
  3: 'D#',
  4: 'E',
  5: 'F',
  6: 'F#',
  7: 'G',
  8: 'G#',
  9: 'A',
  10: 'A#',
  11: 'B',
}

export default class Octave extends React.PureComponent {
  static propTypes = {
    onKeyActive: PropTypes.func,
    onKeyInactive: PropTypes.func,
    activeKeys: PropTypes.object,
    octave: PropTypes.number,
  }

  static defaultProps = {
    onKeyActive: noop,
    onKeyInactive: noop,
  }

  componentDidMount() {
    window.addEventListener('mousedown', this._setMouseDown)
    window.addEventListener('mouseup', this._setMouseDownFalse)
  }

  componentWillUnmount() {
    window.removeEventListener('mousedown', this._setMouseDown)
    window.removeEventListener('mouseup', this._setMouseDownFalse)
  }

  _setMouseDown = () => {
    this.mouseDown = true
  }

  _setMouseDownFalse = () => {
    this.mouseDown = false
  }

  handleMouseDown = i => {
    const { onKeyActive } = this.props
    onKeyActive(i)
  }

  handleMouseOver = i => {
    if (!this.mouseDown) {
      return
    }
    const { onKeyActive } = this.props
    onKeyActive(i)
  }

  handleMouseOut = i => {
    if (!this.mouseDown) {
      return
    }
    const { onKeyInactive } = this.props
    onKeyInactive(i)
  }

  handleMouseUp = i => {
    const { onKeyInactive } = this.props
    onKeyInactive(i)
    this.mouseDown = false
  }

  render() {
    const { octave, activeKeys } = this.props

    return (
      <React.Fragment>
        {times(12, i => {
          i = 12 - (i + 1)
          return (
            <div
              key={i}
              className={cx(styles.key, {
                [styles['key--white']]: !BLACK_KEYS[i],
                [styles['key--black']]: BLACK_KEYS[i],
                [styles['key--active']]: activeKeys.get(octave * 12 + i + 1),
              })}
              onMouseOver={this.handleMouseOver.bind(this, i)}
              onMouseOut={this.handleMouseOut.bind(this, i)}
              onMouseUp={this.handleMouseUp.bind(this, i)}
              onMouseDown={this.handleMouseDown.bind(this, i)}
            >
              {`${KEY_TO_NOTE[i]} ${octave + 1}`}
            </div>
          )
        })}
      </React.Fragment>
    )
  }
}
