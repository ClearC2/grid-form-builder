import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';
import { useCallback, useState } from 'react';

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
      style = _props$style === void 0 ? {} : _props$style;
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

  var _theme$value = theme.value,
      valueTheme = _theme$value === void 0 ? {} : _theme$value,
      _theme$options = theme.options,
      optionsTheme = _theme$options === void 0 ? {} : _theme$options;

  var _useState = useState(keyword.options || []),
      _useState2 = _slicedToArray(_useState, 1),
      options = _useState2[0];

  var handleOnChange = useCallback(function (e) {
    var value = e.target.value;
    onChange({
      target: {
        value: value,
        name: name
      }
    });
  }, [onChange, name]);
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return jsx("div", {
    className: "gfb-input-outer",
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
    className: valueContainerClassName,
    style: valueContainer,
    css: theme.valueContainer
  }, jsx("select", {
    className: className,
    onChange: handleOnChange,
    style: valueStyle,
    css: valueTheme,
    disabled: readonly || disabled || !interactive,
    tabIndex: tabIndex,
    value: value
  }, jsx("option", {
    name: name,
    value: "",
    style: optionsStyle,
    css: optionsTheme
  }), _mapInstanceProperty(options).call(options, function (option, i) {
    return jsx("option", {
      key: i,
      name: name,
      value: option.value,
      style: optionsStyle,
      css: optionsTheme
    }, option.label ? option.label : option.value);
  }))), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators
  }, validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};

NativeSelect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
  isClearable: PropTypes.bool
};
export default NativeSelect;