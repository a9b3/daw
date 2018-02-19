import styles    from './section.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default function Signature({ beatsPerBar, beatType, ...rest }) {
  return (
    <section {...rest} className={cx(styles.section, rest.className)}>
      <div className={styles.section__item}>
        {beatsPerBar}/{beatType}
      </div>
    </section>
  )
}
Signature.propTypes = {
  beatsPerBar: PropTypes.number,
  beatType: PropTypes.number,
}
