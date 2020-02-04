import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { randomId, usePrevious } from '../../utils';
import Toolbar from './Toolbar';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import '../../../styles/richtext.css';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import useTheme from '../../theme/useTheme';

var Richtextarea = function Richtextarea(props) {
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
      required = props.required;
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
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var elementId = useRef('gfb-' + randomId());
  var QuillRef = useRef();
  var formats = useRef(['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color']);
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
    if (html !== '<p><br></p>') {
      onChange({
        target: {
          name: name,
          value: html
        }
      });
    }
  }, [onChange, name]);
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

  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
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
    css: theme.value
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};

export default Richtextarea;
Richtextarea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
  required: PropTypes.bool
};