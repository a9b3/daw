import { withKnobs, text } from '@storybook/addon-knobs'
import { storiesOf }       from '@storybook/react'
import React               from 'react'

import SoundFontPlayer     from './index.js'
import SoundFont           from 'mixer/Instrument/SoundFont'

storiesOf('SoundFontPlayer', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <SoundFontPlayer soundFont={new SoundFont()} />
  })
