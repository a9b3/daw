import styles from './index.scss'
import PropTypes from 'prop-types'
import React from 'react'

import HorizontalMeter from './HorizontalMeter'

export default function Clip({ label }) {
  return (
    <div className={styles.clip}>
      <HorizontalMeter className={styles.meter} value={10} />
      <div className={styles.info}>
        <svg
          className={styles.info__icon}
          height=".8em"
          width=".8em"
          viewBox="0 0 100 100"
        >
          <rect width="100%" height="100%" />
        </svg>
        <span className={styles.info__label}>{label}</span>
      </div>
    </div>
  )
}
Clip.propTypes = {
  label: PropTypes.string,
}
