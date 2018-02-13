import styles                 from './section.scss'
import cx                     from 'classnames'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

export default function Tempo({ tempo }) {
  return (
    <section className={styles.section}>
      <div className={styles.section__item}>TAP</div>
      <div className={styles.section__item}>{tempo.toFixed(2)}</div>
      <ControlIcon
        className={cx(styles.icon, styles.transport__item)}
        type={TYPES.metronome}
      />
    </section>
  )
}
Tempo.propTypes = {
  tempo: PropTypes.number,
}
