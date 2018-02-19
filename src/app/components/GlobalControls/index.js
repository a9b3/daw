import styles               from './index.scss'
import { inject, observer } from 'mobx-react'
import PropTypes            from 'prop-types'
import React                from 'react'

import Sequencer            from 'mixer/Sequencer'

import Signature            from './Signature'
import Tempo                from './Tempo'
import Transport            from './Transport'

function GlobalControls({ sequencer }) {
  return (
    <header className={styles.header}>
      <Tempo
        bpm={sequencer.signature.bpm}
        setBPM={sequencer.signature.setBPM}
      />
      <Signature
        beatsPerBar={sequencer.signature.beatsPerBar}
        beatType={sequencer.signature.beatType}
      />
      <Transport
        isPlaying={sequencer.scheduler.isPlaying}
        onPlay={sequencer.scheduler.start}
        onStop={sequencer.scheduler.stop}
      />
    </header>
  )
}
GlobalControls.propTypes = {
  sequencer: PropTypes.instanceOf(Sequencer),
}

export default inject('sequencer')(observer(GlobalControls))
