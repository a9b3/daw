import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default function Knob({ value, rotate = 90, ...rest }) {
  const radius = 40
  const circumference = Math.PI * (2 * radius)
  const strokePercentage = circumference - value / 100 * circumference

  return (
    <svg
      viewBox={'0 0 100 100'}
      preserveAspectRatio="xMinYMin"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cx(styles.knob, rest.className)}
    >
      <circle cx="50" cy="50" r={radius} className={styles.background} />
      <circle
        cx="50"
        cy="50"
        r={radius}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: strokePercentage,
        }}
        className={styles.active}
      />
    </svg>
  )
}
Knob.propTypes = {
  value: PropTypes.number,
  rotate: PropTypes.number,
}
