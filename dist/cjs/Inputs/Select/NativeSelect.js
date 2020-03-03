"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ValidationErrorIcon = _interopRequireDefault(require("../../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

var _react = require("react");

var _fa = require("react-icons/fa");

require("../../styles/native-select.css");

/** @jsx jsx */
var _window = window,
    _window$device = _window.device,
    device = _window$device === void 0 ? {
  cordova: false,
  model: 'browser',
  platform: 'browser',
  uuid: 'browser',
  version: 'browser'
} : _window$device;

var NativeSelect = function NativeSelect(props) {
  var _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      tabIndex = props.tabIndex,
      disabled = props.disabled,
      readonly = props.readonly,
      name = props.name,
      _props$keyword = props.keyword,
      keyword = _props$keyword === void 0 ? {} : _props$keyword,
      requiredWarning = props.requiredWarning,
      required = props.required,
      onChange = props.onChange,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
  var _style$value = style.value,
      valueStyle = _style$value === void 0 ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === void 0 ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === void 0 ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === void 0 ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === void 0 ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === void 0 ? {} : _style$indicators,
      _style$options = style.options,
      optionsStyle = _style$options === void 0 ? {} : _style$options;

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var _theme$value = theme.value,
      valueTheme = _theme$value === void 0 ? {} : _theme$value,
      _theme$options = theme.options,
      optionsTheme = _theme$options === void 0 ? {} : _theme$options;

  var _useState = (0, _react.useState)(keyword.options || []),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      options = _useState2[0];

  var platform = device.platform;
  var handleOnChange = (0, _react.useCallback)(function (e) {
    var value = e.target.value;
    onChange({
      target: {
        value: value,
        name: name
      }
    });
  }, [onChange, name]);
  var className = 'gfb-input__single-value gfb-input__input gfb-select-webkit-none';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return (0, _core.jsx)("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: theme.inputOuter
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, (0, _core.jsx)("div", {
    className: valueContainerClassName,
    style: valueContainer,
    css: theme.valueContainer
  }, (0, _core.jsx)("select", {
    className: className,
    onChange: handleOnChange,
    style: valueStyle,
    css: valueTheme,
    disabled: readonly || disabled || !interactive,
    tabIndex: tabIndex,
    value: value
  }, (0, _core.jsx)("option", {
    name: name,
    value: "",
    style: optionsStyle,
    css: optionsTheme
  }), (0, _map.default)(options).call(options, function (option, i) {
    return (0, _core.jsx)("option", {
      key: i,
      name: name,
      value: option.value,
      style: optionsStyle,
      css: optionsTheme
    }, option.label ? option.label : option.value);
  }))), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, (0, _core.jsx)("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator gfb-nat-select-separator"
  }), (0, _core.jsx)(_fa.FaChevronDown, {
    className: platform === 'ios' ? 'gfb-native-select-ios-down-indicator' : platform === 'android' ? 'gfb-native-select-android-down-indicator' : 'gfb-native-select-web-down-indicator'
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

NativeSelect.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  keyword: _propTypes.default.object,
  tabIndex: _propTypes.default.number,
  allowcreate: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  requiredWarning: _propTypes.default.bool,
  required: _propTypes.default.bool,
  values: _propTypes.default.object,
  persist: _propTypes.default.bool,
  onKeyDown: _propTypes.default.func,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  style: _propTypes.default.object,
  isClearable: _propTypes.default.bool
};
var _default = NativeSelect;
exports.default = _default;