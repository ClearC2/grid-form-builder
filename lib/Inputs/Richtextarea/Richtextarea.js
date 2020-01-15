'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

var _utils = require('../../utils');

var _Toolbar = require('./Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

require('./richtext.css');

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
      autoComplete = props.autoComplete;

  var elementId = (0, _react.useRef)('gfb-' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
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

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled) className = className + ' gfb-disabled-input';
  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer' },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner' },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input-control-top' },
        _react2.default.createElement(_Toolbar2.default, { id: elementId.current })
      ),
      _react2.default.createElement(
        'div',
        { className: 'gfb-input__control' },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container' },
          _react2.default.createElement(_reactQuill2.default, {
            onChange: handleOnChange,
            disabled: readonly || disabled,
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
            autoComplete: autoComplete
          })
        ),
        _react2.default.createElement('div', { className: 'gfb-input__indicators' })
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
  autoComplete: _propTypes2.default.string
};