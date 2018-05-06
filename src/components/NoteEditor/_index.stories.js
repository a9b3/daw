import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import React               from 'react'

import NoteEditor          from './index.js'

storiesOf('NoteEditor', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <NoteEditor />
  })
