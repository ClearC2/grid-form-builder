import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
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
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // import Cleave from 'cleave.js/react'

import Cleave from '../Cleave'; // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020

import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';

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
      maxlength = _props$maxlength === void 0 ? 524288 : _props$maxlength,
      warning = props.warning,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? (props === null || props === void 0 ? void 0 : props['data-testid']) || (props === null || props === void 0 ? void 0 : props.name) : _props$dataTestid;
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

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var input = useRef();

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var handleOnFocus = useCallback(function () {
    setIsFocused(true);
  }, []);
  var handleOnBlur = useCallback(function () {
    setIsFocused(false);
  }, []);
  var handleOnChange = useCallback(function (e) {
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
        _setTimeout(function () {
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
  var isDisabled = readonly || disabled || !interactive;
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
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

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

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
      prefix: prefix,
      numeralDecimalMark: numeralDecimalMark,
      delimiter: delimiter,
      numeralDecimalScale: decimals
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
    maxLength: maxlength,
    "data-testid": testId
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

export default Number;
Number.propTypes = {
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
  maximum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minimum: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  decimals: PropTypes.number,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string,
  'data-testid': PropTypes.string
};