'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

var _utils = require('../../utils');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _ValidationErrorIcon = require('../../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

require('../../../styles/richtext.css');

require('react-quill/dist/quill.snow.css');

require('react-quill/dist/quill.core.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Richtextarea = function Richtextarea(props) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === undefined ? '<p>&nbsp;</p>' : _props$value,
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
      interactive = _props$interactive === undefined ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style,
      required = props.required;
  var _style$value = style.value,
      valueStyle = _style$value === undefined ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === undefined ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === undefined ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === undefined ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === undefined ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === undefined ? {} : _style$indicators;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
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
      container: '#' + elementId.current,
      handlers: {
        insertImage: insertImage
      }
    },
    clipboard: {
      matchVisual: false
    }
  });

  var handleOnChange = (0, _react.useCallback)(function (html) {
    if (html !== '<p><br></p>') {
      onChange({
        target: {
          name: name,
          value: html
        }
      });
    }
  }, [onChange, name]);

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
  var validationError = void 0;
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer', style: inputOuter },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner', style: inputInner },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input-control-top' },
        _react2.default.createElement(_Toolbar2.default, { id: elementId.current })
      ),
      _react2.default.createElement(
        'div',
        { className: controlClass, style: inputControl },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container', style: valueContainer },
          _react2.default.createElement(_reactQuill2.default, {
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
            scrollingContainer: 'scrolling-container',
            theme: 'snow',
            autoComplete: autoComplete,
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            style: valueStyle
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__indicators', style: indicators },
          validationError && _react2.default.createElement(_ValidationErrorIcon2.default, { message: validationError })
        )
      )
    )
  );
};

exports.default = Richtextarea;


Richtextarea.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  handleRTEImageClick: _propTypes2.default.func,
  rteImageUrl: _propTypes2.default.string,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};