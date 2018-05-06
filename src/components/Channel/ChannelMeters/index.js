import styles          from './index.scss'
import cx              from 'classnames'
import { observer }    from 'mobx-react'
import PropTypes       from 'prop-types'
import React           from 'react'

import Meter           from 'components/Meter'

import withChannelData from 'components/Channel/withChannelData'

@withChannelData
@observer
export default class ChannelMeters extends React.Component {
  static propTypes = {
    channelData: PropTypes.object,
    channel: PropTypes.object,
  }

  _el = null

  handleClick = event => {
    const { channel } = this.props
    const diff =
      1 - (event.clientY - this._el.offsetTop) / this._el.offsetHeight
    channel.setGain(diff)
  }

  render() {
    const { channel, channelData, ...rest } = this.props
    return (
      <div
        {...rest}
        className={cx(styles.meters, rest.className)}
        onClick={this.handleClick}
        ref={el => (this._el = el)}
      >
        <div
          className={styles.arrow}
          style={{
            transform: `translateY(${this._el &&
              this._el.offsetHeight - this._el.offsetHeight * channel.gain}px)`,
          }}
        />
        <Meter
          className={styles.meter}
          peak={channelData.left.peak}
          main={channelData.left.main}
        />
        <Meter
          className={styles.meter}
          peak={channelData.right.peak}
          main={channelData.right.main}
        />
      </div>
    )
  }
}
