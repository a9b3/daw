import styles    from './NoteEditor.scss'
import cx        from 'classnames'
import PropTypes from 'prop-types'
import React     from 'react'

export default class NoteEditor extends React.Component {
  static propTypes = {
    octaveRange: PropTypes.any,
  }

  renderRows = () => {}

  renderKeys = () => {
    const nodes = []
    for (let i = 0; i < 12; i++) {
      nodes.push(<div key={i} className={styles.key} />)
    }

    return nodes
  }

  renderOctaves = () => {
    const { octaveRange } = this.props
    const nodes = []
    for (let i = octaveRange[1]; i >= octaveRange[0]; i--) {
      nodes.push(<div key={i}>{this.renderKeys()}</div>)
    }

    return nodes
  }

  render() {
    const {
      octaveRange, // eslint-disable-line
      ...rest
    } = this.props

    return (
      <div className={cx(styles['note-editor'], rest.className)}>
        {this.renderOctaves()}
      </div>
    )
  }
}
