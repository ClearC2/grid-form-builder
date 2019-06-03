'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Datetime = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

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

var Datetime = exports.Datetime = function (_Component) {
  _inherits(Datetime, _Component);

  function Datetime() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Datetime);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Datetime.__proto__ || Object.getPrototypeOf(Datetime)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      focus: false,
      value: ''
    }, _this.handleValueUpdated = function (value, format) {
      value = format && (0, _moment2.default)(value).isValid() ? (0, _moment2.default)(value).format('M/D/YYYY h:mm a') : value;
      _this.setState(function () {
        return { value: value };
      });
    }, _this.componentDidMount = function () {
      var _this$props = _this.props,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? (0, _immutable.Map)() : _this$props$formValue,
          _this$props$config = _this$props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      var value = formValues.get(name, '');
      _this.handleValueUpdated(value, true);
    }, _this.componentDidUpdate = function (p) {
      var _this$props2 = _this.props,
          didDrop = _this$props2.didDrop,
          isOver = _this$props2.isOver,
          _this$props2$formValu = _this$props2.formValues,
          fV = _this$props2$formValu === undefined ? (0, _immutable.Map)() : _this$props2$formValu,
          _this$props2$config = _this$props2.config,
          c = _this$props2$config === undefined ? {} : _this$props2$config;
      var _c$name = c.name,
          n = _c$name === undefined ? null : _c$name;
      var _p$formValues = p.formValues,
          formValues = _p$formValues === undefined ? (0, _immutable.Map)() : _p$formValues,
          _p$config = p.config,
          config = _p$config === undefined ? {} : _p$config;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2;

      var v = fV.get(n, '');
      var value = formValues.get(name, '');
      if (v !== value) {
        _this.handleValueUpdated(v, true);
      }
      if (didDrop && !p.didDrop && !isOver && p.isOver) {
        // if it was just previously over and dropped (this is to make this event only trigger once)
        var _this$props3 = _this.props,
            droppedItem = _this$props3.droppedItem,
            handleDragDropOnInput = _this$props3.handleDragDropOnInput,
            _this$props3$config = _this$props3.config,
            _config = _this$props3$config === undefined ? {} : _this$props3$config,
            _this$props3$formValu = _this$props3.formValues,
            _formValues = _this$props3$formValu === undefined ? (0, _immutable.Map)() : _this$props3$formValu;

        droppedItem = droppedItem === null ? null : droppedItem.widget;
        var currentValue = _formValues.get(_config.name, '');
        _config = _extends({ currentValue: currentValue }, _config);
        if (droppedItem && !p.droppedItem) {
          handleDragDropOnInput({
            source: droppedItem,
            target: _config
          });
        }
      }
    }, _this.handleAnywhereClick = function (e) {
      var _this$props4 = _this.props,
          _this$props4$handleAn = _this$props4.handleAnywhereClick,
          handleAnywhereClick = _this$props4$handleAn === undefined ? function () {
        return null;
      } : _this$props4$handleAn,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? (0, _immutable.Map)() : _this$props4$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config, e);
    }, _this.handleCascadeKeywordClick = function (e) {
      var _this$props5 = _this.props,
          _this$props5$handleCa = _this$props5.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props5$handleCa === undefined ? function () {
        return null;
      } : _this$props5$handleCa,
          _this$props5$formValu = _this$props5.formValues,
          formValues = _this$props5$formValu === undefined ? (0, _immutable.Map)() : _this$props5$formValu;
      var _this$props$config3 = _this.props.config,
          config = _this$props$config3 === undefined ? {} : _this$props$config3;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.handleChange = function (val) {
      if (_this.state.focus) _this.input.focus();
      _this.handleValueUpdated(val);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.onViewModeChange = function (type) {
      if (type === 'time') _this.setState({ focus: true }, _this.onNavigateBack);else _this.setState({ focus: false }, _this.onNavigateBack);
    }, _this.onNavigateBack = function () {
      return _this.input.focus();
    }, _this.onNavigateForward = function () {
      return _this.input.focus();
    }, _this.debounceBlur = null, _this.handleOnBlur = function () {
      clearTimeout(_this.debounceBlur);
      _this.debounceBlur = setTimeout(function () {
        var value = _this.state.value;
        var _this$props6 = _this.props,
            handleOnChange = _this$props6.handleOnChange,
            _this$props6$config = _this$props6.config,
            config = _this$props6$config === undefined ? {} : _this$props6$config,
            _this$props6$formValu = _this$props6.formValues,
            formValues = _this$props6$formValu === undefined ? (0, _immutable.Map)() : _this$props6$formValu;
        var _config$name3 = config.name,
            name = _config$name3 === undefined ? null : _config$name3;

        if (typeof value.format === 'function') {
          value = value.format('M/D/YYYY hh:mm a');
        }
        if ((0, _moment2.default)(value).isValid()) {
          handleOnChange({
            target: {
              name: name,
              value: value
            }
          });
        } else {
          var _value = formValues.get(name, '');
          _this.handleValueUpdated(_value, true);
        }
      }, 250);
    }, _this.render = function () {
      var _this$props7 = _this.props,
          inline = _this$props7.inline,
          _this$props7$formValu = _this$props7.formValues,
          formValues = _this$props7$formValu === undefined ? (0, _immutable.Map)() : _this$props7$formValu,
          _this$props7$config = _this$props7.config,
          config = _this$props7$config === undefined ? {} : _this$props7$config,
          _this$props7$Icon = _this$props7.Icon,
          Icon = _this$props7$Icon === undefined ? null : _this$props7$Icon,
          requiredWarning = _this$props7.requiredWarning,
          connectDropTarget = _this$props7.connectDropTarget,
          cascadingKeyword = _this$props7.cascadingKeyword,
          CascadeIcon = _this$props7.CascadeIcon,
          tabIndex = _this$props7.tabIndex;
      var _config$name4 = config.name,
          name = _config$name4 === undefined ? null : _config$name4,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown;
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
        }, iconStyle)
      };

      var className = inline ? 'date-wrapper-grid-input date-wrapper-grid-input-inline' : 'date-wrapper-grid-input';
      className = !warn ? className : className + ' warn-required';
      var inputClass = warn ? 'warn-required' : '';
      placeholder = warn ? '* This Field Is Required' : placeholder;

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
              onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null,
              className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''
            },
            label
          ),
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        ),
        _react2.default.createElement(_reactDatetime2.default, {
          className: className,
          closeOnSelect: true,
          dateFormat: 'M/D/YYYY',
          onChange: _this.handleChange,
          onMouseDown: _this.onMouseDown,
          onNavigateBack: _this.onNavigateBack,
          onNavigateForward: _this.onNavigateForward,
          onViewModeChange: _this.onViewModeChange,
          value: _this.state.value,
          inputProps: {
            disabled: disabled,
            placeholder: placeholder,
            className: inputClass,
            style: _extends({ backgroundColor: disabled ? '#eeeeee' : 'transparent' }, style),
            tabIndex: tabIndex,
            ref: function ref(_ref2) {
              _this.input = _ref2;
            },
            onBlurCapture: _this.handleOnBlur
          },
          onKeyDown: onKeyDown,
          onBlur: _this.handleOnBlur
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Datetime;
}(_react.Component);

Datetime.propTypes = {
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
  Icon: _propTypes2.default.node,
  requiredWarning: _propTypes2.default.bool,
  connectDropTarget: _propTypes2.default.func,
  cascadingKeyword: _propTypes2.default.string,
  CascadeIcon: _propTypes2.default.func,
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Datetime);