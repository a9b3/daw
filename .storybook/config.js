import { configure } from '@storybook/react'

// import global styles here
// import '../example/styles/index.scss'
// import '../src/variables.css'

function loadStories() {
  const req = require.context('../src', true, /\.stories\.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
