import {setPortalNode} from 'c2-dialog'
import {initFormBuilderAjax} from '../../src'
import ajax from '../../example/src/ajax'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import store from '../../example/src/store'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import React from 'react'
import Sandbox from './Sandbox'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import '../../src/styles/grid-form-builder.css'

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
    <Sandbox {...props} />
  </DndProvider>
)

render()
