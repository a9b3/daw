import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default function HorizontalMeter({ value, ...rest }) {
  return (
    <svg
      width="100%"
      height="100%"
      {...rest}
      className={cx(styles.horizontalMeter, rest.className)}
    >
      <rect className={styles.background} width="100%" height="100%" />
      <rect
        className={styles.value}
        width="100%"
        height="100%"
        x={`-${100 - value}%`}
      />
    </svg>
  )
}
HorizontalMeter.propTypes = {
  value: PropTypes.number,
}
