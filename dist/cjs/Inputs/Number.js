"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Cleave = _interopRequireDefault(require("../Cleave"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

/** @jsx jsx */
// import Cleave from 'cleave.js/react'
// switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
var Number = function Number(props) {
  var _context;

  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      autoComplete = props.autoComplete,
      _props$delimiter = props.delimiter,
      delimiter = _props$delimiter === void 0 ? ',' : _props$delimiter,
      _props$prefix = props.prefix,
      prefix = _props$prefix === void 0 ? '' : _props$prefix,
      _props$numeralDecimal = props.numeralDecimalMark,
      numeralDecimalMark = _props$numeralDecimal === void 0 ? '.' : _props$numeralDecimal,
      _props$maximum = props.maximum,
      maximum = _props$maximum === void 0 ? 9007199254740991 : _props$maximum,
      _props$minimum = props.minimum,
      minimum = _props$minimum === void 0 ? -9007199254740991 : _props$minimum,
      _props$decimals = props.decimals,
      decimals = _props$decimals === void 0 ? 0 : _props$decimals,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required,
      _props$maxlength = props.maxlength,
      maxlength = _props$maxlength === void 0 ? 524288 : _props$maxlength;
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

  var input = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var handleOnFocus = (0, _react.useCallback)(function () {
    setIsFocused(true);
  }, []);
  var handleOnBlur = (0, _react.useCallback)(function () {
    setIsFocused(false);
  }, []);
  var handleOnChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    if (input.current) {
      newValue = input.current.getRawValue();
    }

    if (prefix) newValue = newValue.replace(prefix, '');

    if (isNaN(+newValue) || +newValue > maximum || +newValue < minimum) {
      // if our value is not within our bounds, do not update the value
      newValue = value;

      if (input.current) {
        // if we have the ref of the cleave input, let's update its state back to a valid number so the user does not get confused
        (0, _setTimeout2.default)(function () {
          input.current.setState({
            value: newValue
          });
        }, 5); // the package has its own timeout in it which breaks the react lifecycle, so we need to play dirty too - JRA 01/15/2020
      }
    }

    onChange({
      target: {
        value: newValue,
        name: name
      }
    });
  }, [value, prefix, onChange, name, maximum, minimum]);
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && (0, _trim.default)(_context = value + '').call(_context).length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  var validationWarning;

  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationWarning = "Maximum character limit of ".concat(maxlength, " reached.");
  }

  var outerClass = 'gfb-input-outer';

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  return (0, _core.jsx)("div", {
    className: outerClass,
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
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, (0, _core.jsx)(_Cleave.default, {
    ref: input,
    options: {
      numeral: true,
      prefix: prefix,
      numeralDecimalMark: numeralDecimalMark,
      delimiter: delimiter,
      numeralDecimalScale: decimals
    },
    className: className,
    name: name,
    value: value,
    onChange: handleOnChange,
    disabled: readonly || disabled || !interactive,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    autoComplete: autoComplete,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationWarning && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationWarning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && validationError && (0, _core.jsx)("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

var _default = Number;
exports.default = _default;
Number.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  autoComplete: _propTypes.default.string,
  delimiter: _propTypes.default.string,
  prefix: _propTypes.default.string,
  numeralDecimalMark: _propTypes.default.string,
  maximum: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  minimum: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  decimals: _propTypes.default.number,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool,
  maxlength: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
};