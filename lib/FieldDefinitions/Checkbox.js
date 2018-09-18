'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Checkbox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _reactDnd = require('react-dnd');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Checkbox = exports.Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidUpdate = function (p) {
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
    }, _this.handleOnChange = function (e) {
      var _this$props5 = _this.props,
          _this$props5$formValu = _this$props5.formValues,
          formValues = _this$props5$formValu === undefined ? (0, _immutable.Map)() : _this$props5$formValu,
          _this$props5$handleOn = _this$props5.handleOnChange,
          handleOnChange = _this$props5$handleOn === undefined ? function () {} : _this$props5$handleOn,
          config = _this$props5.config;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          onValue = config.onValue,
          offValue = config.offValue;

      var value = formValues.get(name, '0'); // if the field value is undefined in the current form values, we are defaulting it to the c2 standard of a false string value of 0
      if (offValue && onValue) {
        if (value === offValue) value = onValue;else if (value === onValue) value = offValue;else value = onValue; // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
      } else if (onValue) {
        if (_this.falsey.indexOf(value) > -1) value = onValue;else value = ''; // put this weird check in to default off value to blank if only an onValue was provided
      } else if (offValue) {
        if (_this.truthy.indexOf(value) > -1) value = offValue;else value = '1'; // put this weird check in to default on value to 1 if only an offValue was provided
      } else {
        switch (value) {
          case true:
            value = false;break;
          case false:
            value = true;break;
          case 0:
            value = 1;break;
          case 1:
            value = 0;break;
          case '0':
            value = '1';break;
          case '1':
            value = '0';break;
          case 'true':
            value = 'false';break;
          case 'false':
            value = 'true';break;
          case 'True':
            value = 'False';break;
          case 'False':
            value = 'True';break;
          case 'TRUE':
            value = 'FALSE';break;
          case 'FALSE':
            value = 'TRUE';break;
          case 't':
            value = 'f';break;
          case 'f':
            value = 't';break;
          case 'T':
            value = 'F';break;
          case 'F':
            value = 'T';break;
          case 'y':
            value = 'n';break;
          case 'n':
            value = 'y';break;
          case 'Y':
            value = 'N';break;
          case 'N':
            value = 'Y';break;
          case 'Yes':
            value = 'No';break;
          case 'No':
            value = 'Yes';break;
          case 'YES':
            value = 'NO';break;
          case 'NO':
            value = 'YES';break;
          case 'yes':
            value = 'no';break;
          case 'no':
            value = 'yes';break;
          case 'On':
            value = 'Off';break;
          case 'Off':
            value = 'On';break;
          case 'ON':
            value = 'OFF';break;
          case 'OFF':
            value = 'ON';break;
          case 'on':
            value = 'off';break;
          case 'off':
            value = 'on';break;
          case '':
            value = '1';break; // default the opposite of blank as '1'
          default:
            value = !!e.target.value;
        }
      }
      handleOnChange({ target: { name: e.target.name, value: value } });
    }, _this.truthy = [true, 1, '1', 't', 'T', 'true', 'True', 'TRUE', 'y', 'Y', 'Yes', 'YES', 'yes', 'on', 'On', 'ON', _this.props.config.onValue || _this.props.config.name], _this.falsey = [false, 0, '0', 'f', 'F', 'false', 'False', 'FALSE', 'n', 'N', 'No', 'NO', 'no', 'off', 'Off', 'OFF', _this.props.config.offValue || ''], _this.render = function () {
      var _this$props6 = _this.props,
          inline = _this$props6.inline,
          _this$props6$formValu = _this$props6.formValues,
          formValues = _this$props6$formValu === undefined ? (0, _immutable.Map)() : _this$props6$formValu,
          _this$props6$config = _this$props6.config,
          config = _this$props6$config === undefined ? {} : _this$props6$config,
          _this$props6$Icon = _this$props6.Icon,
          Icon = _this$props6$Icon === undefined ? null : _this$props6$Icon,
          requiredWarning = _this$props6.requiredWarning,
          rowHeight = _this$props6.rowHeight,
          connectDropTarget = _this$props6.connectDropTarget,
          cascadingKeyword = _this$props6.cascadingKeyword,
          CascadeIcon = _this$props6.CascadeIcon,
          tabIndex = _this$props6.tabIndex;
      var _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
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
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl;

      containerStyle = typeof containerStyle === 'string' ? JSON.parse(containerStyle) : containerStyle;
      labelStyle = typeof labelStyle === 'string' ? JSON.parse(labelStyle) : labelStyle;
      style = typeof style === 'string' ? JSON.parse(style) : style;
      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

      disabled = disabled || readonly;
      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      placeholder = warn ? 'This Field Is Required' : placeholder;

      var styles = {
        container: _extends({
          display: 'flex',
          flex: 1,
          flexDirection: 'row',
          background: 'transparent',
          minWidth: 177
        }, containerStyle),
        label: _extends({
          display: 'flex',
          flex: 1,
          height: rowHeight || inline ? 27 : 40,
          margin: 0,
          marginBottom: inline ? 5 : 0,
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: inline ? '10pt' : '8pt',
          lineHeight: '10pt',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          color: !!cascadingKeyword && !CascadeIcon ? 'blue' : '#383e4b'
        }, labelStyle),
        input: _extends({
          display: 'flex',
          marginRight: 5,
          marginTop: 0
        }, style),
        icon: _extends({
          marginRight: 5,
          width: 15,
          height: 15,
          marginTop: -1
        }, iconStyle)
      };

      var value = formValues.get(name, '');

      if (_this.truthy.indexOf(value) > -1) value = true;else if (_this.falsey.indexOf(value) > -1) value = false;else value = false;

      return connectDropTarget(_react2.default.createElement(
        'div',
        { style: styles.container, onMouseUp: _this.handleAnywhereClick },
        _react2.default.createElement(
          'label',
          { style: styles.label, onMouseUp: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
          Icon && _react2.default.createElement(Icon, { style: styles.icon }),
          _react2.default.createElement('input', { className: 'checkbox-grid-input', onChange: _this.handleOnChange, style: styles.input, type: 'checkbox', name: name, checked: value, disabled: disabled, onKeyDown: onKeyDown, tabIndex: tabIndex }),
          label,
          _react2.default.createElement(
            'div',
            { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
            required && '*',
            placeholder && _react2.default.createElement(
              'span',
              { style: { fontWeight: 'normal', fontSize: '9pt', color: warn ? '#ec1c24' : '#383e4b', marginLeft: 5 } },
              placeholder
            )
          ),
          !!cascadingKeyword && !!CascadeIcon && _react2.default.createElement(CascadeIcon, { style: { marginLeft: 5 }, size: 14, onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        )
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Checkbox;
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(Checkbox);