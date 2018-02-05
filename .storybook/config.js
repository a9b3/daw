import { configure } from '@storybook/react'

// import global styles here
import '../src/styles/index.scss'
import '../src/styles/shared.css'

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
