import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import store from './store.js'
import App from './containers/app.jsx'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
