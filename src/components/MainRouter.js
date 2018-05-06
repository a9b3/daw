import { Provider } from 'mobx-react'
import React from 'react'
import { Route } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import appState from 'mobx/appState'
import Index from 'views/index'

export default function MainRouter() {
  return (
    <Provider {...appState}>
      <BrowserRouter>
        <Route path="/" exact component={Index} />
      </BrowserRouter>
    </Provider>
  )
}
