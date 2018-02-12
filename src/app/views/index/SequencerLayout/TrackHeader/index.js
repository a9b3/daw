import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default function TrackHeader({ label, rgb, ...rest }) {
  return (
    <header
      {...rest}
      className={cx(styles.trackHeader, rest.className)}
      style={{ ...rest.style, ['--trackHeaderRGB']: rgb }}
    >
      {label}
    </header>
  )
}
TrackHeader.propTypes = {
  label: PropTypes.string,
  rgb: PropTypes.string,
}
