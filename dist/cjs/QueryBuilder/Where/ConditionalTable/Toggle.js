"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactToggleButton = _interopRequireDefault(require("react-toggle-button"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Toggle = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(Toggle, _Component);

  var _super = _createSuper(Toggle);

  function Toggle() {
    (0, _classCallCheck2.default)(this, Toggle);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(Toggle, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_reactToggleButton.default, {
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