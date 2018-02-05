import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import { storiesOf }                from '@storybook/react'
import React                        from 'react'

import Switch                       from './index.js'

storiesOf('Switch', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Switch on={boolean('on', true)}>{text('children', 'Switch')}</Switch>
    )
  })
