"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _DateInput = _interopRequireDefault(require("./DateInput"));

var Date = function Date(props) {
  return /*#__PURE__*/_react.default.createElement(_DateInput.default, props);
};

var _default = Date;
exports.default = _default;