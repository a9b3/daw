import styles                 from './index.scss'
import cx                     from 'classnames'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

export default function Transport({ onPlay, onStop, isPlaying }) {
  return (
    <React.Fragment>
      <ControlIcon
        className={cx(styles.icon, {
          [styles['icon--active']]: isPlaying,
        })}
        type={TYPES.play}
        onClick={onPlay}
      />
      <ControlIcon className={styles.icon} type={TYPES.stop} onClick={onStop} />
      <ControlIcon className={styles.icon} type={TYPES.record} />
    </React.Fragment>
  )
}
Transport.propTypes = {
  onPlay: PropTypes.func,
  onStop: PropTypes.func,
  isPlaying: PropTypes.bool,
}
