"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactToggleButton = _interopRequireDefault(require("react-toggle-button"));

var Toggle =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Toggle, _Component);

  function Toggle() {
    (0, _classCallCheck2.default)(this, Toggle);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Toggle).apply(this, arguments));
  }

  (0, _createClass2.default)(Toggle, [{
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactToggleButton.default, {
        activeLabel: this.props.activeLabel,
        inactiveLabel: this.props.inactiveLabel,
        value: this.props.value,
        onToggle: this.props.onToggle,
        activeLabelStyle: {
          color: '#FFFFFF'
        },
        inactiveLabelStyle: {
          color: '#FFFFFF'
        },
        colors: {
          activeThumb: {
            base: '#1e8fc6' // 'rgb(62,130,247)'

          },
          inactiveThumb: {
            base: '#1e8fc6' // 'rgb(62,130,247)'

          },
          active: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)'
          },
          inactive: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)'
          }
        }
      });
    }
  }]);
  return Toggle;
}(_react.Component);

(0, _defineProperty2.default)(Toggle, "propTypes", {
  value: _propTypes.default.bool.isRequired,
  onToggle: _propTypes.default.func.isRequired,
  activeLabel: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object]),
  inactiveLabel: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
});
var _default = Toggle;
exports.default = _default;