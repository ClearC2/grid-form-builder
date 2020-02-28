"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Select = _interopRequireDefault(require("./Select"));

var _NativeSelect = _interopRequireDefault(require("./NativeSelect"));

var Container = function Container(props) {
  var native = props.native;
  return native ? _react.default.createElement(_NativeSelect.default, props) : _react.default.createElement(_Select.default, props);
};

Container.propTypes = {
  native: _propTypes.default.bool
};
var _default = Container;
exports.default = _default;