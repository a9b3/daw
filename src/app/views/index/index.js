import styles               from './styles.scss'
import { inject, observer } from 'mobx-react'
import React                from 'react'

import { Mixer, Sound }     from 'app/mixer'

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
  render() {
    const { mixer } = this.props
    console.log(this.props.mixer.value)
    return <div className={styles.index}>hi</div>
  }
}
