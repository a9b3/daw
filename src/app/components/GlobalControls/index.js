import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

import Tempo     from './Tempo'
import Transport from './Transport'

export default function GlobalControls() {
  return (
    <header className={styles.header}>
      <Tempo tempo={100} />
      <Transport />
    </header>
  )
}
GlobalControls.propTypes = {}
