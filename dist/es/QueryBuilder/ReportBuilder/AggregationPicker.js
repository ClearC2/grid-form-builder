import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PickList from './PickList';
export var AggregationPicker = /*#__PURE__*/function (_Component) {
  _inherits(AggregationPicker, _Component);

  var _super = _createSuper(AggregationPicker);

  function AggregationPicker() {
    _classCallCheck(this, AggregationPicker);

    return _super.apply(this, arguments);
  }

  _createClass(AggregationPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          border: '1px solid darkgrey',
          margin: '3px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          margin: '10px'
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", null, this.props.title || 'Aggregations')), /*#__PURE__*/React.createElement(PickList, {
        options: this.props.availableColumns,
        labelKey: this.props.valueKey || 'value',
        valueKey: this.props.labelKey || 'label',
        value: this.props.selectedColumns,
        onChange: this.props.onChange,
        height: 200,
        leftPaneLabel: "Available"
      })));
    }
  }]);

  return AggregationPicker;
}(Component);

_defineProperty(AggregationPicker, "propTypes", {
  title: PropTypes.string,
  availableColumns: PropTypes.array.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string
});

export default AggregationPicker;