'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
// import Cleave from 'cleave.js/react'


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Cleave = require('../Cleave');

var _Cleave2 = _interopRequireDefault(_Cleave);

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020

var Number = function Number(props) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
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
      decimals = _props$decimals === undefined ? 0 : _props$decimals,
      _props$interactive = props.interactive,
      interactive = _props$interactive === undefined ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style,
      required = props.required;
  var _style$value = style.value,
      valueStyle = _style$value === undefined ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === undefined ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === undefined ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === undefined ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === undefined ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === undefined ? {} : _style$indicators;


  var input = (0, _react.useRef)();

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var handleOnFocus = (0, _react.useCallback)(function () {
    setIsFocused(true);
  }, []);

  var handleOnBlur = (0, _react.useCallback)(function () {
    setIsFocused(false);
  }, []);

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
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError = void 0;
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer', style: inputOuter },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner', style: inputInner },
      _react2.default.createElement(
        'div',
        { className: controlClass, style: inputControl },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container', style: valueContainer },
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
            disabled: readonly || disabled || !interactive,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            autoComplete: autoComplete,
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            style: valueStyle
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__indicators', style: indicators },
          validationError && _react2.default.createElement(_ValidationErrorIcon2.default, { message: validationError })
        )
      )
    )
  );
};

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
  decimals: _propTypes2.default.number,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};