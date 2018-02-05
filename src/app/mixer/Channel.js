import invariant    from 'invariant'

import audioContext from './audioContext'

export default class Channel {
  input = audioContext.createGain()
  panner = audioContext.createPanner()
  output = audioContext.createGain()

  constructor({ outputSource }) {
    this.input.connect(this.panner)
    this.panner.connect(this.output)
    this.output.connect(outputSource)
  }

  insert(node) {
    invariant(
      node instanceof AudioNode,
      `Channel.insert: node provided must be AudioNode`,
    )

    node.connect(this.input)
  }
}
