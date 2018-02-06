import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

import Meter     from '../Meter'
import Switch    from '../Switch'
import PanKnob   from './PanKnob'

export default class Channel extends React.Component {
  static propTypes = {
    channelIndex: PropTypes.number,
    panPosition: PropTypes.number,
  }

  render() {
    const { panPosition, channelIndex } = this.props
    return (
      <div className={styles.channel}>
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
          <Meter className={styles.meter} peak={80} main={20} secondary={50} />
          <Meter className={styles.meter} peak={70} main={45} secondary={60} />
        </section>
      </div>
    )
  }
}
