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
export var ColumnPicker = /*#__PURE__*/function (_Component) {
  _inherits(ColumnPicker, _Component);

  var _super = _createSuper(ColumnPicker);

  function ColumnPicker() {
    _classCallCheck(this, ColumnPicker);

    return _super.apply(this, arguments);
  }

  _createClass(ColumnPicker, [{
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement("div", {
        style: {
          border: '1px solid #A0A0A0',
          margin: '3px'
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          margin: '10px'
        }
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h5", null, this.props.title || 'Report Columns')), /*#__PURE__*/React.createElement(PickList, {
        options: this.props.availableColumns,
        labelKey: this.props.labelKey || 'label',
        valueKey: this.props.valueKey || 'value',
        value: this.props.selectedColumns,
        onChange: this.props.onChange,
        height: this.props.columnPickerHeight || 200,
        leftPaneLabel: "Available"
      })));
    }
  }]);

  return ColumnPicker;
}(Component);

_defineProperty(ColumnPicker, "propTypes", {
  title: PropTypes.string,
  availableColumns: PropTypes.array.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  columnPickerHeight: PropTypes.number
});

export default ColumnPicker;