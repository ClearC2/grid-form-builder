import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';
import { randomId } from '../../utils';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';

var ColorInput = function ColorInput(props) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      onChange = props.onChange,
      autoComplete = props.autoComplete,
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

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPicker = _useState2[0],
      setShowPicker = _useState2[1];

  var inputId = useRef(randomId());
  var portalRef = useRef();

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var windowClickListener = useMemo(function () {
    return function (e) {
      var _context;

      var insideClick = _someInstanceProperty(_context = e.path).call(_context, function (path) {
        return path.id === inputId.current || path.id === portalRef.current.state.id;
      });

      if (!insideClick) {
        setShowPicker(false);
      }
    };
  }, []);
  useEffect(function () {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
  }, [showPicker, windowClickListener]);
  var handleOnInputChange = useCallback(function (e) {
    var newValue = e.target.value;
    if (typeof newValue === 'string') newValue = newValue.toUpperCase();
    onChange({
      target: {
        name: name,
        value: newValue
      }
    });
    if (!showPicker) setShowPicker(true);
  }, [showPicker, setShowPicker, name, onChange]);
  var handleOnFocus = useCallback(function () {
    if (!readonly && !disabled && interactive) {
      setShowPicker(true);
      setIsFocused(true);
    }
  }, [readonly, disabled, interactive]);
  var handleOnBlur = useCallback(function () {
    setIsFocused(false);
  }, []);
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
  }, jsx("input", {
    id: inputId.current,
    className: className,
    name: name,
    value: value,
    onChange: handleOnInputChange,
    disabled: readonly || disabled || !interactive,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    autoComplete: autoComplete,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength
  }), showPicker && jsx(ColorPicker, {
    ref: portalRef,
    inputId: inputId.current,
    value: value,
    onChange: handleOnInputChange,
    name: name
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationWarning && jsx(ValidationErrorIcon, {
    message: validationWarning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && validationError && jsx("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && jsx(ValidationErrorIcon, {
    message: validationError
  }), (validationError || validationWarning) && jsx("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), jsx("div", {
    className: "gfb-color-input-indicator",
    style: {
      backgroundColor: value
    },
    onClick: handleOnFocus
  })))));
};

export default ColorInput;
ColorInput.propTypes = {
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
  maxlength: PropTypes.number
};