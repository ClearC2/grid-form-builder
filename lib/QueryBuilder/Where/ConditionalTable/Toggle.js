import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';

var Toggle =
/*#__PURE__*/
function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle() {
    _classCallCheck(this, Toggle);

    return _possibleConstructorReturn(this, _getPrototypeOf(Toggle).apply(this, arguments));
  }

  _createClass(Toggle, [{
    key: "render",
    value: function render() {
      return React.createElement(ToggleButton, {
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Toggle;
}(Component);

_defineProperty(Toggle, "propTypes", {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inactiveLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
});

var _default = Toggle;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Toggle, "Toggle", "C:\\Development\\Projects\\grid-form-builder\\src\\QueryBuilder\\Where\\ConditionalTable\\Toggle.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\QueryBuilder\\Where\\ConditionalTable\\Toggle.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();