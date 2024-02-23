"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context5, _context6; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context5 = ownKeys(Object(source), !0)).call(_context5, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context6 = ownKeys(Object(source))).call(_context6, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var Checkbox = function Checkbox(props) {
  var _context3, _context4;

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
      required = props.required,
      warning = props.warning;
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

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var truthy = (0, _react.useRef)([true, 1, '1', 't', 'T', 'true', 'True', 'TRUE', 'y', 'Y', 'Yes', 'YES', 'yes', 'on', 'On', 'ON', onValue || name]);
  var falsey = (0, _react.useRef)([// eslint-disable-line
  false, 0, '0', 'f', 'F', 'false', 'False', 'FALSE', 'n', 'N', 'No', 'NO', 'no', 'off', 'Off', 'OFF', offValue || '']);
  var handleOnChange = (0, _react.useCallback)(function (e) {
    var oppositeOfCurrentValue = null;

    if (typeof offValue !== 'undefined' && typeof onValue !== 'undefined') {
      if (value === offValue) oppositeOfCurrentValue = onValue;else if (value === onValue) oppositeOfCurrentValue = offValue;else oppositeOfCurrentValue = onValue; // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
    } else if (onValue) {
      var _context;

      if ((0, _indexOf.default)(_context = falsey.current).call(_context, value) > -1) oppositeOfCurrentValue = onValue;else oppositeOfCurrentValue = ''; // put this weird check in to default off value to blank if only an onValue was provided
    } else if (offValue) {
      var _context2;

      if ((0, _indexOf.default)(_context2 = truthy.current).call(_context2, value) > -1) oppositeOfCurrentValue = offValue;else oppositeOfCurrentValue = '1'; // put this weird check in to default on value to 1 if only an offValue was provided
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
  if ((0, _indexOf.default)(_context3 = truthy.current).call(_context3, value) > -1) checked = true;
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control gfb-boxless-input';
  var validationError;

  if (required && requiredWarning && (0, _trim.default)(_context4 = value + '').call(_context4).length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

  return (0, _core.jsx)("div", {
    className: "gfb-input-outer",
    style: _objectSpread(_objectSpread({}, inputOuter), {}, {
      marginRight: warning ? '0px' : '10px'
    }),
    css: inputOuterCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: inputInnerCSS
  }, (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: inputControlCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: valueContainerCSS
  }, (0, _core.jsx)("input", {
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
    css: valueCSS
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
  }, warning && !validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: warning,
    color: "#FFCC00",
    type: "warning"
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

var _default = Checkbox;
exports.default = _default;
Checkbox.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  onValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]),
  offValue: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.bool]),
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool,
  warning: _propTypes.default.string
};