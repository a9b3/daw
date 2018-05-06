import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default function Switch({ on, children, ...rest }) {
  return (
    <button
      {...rest}
      className={cx(styles.button, rest.className, {
        [styles['button--on']]: on,
      })}
    >
      {children}
    </button>
  )
}
Switch.propTypes = { children: PropTypes.node, on: PropTypes.bool }
