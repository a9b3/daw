import styles               from './styles.scss'
import { inject, observer } from 'mobx-react'
import React                from 'react'

import { Mixer, Sound }     from 'app/mixer'

import Channel              from 'components/Channel'

// const sound = new Sound()
// async function foo() {
//   const mixer = new Mixer()
//   const channel = mixer.addChannel()
//
//   sound.output.connect(channel.input)
//   await sound.load(
//     require('../../../../../../../Desktop/documents/Music/Download/Maria Takeuchi 竹内 まりや Plastic Love-3bNITQR4Uso.mp3'),
//   )
//   sound.play()
// }
//
// foo()

@inject('mixer')
@observer
export default class Index extends React.Component {
  async componentDidMount() {
    const { mixer } = this.props
    const sound = new Sound()
    sound.output.connect(mixer.channels[0].input)
    await sound.load(
      require('../../../../../../../Desktop/documents/Music/Download/Maria Takeuchi 竹内 まりや Plastic Love-3bNITQR4Uso.mp3'),
    )
    sound.play()

    const cb = () => {
      this.setState({})
      window.requestAnimationFrame(cb)
    }
    window.requestAnimationFrame(cb)
  }

  render() {
    const { mixer } = this.props
    return (
      <div className={styles.index}>
        {mixer.channels.map((channel, i) => {
          const [left, right] = channel.analyser.getDecibel()
          return (
            <Channel
              key={i}
              style={{ width: 100, height: 320 }}
              panPosition={channel.panPosition}
              channelIndex={i}
              meterData={{
                left: {
                  main: left,
                  peak: channel.rms.peaks[0] * 100,
                },
                right: {
                  main: right,
                  peak: channel.rms.peaks[1] * 100,
                },
              }}
            />
          )
        })}

        <Channel
          key={2}
          style={{ width: 100, height: 320 }}
          panPosition={mixer.master.panPosition}
          channelIndex={2}
          meterData={{
            left: {
              main: mixer.master.rms.rms[0] * 100,
              peak: mixer.master.rms.peaks[0] * 100,
            },
            right: {
              main: mixer.master.rms.rms[1] * 100,
              peak: mixer.master.rms.peaks[1] * 100,
            },
          }}
        />
      </div>
    )
  }
}
