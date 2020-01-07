'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import {DropTarget} from 'react-dnd'


var Input = function (_Component) {
  _inherits(Input, _Component);

  function Input() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Input);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Input.__proto__ || Object.getPrototypeOf(Input)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidUpdate = function (p) {
      // const {didDrop, isOver} = this.props
      // if (didDrop && !p.didDrop && !isOver && p.isOver) {
      //   // if it was just previously over and dropped (this is to make this event only trigger once)
      //   let {droppedItem, handleDragDropOnInput, config = {}, formValues = Map()} = this.props
      //   droppedItem = droppedItem === null ? null : droppedItem.widget
      //   const currentValue = formValues.get(config.name, '')
      //   config = {currentValue, ...config}
      //   if (droppedItem && !p.droppedItem) {
      //     handleDragDropOnInput({
      //       source: droppedItem,
      //       target: config
      //     })
      //   }
      // }
    }, _this.handleAnywhereClick = function (e) {
      var _this$props = _this.props,
          _this$props$handleAny = _this$props.handleAnywhereClick,
          handleAnywhereClick = _this$props$handleAny === undefined ? function () {
        return null;
      } : _this$props$handleAny,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? (0, _immutable.Map)() : _this$props$formValue;
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config, e);
    }, _this.handleCascadeKeywordClick = function (e) {
      var _this$props2 = _this.props,
          _this$props2$handleCa = _this$props2.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props2$handleCa === undefined ? function () {
        return null;
      } : _this$props2$handleCa,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? (0, _immutable.Map)() : _this$props2$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.handleLinkClick = function () {
      var _this$props3 = _this.props,
          _this$props3$config = _this$props3.config,
          config = _this$props3$config === undefined ? {} : _this$props3$config,
          handleLinkClick = _this$props3.handleLinkClick;
      var link = config.link;

      handleLinkClick(link);
    }, _this.render = function () {
      var _this$props4 = _this.props,
          inline = _this$props4.inline,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? (0, _immutable.Map)() : _this$props4$formValu,
          _this$props4$handleOn = _this$props4.handleOnChange,
          handleOnChange = _this$props4$handleOn === undefined ? function () {} : _this$props4$handleOn,
          _this$props4$config = _this$props4.config,
          config = _this$props4$config === undefined ? {} : _this$props4$config,
          _this$props4$Icon = _this$props4.Icon,
          Icon = _this$props4$Icon === undefined ? null : _this$props4$Icon,
          requiredWarning = _this$props4.requiredWarning,
          cascadingKeyword = _this$props4.cascadingKeyword,
          CascadeIcon = _this$props4.CascadeIcon,
          tabIndex = _this$props4.tabIndex,
          interactive = _this$props4.interactive,
          autoComplete = _this$props4.autoComplete,
          LinkIcon = _this$props4.LinkIcon;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown,
          inputType = config.inputType,
          link = config.link;
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
          height: inline ? 'auto' : 25,
          color: !interactive ? 'green' : '#333'
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle),
        linkIconStyle: linkIconStyle
      };

      return _react2.default.createElement(
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
          type: inputType || 'text',
          name: name,
          value: value,
          disabled: disabled,
          onKeyDown: onKeyDown,
          tabIndex: tabIndex,
          'data-testid': name + '-input'
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Input;
}(_react.Component);

// function collect (connect, monitor) {
//   return {
//     connectDropTarget: connect.dropTarget(),
//     droppedItem: monitor.getDropResult(),
//     didDrop: monitor.didDrop(),
//     isOver: monitor.isOver()
//   }
// }

// const boxTarget = {
//   drop (props, monitor) {
//     return {
//       widget: monitor.getItem()
//     }
//   }
// }

Input.propTypes = {
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
  interactive: _propTypes2.default.bool,
  autoComplete: _propTypes2.default.string,
  LinkIcon: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func
};
exports.default = Input;