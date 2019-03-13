'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactDnd = require('react-dnd');

var _reactQuill = require('react-quill');

var _reactQuill2 = _interopRequireDefault(_reactQuill);

require('react-quill/dist/quill.snow.css');

require('react-quill/dist/quill.core.css');

var _image = require('react-icons/lib/fa/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomToolbar = function CustomToolbar() {
  return _react2.default.createElement(
    'div',
    { id: 'toolbar', style: { backgroundColor: '#fafafa' } },
    _react2.default.createElement(
      'select',
      { className: 'ql-header', defaultValue: 'normal', onChange: function onChange(e) {
          return e.persist();
        } },
      _react2.default.createElement('option', { value: '1' }),
      _react2.default.createElement('option', { value: '2' }),
      _react2.default.createElement('option', { value: '3' }),
      _react2.default.createElement('option', { value: 'normal' })
    ),
    _react2.default.createElement('button', { className: 'ql-bold' }),
    _react2.default.createElement('button', { className: 'ql-italic' }),
    _react2.default.createElement('button', { className: 'ql-underline' }),
    _react2.default.createElement('button', { className: 'ql-link' }),
    _react2.default.createElement('button', { className: 'ql-list', value: 'bullet' }),
    _react2.default.createElement('button', { className: 'ql-list', value: 'ordered' }),
    _react2.default.createElement('button', { className: 'ql-blockquote' }),
    _react2.default.createElement(
      'button',
      { className: 'ql-insertImage' },
      _react2.default.createElement(_image2.default, null)
    )
  );
};

var Richtextareaquill = function (_React$Component) {
  _inherits(Richtextareaquill, _React$Component);

  function Richtextareaquill(props) {
    _classCallCheck(this, Richtextareaquill);

    var _this = _possibleConstructorReturn(this, (Richtextareaquill.__proto__ || Object.getPrototypeOf(Richtextareaquill)).call(this, props));

    _this.attachQuillRefs = function () {
      if (typeof _this.reactQuillRef.getEditor !== 'function') return;
      _this.quillRef = _this.reactQuillRef.getEditor();
    };

    _this.handleChange = function (html) {
      var _this$props = _this.props,
          handleOnChange = _this$props.handleOnChange,
          _this$props$config = _this$props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      var value = html;

      handleOnChange({
        target: {
          name: name,
          value: value
        }
      });
    };

    _this.handleImageInsertion = function (url) {
      if (_this.quillRef === null) return;
      var cursorPosition = _this.quillRef.getSelection(true) ? _this.quillRef.getSelection(true).index : 0;
      _this.quillRef.insertEmbed(cursorPosition, 'image', url);
      _this.quillRef.setSelection(cursorPosition + 1);
    };

    _this.quillRef = null;
    _this.reactQuillRef = null;
    _this.modules = {
      toolbar: {
        container: '#toolbar',
        handlers: {
          insertImage: function insertImage() {
            return _this.insertImage(_this.props);
          }
        }
      },
      clipboard: {
        matchVisual: false
      }
    };
    _this.formats = ['header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'blockquote', 'list', 'bullet', 'indent', 'link', 'image', 'color'];
    return _this;
  }

  _createClass(Richtextareaquill, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.attachQuillRefs();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      this.attachQuillRefs();
      if (prevProps.rteImageUrl !== this.props.rteImageUrl) {
        this.handleImageInsertion(this.props.rteImageUrl);
      }
    }
  }, {
    key: 'insertImage',
    value: function insertImage(props) {
      props.handleRTEImageClick();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          _props$config = _props.config,
          config = _props$config === undefined ? {} : _props$config,
          _props$Icon = _props.Icon,
          Icon = _props$Icon === undefined ? null : _props$Icon,
          inline = _props.inline,
          _props$formValues = _props.formValues,
          formValues = _props$formValues === undefined ? (0, _immutable.Map)() : _props$formValues;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$containerStyl = config.containerStyle,
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle;

      containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle;
      labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle;
      style = typeof style === 'string' ? JSON.parse(style) : style;
      iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle;

      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled;

      disabled = disabled || readonly;
      var value = formValues.get(name, '<p>&nbsp;</p>');
      var styles = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent'
        }, containerStyle),
        labelContainer: _extends({
          display: 'flex',
          flexDirection: 'row',
          width: inline ? 150 : '100%',
          minWidth: inline ? 150 : '100%',
          height: 15,
          marginTop: inline ? 4 : 0,
          background: 'transparent'
        }, labelStyle),
        label: _extends({
          display: 'flex',
          justifyContent: 'flex-start',
          lineHeight: inline ? '23px' : '15px',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          fontSize: inline ? '10pt' : '8pt',
          color: '#383e4b',
          background: 'transparent',
          marginRight: 5
        }, labelStyle),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle)
      };

      return this.props.connectDropTarget(_react2.default.createElement(
        'div',
        { style: styles.container },
        _react2.default.createElement(
          'div',
          { style: styles.labelContainer },
          required && _react2.default.createElement(
            'div',
            { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
            '*'
          ),
          Icon && _react2.default.createElement(Icon, { style: styles.icon }),
          _react2.default.createElement(
            'strong',
            { style: styles.label },
            label
          )
        ),
        _react2.default.createElement(CustomToolbar, null),
        _react2.default.createElement(_reactQuill2.default, {
          ref: function ref(el) {
            _this2.reactQuillRef = el;
          },
          defaultValue: value,
          onChange: this.handleChange,
          placeholder: this.props.placeholder,
          modules: this.modules,
          formats: this.formats,
          scrollingContainer: 'scrolling-container',
          theme: 'snow'
        })
      ));
    }
  }]);

  return Richtextareaquill;
}(_react2.default.Component);

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  };
}

var boxTarget = {
  drop: function drop(props, monitor) {
    return {
      widget: monitor.getItem()
    };
  }
};

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Richtextareaquill);