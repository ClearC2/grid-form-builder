"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

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

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var ValidationErrorIcon = function ValidationErrorIcon(props) {
  var message = props.message,
      _props$color = props.color,
      color = _props$color === void 0 ? 'red' : _props$color,
      _props$type = props.type,
      type = _props$type === void 0 ? 'error' : _props$type;
  var id = (0, _react.useRef)((0, _utils.randomId)());
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-input__indicator gfb-validation-error-indicator"
  }, /*#__PURE__*/_react.default.createElement(_fa.FaExclamationTriangle, {
    id: id.current,
    "data-tip": true,
    "data-for": id.current,
    color: color
  }), message && /*#__PURE__*/_react.default.createElement(_Portal.default, {
    id: id.current
  }, /*#__PURE__*/_react.default.createElement(_reactTooltip.default, {
    id: id.current,
    type: type
  }, /*#__PURE__*/_react.default.createElement("span", null, message))));
};

ValidationErrorIcon.propTypes = {
  message: _propTypes.default.string,
  color: _propTypes.default.string,
  type: _propTypes.default.string
};
var _default = ValidationErrorIcon;
exports.default = _default;