"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Cleave = _interopRequireDefault(require("../Cleave"));

require("cleave.js/dist/addons/cleave-phone.i18n");

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

var _countryCodes = _interopRequireDefault(require("../countryCodes"));

var _immutable = require("immutable");

require("../styles/phone.css");

/** @jsx jsx */
// import Cleave from 'cleave.js/react'
// switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
var Phone = function Phone(props) {
  var _context, _context2;

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
      values = (0, _values.default)(props),
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
  var selectableRegionCodes = (0, _react.useRef)(regions || _countryCodes.default);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var _useState3 = (0, _react.useState)(typeof region === 'string' && region.length === 2 ? region : values.get(region) || 'US'),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      countryCode = _useState4[0],
      setCountryCode = _useState4[1];

  var handleOnRegionChange = (0, _react.useCallback)(function (e) {
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

    onChange({
      target: {
        value: newValue,
        name: name
      }
    });
  }, [onChange, name]);
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
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
  }, regionselect && (0, _core.jsx)("div", {
    className: "phone-region-select-container"
  }, (0, _core.jsx)("select", {
    value: countryCode,
    onChange: handleOnRegionChange
  }, (0, _map.default)(_context = (0, _sort.default)(_context2 = selectableRegionCodes.current).call(_context2)).call(_context, function (country, i) {
    return (0, _core.jsx)("option", {
      key: i,
      value: country
    }, country);
  }))), (0, _core.jsx)("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, (0, _core.jsx)(_Cleave.default, {
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
    disabled: readonly || disabled || !interactive,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    autoComplete: autoComplete,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength + Math.floor((value + '').length / 4)
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

var _default = Phone;
exports.default = _default;
Phone.propTypes = {
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
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool,
  region: _propTypes.default.string,
  regionselect: _propTypes.default.bool,
  regions: _propTypes.default.oneOfType([_propTypes.default.array, _propTypes.default.instanceOf(_immutable.List)]),
  values: _propTypes.default.instanceOf(_immutable.Map),
  maxlength: _propTypes.default.number
};