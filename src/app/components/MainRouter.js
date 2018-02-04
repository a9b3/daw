import React             from 'react'
import { Route }         from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import Index             from 'app/views/index'

export default function MainRouter() {
  return <BrowserRouter>
    <Route path='/' exact component={Index} />
  </BrowserRouter>
}
