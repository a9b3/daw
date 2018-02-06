import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

import Meter     from '../Meter'
import Switch    from '../Switch'
import PanKnob   from './PanKnob'

export default class Channel extends React.Component {
  static propTypes = {
    channelIndex: PropTypes.number,
    panPosition: PropTypes.number,
    meterData: PropTypes.object,
  }

  render() {
    const {
      channel,
      meterData,
      panPosition,
      channelIndex,
      ...rest
    } = this.props
    return (
      <div {...rest} className={cx(styles.channel, rest.className)}>
        <section className={styles.control}>
          <PanKnob panPosition={panPosition} className={styles.control__item} />
          <Switch on className={styles.control__item}>
            {channelIndex}
          </Switch>
          <Switch on className={styles.control__item}>
            M
          </Switch>
          <Switch className={styles.control__item}>S</Switch>
          <div className={styles.end}>
            <Switch className={styles.control__item}>●</Switch>
          </div>
        </section>
        <section className={styles.meters}>
          <Meter
            className={styles.meter}
            peak={meterData.left.peak}
            main={meterData.left.main}
            secondary={50}
          />
          <Meter
            className={styles.meter}
            peak={meterData.right.peak}
            main={meterData.right.main}
            secondary={50}
          />
        </section>
      </div>
    )
  }
}
