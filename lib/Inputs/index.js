'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponents = exports.mapInputType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.initCustomFormComponents = initCustomFormComponents;

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('../utils');

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Typeahead = require('./Typeahead');

var _Typeahead2 = _interopRequireDefault(_Typeahead);

var _Multiselect = require('./Multiselect');

var _Multiselect2 = _interopRequireDefault(_Multiselect);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormComponents = {
  Input: _Input2.default,
  Select: _Select2.default,
  Textarea: _Textarea2.default,
  Typeahead: _Typeahead2.default,
  Multiselect: _Multiselect2.default
};

function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  exports.FormComponents = FormComponents = _extends({}, FormComponents, defs);
}

var mapInputType = exports.mapInputType = function mapInputType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input';
  var interactive = arguments[1];

  if (typeof type !== 'string') type = 'input';
  type = (0, _utils.uppercaseFirstLetter)(type);
  if (type === 'Richtextarea') {
    type = 'Richtextareaquill';
  }
  if (!interactive && type === 'Select') {
    type = 'ImportSelect';
  }
  if (FormComponents[type]) {
    type = FormComponents[type];
  } else {
    // console.warn(type, 'is not a valid field type. This is a noop and the field type will fall back to a normal input.') //eslint-disable-line
    type = FormComponents.Input;
  }
  return type;
};

exports.FormComponents = FormComponents;
exports.default = _core2.default;