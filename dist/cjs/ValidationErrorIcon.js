"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Portal = _interopRequireDefault(require("./Portal"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var _fa = require("react-icons/fa");

var _utils = require("./utils");

var ValidationErrorIcon = function ValidationErrorIcon(props) {
  var message = props.message;
  var id = (0, _react.useRef)((0, _utils.randomId)());
  return _react.default.createElement("div", {
    className: "gfb-input__indicator gfb-validation-error-indicator"
  }, _react.default.createElement(_fa.FaExclamationTriangle, {
    id: id.current,
    "data-tip": true,
    "data-for": id.current,
    color: "red"
  }), message && _react.default.createElement(_Portal.default, {
    id: id.current
  }, _react.default.createElement(_reactTooltip.default, {
    id: id.current,
    type: "error"
  }, _react.default.createElement("span", null, message))));
};

ValidationErrorIcon.propTypes = {
  message: _propTypes.default.string
};
var _default = ValidationErrorIcon;
exports.default = _default;