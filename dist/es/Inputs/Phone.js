import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types'; // import Cleave from 'cleave.js/react'

import Cleave from '../Cleave'; // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020

import 'cleave.js/dist/addons/cleave-phone.i18n';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import countryCodes from '../countryCodes';
import { List, Map } from 'immutable';
import '../styles/phone.css';

var Phone = function Phone(props) {
  var _context, _context2, _context3;

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
      delimiter = _props$delimiter === void 0 ? ' ' : _props$delimiter,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required,
      _props$region = props.region,
      region = _props$region === void 0 ? 'US' : _props$region,
      _props$regionselect = props.regionselect,
      regionselect = _props$regionselect === void 0 ? false : _props$regionselect,
      regions = props.regions,
      values = _valuesInstanceProperty(props),
      _props$maxlength = props.maxlength,
      maxlength = _props$maxlength === void 0 ? 524288 : _props$maxlength,
      warning = props.warning;

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
  var selectableRegionCodes = useRef(regions || countryCodes);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var _useState3 = useState(typeof region === 'string' && region.length === 2 ? region : values.get(region) || 'US'),
      _useState4 = _slicedToArray(_useState3, 2),
      countryCode = _useState4[0],
      setCountryCode = _useState4[1];

  var handleOnRegionChange = useCallback(function (e) {
    var newValue = e.target.value;

    if (typeof region === 'string' && region.length > 2) {
      // if a hard coded region wasn't provided, assume it's read from a field
      onChange({
        target: {
          value: newValue,
          name: region
        }
      });
    }

    setCountryCode(newValue);
  }, [region, onChange]);
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

    onChange({
      target: {
        value: newValue,
        name: name
      }
    });
  }, [onChange, name]);
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
  }, regionselect && jsx("div", {
    className: "phone-region-select-container"
  }, jsx("select", {
    value: countryCode,
    onChange: handleOnRegionChange
  }, _mapInstanceProperty(_context2 = _sortInstanceProperty(_context3 = selectableRegionCodes.current).call(_context3)).call(_context2, function (country, i) {
    return jsx("option", {
      key: i,
      value: country
    }, country);
  }))), jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, jsx(Cleave, {
    key: countryCode,
    ref: input,
    options: {
      phone: true,
      phoneRegionCode: countryCode,
      delimiter: delimiter
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
    css: theme.value,
    maxLength: maxlength + Math.floor((value + '').length / 4)
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
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

export default Phone;
Phone.propTypes = {
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
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  region: PropTypes.string,
  regionselect: PropTypes.bool,
  regions: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(List)]),
  values: PropTypes.instanceOf(Map),
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string
};