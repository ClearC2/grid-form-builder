import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {setPortalNode} from 'c2-dialog'
import store from './store'
import Example from './Example'
import {initFormBuilderAjax} from '../../src/config'
import ajax from './ajax'

import HTML5Backend from 'react-dnd-html5-backend'
import {DragDropContext} from 'react-dnd'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-datetime/css/react-datetime.css'
import '../../styles/grid-form-builder.css'

import './Icons'

setPortalNode(document.getElementById('dialogs'))

initFormBuilderAjax(config => { config.ajax = ajax })

const render = (props = {}) => {
  ReactDOM.render(
    <Provider store={store}>
      <HTML5BackendProvider {...props} />
    </Provider>,
    document.getElementById('app')
  )
}

const HTML5BackendProvider = DragDropContext(HTML5Backend)(Example)
// documentation of react dnd, context can only be applied once
// (it seems hot reloading counts as multiple), and should be done top level - JRA 1/23/2018

render()
