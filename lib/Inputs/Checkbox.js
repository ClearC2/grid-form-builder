import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";

var _this = this;

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';

var Checkbox = function Checkbox(props) {
  var _context3;

  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
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
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required;
  var _style$value = style.value,
      valueStyle = _style$value === void 0 ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === void 0 ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === void 0 ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === void 0 ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === void 0 ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === void 0 ? {} : _style$indicators;

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var truthy = useRef([true, 1, '1', 't', 'T', 'true', 'True', 'TRUE', 'y', 'Y', 'Yes', 'YES', 'yes', 'on', 'On', 'ON', onValue || name]);
  var falsey = useRef([// eslint-disable-line
  false, 0, '0', 'f', 'F', 'false', 'False', 'FALSE', 'n', 'N', 'No', 'NO', 'no', 'off', 'Off', 'OFF', offValue || '']);
  var handleOnChange = useCallback(function (e) {
    var oppositeOfCurrentValue = null;

    if (offValue && onValue) {
      if (value === offValue) oppositeOfCurrentValue = onValue;else if (value === onValue) oppositeOfCurrentValue = offValue;else oppositeOfCurrentValue = onValue; // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
    } else if (onValue) {
      var _context;

      if (_indexOfInstanceProperty(_context = _this.falsey).call(_context, value) > -1) oppositeOfCurrentValue = onValue;else oppositeOfCurrentValue = ''; // put this weird check in to default off value to blank if only an onValue was provided
    } else if (offValue) {
      var _context2;

      if (_indexOfInstanceProperty(_context2 = _this.truthy).call(_context2, value) > -1) oppositeOfCurrentValue = offValue;else oppositeOfCurrentValue = '1'; // put this weird check in to default on value to 1 if only an offValue was provided
    } else {
      switch (value) {
        case true:
          oppositeOfCurrentValue = false;
          break;

        case false:
          oppositeOfCurrentValue = true;
          break;

        case 0:
          oppositeOfCurrentValue = 1;
          break;

        case 1:
          oppositeOfCurrentValue = 0;
          break;

        case '0':
          oppositeOfCurrentValue = '1';
          break;

        case '1':
          oppositeOfCurrentValue = '0';
          break;

        case 'true':
          oppositeOfCurrentValue = 'false';
          break;

        case 'false':
          oppositeOfCurrentValue = 'true';
          break;

        case 'True':
          oppositeOfCurrentValue = 'False';
          break;

        case 'False':
          oppositeOfCurrentValue = 'True';
          break;

        case 'TRUE':
          oppositeOfCurrentValue = 'FALSE';
          break;

        case 'FALSE':
          oppositeOfCurrentValue = 'TRUE';
          break;

        case 't':
          oppositeOfCurrentValue = 'f';
          break;

        case 'f':
          oppositeOfCurrentValue = 't';
          break;

        case 'T':
          oppositeOfCurrentValue = 'F';
          break;

        case 'F':
          oppositeOfCurrentValue = 'T';
          break;

        case 'y':
          oppositeOfCurrentValue = 'n';
          break;

        case 'n':
          oppositeOfCurrentValue = 'y';
          break;

        case 'Y':
          oppositeOfCurrentValue = 'N';
          break;

        case 'N':
          oppositeOfCurrentValue = 'Y';
          break;

        case 'Yes':
          oppositeOfCurrentValue = 'No';
          break;

        case 'No':
          oppositeOfCurrentValue = 'Yes';
          break;

        case 'YES':
          oppositeOfCurrentValue = 'NO';
          break;

        case 'NO':
          oppositeOfCurrentValue = 'YES';
          break;

        case 'yes':
          oppositeOfCurrentValue = 'no';
          break;

        case 'no':
          oppositeOfCurrentValue = 'yes';
          break;

        case 'On':
          oppositeOfCurrentValue = 'Off';
          break;

        case 'Off':
          oppositeOfCurrentValue = 'On';
          break;

        case 'ON':
          oppositeOfCurrentValue = 'OFF';
          break;

        case 'OFF':
          oppositeOfCurrentValue = 'ON';
          break;

        case 'on':
          oppositeOfCurrentValue = 'off';
          break;

        case 'off':
          oppositeOfCurrentValue = 'on';
          break;

        case '':
          oppositeOfCurrentValue = '1';
          break;
        // default the opposite of blank as '1'

        default:
          oppositeOfCurrentValue = !!e.target.value;
      }
    }

    onChange({
      target: {
        name: e.target.name,
        value: oppositeOfCurrentValue
      }
    });
  }, [offValue, onChange, onValue, value]);
  var checked = false;
  if (_indexOfInstanceProperty(_context3 = truthy.current).call(_context3, value) > -1) checked = true;
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control gfb-boxless-input';
  var validationError;

  if (required && requiredWarning && (value + '').length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return jsx("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: theme.inputOuter
  }, jsx("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, jsx("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, jsx("input", {
    className: className,
    name: name,
    value: value,
    checked: checked,
    onChange: handleOnChange,
    disabled: readonly || disabled || !interactive,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    type: "checkbox",
    autoComplete: autoComplete,
    style: valueStyle,
    css: theme.value
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators
  }, validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};

__signature__(Checkbox, "useTheme{{theme}}\nuseRef{truthy}\nuseRef{falsey}\nuseCallback{handleOnChange}", function () {
  return [useTheme];
});

var _default = Checkbox;
export default _default;
Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  onValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  offValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Checkbox, "Checkbox", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Checkbox.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Checkbox.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();