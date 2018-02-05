import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

export default function Knob({ value, rotate = 90 }) {
  const radius = 40
  const circumference = Math.PI * (2 * radius)
  const strokePercentage = circumference - value / 100 * circumference

  return (
    <svg
      className={styles.knob}
      viewBox={'0 0 100 100'}
      preserveAspectRatio="xMinYMin"
      style={{ transform: `rotate(${rotate}deg)` }}
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
