import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {setPortalNode} from 'c2-dialog'
import store from './store'
import Example from './Example'
import {initFormBuilderAjax} from '../../src/config'
import ajax from './ajax'

import HTML5Backend from 'react-dnd-html5-backend'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import '../../styles/react-datetime.css'
import '../../styles/grid-form-builder.css'

import './Icons'

setPortalNode(document.getElementById('dialogs'))

initFormBuilderAjax(config => { config.ajax = ajax })

const render = (props = {}) => {
  ReactDOM.render(
    <Provider store={store}>
      <Example {...props} />
    </Provider>,
    document.getElementById('app')
  )
}

render()
