import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PickList from './PickList';
export var ColumnPicker =
/*#__PURE__*/
function (_Component) {
  _inherits(ColumnPicker, _Component);

  function ColumnPicker() {
    _classCallCheck(this, ColumnPicker);

    return _possibleConstructorReturn(this, _getPrototypeOf(ColumnPicker).apply(this, arguments));
  }

  _createClass(ColumnPicker, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: {
          border: '1px solid #A0A0A0',
          margin: '3px'
        }
      }, React.createElement("div", {
        style: {
          margin: '10px'
        }
      }, React.createElement("div", null, React.createElement("h5", null, this.props.title || 'Report Columns')), React.createElement(PickList, {
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

<<<<<<< HEAD:lib/QueryBuilder/ReportBuilder/ColumnPicker.js
var _default = ColumnPicker;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ColumnPicker, "ColumnPicker", "C:\\Development\\Projects\\grid-form-builder\\src\\QueryBuilder\\ReportBuilder\\ColumnPicker.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\QueryBuilder\\ReportBuilder\\ColumnPicker.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
=======
export default ColumnPicker;
>>>>>>> aa68762e12dc6f3f09855b63bf3638f1d4b23f1b:dist/es/QueryBuilder/ReportBuilder/ColumnPicker.js
