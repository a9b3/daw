import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

import Transport from './Transport'

export default function GlobalControls() {
  return (
    <header className={styles.header}>
      <Transport />
    </header>
  )
}
GlobalControls.propTypes = {}
