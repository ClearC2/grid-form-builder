import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _Number$MAX_SAFE_INTEGER from "@babel/runtime-corejs3/core-js-stable/number/max-safe-integer";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
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
import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Quill from './Quill';
import { randomId, usePrevious } from '../../utils';
import Toolbar from './Toolbar';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import '../../styles/richtext.css';
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
      maxlength = _props$maxlength === void 0 ? _Number$MAX_SAFE_INTEGER : _props$maxlength,
      warning = props.warning,
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
    table: true
  });
  var handleOnChange = useCallback(function (html) {
    if (!readonly && !disabled) {
      /* If the html formatting is not consistent with Quill's formatting then Quill will auto-format on mount.
      This is undesirable because it will register the onDirty to be true when no user change has
      occurred so this check is added in to prevent quill from auto formatting when mounting */
      if (!hasBlockedAutoFormat && typeof value === 'string' && typeof html === 'string' && (_indexOfInstanceProperty(value).call(value, '<html') > -1 && _indexOfInstanceProperty(html).call(html, '<html') === -1 || _indexOfInstanceProperty(value).call(value, '<head') > -1 && _indexOfInstanceProperty(html).call(html, '<head') === -1 || _indexOfInstanceProperty(value).call(value, '<meta') > -1 && _indexOfInstanceProperty(html).call(html, '<meta') === -1)) {
        setHasBlockedAutoFormat(true);
      } else if (html) {
        onChange({
          target: {
            name: name,
            value: html
          }
        });
      }
    }
  }, [onChange, name, readonly, disabled, hasBlockedAutoFormat, value]);
  var addTable = useCallback(function () {
    QuillRef.current.editor.getModule('table').insertTable(2, 2);
  }, [QuillRef]);
  var removeTable = useCallback(function () {
    QuillRef.current.editor.getModule('table').deleteTable();
  }, [QuillRef]);
  var insertRowAbove = useCallback(function () {
    QuillRef.current.editor.getModule('table').insertRowAbove();
  }, [QuillRef]);
  var insertRowBelow = useCallback(function () {
    QuillRef.current.editor.getModule('table').insertRowBelow();
  }, [QuillRef]);
  var deleteRow = useCallback(function () {
    QuillRef.current.editor.getModule('table').deleteRow();
  }, [QuillRef]);
  var insertColumnLeft = useCallback(function () {
    QuillRef.current.editor.getModule('table').insertColumnLeft();
  }, [QuillRef]);
  var insertColumnRight = useCallback(function () {
    QuillRef.current.editor.getModule('table').insertColumnRight();
  }, [QuillRef]);
  var deleteColumn = useCallback(function () {
    QuillRef.current.editor.getModule('table').deleteColumn();
  }, [QuillRef]);
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
  var validationWarning;
  var validationError;

  if (required && requiredWarning && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationError = "Maximum character limit of ".concat(maxlength, " reached.");
    controlClass = controlClass + ' gfb-validation-error';
  }

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
    className: "gfb-input-control-top",
    style: {
      display: 'flex'
    },
    "data-testid": "".concat(testId, "-toolbar")
  }, jsx(Toolbar, {
    id: elementId.current,
    addTable: addTable,
    removeTable: removeTable,
    insertRowAbove: insertRowAbove,
    insertRowBelow: insertRowBelow,
    deleteRow: deleteRow,
    insertColumnLeft: insertColumnLeft,
    insertColumnRight: insertColumnRight,
    deleteColumn: deleteColumn
  })), jsx("div", {
    className: controlClass,
    style: inputControl,
    css: inputControlCSS
  }, jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: valueContainerCSS,
    "data-testid": testId
  }, jsx(Quill, {
    name: name + tabIndex,
    onChange: handleOnChange,
    readOnly: readonly || disabled || !interactive,
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
    css: valueCSS,
    maxLength: maxlength,
    isFocused: isFocused
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS,
    "data-testid": "".concat(testId, "-errors")
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
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string,
  'data-testid': PropTypes.string
};