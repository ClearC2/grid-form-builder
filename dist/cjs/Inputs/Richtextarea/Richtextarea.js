"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _maxSafeInteger = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/number/max-safe-integer"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Quill = _interopRequireDefault(require("./Quill"));

var _utils = require("../../utils");

var _Toolbar = _interopRequireDefault(require("./Toolbar"));

var _ValidationErrorIcon = _interopRequireDefault(require("../../ValidationErrorIcon"));

require("../../styles/richtext.css");

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

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
      maxlength = _props$maxlength === void 0 ? _maxSafeInteger.default : _props$maxlength,
      warning = props.warning;
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
      hasBlockedAutoFormat = _useState2[0],
      setHasBlockedAutoFormat = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var elementId = (0, _react.useRef)('gfb-' + (0, _utils.randomId)());
  var QuillRef = (0, _react.useRef)();
  var formats = (0, _react.useRef)(['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color', 'background']);
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
    table: true
  });
  var handleOnChange = (0, _react.useCallback)(function (html) {
    if (!readonly && !disabled) {
      /* If the html formatting is not consistent with Quill's formatting then Quill will auto-format on mount.
      This is undesirable because it will register the onDirty to be true when no user change has
      occurred so this check is added in to prevent quill from auto formatting when mounting */
      if (!hasBlockedAutoFormat && typeof value === 'string' && typeof html === 'string' && ((0, _indexOf.default)(value).call(value, '<html') > -1 && (0, _indexOf.default)(html).call(html, '<html') === -1 || (0, _indexOf.default)(value).call(value, '<head') > -1 && (0, _indexOf.default)(html).call(html, '<head') === -1 || (0, _indexOf.default)(value).call(value, '<meta') > -1 && (0, _indexOf.default)(html).call(html, '<meta') === -1)) {
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
  }, [onChange, name, maxlength, readonly, disabled, hasBlockedAutoFormat, value]);
  var addTable = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').insertTable(2, 2);
  }, [QuillRef]);
  var removeTable = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').deleteTable();
  }, [QuillRef]);
  var insertRowAbove = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').insertRowAbove();
  }, [QuillRef]);
  var insertRowBelow = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').insertRowBelow();
  }, [QuillRef]);
  var deleteRow = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').deleteRow();
  }, [QuillRef]);
  var insertColumnLeft = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').insertColumnLeft();
  }, [QuillRef]);
  var insertColumnRight = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').insertColumnRight();
  }, [QuillRef]);
  var deleteColumn = (0, _react.useCallback)(function () {
    QuillRef.current.editor.getModule('table').deleteColumn();
  }, [QuillRef]);
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

  if (required && requiredWarning && (0, _trim.default)(_context = value + '').call(_context).length === 0 && !isFocused) {
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

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

  return (0, _core.jsx)("div", {
    className: outerClass,
    style: inputOuter,
    css: inputOuterCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: inputInnerCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input-control-top",
    style: {
      display: 'flex'
    }
  }, (0, _core.jsx)(_Toolbar.default, {
    id: elementId.current,
    addTable: addTable,
    removeTable: removeTable,
    insertRowAbove: insertRowAbove,
    insertRowBelow: insertRowBelow,
    deleteRow: deleteRow,
    insertColumnLeft: insertColumnLeft,
    insertColumnRight: insertColumnRight,
    deleteColumn: deleteColumn
  })), (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: inputControlCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: valueContainerCSS
  }, (0, _core.jsx)(_Quill.default, {
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
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
  }, warning && !validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: warning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationWarning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && validationError && (0, _core.jsx)("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
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
  required: _propTypes.default.bool,
  maxlength: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  warning: _propTypes.default.string
};