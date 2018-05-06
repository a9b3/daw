import { configure } from '@storybook/react'

// import global styles here
import '../src/styles/global.scss'

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
