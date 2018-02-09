import { sum }   from 'lodash'
import PropTypes from 'prop-types'
import React     from 'react'

function calculateAverage(DOMNodes) {
  return sum(DOMNodes.map(n => n.offsetHeight)) / DOMNodes.length
}

function calculateSpacers(average, total, currentRange) {
  return {
    top: Math.abs(0 - currentRange[0]) * average,
    bottom: Math.abs(total - currentRange[1]) * average,
  }
}

export default class VerticalList extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.any).isRequired,
    renderRow: PropTypes.func.isRequired,
  }

  currentRange = [0, 10]
  cache = {}
  avgHeight = 0

  state = {
    spacingTop: 0,
    spacingBottom: 0,
  }

  componentDidMount() {
    this.avgHeight = calculateAverage(Object.values(this.cache))
    const { top, bottom } = calculateSpacers(
      this.avgHeight,
      this.props.data.length,
      this.currentRange,
    )
    this.setState({
      spacingTop: top,
      spacingBottom: bottom,
    })
  }

  renderInView = () => {
    const { data, renderRow } = this.props
    const start = this.currentRange[0]
    const end = this.currentRange[1]
    const nodes = []
    for (let i = start; i < end; i++) {
      const node = React.cloneElement(renderRow(data[i]), {
        ref: el => (this.cache[i] = el),
      })
      nodes.push(node)
    }
    return nodes
  }

  render() {
    const { data, renderRow } = this.props
    const { spacingTop, spacingBottom } = this.state
    return (
      <div style={{ overflow: 'auto' }}>
        <div style={{ height: spacingTop }} />
        {this.renderInView()}
        <div style={{ height: spacingBottom }} />
      </div>
    )
  }
}
