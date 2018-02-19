import audioContext from 'mixer/audioContext'

export default class Metronome {
  output = audioContext.createGain()

  constructor() {
    this.output.connect(audioContext.destination)
  }

  handler = ({ currentTick, ticksPerWholeNote, nextTickTime }) => {
    if (currentTick % (ticksPerWholeNote * 4) === 0) {
      const osc = audioContext.createOscillator()
      osc.frequency.setTargetAtTime(440, audioContext.currentTime, 0)
      osc.start(nextTickTime)
      osc.stop(nextTickTime + 0.05)
      osc.connect(this.output)
      this.output.gain.setTargetAtTime(0.6, audioContext.currentTime, 0)
    } else if (currentTick % ticksPerWholeNote === 0) {
      const osc = audioContext.createOscillator()
      osc.frequency.setTargetAtTime(220, audioContext.currentTime, 0)
      osc.start(nextTickTime)
      osc.stop(nextTickTime + 0.05)
      osc.connect(this.output)
      this.output.gain.setTargetAtTime(0.2, audioContext.currentTime, 0)
    }
  }
}
