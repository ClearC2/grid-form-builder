"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactDom = require("react-dom");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context3; (0, _forEach.default)(_context3 = ownKeys(Object(source), true)).call(_context3, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context4; (0, _forEach.default)(_context4 = ownKeys(Object(source))).call(_context4, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var portal;

var PortalTarget =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(PortalTarget, _Component);

  function PortalTarget() {
    var _getPrototypeOf2, _context;

    var _this;

    (0, _classCallCheck2.default)(this, PortalTarget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(PortalTarget)).call.apply(_getPrototypeOf2, (0, _concat.default)(_context = [this]).call(_context, args)));
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "state", {
      id: ''
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "element", document.createElement('div'));
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "setStyles", function () {
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
      return (0, _reactDom.createPortal)(_react.default.createElement("div", {
        style: _objectSpread({}, this.setStyles()),
        className: className
      }, children), this.element);
    }
  }]);
  return PortalTarget;
}(_react.Component);

(0, _defineProperty3.default)(PortalTarget, "propTypes", {
  children: _propTypes.default.any,
  className: _propTypes.default.string,
  id: _propTypes.default.string,
  portalTarget: _propTypes.default.string,
  style: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.func])
});
(0, _defineProperty3.default)(PortalTarget, "defaultProps", {
  id: 'portal',

  /*
  * Renders directly off body tag, unless specified otherwise
  */
  portalTarget: 'body'
});
var _default = PortalTarget;
exports.default = _default;