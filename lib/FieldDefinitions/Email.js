'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _utils = require('../utils');

var _reactDnd = require('react-dnd');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Email = function (_Component) {
  _inherits(Email, _Component);

  function Email() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Email);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Email.__proto__ || Object.getPrototypeOf(Email)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      displayError: false
    }, _this.componentDidUpdate = function (p) {
      var _this$props = _this.props,
          didDrop = _this$props.didDrop,
          isOver = _this$props.isOver;

      if (didDrop && !p.didDrop && !isOver && p.isOver) {
        // if it was just previously over and dropped (this is to make this event only trigger once)
        var _this$props2 = _this.props,
            droppedItem = _this$props2.droppedItem,
            handleDragDropOnInput = _this$props2.handleDragDropOnInput,
            _this$props2$config = _this$props2.config,
            config = _this$props2$config === undefined ? {} : _this$props2$config,
            _this$props2$formValu = _this$props2.formValues,
            formValues = _this$props2$formValu === undefined ? (0, _immutable.Map)() : _this$props2$formValu;

        droppedItem = droppedItem === null ? null : droppedItem.widget;
        var currentValue = formValues.get(config.name, '');
        config = _extends({ currentValue: currentValue }, config);
        if (droppedItem && !p.droppedItem) {
          handleDragDropOnInput({
            source: droppedItem,
            target: config
          });
        }
      }
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
      if (_this.node.contains(e.target)) {
        _this.setState({ displayError: false });
        return;
      }

      _this.setState({ displayError: true });
    }, _this.handleAnywhereClick = function (e) {
      var _this$props3 = _this.props,
          _this$props3$handleAn = _this$props3.handleAnywhereClick,
          handleAnywhereClick = _this$props3$handleAn === undefined ? function () {
        return null;
      } : _this$props3$handleAn,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? (0, _immutable.Map)() : _this$props3$formValu;
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config, e);
    }, _this.handleCascadeKeywordClick = function () {
      var _this$props4 = _this.props,
          _this$props4$handleCa = _this$props4.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props4$handleCa === undefined ? function () {
        return null;
      } : _this$props4$handleCa,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? (0, _immutable.Map)() : _this$props4$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.generateValidationError = function (value) {
      if (value) return !(0, _utils.emailValidator)(value) && _this.state.displayError && '* Invalid email';
    }, _this.handleOnChange = function () {}, _this.handleLinkClick = function () {
      var _this$props5 = _this.props,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          handleLinkClick = _this$props5.handleLinkClick;
      var link = config.link;

      handleLinkClick(link);
    }, _this.render = function () {
      var _this$props6 = _this.props,
          inline = _this$props6.inline,
          _this$props6$formValu = _this$props6.formValues,
          formValues = _this$props6$formValu === undefined ? (0, _immutable.Map)() : _this$props6$formValu,
          _this$props6$handleOn = _this$props6.handleOnChange,
          handleOnChange = _this$props6$handleOn === undefined ? _this.handleOnChange : _this$props6$handleOn,
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          _this$props6$Icon = _this$props6.Icon,
          Icon = _this$props6$Icon === undefined ? null : _this$props6$Icon,
          requiredWarning = _this$props6.requiredWarning,
          connectDropTarget = _this$props6.connectDropTarget,
          cascadingKeyword = _this$props6.cascadingKeyword,
          CascadeIcon = _this$props6.CascadeIcon,
          tabIndex = _this$props6.tabIndex,
          LinkIcon = _this$props6.LinkIcon,
          autoComplete = _this$props6.autoComplete;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown,
          link = config.link;

      if (!name) {
        return null;
      }
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
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      var value = formValues.get(name, '');
      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

      disabled = disabled || readonly;
      var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};

      placeholder = warn ? '* This Field Is Required' : placeholder;
      var className = warn ? 'warn-required' : '';

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
          color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
          background: 'transparent',
          marginRight: 5
        }, labelStyle),
        input: _extends({
          display: 'flex',
          flexGrow: inline ? 1 : 0,
          paddingLeft: 5,
          backgroundColor: disabled ? '#eee' : 'white',
          borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          minWidth: 90,
          height: inline ? 'auto' : 25
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle),
        placeholder: {
          fontWeight: 'normal',
          fontSize: '9pt',
          marginLeft: 3,
          marginTop: -1,
          color: !(0, _utils.emailValidator)(value) && '#ec1c24',
          marginRight: 5
        },
        linkIconStyle: linkIconStyle
      };

      return connectDropTarget(_react2.default.createElement(
        'div',
        { style: styles.container, onMouseUp: _this.handleAnywhereClick },
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
            {
              style: styles.label,
              onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : link ? _this.handleLinkClick : null,
              className: !!cascadingKeyword && !CascadeIcon || link ? 'cursor-hand' : ''
            },
            label
          ),
          _react2.default.createElement(
            'span',
            { style: styles.placeholder },
            _this.generateValidationError(value)
          ),
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' }),
          !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this.handleLinkClick, className: 'cursor-hand', style: styles.linkIconStyle })
        ),
        _react2.default.createElement('input', {
          autoFocus: _this.props.config.autofocus,
          autoComplete: autoComplete,
          className: className,
          placeholder: placeholder,
          onMouseDown: _this.onMouseDown,
          onChange: handleOnChange,
          style: styles.input,
          ref: function ref(node) {
            _this.node = node;
          },
          type: 'text',
          name: name,
          value: value,
          disabled: disabled,
          onKeyDown: onKeyDown,
          tabIndex: tabIndex
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Email, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.onMouseDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.onMouseDown);
    }

    // This seems like an antipattern - a function and a prop named the same thing with the function
    // calling the prop provided function, maybe the component function should be called onCascadeKeywordClick???

  }]);

  return Email;
}(_react.Component);

Email.propTypes = {
  formValues: _propTypes2.default.object,
  config: _propTypes2.default.object,
  didDrop: _propTypes2.default.bool,
  isOver: _propTypes2.default.bool,
  droppedItem: _propTypes2.default.object,
  handleDragDropOnInput: _propTypes2.default.func,
  handleAnywhereClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  Icon: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  requiredWarning: _propTypes2.default.bool,
  connectDropTarget: _propTypes2.default.func,
  cascadingKeyword: _propTypes2.default.string,
  CascadeIcon: _propTypes2.default.func,
  tabIndex: _propTypes2.default.number,
  LinkIcon: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func,
  autoComplete: _propTypes2.default.string
};


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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Email);