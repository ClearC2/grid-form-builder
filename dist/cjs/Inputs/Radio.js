"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

/** @jsx jsx */
var Radio = function Radio(props) {
  var name = props.name,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      _props$keyword = props.keyword,
      keyword = _props$keyword === void 0 ? {} : _props$keyword,
      inline = props.inline,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required;
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
      indicators = _style$indicators === void 0 ? {} : _style$indicators;

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var _keyword$options = keyword.options,
      options = _keyword$options === void 0 ? [] : _keyword$options;
  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.value;
      var newvalue = clickedValue === value ? '' : clickedValue; // if clicked value is already active, blank out the value to turn off the radio

      onChange({
        target: {
          name: name,
          value: newvalue
        }
      });
    }
  }, [disabled, readonly, interactive, value, onChange, name]);
  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';

  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container';
  }

  var controlClass = 'gfb-input__control gfb-boxless-input';
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
  }, (0, _map.default)(options).call(options, function (option, i) {
    var checked = value && (option.value + '').toLowerCase() === (value + '').toLowerCase(); // the option value may be a number but the field have the value as a string

    var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (checked) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    return (0, _core.jsx)("label", {
      key: i,
      className: 'gfb-multi-input-label-wrapper ' + className,
      style: valueStyle,
      css: theme.options
    }, (0, _core.jsx)("input", {
      className: className,
      name: name,
      value: option.value,
      checked: checked,
      onClick: handleOnChange // this makes on change fire twice, which is not ideal, but it lets the user uncheck a radio, is this good? - JRA 01/09/2019
      ,
      onChange: handleOnChange,
      disabled: readonly || disabled || !interactive,
      autoFocus: autofocus,
      type: "radio",
      autoComplete: autoComplete,
      css: theme.value
    }), option.label ? option.label : option.value);
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

var _default = Radio;
exports.default = _default;
Radio.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  keyword: _propTypes.default.object,
  inline: _propTypes.default.bool,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool
};