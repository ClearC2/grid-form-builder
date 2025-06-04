import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PickList from './PickList';
export class AggregationPicker extends Component {
  render() {
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
}
_defineProperty(AggregationPicker, "propTypes", {
  title: PropTypes.string,
  availableColumns: PropTypes.array.isRequired,
  selectedColumns: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string
});
export default AggregationPicker;