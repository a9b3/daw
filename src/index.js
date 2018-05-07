// react-hot-loader/patch has to be first
import 'react-hot-loader/patch'

import 'esayemm-styles'
import 'styles/global.scss'

import React            from 'react'
import { render }       from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider }     from 'react-redux'

import MainRouter       from 'components/MainRouter'
import configureStore   from 'redux/configureStore'

function renderRoot() {
  render(
    <AppContainer>
      <Provider store={configureStore()}>
        <MainRouter />
      </Provider>
    </AppContainer>,
    document.getElementById('mount'),
  )
}

function main() {
  renderRoot()

  if (module.hot) {
    module.hot.accept('styles/global.scss', () => {
      require('styles/global.scss')
    })
    module.hot.accept(renderRoot)
  }

  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
  }
}

main()
