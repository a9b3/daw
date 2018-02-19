import styles                 from './section.scss'
import cx                     from 'classnames'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

export default function Transport({
  onPlay,
  onStop,
  onRecord,
  isPlaying,
  isRecording,
  ...rest
}) {
  return (
    <section {...rest} className={cx(styles.section, rest.className)}>
      <div className={styles.section__item}>{`3 . 12 . 1`}</div>
      <ControlIcon
        className={cx(styles.icon, styles.section__item, {
          [styles['icon--active']]: isPlaying,
        })}
        type={TYPES.play}
        onClick={onPlay}
      />
      <ControlIcon
        className={cx(styles.icon, styles.section__item)}
        type={TYPES.stop}
        onClick={onStop}
      />
      <ControlIcon
        className={cx(styles.icon, styles.section__item, {
          [styles['icon--active']]: isRecording,
        })}
        type={TYPES.record}
        onClick={onRecord}
      />
    </section>
  )
}
Transport.propTypes = {
  onPlay: PropTypes.func,
  onRecord: PropTypes.func,
  onStop: PropTypes.func,
  isPlaying: PropTypes.bool,
  isRecording: PropTypes.bool,
}
