// react-hot-loader/patch has to be first
import 'react-hot-loader/patch'
import 'styles/index.scss'

import React            from 'react'
import { render }       from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import MainRouter       from 'app/components/MainRouter'

function renderRoot() {
  render(
    <AppContainer>
      <MainRouter />
    </AppContainer>,
    document.getElementById('mount'),
  )
}

function main() {
  renderRoot()

  if (module.hot) {
    module.hot.accept('styles/index.scss', () => {
      require('styles/index.scss')
    })
    module.hot.accept(() => {
      renderRoot()
    })
  }

  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
  }
}

main()
