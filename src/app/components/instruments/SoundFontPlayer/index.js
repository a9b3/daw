import { get }      from 'lodash'
import { observer } from 'mobx-react'
import PropTypes    from 'prop-types'
import React        from 'react'

import SoundFont    from 'mixer/Instrument/SoundFont'

@observer
export default class SoundFontPlayer extends React.Component {
  static propTypes = {
    soundFont: PropTypes.instanceOf(SoundFont).isRequired,
  }

  handleChange = event => {
    const { soundFont } = this.props
    soundFont.load({ file: event.target.files[0] })
  }

  handleInstrument = event => {
    const { soundFont } = this.props
    soundFont.selectInstrumentIndex(event.target.value)
    soundFont.play({ note: 43 })
  }

  render() {
    const { soundFont } = this.props
    const instrumentNames = (get(soundFont, 'instruments.0') || []).map(
      ({ name }, i) => ({
        label: name,
        value: i,
      }),
    )
    return (
      <div>
        {soundFont.selectedInstrumentIndex}
        {soundFont.loading && 'loading'}
        <input type="file" onChange={this.handleChange} />
        <select id="" name="" onChange={this.handleInstrument}>
          {instrumentNames.map((inst, i) => (
            <option key={i} value={i}>
              {inst.label}
            </option>
          ))}
        </select>
      </div>
    )
  }
}
