var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import DateTime from 'react-datetime';
import { Map } from 'immutable';

var Date = function (_Component) {
  _inherits(Date, _Component);

  function Date() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Date);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Date.__proto__ || Object.getPrototypeOf(Date)).call.apply(_ref, [this].concat(args))), _this), _this.handleChange = function (val) {
      var _this$props$handleOnC = _this.props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC;

      var field = _this.props.config.name;
      var value = (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? val.format('M/D/YYYY') : val;
      var e = { target: { name: field, value: value } };
      handleOnChange(e);
    }, _this.onMouseDown = function (e) {
      if (_this.props.draggable) e.stopPropagation();
    }, _this.render = function () {
      var _this$props = _this.props,
          inline = _this$props.inline,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
          _this$props$config = _this$props.config,
          config = _this$props$config === undefined ? {} : _this$props$config,
          _this$props$Icon = _this$props.Icon,
          Icon = _this$props$Icon === undefined ? null : _this$props$Icon,
          requiredWarning = _this$props.requiredWarning;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$name = config.name,
          name = _config$name === undefined ? null : _config$name,
          _config$iconStyle = config.iconStyle,
          iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
          _config$required = config.required,
          required = _config$required === undefined ? false : _config$required,
          _config$containerStyl = config.containerStyle,
          containerStyle = _config$containerStyl === undefined ? {} : _config$containerStyl,
          _config$onKeyDown = config.onKeyDown,
          onKeyDown = _config$onKeyDown === undefined ? function () {
        return null;
      } : _config$onKeyDown;

      if (!name) return null;
      var _config$label = config.label,
          label = _config$label === undefined ? name : _config$label;

      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled;

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
          color: '#383e4b'
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
      var placeholder = warn ? '* This Field Is Required' : '';

      return React.createElement(
        'div',
        { style: styles.container },
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
            { style: styles.label },
            label
          )
        ),
        React.createElement(DateTime, {
          onMouseDown: _this.onMouseDown,
          value: formValues.get(name, ''),
          onChange: _this.handleChange,
          dateFormat: 'M/D/YYYY',
          timeFormat: false,
          className: className,
          inputProps: {
            disabled: disabled,
            placeholder: placeholder,
            className: inputClass
          },
          onKeyDown: onKeyDown
        })
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Date;
}(Component);

export default Date;