import styles     from './index.scss'
import PropTypes  from 'prop-types'
import React      from 'react'

import NoteEditor from './NoteEditor'
import Octave     from './Octave'

export default class PianoRoll extends React.Component {
  static propTypes = {
    octaveRange: PropTypes.any,
    activeKeys: PropTypes.object,
    noteOn: PropTypes.func,
    noteOff: PropTypes.func,
  }

  static defaultProps = {
    octaveRange: [0, 10],
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
        <div className={styles.octave} key={i}>
          <div className={styles.info}>{i + 1}</div>
          <div className={styles.keys}>
            <Octave
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
    const { octaveRange } = this.props
    return (
      <div className={styles['piano-roll']}>
        <div className={styles.piano}>{this.renderOctaves()}</div>
        <NoteEditor
          className={styles['note-editor']}
          octaveRange={octaveRange}
        />
      </div>
    )
  }
}
