"use strict";

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _immutable = require("immutable");

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

var _utils = require("../../utils");

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

var _excluded = ["name", "required", "style", "tooltips"];

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var InputPerformanceOptimizer = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(InputPerformanceOptimizer, _Component);

  var _super = _createSuper(InputPerformanceOptimizer);

  function InputPerformanceOptimizer() {
    (0, _classCallCheck2.default)(this, InputPerformanceOptimizer);
    return _super.apply(this, arguments);
  }

  (0, _createClass2.default)(InputPerformanceOptimizer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(p) {
      var _this$props = this.props,
          config = _this$props.config,
          values = (0, _values.default)(_this$props),
          value = _this$props.value;
      var type = typeof config.type === 'string' && config.type.toLowerCase() || 'input';

      if (!values.equals((0, _values.default)(p)) && value === p.value) {
        var _context;

        // if the values object is the thing changing but it isn't the value for this field
        if ((0, _indexOf.default)(_context = ['checkbox', 'colorpicker', 'currency', 'date', 'datetime', 'email', 'header', 'icon', 'input', 'listselect', 'metadata', 'month', 'multicheckbox', 'multiselect', 'number', 'percentage', 'phone', 'radio', 'richtextarea', 'select', 'textarea', 'time', 'conditionalinput']).call(_context, type) > -1 || // let typeaheads update and any custom components update if the entire form values object changes, don't update the components if they are in this list and all that changes is the form values
        config.typeahead && !(0, _filter.default)(config.typeahead) && !config.typeahead.fieldvalue // if it is a typeahead but doesn't have filters or use a fieldvalue as a key, it doesn't care either
        ) {
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

(0, _defineProperty2.default)(InputPerformanceOptimizer, "propTypes", {
  config: _propTypes.default.object,
  values: _propTypes.default.object,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool])
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
      interactive = props.interactive,
      device = props.device;
  var name = config.name,
      required = config.required,
      _config$style = config.style,
      style = _config$style === void 0 ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === void 0 ? {} : _config$tooltips,
      other = (0, _objectWithoutProperties2.default)(config, _excluded);
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
  }), /*#__PURE__*/(0, _react.cloneElement)(children, _objectSpread(_objectSpread({
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
  }, other), {}, {
    device: device
  })));
};

var _default = InputPerformanceOptimizer;
exports.default = _default;
InputContainer.propTypes = {
  children: _propTypes.default.oneOfType([_propTypes.default.node, _propTypes.default.array]),
  config: _propTypes.default.object,
  values: _propTypes.default.instanceOf(_immutable.Map),
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  onChange: _propTypes.default.func,
  requiredWarning: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  handleRTEImageClick: _propTypes.default.func,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  device: _propTypes.default.object
};