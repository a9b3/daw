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
      viewBox={'0 0 110 100'}
      preserveAspectRatio="xMinYMin"
      style={{ transform: `rotate(${rotate}deg)` }}
      className={cx(styles.knob, rest.className)}
    >
      <polygon points="110,40 100,50 110,60" className={styles.triangle} />
      <div className={styles.indicator}>hi</div>
      <circle cx="50" cy="50" r={radius} className={styles.backgroundCircle} />
      <circle
        cx="50"
        cy="50"
        r={radius}
        style={{
          strokeDasharray: circumference,
          strokeDashoffset: strokePercentage,
        }}
        className={styles.activeCircle}
      />
    </svg>
  )
}
Knob.propTypes = {
  value: PropTypes.number,
  rotate: PropTypes.number,
}
