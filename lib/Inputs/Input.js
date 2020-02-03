'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @jsx jsx */


var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

var _useTheme2 = require('../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Input = function Input(props) {
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

  var _useTheme = (0, _useTheme3.default)(),
      theme = _useTheme.theme;

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

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError = void 0;
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }
  var outerClass = 'gfb-input-outer';
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  return (0, _core.jsx)(
    'div',
    { className: outerClass, style: inputOuter, css: theme.inputOuter },
    (0, _core.jsx)(
      'div',
      { className: 'gfb-input-inner', style: inputInner, css: theme.inputInner },
      (0, _core.jsx)(
        'div',
        { className: controlClass, style: inputControl, css: theme.inputControl },
        (0, _core.jsx)(
          'div',
          { className: 'gfb-input__value-container', style: valueContainer, css: theme.valueContainer },
          (0, _core.jsx)('input', {
            className: className,
            name: name,
            value: value,
            onChange: onChange,
            disabled: readonly || disabled || !interactive,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            autoComplete: autoComplete,
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            style: valueStyle,
            css: theme.value
          })
        ),
        (0, _core.jsx)(
          'div',
          { className: 'gfb-input__indicators', style: indicators, css: theme.indicators },
          validationError && (0, _core.jsx)(_ValidationErrorIcon2.default, { message: validationError })
        )
      )
    )
  );
};

exports.default = Input;


Input.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};