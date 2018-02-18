import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export const TYPES = {
  play: 'play',
  stop: 'stop',
  record: 'record',
}

function getIcon(type) {
  switch (type) {
    case TYPES.play:
      return <polygon points="0,0 0,100 100,50" width="100%" height="100%" />
    case TYPES.stop:
      return <rect width="100%" height="100%" />
    case TYPES.record:
      return <circle cx="50" cy="50" r="50" width="100%" height="100%" />
  }
}

export default function ControlIcon({ type, ...rest }) {
  return (
    <svg
      height=".6em"
      width=".6em"
      viewBox="0 0 100 100"
      {...rest}
      className={cx(styles.controlIcon, rest.className)}
    >
      {getIcon(type)}
    </svg>
  )
}
ControlIcon.propTypes = { type: PropTypes.oneOf(Object.keys(TYPES)) }
