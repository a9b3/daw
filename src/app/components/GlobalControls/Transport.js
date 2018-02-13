import styles                 from './section.scss'
import cx                     from 'classnames'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

export default function Transport() {
  return (
    <section className={styles.section}>
      <div className={styles.section__item}>{`3 . 12 . 1`}</div>
      <ControlIcon
        className={cx(styles.icon, styles.section__item)}
        type={TYPES.play}
      />
      <ControlIcon
        className={cx(styles.icon, styles.section__item)}
        type={TYPES.stop}
      />
      <ControlIcon
        className={cx(styles.icon, styles.section__item)}
        type={TYPES.record}
      />
    </section>
  )
}
Transport.propTypes = {}
