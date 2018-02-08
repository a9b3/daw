import styles       from './index.scss'
import cx           from 'classnames'
import { times }    from 'lodash'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import React        from 'react'

import Channel      from 'components/Channel'
import Clip         from 'components/Clip'

@observer
export default class Track extends React.Component {
  static propTypes = {
    track: PropTypes.object.isRequired,
  }

  render() {
    const { track, label, channel, toggleMute, ...rest } = this.props

    return (
      <div {...rest} className={cx(styles.track, rest.className)}>
        <header className={styles.header}>{track.label}</header>
        <ul className={styles.clips}>
          {times(10, i => {
            return (
              <li key={i}>
                <Clip clip={track.clips[i]} />
              </li>
            )
          })}
        </ul>

        <Channel
          className={styles.channel}
          channel={channel}
          label={label}
          toggleMute={toggleMute}
        />
      </div>
    )
  }
}
