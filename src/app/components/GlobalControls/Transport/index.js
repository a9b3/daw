import styles                 from './index.scss'
import cx                     from 'classnames'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

export default function Transport() {
  return (
    <section className={styles.transport}>
      <div className={styles.transport__item}>{`3 . 12 . 1`}</div>
      <ControlIcon
        className={cx(styles.icon, styles.transport__item)}
        type={TYPES.play}
      />
      <ControlIcon
        className={cx(styles.icon, styles.transport__item)}
        type={TYPES.stop}
      />
      <ControlIcon
        className={cx(styles.icon, styles.transport__item)}
        type={TYPES.record}
      />
    </section>
  )
}
Transport.propTypes = {}
