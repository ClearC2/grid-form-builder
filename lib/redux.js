import { Map, fromJS } from 'immutable';

function createAction(type) {
  for (var _len = arguments.length, argNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    argNames[_key - 1] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    var action = { type: type };
    argNames.forEach(function (arg, index) {
      action[argNames[index]] = args[index];
    });
    return action;
  };
}

export var SET_FORM_BUILDER_LAYOUT = 'app/set-form-grid-layout/no-sync';
export var setComponentLayouts = createAction(SET_FORM_BUILDER_LAYOUT, 'compName', 'layouts', 'overwrite');

export default function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map();
  var action = arguments[1];

  switch (action.type) {
    case SET_FORM_BUILDER_LAYOUT:
      {
        var keyPath = Array.isArray(action.compName) ? action.compName : [action.compName];
        keyPath.push('layouts');
        var args = [keyPath, fromJS(action.layouts)];

        return action.overwrite ? state.setIn.apply(state, args) : state.mergeDeepIn.apply(state, args);
      }

    default:
      return state;
  }
}

reducer.key = 'form-layouts';