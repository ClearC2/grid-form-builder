import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // import Cleave from 'cleave.js/react'

import Cleave from '../Cleave'; // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020

import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';

var Currency = function Currency(props) {
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
      prefix = _props$prefix === void 0 ? '$' : _props$prefix,
      _props$numeralDecimal = props.numeralDecimalMark,
      numeralDecimalMark = _props$numeralDecimal === void 0 ? '.' : _props$numeralDecimal,
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
    onChange({
      target: {
        value: newValue,
        name: name
      }
    });
  }, [prefix, onChange, name]);
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

  var isFirefox = navigator.userAgent.search('Firefox') > -1;
  var isDisabled = readonly || disabled || !interactive;
  return jsx("div", {
    className: outerClass,
    style: inputOuter,
    css: theme.inputOuter
  }, jsx("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, jsx("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, jsx(Cleave, {
    ref: input,
    options: {
      numeral: true,
      prefix: prefix,
      numeralDecimalMark: numeralDecimalMark,
      delimiter: delimiter
    },
    className: className,
    name: name,
    value: value,
    onChange: handleOnChange,
    disabled: isFirefox ? false : isDisabled,
    readOnly: isFirefox && isDisabled,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    autoComplete: autoComplete,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength + Math.ceil((value + '').length / 3)
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators
  }, validationWarning && jsx(ValidationErrorIcon, {
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
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};