import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Example from './Example'

render(
  (
    <Provider store={store}>
      <Example />
    </Provider>
  ),
  document.getElementById('app')
)
