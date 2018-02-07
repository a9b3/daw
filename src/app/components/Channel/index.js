import styles       from './index.scss'
import cx           from 'classnames'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import React        from 'react'

import Switch       from '../Switch'
import ChannelMeter from './ChannelMeters'
import PanKnob      from './PanKnob'

@observer
export default class Channel extends React.Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    channelIndex: PropTypes.number,
  }

  render() {
    const { channel, channelIndex, ...rest } = this.props
    return (
      <div {...rest} className={cx(styles.channel, rest.className)}>
        <section className={styles.control}>
          <PanKnob
            panPosition={channel.panPosition}
            className={styles.control__item}
          />
          <Switch on className={styles.control__item}>
            {channelIndex}
          </Switch>
          <Switch
            on={channel.isMute}
            className={styles.control__item}
            onClick={channel.toggleMute}
          >
            M
          </Switch>
          <Switch className={styles.control__item}>S</Switch>
          <div className={styles.end}>
            <Switch className={styles.control__item}>●</Switch>
          </div>
        </section>
        <section className={styles.meters}>
          <ChannelMeter channel={channel} />
        </section>
      </div>
    )
  }
}
