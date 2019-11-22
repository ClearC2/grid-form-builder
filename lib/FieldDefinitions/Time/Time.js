'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Date = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TimeBuilder = require('./TimeBuilder');

var _immutable = require('immutable');

var _reactDnd = require('react-dnd');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Date = exports.Date = function (_Component) {
  _inherits(Date, _Component);

  function Date() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Date);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Date.__proto__ || Object.getPrototypeOf(Date)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidUpdate = function (p) {
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
    }, _this.handleOnChange = function (val) {
      _this.input.focus();
      var _this$props$handleOnC = _this.props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC;
      var _this$props$config3 = _this.props.config,
          name = _this$props$config3.name,
          _this$props$config3$t = _this$props$config3.timeFormat,
          timeFormat = _this$props$config3$t === undefined ? 'hh:mm a' : _this$props$config3$t;

      var value = (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? val.format(timeFormat) : val;
      var e = { target: { name: name, value: value } };
      handleOnChange(e);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.handleLinkClick = function () {
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
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          _this$props6$Icon = _this$props6.Icon,
          Icon = _this$props6$Icon === undefined ? null : _this$props6$Icon,
          requiredWarning = _this$props6.requiredWarning,
          connectDropTarget = _this$props6.connectDropTarget,
          cascadingKeyword = _this$props6.cascadingKeyword,
          CascadeIcon = _this$props6.CascadeIcon,
          tabIndex = _this$props6.tabIndex,
          LinkIcon = _this$props6.LinkIcon;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown,
          link = config.link,
          _config$timeFormat = config.timeFormat,
          timeFormat = _config$timeFormat === undefined ? 'hh:mm a' : _config$timeFormat;
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

      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

      disabled = disabled || readonly;
      var linkIconStyle = link && _typeof(link.style) === 'object' ? link.style : {};

      var styles = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: inline ? 'row' : 'column',
          background: 'transparent',
          paddingBottom: 5
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
          background: 'transparent',
          color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b',
          marginRight: 5
        }, labelStyle),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 3 : -1
        }, iconStyle),
        linkIconStyle: linkIconStyle
      };

      var className = inline ? 'date-wrapper-grid-input date-wrapper-grid-input-inline' : 'date-wrapper-grid-input';
      className = !warn ? className : className + ' warn-required';
      var inputClass = warn ? 'warn-required' : '';
      placeholder = warn ? '* This Field Is Required' : placeholder;
      var formattedValue = function formattedValue(value) {
        return (0, _moment2.default)(value, timeFormat);
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
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' }),
          !!link && !!LinkIcon && _react2.default.createElement(LinkIcon, { onClick: _this.handleLinkClick, className: 'cursor-hand', style: styles.linkIconStyle })
        ),
        _react2.default.createElement(_TimeBuilder.DateTime, {
          className: className,
          onChange: _this.handleOnChange,
          onKeyDown: onKeyDown,
          onMouseDown: _this.onMouseDown,
          timeFormat: timeFormat,
          value: formattedValue(formValues.get(name, '')),
          inputProps: {
            className: inputClass,
            disabled: disabled,
            placeholder: placeholder,
            setRef: function setRef(ref) {
              _this.input = ref;
            },
            style: _extends({ backgroundColor: disabled ? '#eeeeee' : 'transparent' }, style),
            tabIndex: tabIndex
          }
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Date;
}(_react.Component);

Date.propTypes = {
  CascadeIcon: _propTypes2.default.func,
  cascadingKeyword: _propTypes2.default.string,
  config: _propTypes2.default.object,
  connectDropTarget: _propTypes2.default.func,
  didDrop: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  droppedItem: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  handleAnywhereClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  handleDragDropOnInput: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  Icon: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.node]),
  inline: _propTypes2.default.bool,
  isOver: _propTypes2.default.bool,
  LinkIcon: _propTypes2.default.func,
  requiredWarning: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Date);