import styles           from './styles.scss'
import React            from 'react'

import { Mixer, Sound } from 'app/mixer'

async function foo() {
  const mixer = new Mixer()
  const channel = mixer.addChannel()
  const sound = new Sound()
  channel.insert(sound.output)

  await sound.load(
    '../../../../../../../Desktop/documents/Music/Download/Maria Takeuchi 竹内 まりや Plastic Love-3bNITQR4Uso.mp3',
  )
  sound.play()
}

foo()

export default class Index extends React.Component {
  render() {
    return <div className={styles.index}>Hello World!</div>
  }
}
