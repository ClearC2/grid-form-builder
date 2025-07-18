import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';
import { useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '../../styles/native-select.css';

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
      style = _props$style === void 0 ? {} : _props$style,
      device = props.device,
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
      indicators = _style$indicators === void 0 ? {} : _style$indicators,
      _style$options = style.options,
      optionsStyle = _style$options === void 0 ? {} : _style$options;

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var _theme$options = theme.options,
      optionsTheme = _theme$options === void 0 ? {} : _theme$options;

  var _useState = useState(keyword.options || []),
      _useState2 = _slicedToArray(_useState, 1),
      options = _useState2[0];

  var platform = device.platform.toLowerCase();
  var handleOnChange = useCallback(function (e) {
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

  var indicatorClass = 'gfb-input__indicators';
  if (readonly || disabled || !interactive) indicatorClass = indicatorClass + ' gfb-disabled-input';
  var indSeparatorClass = 'gfb-input__indicator-separator css-1okebmr-indicatorSeparator gfb-nat-select-separator';
  if (readonly || disabled || !interactive) indSeparatorClass = indSeparatorClass + ' gfb-disabled-indicator-separator';

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

  return jsx("div", {
    className: "gfb-input-outer",
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
    className: valueContainerClassName,
    style: valueContainer,
    css: valueContainerCSS
  }, jsx("select", {
    className: className,
    onChange: handleOnChange,
    style: valueStyle,
    css: valueCSS,
    disabled: readonly || disabled || !interactive,
    tabIndex: tabIndex,
    value: value,
    "data-testid": testId
  }, jsx("option", {
    name: name,
    value: "",
    style: optionsStyle,
    css: optionsTheme,
    "data-testid": "".concat(testId, "-")
  }), _mapInstanceProperty(options).call(options, function (option, i) {
    var _context;

    return jsx("option", {
      key: i,
      name: name,
      value: option.value,
      style: optionsStyle,
      css: optionsTheme,
      "data-testid": _concatInstanceProperty(_context = "".concat(testId, "-")).call(_context, (option === null || option === void 0 ? void 0 : option.value) || (option === null || option === void 0 ? void 0 : option.label))
    }, option.label ? option.label : option.value);
  }))), jsx("div", {
    className: indicatorClass,
    style: indicators,
    css: indicatorsCSS
  }, jsx("span", {
    className: indSeparatorClass
  }), jsx(FaChevronDown, {
    className: platform === 'ios' ? 'gfb-native-select-ios-down-indicator' : platform === 'android' ? 'gfb-native-select-android-down-indicator' : platform === 'browser' ? 'gfb-native-select-web-down-indicator' : ''
  }), validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};

NativeSelect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  keyword: PropTypes.object,
  tabIndex: PropTypes.number,
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  values: PropTypes.object,
  persist: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  style: PropTypes.object,
  isClearable: PropTypes.bool,
  device: PropTypes.object,
  'data-testid': PropTypes.string
};
export default NativeSelect;