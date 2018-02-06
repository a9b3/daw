import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default function Meter({ main = 0, secondary = 0, peak = 0, ...rest }) {
  return (
    <svg
      width="100%"
      height="100%"
      {...rest}
      className={cx(styles.meter, rest.className)}
    >
      <rect className={styles.background} width="100%" height="100%" />
      <rect
        className={styles.secondary}
        width="100%"
        height="100%"
        style={{ transform: `translateY(${100 - secondary}%)` }}
      />
      <rect
        className={styles.main}
        width="100%"
        height="100%"
        style={{ transform: `translateY(${100 - main}%)` }}
      />
      <rect
        className={styles.peak}
        width="100%"
        height="2px"
        y={`${100 - peak}%`}
      />
    </svg>
  )
}
Meter.propTypes = {
  main: PropTypes.number,
  secondary: PropTypes.number,
  peak: PropTypes.number,
}
