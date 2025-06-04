import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _Number$MIN_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/min-safe-integer";
import _Number$MAX_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/max-safe-integer";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _parseFloat from "@babel/runtime-corejs3/core-js-stable/parse-float";
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
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave'; // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
const Currency = props => {
  var _context;
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
    delimiter = ',',
    prefix = '$',
    numeralDecimalMark = '.',
    interactive = true,
    requiredWarning,
    style = {},
    required,
    maxlength = 524288,
    minimum = _Number$MIN_SAFE_INTEGER,
    maximum = _Number$MAX_SAFE_INTEGER,
    warning
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
  const input = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
  const handleOnChange = useCallback(e => {
    let {
      value: newValue
    } = e.target;
    if (input.current) {
      newValue = input.current.getRawValue();
    }
    if (prefix) newValue = newValue.replace(prefix, '');
    onChange({
      target: {
        value: newValue,
        name
      }
    });
  }, [prefix, onChange, name]);
  let className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  let controlClass = 'gfb-input__control';
  let validationError;
  if (required && requiredWarning && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }
  let validationWarning;
  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationWarning = `Maximum character limit of ${maxlength} reached.`;
  }
  let outerClass = 'gfb-input-outer';
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }
  if (minimum && (value + '').length && _parseFloat(value) < _parseFloat(minimum)) {
    validationError = `Minimum value required: $${minimum}`;
  }
  if (maximum && (value + '').length && _parseFloat(value) > _parseFloat(maximum)) {
    validationError = `Maximum value permitted: $${maximum}`;
  }
  const isDisabled = readonly || disabled || !interactive;
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
  }, jsx(Cleave, {
    ref: input,
    options: {
      numeral: true,
      prefix,
      numeralDecimalMark,
      delimiter
    },
    className: className,
    name: name,
    value: value,
    onChange: handleOnChange,
    readOnly: isDisabled,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    autoComplete: autoComplete,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    style: valueStyle,
    css: valueCSS,
    maxLength: maxlength + Math.ceil((value + '').length / 3),
    min: minimum || _Number$MIN_SAFE_INTEGER,
    max: maximum || _Number$MAX_SAFE_INTEGER
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
export default Currency;
Currency.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  delimiter: PropTypes.string,
  prefix: PropTypes.string,
  numeralDecimalMark: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  warning: PropTypes.string
};