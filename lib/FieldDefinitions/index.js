'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponents = exports.mapInputType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.initCustomFormComponents = initCustomFormComponents;

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormComponents = {

  Input: _Input2.default
};

function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  exports.FormComponents = FormComponents = _extends({}, FormComponents, defs);
}

var mapInputType = exports.mapInputType = function mapInputType(type) {
  if (typeof type !== 'string') return null;
  type = (0, _utils.uppercaseFirstLetter)(type);
  type = FormComponents[type] || null;
  return type;
};

exports.FormComponents = FormComponents;