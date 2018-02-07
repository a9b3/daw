import styles          from './index.scss'
import cx              from 'classnames'
import PropTypes       from 'prop-types'
import React           from 'react'

import Meter           from 'components/Meter'

import withChannelData from 'components/Channel/withChannelData'

function ChannelMeters({ channelData, ...rest }) {
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
ChannelMeters.propTypes = { channelData: PropTypes.object }

export default withChannelData(ChannelMeters)
