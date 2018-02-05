import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

export default function BarValue({ value }) {
  return (
    <svg className={styles.bar} width="100%" height="100%">
      <rect className={styles.background} width="100%" height="100%" />
      <rect
        className={styles.main}
        width="100%"
        height="100%"
        style={{ transform: `translateY(${100 - value}%)` }}
      />
    </svg>
  )
}
BarValue.propTypes = {
  value: PropTypes.number,
}
