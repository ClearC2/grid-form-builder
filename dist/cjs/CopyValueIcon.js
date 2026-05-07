"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

var CopyValueIcon = function CopyValueIcon(props) {
  var tooltipId = props.tooltipId,
      _props$onClick = props.onClick,
      onClick = _props$onClick === void 0 ? function () {
    return null;
  } : _props$onClick;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "copy-input-value-btn gfb-input__indicator",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "copy-input-value-btn btn",
    style: {
      border: '1px solid #555555',
      padding: 2
    },
    "data-tip": "Copy Value",
    "data-for": tooltipId,
    onClick: onClick
  }, /*#__PURE__*/_react.default.createElement(_fa.FaCopy, {
    color: "#555555"
  })));
};

CopyValueIcon.propTypes = {
  tooltipId: _propTypes.default.string,
  onClick: _propTypes.default.func
};
var _default = CopyValueIcon;
exports.default = _default;