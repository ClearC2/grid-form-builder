"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.AggregationPicker = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _PickList = _interopRequireDefault(require("./PickList"));

var AggregationPicker =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(AggregationPicker, _Component);

  function AggregationPicker() {
    (0, _classCallCheck2.default)(this, AggregationPicker);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(AggregationPicker).apply(this, arguments));
  }

  (0, _createClass2.default)(AggregationPicker, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        style: {
          border: '1px solid darkgrey',
          margin: '3px'
        }
      }, _react.default.createElement("div", {
        style: {
          margin: '10px'
        }
      }, _react.default.createElement("div", null, _react.default.createElement("h3", null, this.props.title || 'Aggregations')), _react.default.createElement(_PickList.default, {
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
}(_react.Component);

exports.AggregationPicker = AggregationPicker;
(0, _defineProperty2.default)(AggregationPicker, "propTypes", {
  title: _propTypes.default.string,
  availableColumns: _propTypes.default.array.isRequired,
  selectedColumns: _propTypes.default.array.isRequired,
  onChange: _propTypes.default.func.isRequired,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string
});
var _default = AggregationPicker;
exports.default = _default;