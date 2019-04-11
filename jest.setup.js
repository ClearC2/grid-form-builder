import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import {fromJS} from 'immutable'
import {createStore} from 'redux'
import {combineReducers} from 'redux-immutable'
import {reducer as formLayoutReducer} from './src/index'
import {render} from 'react-testing-library'
import {Provider} from 'react-redux'
import {DragDropContext} from 'react-dnd'
import TestBackend from 'react-dnd-test-backend'

const reducer = combineReducers({
  [formLayoutReducer.key]: formLayoutReducer
})

global.createStore = (initialState = {}) => createStore(
  reducer,
  fromJS(initialState)
)

global.render = (sut, {store} = {}) => { // sut = subject under test
  const contextHOC = DragDropContext(TestBackend)
  const Test = contextHOC(class extends React.Component {
    render () {
      return sut
    }
  })
  const result = render((
    <Provider store={store || global.createStore()}>
      <Test />
    </Provider>
  ))
  return {
    ...result,
    store
  }
}
