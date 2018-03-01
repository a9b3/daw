import PropTypes from 'prop-types'
import React     from 'react'

import Octave    from './Octave'

export default class PianoRoll extends React.Component {
  static propTypes = {
    octaveRange: PropTypes.any,
    activeKeys: PropTypes.object,
    noteOn: PropTypes.func,
    noteOff: PropTypes.func,
  }

  static defaultProps = {
    octaveRange: [1, 10],
  }

  handleKeyActive = (octave, key) => {
    const { noteOn } = this.props
    noteOn(octave * 12 + key + 1)
  }

  handleKeyInactive = (octave, key) => {
    const { noteOff } = this.props
    noteOff(octave * 12 + key + 1)
  }

  renderOctaves = () => {
    const { octaveRange, activeKeys } = this.props
    const nodes = []
    for (let i = octaveRange[1]; i >= octaveRange[0]; i--) {
      nodes.push(
        <div style={{ display: 'flex' }}>
          <div
            style={{
              padding: '.5em',
              fontSize: '.8em',
              alignSelf: 'flex-end',
              borderBottom: '1px solid black',
              width: '30px',
            }}
          >
            {i + 1}
          </div>
          <div>
            <Octave
              key={i}
              onKeyActive={this.handleKeyActive.bind(this, i)}
              onKeyInactive={this.handleKeyInactive.bind(this, i)}
              octave={i}
              activeKeys={activeKeys}
            />
          </div>
        </div>,
      )
    }

    return nodes
  }

  render() {
    return <div>{this.renderOctaves()}</div>
  }
}
