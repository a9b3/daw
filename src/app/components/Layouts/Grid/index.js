import { times } from 'lodash'
import PropTypes from 'prop-types'
import React     from 'react'

export default class Grid extends React.PureComponent {
  static propTypes = {
    renderCell: PropTypes.func,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
  }

  render() {
    const { renderCell, columns, rows, ...rest } = this.props
    return (
      <div {...rest} style={{ display: 'flex', ...rest.style }}>
        {times(columns, col => (
          <div key={col}>{times(rows, row => renderCell(col, row))}</div>
        ))}
      </div>
    )
  }
}
