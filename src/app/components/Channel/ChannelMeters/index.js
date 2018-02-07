import styles          from './index.scss'
import cx              from 'classnames'
import PropTypes       from 'prop-types'
import React           from 'react'

import Meter           from 'components/Meter'

import withChannelData from 'components/Channel/withChannelData'

@withChannelData
export default class ChannelMeters extends React.Component {
  static propTypes = { channelData: PropTypes.object }

  render() {
    const { channelData, ...rest } = this.props
    return (
      <div {...rest} className={cx(styles.meters, rest.className)}>
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
