import {Map} from 'immutable'
import {createStore, compose} from 'redux'
import {combineReducers} from 'redux-immutable'

const reducer = combineReducers({app: (s = Map()) => s})

const store = createStore(
  reducer,
  Map(),
  compose(
    window && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

export default store
