"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactQuill = _interopRequireDefault(require("react-quill"));

var _utils = require("../../utils");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _ValidationErrorIcon = _interopRequireDefault(require("../../ValidationErrorIcon"));

require("../../styles/richtext.css");

require("react-quill/dist/quill.snow.css");

require("react-quill/dist/quill.core.css");

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

/** @jsx jsx */
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

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var elementId = (0, _react.useRef)('gfb-' + (0, _utils.randomId)());
  var QuillRef = (0, _react.useRef)();
  var formats = (0, _react.useRef)(['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color']);
  var insertImage = (0, _react.useCallback)(function () {
    handleRTEImageClick(name);
  }, [handleRTEImageClick, name]);
  var modules = (0, _react.useRef)({
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
  var handleOnChange = (0, _react.useCallback)(function (html) {
    /* If the html formatting is not consistent with Quill's formatting then Quill will auto-format on mount.
    This is undesirable because it will register the onDirty to be true when no user change has
    occurred so this check is added in to prevent quill from auto formatting when mounting */
    if (html !== '<p><br></p>' && isFocused) {
      onChange({
        target: {
          name: name,
          value: html
        }
      });
    }
  }, [isFocused, onChange, name]);
  var previousRTEImageUrl = (0, _utils.usePrevious)(rteImageUrl);
  (0, _react.useEffect)(function () {
    if (rteImageUrl && previousRTEImageUrl !== rteImageUrl && QuillRef.current) {
      var input = QuillRef.current.getEditor();
      var cursor = input.getSelection(true) ? input.getSelection(true).index : 0;
      input.insertEmbed(cursor, 'image', rteImageUrl);
      input.setSelection(cursor + 1);
    }
  }, [rteImageUrl, previousRTEImageUrl, name]);
  var handleOnFocus = (0, _react.useCallback)(function () {
    setIsFocused(true);
  }, []);
  var handleOnBlur = (0, _react.useCallback)(function () {
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

  return (0, _core.jsx)("div", {
    className: outerClass,
    style: inputOuter,
    css: theme.inputOuter
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, (0, _core.jsx)("div", {
    className: "gfb-input-control-top"
  }, (0, _core.jsx)(_Toolbar.default, {
    id: elementId.current
  })), (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, (0, _core.jsx)("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, (0, _core.jsx)(_reactQuill.default, {
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
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

var _default = Richtextarea;
exports.default = _default;
Richtextarea.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  handleRTEImageClick: _propTypes.default.func,
  rteImageUrl: _propTypes.default.string,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool
};