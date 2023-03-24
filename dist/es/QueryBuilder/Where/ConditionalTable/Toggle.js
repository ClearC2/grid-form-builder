import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleButton from 'react-toggle-button';

var Toggle = /*#__PURE__*/function (_Component) {
  _inherits(Toggle, _Component);

  var _super = _createSuper(Toggle);

  function Toggle() {
    _classCallCheck(this, Toggle);

    return _super.apply(this, arguments);
  }

  _createClass(Toggle, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ToggleButton, {
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
}(Component);

_defineProperty(Toggle, "propTypes", {
  value: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  activeLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  inactiveLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
});

export default Toggle;