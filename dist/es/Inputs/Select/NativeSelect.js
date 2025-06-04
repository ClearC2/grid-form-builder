import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';
import { useCallback, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import '../../styles/native-select.css';
const NativeSelect = props => {
  const {
    value = '',
    tabIndex,
    disabled,
    readonly,
    name,
    keyword = {},
    requiredWarning,
    required,
    onChange,
    interactive = true,
    style = {},
    device
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {},
    options: optionsStyle = {}
  } = style;
  const {
    theme
  } = useTheme();
  const {
    options: optionsTheme = {}
  } = theme;
  const [options] = useState(keyword.options || []);
  const platform = device.platform.toLowerCase();
  const handleOnChange = useCallback(e => {
    const {
      value
    } = e.target;
    onChange({
      target: {
        value,
        name
      }
    });
  }, [onChange, name]);
  let className = 'gfb-input__single-value gfb-input__input gfb-select-webkit-none';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  const valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  let controlClass = 'gfb-input__control';
  let validationError;
  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }
  let indicatorClass = 'gfb-input__indicators';
  if (readonly || disabled || !interactive) indicatorClass = indicatorClass + ' gfb-disabled-input';
  let indSeparatorClass = 'gfb-input__indicator-separator css-1okebmr-indicatorSeparator gfb-nat-select-separator';
  if (readonly || disabled || !interactive) indSeparatorClass = indSeparatorClass + ' gfb-disabled-indicator-separator';
  const inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);
  const inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);
  const inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);
  const valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);
  const valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);
  const indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);
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
    value: value
  }, jsx("option", {
    name: name,
    value: "",
    style: optionsStyle,
    css: optionsTheme
  }), _mapInstanceProperty(options).call(options, (option, i) => {
    return jsx("option", {
      key: i,
      name: name,
      value: option.value,
      style: optionsStyle,
      css: optionsTheme
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
  device: PropTypes.object
};
export default NativeSelect;