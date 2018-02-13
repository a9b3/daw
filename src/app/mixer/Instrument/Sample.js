import Sound from 'mixer/Sound'

    const sound = new Sound()
    sound.output.connect(sequencer.tracks[0].channel.input)
    await sound.load(require('assets/song.mp3'))
    sound.play()

export default class Sample {
  sound = new Sound()

  play() {

  }
}
