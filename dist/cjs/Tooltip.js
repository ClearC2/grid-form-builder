"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Portal = _interopRequireDefault(require("./Portal"));

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

var PortalTooltip = function PortalTooltip(props) {
  var message = props.message,
      id = props.id;
  return message && id ? /*#__PURE__*/_react.default.createElement(_Portal.default, null, /*#__PURE__*/_react.default.createElement(_reactTooltip.default, {
    id: id
  }, /*#__PURE__*/_react.default.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: message
    }
  }))) : null;
};

PortalTooltip.propTypes = {
  message: _propTypes.default.string,
  id: _propTypes.default.string
};
var _default = PortalTooltip;
exports.default = _default;