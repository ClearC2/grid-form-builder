'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DateInput = require('./DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Date = function Date(props) {
  return _react2.default.createElement(_DateInput2.default, _extends({}, props, { dateFormat: 'M/D/YYYY' }));
};

exports.default = Date;