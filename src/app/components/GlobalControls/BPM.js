import PropTypes  from 'prop-types'
import React      from 'react'

import DragSelect from 'components/DragSelect'

export default function BPM({ bpm, setBPM, ...rest }) {
  return (
    <DragSelect
      onSelect={delta => {
        const updatedBPM = bpm + delta * -1
        if (updatedBPM < 0) {
          setBPM(bpm + delta * -1)
        }
      }}
      renderProps={rest}
      render={props => <div {...props}>{bpm.toFixed(2)}</div>}
    />
  )
}
BPM.propTypes = {
  bpm: PropTypes.number,
  setBPM: PropTypes.func,
}
