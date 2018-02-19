import styles                 from './section.scss'
import cx                     from 'classnames'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'
import DragSelect             from 'components/DragSelect'

export default function Tempo({ bpm, setBPM }) {
  return (
    <section className={styles.section}>
      <div className={styles.section__item}>TAP</div>
      <DragSelect
        onSelect={delta => setBPM(bpm + delta * -1)}
        render={props => (
          <div {...props} className={styles.section__item}>
            {bpm.toFixed(2)}
          </div>
        )}
      />
      <ControlIcon
        className={cx(styles.icon, styles.transport__item)}
        type={TYPES.metronome}
      />
    </section>
  )
}
Tempo.propTypes = {
  bpm: PropTypes.number,
  setBPM: PropTypes.func,
}
