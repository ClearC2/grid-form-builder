import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context3; _forEachInstanceProperty(_context3 = ownKeys(Object(source), true)).call(_context3, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context4; _forEachInstanceProperty(_context4 = ownKeys(Object(source))).call(_context4, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
var portal;

var PortalTarget =
/*#__PURE__*/
function (_Component) {
  _inherits(PortalTarget, _Component);

  function PortalTarget() {
    var _getPrototypeOf2, _context;

    var _this;

    _classCallCheck(this, PortalTarget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PortalTarget)).call.apply(_getPrototypeOf2, _concatInstanceProperty(_context = [this]).call(_context, args)));

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
      return createPortal(React.createElement("div", {
        style: _objectSpread({}, this.setStyles()),
        className: className
      }, children), this.element);
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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

var _default = PortalTarget;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(portal, "portal", "/Users/davidadams/code/grid-form-builder/src/Portal.js");
  reactHotLoader.register(PortalTarget, "PortalTarget", "/Users/davidadams/code/grid-form-builder/src/Portal.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/Portal.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();