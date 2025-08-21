import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
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
import { useCallback, useEffect, useRef, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import ColorPicker from './ColorPicker';
import { randomId } from '../../utils';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';

var ColorInput = function ColorInput(props) {
  var _context;

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
      maxlength = _props$maxlength === void 0 ? 524288 : _props$maxlength,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? props === null || props === void 0 ? void 0 : props.name : _props$dataTestid;
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
      var pathHandler = e.path || e.composedPath();

      var insideClick = _someInstanceProperty(pathHandler).call(pathHandler, function (path) {
        return path.id === inputId.current || path.id === portalRef.current.state.id;
      });

      if (!insideClick) {
        setShowPicker(false);
      }
    };
  }, []);
  useEffect(function () {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
    return function () {
      window.removeEventListener('mousedown', windowClickListener);
    };
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

  if (required && requiredWarning && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  var validationWarning;

  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationWarning = "Maximum character limit of ".concat(maxlength, " reached.");
  }

  var isDisabled = readonly || disabled || !interactive;
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
  }, jsx("input", {
    id: inputId.current,
    className: className,
    name: name,
    value: value,
    onChange: handleOnInputChange,
    readOnly: isDisabled,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    autoComplete: autoComplete,
    style: valueStyle,
    css: valueCSS,
    maxLength: maxlength,
    "data-testid": testId
  }), showPicker && jsx(ColorPicker, {
    ref: portalRef,
    inputId: inputId.current,
    value: value,
    onChange: handleOnInputChange,
    name: name,
    "data-testid": "".concat(testId, "-color-picker")
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS,
    "data-testid": "".concat(testId, "-errors")
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
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  'data-testid': PropTypes.string
};