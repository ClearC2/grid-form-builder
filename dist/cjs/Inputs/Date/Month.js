"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DateInput = _interopRequireDefault(require("./DateInput"));

var Month = function Month(props) {
  return /*#__PURE__*/_react.default.createElement(_DateInput.default, (0, _extends2.default)({}, props, {
    canPickDay: false
  }));
};

var _default = Month;
exports.default = _default;