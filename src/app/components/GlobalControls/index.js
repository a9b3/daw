import styles               from './index.scss'
import { inject, observer } from 'mobx-react'
import PropTypes            from 'prop-types'
import React                from 'react'

import Sequencer            from 'mixer/Sequencer'

import BPM                  from './BPM'
import CurrentPosition      from './CurrentPosition'
import Transport            from './Transport'

function GlobalControls({ sequencer }) {
  return (
    <header className={styles.header}>
      <section className={styles.section}>
        <BPM
          bpm={sequencer.signature.bpm}
          setBPM={sequencer.signature.setBPM}
        />
      </section>
      <section className={styles.section}>
        {sequencer.signature.beatsPerBar}/{sequencer.signature.beatType}
      </section>
      <section className={styles.section}>
        <CurrentPosition
          scheduler={sequencer.scheduler}
          signature={sequencer.signature}
          render={({ currentBar, currentBeatType, currentBeatsPerBar }) => {
            return (
              <div>
                {currentBar} . {currentBeatsPerBar} . {currentBeatType}
              </div>
            )
          }}
        />
      </section>
      <section className={styles.section}>
        <Transport
          isPlaying={sequencer.scheduler.isPlaying}
          onPlay={sequencer.scheduler.start}
          onStop={sequencer.scheduler.stop}
        />
      </section>
    </header>
  )
}
GlobalControls.propTypes = {
  sequencer: PropTypes.instanceOf(Sequencer),
}

export default inject('sequencer')(observer(GlobalControls))
