import styles    from './index.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

import Knob      from 'components/Knob'
import Switch    from 'components/Switch'

export default function PanKnob({ panPosition = 0, ...rest }) {
  const value = panPosition * 50
  return (
    <div {...rest} className={cx(styles.panKnob, rest.className)}>
      <header className={styles.header}>Pan</header>
      <Knob className={styles.knob} value={value} rotate={270} />
      <Switch>{`${value} ${value === 0 ? '' : value < 0 ? 'L' : 'R'}`}</Switch>
    </div>
  )
}
PanKnob.propTypes = {
  // between -1 and 1
  panPosition: PropTypes.number,
}
