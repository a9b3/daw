import { withKnobs, text, number } from '@storybook/addon-knobs'
import { storiesOf }               from '@storybook/react'
import React                       from 'react'

import Grid                        from './index.js'

export default class ExampleGrid extends React.Component {
  static propTypes = {}

  render() {
    return (
      <Grid
        renderCell={(i, j) => (
          <div
            style={{ border: '1px solid black', width: '3em', height: '3em' }}
          >{`${i}, ${j}`}</div>
        )}
        rows={number('rows', 10)}
        columns={number('columns', 10)}
      />
    )
  }
}

storiesOf('Grid', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <ExampleGrid />
  })
