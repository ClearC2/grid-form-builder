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

var Number = function Number(props) {
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
      prefix = _props$prefix === undefined ? '' : _props$prefix,
      _props$numeralDecimal = props.numeralDecimalMark,
      numeralDecimalMark = _props$numeralDecimal === undefined ? '.' : _props$numeralDecimal,
      _props$maximum = props.maximum,
      maximum = _props$maximum === undefined ? 9007199254740991 : _props$maximum,
      _props$minimum = props.minimum,
      minimum = _props$minimum === undefined ? -9007199254740991 : _props$minimum,
      _props$decimals = props.decimals,
      decimals = _props$decimals === undefined ? 0 : _props$decimals;


  var input = (0, _react.useRef)();

  var handleOnChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    if (input.current) {
      newValue = input.current.getRawValue();
    }
    if (prefix) newValue = newValue.replace(prefix, '');
    if (isNaN(+newValue) || +newValue > maximum || +newValue < minimum) {
      // if our value is not within our bounds, do not update the value
      newValue = value;
      if (input.current) {
        // if we have the ref of the cleave input, let's update its state back to a valid number so the user does not get confused
        window.setTimeout(function () {
          input.current.setState({ value: input.current.lastInputValue });
        }, 5); // the package has its own timeout in it which breaks the react lifecycle, so we need to play dirty too - JRA 01/15/2020
      }
    }
    onChange({
      target: {
        value: newValue,
        name: name
      }
    });
  }, [value, prefix, onChange, name, maximum, minimum]);

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
              delimiter: delimiter,
              numeralDecimalScale: decimals
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
exports.default = Number;


Number.propTypes = {
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
  maximum: _propTypes2.default.number,
  minimum: _propTypes2.default.number,
  decimals: _propTypes2.default.number
};