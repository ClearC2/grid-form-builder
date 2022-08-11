import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {setPortalNode} from 'c2-dialog'
import store from './store'
import Example from './Example'
import {initFormBuilderAjax} from '../../src/config'
import ajax from './ajax'

import HTML5Backend from 'react-dnd-html5-backend'
import {DndProvider} from 'react-dnd'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
// import '../../styles/react-datetime.css'
import '../../src/styles/grid-form-builder.css'

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

const HTML5BackendProvider = (props) => (
  <DndProvider backend={HTML5Backend}>
    <Example {...props} />
  </DndProvider>
)

render()
