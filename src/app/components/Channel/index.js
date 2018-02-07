import styles       from './index.scss'
import cx           from 'classnames'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import React        from 'react'

import Switch       from '../Switch'
import ChannelMeter from './ChannelMeters'
import PanKnob      from './PanKnob'
import DragSelect   from 'components/DragSelect'

@observer
export default class Channel extends React.Component {
  static propTypes = {
    channel: PropTypes.object.isRequired,
    label: PropTypes.string,
  }

  render() {
    const { channel, label, ...rest } = this.props
    return (
      <div {...rest} className={cx(styles.channel, rest.className)}>
        <section className={styles.control}>
          <DragSelect onSelect={channel.setPanPosition}>
            <PanKnob
              panPosition={channel.panPosition}
              className={styles.control__item}
            />
          </DragSelect>
          <Switch on className={styles.control__item}>
            {label}
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
        <ChannelMeter className={styles.meters} channel={channel} />
      </div>
    )
  }
}
