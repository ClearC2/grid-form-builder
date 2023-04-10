"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var portal;

var PortalTarget = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(PortalTarget, _Component);

  var _super = _createSuper(PortalTarget);

  function PortalTarget() {
    var _context;

    var _this;

    (0, _classCallCheck2.default)(this, PortalTarget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, (0, _concat.default)(_context = [this]).call(_context, args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      id: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "element", document.createElement('div'));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setStyles", function () {
      var _this$props$style = _this.props.style,
          style = _this$props$style === void 0 ? {} : _this$props$style;
      var offset = {};
      var target = document.getElementById(_this.props.id);
      /*
      * Finds target from DOM, sets portal under the target
      */

      if (_this.props.id && target) {
        var _context2;

        target = target.getBoundingClientRect();
        offset['marginLeft'] = target.x;
        offset['marginTop'] = target.top + target.height + window.pageYOffset + 1;
        /*
        * Allows minor adjustments at portal drop location, allows for minor changes on margin styling
        */

        if (style.portalLeft) {
          offset.marginLeft += style.portalLeft;
        }

        if (style.portalTop) {
          offset.marginTop += style.portalTop;
        } // eslint-disable-next-line


        var cssText = (0, _concat.default)(_context2 = "position: absolute;z-index: 10000;margin-left:".concat(offset.marginLeft, "px;margin-top:")).call(_context2, offset.marginTop, "px");

        _this.element.setAttribute('style', cssText);
      }

      return _objectSpread({}, style);
    });
    return _this;
  }

  (0, _createClass2.default)(PortalTarget, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var portalTarget = this.props.portalTarget;
      var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      this.element.style.cssText = 'position: absolute;z-index: 10000';
      this.element.id = id;
      portal = document.getElementsByTagName(portalTarget)[0];

      if (portal) {
        portal.prepend(this.element);
      }

      this.setState({
        id: id
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.portalTarget && !prevProps.portalTarget) {
        portal = document.getElementsByTagName(this.props.portalTarget)[0];
        portal.prepend(this.element);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      /*
      * Cleanup on DOM exit
      */
      portal.removeChild(this.element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          className = _this$props.className;
      return /*#__PURE__*/(0, _reactDom.createPortal)( /*#__PURE__*/_react.default.createElement("div", {
        style: _objectSpread({}, this.setStyles()),
        className: className
      }, children), this.element);
    }
  }]);
  return PortalTarget;
}(_react.Component);

(0, _defineProperty2.default)(PortalTarget, "propTypes", {
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  id: _propTypes.default.string,
  portalTarget: _propTypes.default.string,
  style: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
});
(0, _defineProperty2.default)(PortalTarget, "defaultProps", {
  id: 'portal',

  /*
  * Renders directly off body tag, unless specified otherwise
  */
  portalTarget: 'body'
});
var _default = PortalTarget;
exports.default = _default;