import styles from './index.scss'
import React from 'react'

import Signature from './Signature'
import Tempo from './Tempo'
import Transport from './Transport'

export default function GlobalControls() {
  return (
    <header className={styles.header}>
      <Tempo tempo={100} />
      <Signature />
      <Transport />
    </header>
  )
}
GlobalControls.propTypes = {}
