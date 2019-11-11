'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _FormBuilder = require('./FormBuilder');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var InputContainer = function InputContainer(props) {
  var children = props.children,
      config = props.config,
      handleAnywhereClick = props.handleAnywhereClick,
      index = props.index,
      rest = _objectWithoutProperties(props, ['children', 'config', 'handleAnywhereClick', 'index']);

  var draggable = props.draggable,
      readonly = props.readonly;

  var _useContext = (0, _react.useContext)(_FormBuilder.FormValueContext),
      _useContext2 = _slicedToArray(_useContext, 1),
      formValues = _useContext2[0];

  var onGridElementClick = (0, _react.useCallback)(function (config, e) {
    config.index = index;
    handleAnywhereClick(config, e);
  }, [handleAnywhereClick, index]);
  if (draggable || readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true;
  }
  return (0, _react.cloneElement)(children, _extends({}, rest, { config: config, formValues: formValues, handleAnywhereClick: onGridElementClick }));
};

exports.default = InputContainer;