import styles               from './index.scss'
import { inject, observer } from 'mobx-react'
import DevTools             from 'mobx-react-devtools'
import PropTypes            from 'prop-types'
import React                from 'react'

import { Sound }            from 'app/mixer'

import GlobalControls       from 'components/GlobalControls'
import Track                from 'components/Track'

@inject('sequencer')
@observer
export default class Index extends React.Component {
  static propTypes = {
    sequencer: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    const { sequencer } = this.props
    const sound = new Sound()
    sound.output.connect(sequencer.tracks[0].channel.input)
    await sound.load(require('assets/song.mp3'))
    sound.play()
  }

  render() {
    const { sequencer } = this.props
    return (
      <div className={styles.index}>
        <DevTools />
        <GlobalControls />
        <div style={{ flexGrow: '1', display: 'flex' }}>
          {sequencer.tracks.map((track, i) => {
            return (
              <Track
                track={track}
                key={`${i}`}
                style={{ width: 120 }}
                label={`${i}`}
                channel={track.channel}
                toggleMute={track.channel.toggleMute}
              />
            )
          })}

          <Track
            key={`ok`}
            style={{ width: 120, marginLeft: 'auto' }}
            label={'mtr'}
            channel={sequencer.master.channel}
            track={sequencer.master}
          />
        </div>
      </div>
    )
  }
}
