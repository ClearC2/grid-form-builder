import {Map, fromJS} from 'immutable'

export function createAction (type, ...argNames) {
  return function (...args) {
    let action = {type}
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}

export const SET_COMPONENT_LAYOUT = 'app/set-form-grid-layout/no-sync'
export const setComponentLayouts = createAction(SET_COMPONENT_LAYOUT, 'compName', 'layouts', 'overwrite')

export function reducer (state = Map(), action) {
  switch (action.type) {
    case SET_COMPONENT_LAYOUT: {
      let keyPath = Array.isArray(action.compName) ? action.compName : [action.compName]
      keyPath.push('layouts')
      const args = [
        keyPath,
        fromJS(action.layouts)
      ]

      return action.overwrite ? state.setIn(...args) : state.mergeDeepIn(...args)
    }

    default:
      return state
  }
}

reducer.key = 'form-layouts'
