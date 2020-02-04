"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

var _utils = require("../../utils");

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var InputPerformanceOptimizer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(InputPerformanceOptimizer, _Component);

  function InputPerformanceOptimizer() {
    (0, _classCallCheck2.default)(this, InputPerformanceOptimizer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(InputPerformanceOptimizer).apply(this, arguments));
  }

  (0, _createClass2.default)(InputPerformanceOptimizer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(p) {
      var _this$props = this.props,
          config = _this$props.config,
          values = (0, _values.default)(_this$props),
          value = _this$props.value;
      var type = typeof config.type === 'string' && config.type.toLowerCase() || 'input';

      if (type !== 'typeahead') {
        if (!values.equals((0, _values.default)(p)) && value === p.value) {
          // if this is not a typeahead and its own value hasn't changed, don't rerender due to form values changing - JRA 01/24/2020
          return false;
        }
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      return (0, _core.jsx)(InputContainer, this.props);
    }
  }]);
  return InputPerformanceOptimizer;
}(_react.Component);

(0, _defineProperty3.default)(InputPerformanceOptimizer, "propTypes", {
  config: _propTypes.default.object,
  values: _propTypes.default.object,
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string, _propTypes.default.number])
});

var InputContainer = function InputContainer(props) {
  var children = props.children,
      config = props.config,
      values = (0, _values.default)(props),
      value = props.value,
      onChange = props.onChange,
      requiredWarning = props.requiredWarning,
      tabIndex = props.tabIndex,
      draggable = props.draggable,
      dateFormat = props.dateFormat,
      dateTimeFormat = props.dateTimeFormat,
      timeFormat = props.timeFormat,
      handleRTEImageClick = props.handleRTEImageClick,
      autoComplete = props.autoComplete,
      interactive = props.interactive;
  var name = config.name,
      required = config.required,
      _config$style = config.style,
      style = _config$style === void 0 ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === void 0 ? {} : _config$tooltips,
      other = (0, _objectWithoutProperties2.default)(config, ["name", "required", "style", "tooltips"]);
  var inputTooltip = tooltips.input;
  var _style$cellInput = style.cellInput,
      cellInput = _style$cellInput === void 0 ? {} : _style$cellInput;
  var inputId = (0, _react.useRef)((0, _utils.randomId)());

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  return (0, _core.jsx)("div", {
    className: "gfb-inner-cell-input",
    style: cellInput,
    "data-tip": true,
    "data-for": inputId.current,
    css: theme.cellInput
  }, (0, _core.jsx)(_Tooltip.default, {
    id: inputId.current,
    message: inputTooltip
  }), (0, _react.cloneElement)(children, _objectSpread({
    requiredWarning: requiredWarning,
    tabIndex: tabIndex,
    draggable: draggable,
    name: name,
    values: values,
    value: value,
    onChange: onChange,
    dateFormat: dateFormat,
    dateTimeFormat: dateTimeFormat,
    timeFormat: timeFormat,
    handleRTEImageClick: handleRTEImageClick,
    autoComplete: autoComplete,
    interactive: interactive,
    required: required,
    style: style
  }, other)));
};

var _default = InputPerformanceOptimizer;
exports.default = _default;
InputContainer.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array]),
  config: _propTypes.default.object,
  values: _propTypes.default.instanceOf(_immutable.Map),
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string, _propTypes.default.number]),
  onChange: _propTypes.default.func,
  requiredWarning: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  handleRTEImageClick: _propTypes.default.func,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool
};