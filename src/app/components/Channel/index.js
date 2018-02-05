import styles    from './index.scss'
import PropTypes from 'prop-types'
import React     from 'react'

export default class Channel extends React.Component {
  static propTypes = {
    gain: PropTypes.number,
  }

  render() {
    return (
      <div className={styles.channel}>
        <svg
          className={styles.svg}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          <rect
            width="100%"
            height="100%"
            fill="black"
            style={{ transform: `translateY(${100 - 80}%)` }}
          />
        </svg>
      </div>
    )
  }
}
