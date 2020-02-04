"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DateInput = _interopRequireDefault(require("./DateInput"));

var DateTime = function DateTime(props) {
  return _react.default.createElement(_DateInput.default, (0, _extends2.default)({}, props, {
    timePicker: true
  }));
};

var _default = DateTime;
exports.default = _default;