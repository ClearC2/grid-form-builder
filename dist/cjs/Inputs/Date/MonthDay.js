"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DateInput = _interopRequireDefault(require("./DateInput"));

var Monthday = function Monthday(props) {
  var _props$format = props.format,
      format = _props$format === void 0 ? 'MM/DD' : _props$format;
  return /*#__PURE__*/_react.default.createElement(_DateInput.default, (0, _extends2.default)({}, props, {
    canPickYear: false,
    format: format
  }));
};

Monthday.propTypes = {
  format: _propTypes.default.string
};
var _default = Monthday;
exports.default = _default;