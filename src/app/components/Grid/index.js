import styles    from './index.scss'
import { times } from 'lodash'
import PropTypes from 'prop-types'
import React     from 'react'

export default function Grid() {
  const rows = 100
  const cols = 100
  return (
    <div className={styles.grid}>
      {times(cols, i => {
        return (
          <div className={styles.col}>
            {times(rows, j => {
              return <div className={styles.row}>{(i, j)}</div>
            })}
          </div>
        )
      })}
    </div>
  )
}
Grid.propTypes = {}

function handleScroll(event) {}
