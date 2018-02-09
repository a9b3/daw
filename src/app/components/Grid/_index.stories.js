import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'

import Grid                from './index.js'

storiesOf('Grid', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Grid />
  })
