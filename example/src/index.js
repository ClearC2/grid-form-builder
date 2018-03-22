import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Example from './Example'
import {initFormBuilderAjax} from '../../src/config'
import ajax from './ajax'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-select/dist/react-select.css'
import 'react-datetime/css/react-datetime.css'
import '../../styles/grid-form-builder.css'

import './Icons'

initFormBuilderAjax(config => { config.ajax = ajax })

render(
  (
    <Provider store={store}>
      <Example />
    </Provider>
  ),
  document.getElementById('app')
)
