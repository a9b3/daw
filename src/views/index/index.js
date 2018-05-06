import styles               from './index.scss'

import { inject, observer } from 'mobx-react'
import DevTools             from 'mobx-react-devtools'
import PropTypes            from 'prop-types'
import React                from 'react'

import GlobalControls       from 'components/GlobalControls'
import { Sound }            from 'mixer'

import SequencerLayout      from './SequencerLayout'

@inject('sequencer')
@observer
export default class Index extends React.Component {
  static propTypes = {
    sequencer: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    const { sequencer } = this.props
    const sound = new Sound()
    // sound.output.connect(sequencer.tracks[0].channel.input)
    // await sound.load(require('assets/song.mp3'))
    // sound.play()
  }

  render() {
    const { sequencer } = this.props

    return (
      <div className={styles.index}>
        <DevTools />
        <GlobalControls />
        <SequencerLayout sequencer={sequencer} />
      </div>
    )
  }
}
