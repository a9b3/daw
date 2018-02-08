import styles                 from './index.scss'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

export default function Transport() {
  return (
    <section className={styles.transport}>
      <ControlIcon type={TYPES.play} />
      <ControlIcon type={TYPES.stop} />
      <ControlIcon type={TYPES.record} />
    </section>
  )
}
Transport.propTypes = {}
