import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PickList from './PickList';
export class ColumnPicker extends Component {
  render() {
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
}
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