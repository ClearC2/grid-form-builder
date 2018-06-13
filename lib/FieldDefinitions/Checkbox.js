var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Map } from 'immutable';

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Checkbox);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnChange = function (e) {
      var _this$props = _this.props,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
          _this$props$handleOnC = _this$props.handleOnChange,
          handleOnChange = _this$props$handleOnC === undefined ? function () {} : _this$props$handleOnC,
          config = _this$props.config;
      var _config$name = config.name,
          name = _config$name === undefined ? null : _config$name;

      var value = formValues.get(name, '');
      if (typeof value === 'string') {
        value = value.toLowerCase() === 'yes' || value.toLowerCase() === 'on';
      }
      value = !value;
      handleOnChange({ target: { name: e.target.name, value: value } });
    }, _this.render = function () {
      var _this$props2 = _this.props,
          inline = _this$props2.inline,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu,
          _this$props2$config = _this$props2.config,
          config = _this$props2$config === undefined ? {} : _this$props2$config,
          _this$props2$Icon = _this$props2.Icon,
          Icon = _this$props2$Icon === undefined ? null : _this$props2$Icon,
          requiredWarning = _this$props2.requiredWarning;
      var _config$labelStyle = config.labelStyle,
          labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
          _config$style = config.style,
          style = _config$style === undefined ? {} : _config$style,
          _config$name2 = config.name,
          name = _config$name2 === undefined ? null : _config$name2,
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

      var value = formValues.get(name, '');
      if (typeof value === 'string') value = value.toLowerCase() === 'yes';
      value = !!value;
      var _config$readonly = config.readonly,
          readonly = _config$readonly === undefined ? false : _config$readonly,
          _config$disabled = config.disabled,
          disabled = _config$disabled === undefined ? false : _config$disabled;

      disabled = disabled || readonly;
      var warn = requiredWarning && formValues.get(name, '').length === 0 && required;

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
          height: inline ? 27 : 40,
          margin: 0,
          marginBottom: inline ? 5 : 0,
          alignItems: 'center',
          fontWeight: 'bold',
          fontSize: inline ? '10pt' : '8pt',
          lineHeight: '10pt',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis'
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

      return React.createElement(
        'div',
        { style: styles.container },
        React.createElement(
          'label',
          { style: styles.label },
          Icon && React.createElement(Icon, { style: styles.icon }),
          React.createElement('input', { className: 'checkbox-grid-input', onChange: _this.handleOnChange, style: styles.input, type: 'checkbox', name: name, checked: value, disabled: disabled, onKeyDown: onKeyDown }),
          label,
          required && React.createElement(
            'div',
            { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
            '* ',
            React.createElement(
              'span',
              { style: { fontWeight: 'normal', fontSize: '9pt' } },
              warn ? 'This Field Is Required' : ''
            )
          )
        )
      );
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Checkbox;
}(Component);

export default Checkbox;