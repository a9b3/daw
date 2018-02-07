import styles           from './index.scss'
import cx               from 'classnames'
import { observer }     from 'mobx-react'
import PropTypes        from 'prop-types'
import React            from 'react'

import Switch           from '../Switch'
import ChannelMeter     from './ChannelMeters'
import DraggablePanKnob from './DraggablePanKnob'

@observer
export default class Channel extends React.Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    label: PropTypes.string,
    toggleMute: PropTypes.func,
  }

  setPanPosition = value => {
    const { channel } = this.props
    const adjustedValue = channel.panPosition - value * 0.1 / 50
    if (adjustedValue <= -1 || adjustedValue >= 1) {
      return
    }
    channel.setPanPosition(adjustedValue)
  }

  render() {
    const { channel, label, toggleMute, ...rest } = this.props
    return (
      <div {...rest} className={cx(styles.channel, rest.className)}>
        <section className={styles.control}>
          <DraggablePanKnob
            channel={channel}
            className={styles.control__item}
          />
          <Switch on className={styles.control__item}>
            {label}
          </Switch>
          {toggleMute && (
            <Switch
              on={channel.isMute}
              className={styles.control__item}
              onClick={toggleMute}
            >
              M
            </Switch>
          )}
          <Switch className={styles.control__item}>S</Switch>
          <div className={styles.end}>
            <Switch className={styles.control__item}>●</Switch>
          </div>
        </section>
        <ChannelMeter className={styles.meters} channel={channel} />
      </div>
    )
  }
}
