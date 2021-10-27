import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _Number$MAX_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/max-safe-integer";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { randomId, usePrevious } from '../../utils';
import Toolbar from './Toolbar';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import '../../styles/richtext.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import useTheme from '../../theme/useTheme';

var Richtextarea = function Richtextarea(props) {
  var _context;

  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '<p>&nbsp;</p>' : _props$value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      handleRTEImageClick = props.handleRTEImageClick,
      rteImageUrl = props.rteImageUrl,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required,
      _props$maxlength = props.maxlength,
      maxlength = _props$maxlength === void 0 ? _Number$MAX_SAFE_INTEGER : _props$maxlength;
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
      hasBlockedAutoFormat = _useState2[0],
      setHasBlockedAutoFormat = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var elementId = useRef('gfb-' + randomId());
  var QuillRef = useRef();
  var formats = useRef(['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color', 'background']);
  var insertImage = useCallback(function () {
    handleRTEImageClick(name);
  }, [handleRTEImageClick, name]);
  var modules = useRef({
    toolbar: {
      container: "#".concat(elementId.current),
      handlers: {
        insertImage: insertImage
      }
    },
    clipboard: {
      matchVisual: false
    }
  });
  var handleOnChange = useCallback(function (html) {
    if (!readonly && !disabled) {
      /* If the html formatting is not consistent with Quill's formatting then Quill will auto-format on mount.
      This is undesirable because it will register the onDirty to be true when no user change has
      occurred so this check is added in to prevent quill from auto formatting when mounting */
      if (!hasBlockedAutoFormat && typeof value === 'string' && typeof html === 'string' && (_indexOfInstanceProperty(value).call(value, '<html') > -1 && _indexOfInstanceProperty(html).call(html, '<html') === -1 || _indexOfInstanceProperty(value).call(value, '<head') > -1 && _indexOfInstanceProperty(html).call(html, '<head') === -1 || _indexOfInstanceProperty(value).call(value, '<meta') > -1 && _indexOfInstanceProperty(html).call(html, '<meta') === -1)) {
        setHasBlockedAutoFormat(true);
      } else if (html) {
        if (html.length > maxlength) html = html.substring(0, maxlength);
        onChange({
          target: {
            name: name,
            value: html
          }
        });
      }
    }
  }, [isFocused, onChange, name, maxlength, readonly, disabled, hasBlockedAutoFormat]);
  var previousRTEImageUrl = usePrevious(rteImageUrl);
  useEffect(function () {
    if (rteImageUrl && previousRTEImageUrl !== rteImageUrl && QuillRef.current) {
      var input = QuillRef.current.getEditor();
      var cursor = input.getSelection(true) ? input.getSelection(true).index : 0;
      input.insertEmbed(cursor, 'image', rteImageUrl);
      input.setSelection(cursor + 1);
    }
  }, [rteImageUrl, previousRTEImageUrl, name]);
  var handleOnFocus = useCallback(function () {
    setIsFocused(true);
  }, []);
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
    className: "gfb-input-control-top"
  }, jsx(Toolbar, {
    id: elementId.current
  })), jsx("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, jsx(ReactQuill, {
    onChange: handleOnChange,
    disabled: readonly || disabled || !interactive,
    className: className,
    ref: QuillRef,
    value: value,
    placeholder: placeholder,
    modules: modules.current,
    formats: formats.current,
    autofocus: autofocus,
    tabIndex: tabIndex,
    scrollingContainer: "scrolling-container",
    theme: "snow",
    autoComplete: autoComplete,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength
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
  })))));
};

export default Richtextarea;
Richtextarea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  handleRTEImageClick: PropTypes.func,
  rteImageUrl: PropTypes.string,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};