import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context2, _context3; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(t), !0)).call(_context2, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context3 = ownKeys(Object(t))).call(_context3, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
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
const Richtextarea = props => {
  var _context;
  const {
    name,
    value = '<p>&nbsp;</p>',
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    handleRTEImageClick,
    rteImageUrl,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    maxlength = _Number$MAX_SAFE_INTEGER,
    warning
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
  const [hasBlockedAutoFormat, setHasBlockedAutoFormat] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const elementId = useRef('gfb-' + randomId());
  const QuillRef = useRef();
  const formats = useRef(['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color', 'background']);
  const insertImage = useCallback(() => {
    handleRTEImageClick(name);
  }, [handleRTEImageClick, name]);
  const modules = useRef({
    toolbar: {
      container: `#${elementId.current}`,
      handlers: {
        insertImage
      }
    },
    table: true
  });
  const handleOnChange = useCallback(html => {
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
            name,
            value: html
          }
        });
      }
    }
  }, [onChange, name, maxlength, readonly, disabled, hasBlockedAutoFormat, value]);
  const addTable = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertTable(2, 2);
  }, [QuillRef]);
  const removeTable = useCallback(() => {
    QuillRef.current.editor.getModule('table').deleteTable();
  }, [QuillRef]);
  const insertRowAbove = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertRowAbove();
  }, [QuillRef]);
  const insertRowBelow = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertRowBelow();
  }, [QuillRef]);
  const deleteRow = useCallback(() => {
    QuillRef.current.editor.getModule('table').deleteRow();
  }, [QuillRef]);
  const insertColumnLeft = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertColumnLeft();
  }, [QuillRef]);
  const insertColumnRight = useCallback(() => {
    QuillRef.current.editor.getModule('table').insertColumnRight();
  }, [QuillRef]);
  const deleteColumn = useCallback(() => {
    QuillRef.current.editor.getModule('table').deleteColumn();
  }, [QuillRef]);
  const previousRTEImageUrl = usePrevious(rteImageUrl);
  useEffect(() => {
    if (rteImageUrl && previousRTEImageUrl !== rteImageUrl && QuillRef.current) {
      const input = QuillRef.current.getEditor();
      const cursor = input.getSelection(true) ? input.getSelection(true).index : 0;
      input.insertEmbed(cursor, 'image', rteImageUrl);
      input.setSelection(cursor + 1);
    }
  }, [rteImageUrl, previousRTEImageUrl, name]);
  const handleOnFocus = useCallback(() => {
    setIsFocused(true);
  }, []);
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
    className: "gfb-input-control-top",
    style: {
      display: 'flex'
    }
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
    css: valueContainerCSS
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
    css: indicatorsCSS
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
  warning: PropTypes.string
};