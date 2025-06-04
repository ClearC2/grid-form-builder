import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
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
const ColorInput = props => {
  var _context;
  const {
    name,
    value = '',
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    onChange,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    maxlength = 524288
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style;
  const {
    theme
  } = useTheme();
  const [showPicker, setShowPicker] = useState(false);
  const inputId = useRef(randomId());
  const portalRef = useRef();
  const [isFocused, setIsFocused] = useState(false);
  const windowClickListener = useMemo(() => {
    return e => {
      const pathHandler = e.path || e.composedPath();
      const insideClick = _someInstanceProperty(pathHandler).call(pathHandler, path => {
        return path.id === inputId.current || path.id === portalRef.current.state.id;
      });
      if (!insideClick) {
        setShowPicker(false);
      }
    };
  }, []);
  useEffect(() => {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
    return () => {
      window.removeEventListener('mousedown', windowClickListener);
    };
  }, [showPicker, windowClickListener]);
  const handleOnInputChange = useCallback(e => {
    let {
      value: newValue
    } = e.target;
    if (typeof newValue === 'string') newValue = newValue.toUpperCase();
    onChange({
      target: {
        name,
        value: newValue
      }
    });
    if (!showPicker) setShowPicker(true);
  }, [showPicker, setShowPicker, name, onChange]);
  const handleOnFocus = useCallback(() => {
    if (!readonly && !disabled && interactive) {
      setShowPicker(true);
      setIsFocused(true);
    }
  }, [readonly, disabled, interactive]);
  const handleOnBlur = useCallback(() => {
    setIsFocused(false);
  }, []);
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
  const isDisabled = readonly || disabled || !interactive;
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
    css: indicatorsCSS
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
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};