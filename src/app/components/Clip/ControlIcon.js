import PropTypes from 'prop-types'
import React     from 'react'

export const TYPES = {
  play: 'play',
  stop: 'stop',
  record: 'record',
}

export default function ControlIcon({ type, ...rest }) {
  return (
    <svg height=".6em" width=".6em" viewBox="0 0 100 100" {...rest}>
      {type === TYPES.play && (
        <polygon points="0,0 0,100 100,50" width="100%" height="100%" />
      )}
      {type === TYPES.stop && <rect width="100%" height="100%" />}
      {type === TYPES.record && (
        <circle cx="50" cy="50" r="50" width="100%" height="100%" />
      )}
    </svg>
  )
}
ControlIcon.propTypes = { type: PropTypes.oneOf(Object.keys(TYPES)) }
