import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import { get }             from 'lodash'
import { observer }        from 'mobx-react'
import PropTypes           from 'prop-types'
import React               from 'react'

import SoundFont           from 'mixer/Instrument/SoundFont'

import PianoRoll           from './index.js'

@observer
export default class PianoRollExample extends React.Component {
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
    soundFont.noteOn({ note: 43, velocity: 0.1 })
  }

  handleNoteOn = note => {
    const { soundFont } = this.props
    soundFont.noteOn({ note })
  }

  handleNoteOff = note => {
    const { soundFont } = this.props
    soundFont.noteOff({ note })
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
      <div dummy={soundFont.activeNotes.keys()}>
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
        <PianoRoll
          noteOn={this.handleNoteOn}
          noteOff={this.handleNoteOff}
          activeKeys={soundFont.activeNotes}
        />
      </div>
    )
  }
}

storiesOf('PianoRoll', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <PianoRollExample soundFont={new SoundFont()} />
  })
