import styles               from './styles.scss'
import { inject, observer } from 'mobx-react'
import PropTypes            from 'prop-types'
import React                from 'react'

import { Sound }            from 'app/mixer'

import Channel              from 'components/Channel'

@inject('mixer')
@observer
export default class Index extends React.Component {
  static propTypes = {
    mixer: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    const { mixer } = this.props
    const sound = new Sound()
    sound.output.connect(mixer.channels[0].input)
    await sound.load(require('assets/song.mp3'))
    sound.play()
  }

  render() {
    const { mixer } = this.props
    return (
      <div className={styles.index} style={{ display: 'flex' }}>
        {mixer.channels.map((channel, i) => {
          return (
            <Channel
              key={`${i}`}
              style={{ width: 120, height: 320 }}
              label={`${i}`}
              channel={channel}
              toggleMute={channel.toggleMute}
            />
          )
        })}

        <Channel
          key={`ok`}
          style={{ width: 120, height: 320, marginLeft: 'auto' }}
          label={'mtr'}
          channel={mixer.master}
        />
      </div>
    )
  }
}
