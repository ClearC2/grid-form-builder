import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context3, _context4; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(source), !0)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
var portal;

var PortalTarget = /*#__PURE__*/function (_Component) {
  _inherits(PortalTarget, _Component);

  var _super = _createSuper(PortalTarget);

  function PortalTarget() {
    var _context;

    var _this;

    _classCallCheck(this, PortalTarget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, _concatInstanceProperty(_context = [this]).call(_context, args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      id: ''
    });

    _defineProperty(_assertThisInitialized(_this), "element", document.createElement('div'));

    _defineProperty(_assertThisInitialized(_this), "setStyles", function () {
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


        var cssText = _concatInstanceProperty(_context2 = "position: absolute;z-index: 10000;margin-left:".concat(offset.marginLeft, "px;margin-top:")).call(_context2, offset.marginTop, "px");

        _this.element.setAttribute('style', cssText);
      }

      return _objectSpread({}, style);
    });

    return _this;
  }

  _createClass(PortalTarget, [{
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
      return /*#__PURE__*/createPortal( /*#__PURE__*/React.createElement("div", {
        style: _objectSpread({}, this.setStyles()),
        className: className
      }, children), this.element);
    }
  }]);

  return PortalTarget;
}(Component);

_defineProperty(PortalTarget, "propTypes", {
  children: PropTypes.any,
  className: PropTypes.string,
  id: PropTypes.string,
  portalTarget: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
});

_defineProperty(PortalTarget, "defaultProps", {
  id: 'portal',

  /*
  * Renders directly off body tag, unless specified otherwise
  */
  portalTarget: 'body'
});

export default PortalTarget;