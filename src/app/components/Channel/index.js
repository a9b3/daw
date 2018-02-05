import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

import Knob      from '../Knob'
import Meter     from '../Meter'
import Switch    from '../Switch'

export default class Channel extends React.Component {
  static propTypes = {
    gain: PropTypes.number,
  }

  render() {
    return (
      <div className={styles.channel}>
        <div className={styles.control}>
          <Knob className={styles.knob} value={10} rotate={270} />
          <Switch on className={styles.switch}>
            Mute
          </Switch>
          <Switch className={styles.switch}>Record</Switch>
        </div>
        <div className={styles.meters}>
          <Meter className={styles.meter} peak={60} main={40} secondary={50} />
          <Meter className={styles.meter} peak={70} main={45} secondary={60} />
        </div>
      </div>
    )
  }
}
