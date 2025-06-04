import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _parseFloat from "@babel/runtime-corejs3/core-js-stable/parse-float";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
const Percentage = props => {
  var _context2;
  const {
    name,
    value = '',
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    decimals = 0,
    maxlength = 524288,
    warning,
    maximum = 100,
    minimum = 0
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style;
  const {
    theme
  } = useTheme();
  const formatValue = val => {
    const num = _parseFloat(val);
    if (isNaN(num)) return '';
    return num.toFixed(decimals);
  };
  const [isFocused, setIsFocused] = useState(false);
  const [formattedValue, setFormattedValue] = useState(formatValue(value));
  useEffect(() => {
    if (!isFocused) {
      setFormattedValue(formatValue(value));
    }
  }, [value, decimals, isFocused]); //eslint-disable-line

  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
    const num = _parseFloat(formattedValue);
    if (!isNaN(num)) {
      const formatted = num.toFixed(decimals);
      setFormattedValue(formatted);
      onChange({
        target: {
          value: formatted,
          name
        }
      });
    }
  }, [formattedValue, decimals, name, onChange]);
  const handleOnChange = useCallback(e => {
    var _context;
    const newValue = _trimInstanceProperty(_context = e.target.value.replace('%', '')).call(_context);
    const parts = newValue.split('.');
    const decimalPart = parts[1] || '';
    if (decimals && decimalPart.length > decimals) return;
    const num = _parseFloat(newValue);
    if (newValue === '' || newValue === '.' || isNaN(num)) {
      setFormattedValue(newValue);
      onChange({
        target: {
          value: '',
          name
        }
      });
      return;
    }
    if (num < minimum || num > maximum) {
      return;
    }
    setFormattedValue(newValue);
    onChange({
      target: {
        value: newValue,
        name
      }
    });
  }, [decimals, name, onChange, minimum, maximum]);
  const isDisabled = readonly || disabled || !interactive;
  let className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  let controlClass = 'gfb-input__control';
  let validationError;
  if (required && requiredWarning && _trimInstanceProperty(_context2 = formattedValue + '').call(_context2).length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }
  let validationWarning;
  if (maxlength && (formattedValue + '').length && (formattedValue + '').length >= maxlength) {
    validationWarning = `Maximum character limit of ${maxlength} reached.`;
  }
  if (maximum && _parseFloat(formattedValue) && _parseFloat(formattedValue) > maximum) {
    validationError = `Maximum value of ${maximum} reached.`;
  }
  let outerClass = 'gfb-input-outer';
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }
  const inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);
  const inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);
  const inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);
  const valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);
  const valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);
  const indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);
  return jsx("div", {
    className: outerClass,
    style: inputOuter,
    css: inputOuterCSS
  }, jsx("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: inputInnerCSS
  }, jsx("div", {
    className: controlClass,
    style: inputControl,
    css: inputControlCSS
  }, jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: valueContainerCSS
  }, jsx("input", {
    className: className,
    name: name,
    value: !isFocused && (formattedValue + '').length ? formattedValue + '%' : formattedValue,
    onChange: handleOnChange,
    readOnly: isDisabled,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    autoComplete: autoComplete,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    type: "text",
    style: valueStyle,
    css: valueCSS,
    maxLength: maxlength
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
  }, warning && !validationError && jsx(ValidationErrorIcon, {
    message: warning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && jsx(ValidationErrorIcon, {
    message: validationWarning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && validationError && jsx("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};
export default Percentage;
Percentage.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  decimals: PropTypes.number,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.number,
  maximum: PropTypes.number,
  minimum: PropTypes.number
};