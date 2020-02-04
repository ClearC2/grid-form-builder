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

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PickList from './PickList';
export var AggregationPicker =
/*#__PURE__*/
function (_Component) {
  _inherits(AggregationPicker, _Component);

  function AggregationPicker() {
    _classCallCheck(this, AggregationPicker);

    return _possibleConstructorReturn(this, _getPrototypeOf(AggregationPicker).apply(this, arguments));
  }

  _createClass(AggregationPicker, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: {
          border: '1px solid darkgrey',
          margin: '3px'
        }
      }, React.createElement("div", {
        style: {
          margin: '10px'
        }
      }, React.createElement("div", null, React.createElement("h3", null, this.props.title || 'Aggregations')), React.createElement(PickList, {
        options: this.props.availableColumns,
        labelKey: this.props.valueKey || 'value',
        valueKey: this.props.labelKey || 'label',
        value: this.props.selectedColumns,
        onChange: this.props.onChange,
        height: 200,
        leftPaneLabel: "Available"
      })));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
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

var _default = AggregationPicker;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(AggregationPicker, "AggregationPicker", "/root/repo/src/QueryBuilder/ReportBuilder/AggregationPicker.js");
  reactHotLoader.register(_default, "default", "/root/repo/src/QueryBuilder/ReportBuilder/AggregationPicker.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();