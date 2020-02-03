'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

var _useTheme2 = require('../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Checkbox = function Checkbox(props) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      onValue = props.onValue,
      offValue = props.offValue,
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

  var truthy = (0, _react.useRef)([true, 1, '1', 't', 'T', 'true', 'True', 'TRUE', 'y', 'Y', 'Yes', 'YES', 'yes', 'on', 'On', 'ON', onValue || name]);

  var falsey = (0, _react.useRef)([// eslint-disable-line
  false, 0, '0', 'f', 'F', 'false', 'False', 'FALSE', 'n', 'N', 'No', 'NO', 'no', 'off', 'Off', 'OFF', offValue || '']);

  var handleOnChange = (0, _react.useCallback)(function (e) {
    var oppositeOfCurrentValue = null;
    if (offValue && onValue) {
      if (value === offValue) oppositeOfCurrentValue = onValue;else if (value === onValue) oppositeOfCurrentValue = offValue;else oppositeOfCurrentValue = onValue; // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
    } else if (onValue) {
      if (undefined.falsey.indexOf(value) > -1) oppositeOfCurrentValue = onValue;else oppositeOfCurrentValue = ''; // put this weird check in to default off value to blank if only an onValue was provided
    } else if (offValue) {
      if (undefined.truthy.indexOf(value) > -1) oppositeOfCurrentValue = offValue;else oppositeOfCurrentValue = '1'; // put this weird check in to default on value to 1 if only an offValue was provided
    } else {
      switch (value) {
        case true:
          oppositeOfCurrentValue = false;break;
        case false:
          oppositeOfCurrentValue = true;break;
        case 0:
          oppositeOfCurrentValue = 1;break;
        case 1:
          oppositeOfCurrentValue = 0;break;
        case '0':
          oppositeOfCurrentValue = '1';break;
        case '1':
          oppositeOfCurrentValue = '0';break;
        case 'true':
          oppositeOfCurrentValue = 'false';break;
        case 'false':
          oppositeOfCurrentValue = 'true';break;
        case 'True':
          oppositeOfCurrentValue = 'False';break;
        case 'False':
          oppositeOfCurrentValue = 'True';break;
        case 'TRUE':
          oppositeOfCurrentValue = 'FALSE';break;
        case 'FALSE':
          oppositeOfCurrentValue = 'TRUE';break;
        case 't':
          oppositeOfCurrentValue = 'f';break;
        case 'f':
          oppositeOfCurrentValue = 't';break;
        case 'T':
          oppositeOfCurrentValue = 'F';break;
        case 'F':
          oppositeOfCurrentValue = 'T';break;
        case 'y':
          oppositeOfCurrentValue = 'n';break;
        case 'n':
          oppositeOfCurrentValue = 'y';break;
        case 'Y':
          oppositeOfCurrentValue = 'N';break;
        case 'N':
          oppositeOfCurrentValue = 'Y';break;
        case 'Yes':
          oppositeOfCurrentValue = 'No';break;
        case 'No':
          oppositeOfCurrentValue = 'Yes';break;
        case 'YES':
          oppositeOfCurrentValue = 'NO';break;
        case 'NO':
          oppositeOfCurrentValue = 'YES';break;
        case 'yes':
          oppositeOfCurrentValue = 'no';break;
        case 'no':
          oppositeOfCurrentValue = 'yes';break;
        case 'On':
          oppositeOfCurrentValue = 'Off';break;
        case 'Off':
          oppositeOfCurrentValue = 'On';break;
        case 'ON':
          oppositeOfCurrentValue = 'OFF';break;
        case 'OFF':
          oppositeOfCurrentValue = 'ON';break;
        case 'on':
          oppositeOfCurrentValue = 'off';break;
        case 'off':
          oppositeOfCurrentValue = 'on';break;
        case '':
          oppositeOfCurrentValue = '1';break; // default the opposite of blank as '1'
        default:
          oppositeOfCurrentValue = !!e.target.value;
      }
    }
    onChange({ target: { name: e.target.name, value: oppositeOfCurrentValue } });
  }, [offValue, onChange, onValue, value]);

  var checked = false;
  if (truthy.current.indexOf(value) > -1) checked = true;

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control gfb-boxless-input';
  var validationError = void 0;
  if (required && requiredWarning && (value + '').length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return (0, _core.jsx)(
    'div',
    { className: 'gfb-input-outer', style: inputOuter, css: theme.inputOuter },
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
            checked: checked,
            onChange: handleOnChange,
            disabled: readonly || disabled || !interactive,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            type: 'checkbox',
            autoComplete: autoComplete,
            style: valueStyle,
            css: theme.value
          })
        ),
        (0, _core.jsx)(
          'div',
          { className: 'gfb-input__indicators', style: indicators },
          validationError && (0, _core.jsx)(_ValidationErrorIcon2.default, { message: validationError })
        )
      )
    )
  );
}; /** @jsx jsx */
exports.default = Checkbox;


Checkbox.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  onValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool]),
  offValue: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.bool]),
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};