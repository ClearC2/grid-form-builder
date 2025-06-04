import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context4, _context5; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context4 = ownKeys(Object(t), !0)).call(_context4, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context5 = ownKeys(Object(t))).call(_context5, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave'; // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
import 'cleave.js/dist/addons/cleave-phone.i18n';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import countryCodes from '../countryCodes';
import { List, Map } from 'immutable';
import '../styles/phone.css';
const Phone = props => {
  var _context, _context2, _context3;
  const {
    name,
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    autoComplete,
    delimiter = ' ',
    interactive = true,
    requiredWarning,
    style = {},
    required,
    region = 'US',
    regionselect = false,
    regions,
    values,
    maxlength = 524288,
    warning
  } = props;
  let {
    value = ''
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style;
  const regionPropValue = typeof region === 'string' && region.length === 2 ? region : values.get(region) || 'US';
  const {
    theme
  } = useTheme();
  const input = useRef();
  const selectableRegionCodes = useRef(regions || countryCodes);
  const [isFocused, setIsFocused] = useState(false);
  const [countryCode, setCountryCode] = useState(regionPropValue);
  const handleOnRegionChange = useCallback(e => {
    const {
      value: newValue
    } = e.target;
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
  useEffect(() => {
    setCountryCode(regionPropValue);
  }, [regionPropValue]);
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
    onChange({
      target: {
        value: newValue,
        name
      }
    });
  }, [onChange, name]);
  const isDisabled = readonly || disabled || !interactive;
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
  const inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);
  const inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);
  const inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);
  const valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);
  const valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);
  const indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);
  value = countryCode && countryCode !== 'US' && !_startsWithInstanceProperty(value).call(value, '+') ? `+${value}` : value;
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
  }, regionselect && jsx("div", {
    className: "phone-region-select-container"
  }, jsx("select", {
    value: countryCode,
    onChange: handleOnRegionChange
  }, _mapInstanceProperty(_context2 = _sortInstanceProperty(_context3 = selectableRegionCodes.current).call(_context3)).call(_context2, (country, i) => {
    return jsx("option", {
      key: i,
      value: country
    }, country);
  }))), jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: valueContainerCSS
  }, jsx(Cleave, {
    key: countryCode,
    ref: input,
    options: {
      phone: true,
      phoneRegionCode: countryCode,
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
    maxLength: maxlength + Math.floor((value + '').length / 4)
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