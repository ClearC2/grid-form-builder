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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Currency = function (_Component) {
  _inherits(Currency, _Component);

  function Currency() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Currency);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Currency.__proto__ || Object.getPrototypeOf(Currency)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      alignRight: false
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
    }, _this.handleCascadeKeywordClick = function (e) {
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
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
      if (_this.node.contains(e.target)) {
        _this.setState({ alignRight: false });
        return;
      }

      _this.setState({ alignRight: true });
    }, _this.removeLeadingZeros = function (number) {
      return number.replace(/^0+([0-9]+)/, '$1');
    }, _this.formatDollar = function (dollars) {
      return parseFloat(dollars).toLocaleString('en');
    }, _this.addDecimalToNumber = function (number) {
      var centsStartingPosition = number.length - 2;
      var dollars = _this.removeLeadingZeros(number.substring(0, centsStartingPosition));
      var formattedDollar = _this.formatDollar(dollars);

      var cents = number.substring(centsStartingPosition);
      return formattedDollar + '.' + cents;
    }, _this.getDigitsFromValue = function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      return value.replace(/(-(?!\d))|[^0-9|-]/g, '') || '';
    }, _this.padDigits = function (digits) {
      var desiredLength = 3;
      var actualLength = digits.length;

      if (actualLength >= desiredLength) {
        return digits;
      }

      var amountToAdd = desiredLength - actualLength;
      var padding = '0'.repeat(amountToAdd);

      return padding + digits;
    }, _this.toCurrency = function (value) {
      var digits = _this.getDigitsFromValue(value);
      var digitsWithPadding = _this.padDigits(digits);

      return '$' + _this.addDecimalToNumber(digitsWithPadding);
    }, _this.handleOnChange = function (val) {
      var _this$props$handleOnC = _this.props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {
        return null;
      } : _this$props$handleOnC;

      var name = val.target.name;
      var value = _this.toCurrency(val.target.value);

      var e = { target: { name: name, value: value } };
      handleOnChange(e);
    }, _this.render = function () {
      var _this$props5 = _this.props,
          inline = _this$props5.inline,
          _this$props5$formValu = _this$props5.formValues,
          formValues = _this$props5$formValu === undefined ? (0, _immutable.Map)() : _this$props5$formValu,
          _this$props5$config = _this$props5.config,
          config = _this$props5$config === undefined ? {} : _this$props5$config,
          _this$props5$Icon = _this$props5.Icon,
          Icon = _this$props5$Icon === undefined ? null : _this$props5$Icon,
          requiredWarning = _this$props5.requiredWarning,
          connectDropTarget = _this$props5.connectDropTarget,
          cascadingKeyword = _this$props5.cascadingKeyword,
          CascadeIcon = _this$props5.CascadeIcon;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown;

      if (!name) return null;
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
          paddingRight: 5,
          backgroundColor: disabled ? '#eee' : 'white',
          borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
          minWidth: 90,
          height: inline ? 'auto' : 25,
          textAlign: _this.state.alignRight ? 'right' : 'left'
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: inline ? 4 : -1
        }, iconStyle)
      };

      return connectDropTarget(_react2.default.createElement(
        'div',
        { style: styles.container, onMouseUp: _this.handleAnywhereClick, ref: function ref(node) {
            return _this.node = node;
          } },
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
            { style: styles.label, onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
            label
          ),
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        ),
        _react2.default.createElement('input', {
          className: className,
          placeholder: placeholder,
          onMouseDown: _this.onMouseDown,
          onChange: _this.handleOnChange,
          style: styles.input,
          type: 'text',
          pattern: '\\d*',
          name: name,
          value: value,
          disabled: disabled,
          onKeyDown: onKeyDown
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Currency, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('mousedown', this.onMouseDown);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('mousedown', this.onMouseDown);
    }
  }]);

  return Currency;
}(_react.Component);

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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Currency);