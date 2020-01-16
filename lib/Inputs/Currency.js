'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cleave = require('../Cleave');

var _Cleave2 = _interopRequireDefault(_Cleave);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020

var Currency = function Currency(props) {
  var name = props.name,
      value = props.value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      autoComplete = props.autoComplete,
      _props$delimiter = props.delimiter,
      delimiter = _props$delimiter === undefined ? ',' : _props$delimiter,
      _props$prefix = props.prefix,
      prefix = _props$prefix === undefined ? '$' : _props$prefix,
      _props$numeralDecimal = props.numeralDecimalMark,
      numeralDecimalMark = _props$numeralDecimal === undefined ? '.' : _props$numeralDecimal,
      _props$interactive = props.interactive,
      interactive = _props$interactive === undefined ? true : _props$interactive;


  var input = (0, _react.useRef)();

  var handleOnChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    if (input.current) {
      newValue = input.current.getRawValue();
    }
    if (prefix) newValue = newValue.replace(prefix, '');
    onChange({
      target: {
        value: newValue,
        name: name
      }
    });
  }, [prefix, onChange, name]);

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled) className = className + ' gfb-disabled-input';
  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer' },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner' },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input__control' },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container' },
          _react2.default.createElement(_Cleave2.default, {
            ref: input,
            options: {
              numeral: true,
              prefix: prefix,
              numeralDecimalMark: numeralDecimalMark,
              delimiter: delimiter
            },
            className: className,
            name: name,
            value: value,
            onChange: handleOnChange,
            disabled: readonly || disabled,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            autoComplete: autoComplete
          })
        ),
        _react2.default.createElement('div', { className: 'gfb-input__indicators' })
      )
    )
  );
};
// import Cleave from 'cleave.js/react'
exports.default = Currency;


Currency.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string,
  delimiter: _propTypes2.default.string,
  prefix: _propTypes2.default.string,
  numeralDecimalMark: _propTypes2.default.string,
  interactive: _propTypes2.default.bool
};