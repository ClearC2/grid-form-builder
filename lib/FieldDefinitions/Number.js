var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';
import { DropTarget } from 'react-dnd';

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
            formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu;

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
    }, _this.handleAnywhereClick = function () {
      var _this$props3 = _this.props,
          _this$props3$handleAn = _this$props3.handleAnywhereClick,
          handleAnywhereClick = _this$props3$handleAn === undefined ? function () {
        return null;
      } : _this$props3$handleAn,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? Map() : _this$props3$formValu;
      var _this$props$config = _this.props.config,
          config = _this$props$config === undefined ? {} : _this$props$config;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleAnywhereClick(config);
    }, _this.handleCascadeKeywordClick = function (e) {
      var _this$props4 = _this.props,
          _this$props4$handleCa = _this$props4.handleCascadeKeywordClick,
          handleCascadeKeywordClick = _this$props4$handleCa === undefined ? function () {
        return null;
      } : _this$props4$handleCa,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? Map() : _this$props4$formValu;
      var _this$props$config2 = _this.props.config,
          config = _this$props$config2 === undefined ? {} : _this$props$config2;

      var currentValue = formValues.get(config.name, '');
      config = _extends({ currentValue: currentValue }, config);
      handleCascadeKeywordClick(config);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.validate = function (value, validation) {
      var lowerBound = validation.hasOwnProperty('lowerBound') && validation.lowerBound;
      var upperBound = validation.hasOwnProperty('upperBound') && validation.upperBound;

      if (lowerBound !== false && upperBound !== false) {
        if (value >= lowerBound && value <= upperBound) {
          return true;
        }
      } else if (lowerBound !== false && value >= lowerBound) {
        return true;
      } else if (upperBound !== false && value <= upperBound) {
        return true;
      }

      return false;
    }, _this.getWarningMessage = function (validation) {
      var lowerBound = validation.hasOwnProperty('lowerBound') && validation.lowerBound;
      var upperBound = validation.hasOwnProperty('upperBound') && validation.upperBound;

      if (lowerBound !== false && upperBound !== false) {
        return '* Value must be between ' + lowerBound + ' and ' + upperBound;
      } else if (lowerBound !== false) {
        return '* Value must be greater than or equal to ' + lowerBound;
      } else if (upperBound !== false) {
        return '* Value must be less than or equal to ' + upperBound;
      } else {
        return '* This Field Is Required';
      }
    }, _this.render = function () {
      var _this$props5 = _this.props,
          inline = _this$props5.inline,
          _this$props5$formValu = _this$props5.formValues,
          formValues = _this$props5$formValu === undefined ? Map() : _this$props5$formValu,
          _this$props5$handleOn = _this$props5.handleOnChange,
          handleOnChange = _this$props5$handleOn === undefined ? function () {} : _this$props5$handleOn,
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
          _config$validation = config.validation,
          validation = _config$validation === undefined ? {} : _config$validation,
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

      var value = formValues.get(name, '');
      var validateValue = Object.keys(validation).length > 0;
      var validValue = validateValue ? _this.validate(value, validation) : true;
      var warn = requiredWarning && (required || validateValue) && (!validValue && value.length > 0 || required && value.length === 0);
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled,
          _config$placeholder = config.placeholder,
          placeholder = _config$placeholder === undefined ? '' : _config$placeholder;

      disabled = disabled || readonly;

      placeholder = warn ? _this.getWarningMessage(validation) : placeholder;
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
        }, iconStyle)
      };

      return connectDropTarget(React.createElement(
        'div',
        { style: styles.container, onMouseUp: _this.handleAnywhereClick },
        React.createElement(
          'div',
          { style: styles.labelContainer },
          required && React.createElement(
            'div',
            { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
            '*'
          ),
          Icon && React.createElement(Icon, { style: styles.icon }),
          React.createElement(
            'strong',
            { style: styles.label, onClick: !!cascadingKeyword && !CascadeIcon ? _this.handleCascadeKeywordClick : null, className: !!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : '' },
            label
          ),
          value !== '' && React.createElement(
            'span',
            { style: { fontWeight: 'normal', fontSize: '9pt', marginLeft: 3, marginTop: -1, color: warn ? '#ec1c24' : '#383e4b', marginRight: 5 } },
            placeholder
          ),
          !!cascadingKeyword && !!CascadeIcon && React.createElement(CascadeIcon, { onClick: _this.handleCascadeKeywordClick, className: 'cursor-hand' })
        ),
        React.createElement('input', {
          className: className,
          placeholder: placeholder,
          onMouseDown: _this.onMouseDown,
          onChange: handleOnChange,
          style: styles.input,
          type: 'number',
          name: name,
          value: value,
          disabled: disabled,
          onKeyDown: onKeyDown
        })
      ));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Input;
}(Component);

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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Input);