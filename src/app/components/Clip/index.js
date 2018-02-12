import styles                 from './index.scss'
import cx                     from 'classnames'
import PropTypes              from 'prop-types'
import React                  from 'react'

import ControlIcon, { TYPES } from 'components/ControlIcon'

import HorizontalMeter        from './HorizontalMeter'

export default function Clip({ clip, rgb, ...rest }) {
  return (
    <div
      {...rest}
      className={cx(styles.clip, rest.className, {
        [styles['clip--occupied']]: Boolean(clip),
      })}
    >
      {clip && (
        <HorizontalMeter
          style={
            rgb && {
              ['--horizontalMeterValueColor']: rgb,
            }
          }
          className={styles.meter}
          value={10}
        />
      )}
      <div className={styles.info}>
        <ControlIcon
          className={styles.icon}
          type={cx({
            [TYPES.stop]: true,
          })}
        />
        {clip && clip.label}
      </div>
    </div>
  )
}
Clip.propTypes = {
  clip: PropTypes.object,
  rgb: PropTypes.string,
}
