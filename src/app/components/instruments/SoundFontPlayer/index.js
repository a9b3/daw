import PropTypes from 'prop-types'
import React     from 'react'

import SoundFont from 'mixer/Instrument/SoundFont'

export default class SoundFontPlayer extends React.Component {
  static propTypes = {}

  state = {
    loading: false,
  }

  handleChange = event => {
    this.setState({ loading: true })
    const sf = new SoundFont()
    sf.load({ file: event.target.files[0] }).then(arraybuffer => {
      console.log(`ar`, arraybuffer)
      this.setState({ loading: false })
    })
  }

  render() {
    const { loading } = this.state
    return (
      <div>
        {loading && 'loading'}
        <input type="file" onChange={this.handleChange} />
      </div>
    )
  }
}
