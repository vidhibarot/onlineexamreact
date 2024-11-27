import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import persistStore from 'redux-persist/es/persistStore'

import App from './App'
import store from './store'
import { HashRouter } from 'react-router-dom'
let persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
)

//On this code for store data on page refresh we use 
