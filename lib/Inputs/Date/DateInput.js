'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @jsx jsx */


var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _ValidationErrorIcon = require('../../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

var _useTheme2 = require('../../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateInput = function DateInput(props) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      dateFormat = props.dateFormat,
      dateTimeFormat = props.dateTimeFormat,
      timeFormat = props.timeFormat,
      _props$timePicker = props.timePicker,
      timePicker = _props$timePicker === undefined ? false : _props$timePicker,
      _props$showCalendar = props.showCalendar,
      showCalendar = _props$showCalendar === undefined ? true : _props$showCalendar,
      format = props.format,
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

  var _props$type = props.type,
      type = _props$type === undefined ? 'date' : _props$type;

  type = type.toLowerCase();

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      changeInputValue = _useState2[1];

  var elementId = (0, _react.useRef)((0, _utils.randomId)());

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showPicker = _useState4[0],
      changeShowPicker = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      inputFormat = _useState6[0],
      setInputFormat = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isFocused = _useState8[0],
      setIsFocused = _useState8[1];

  var convertDateToMomentFormat = (0, _react.useMemo)(function () {
    return function (value) {
      var time = void 0;
      if (value) {
        var date = (0, _moment2.default)(value, inputFormat);
        if (date.isValid()) {
          time = date;
        } else {
          // this is a fallback, if we can't get the date valid by trying, see if moment can figure it out one last time by itself - JRA 01/23/2020
          // using moment in this way is deprecated and will throw a warning
          date = (0, _moment2.default)(value);
          if (date.isValid()) {
            time = date;
          }
        }
      }
      return time;
    };
  }, [inputFormat]);

  (0, _react.useEffect)(function () {
    var val = value;
    if (typeof val === 'string') {
      val = convertDateToMomentFormat(val);
    }
    if (val && val._isAMomentObject) {
      val = val.format(inputFormat);
    }
    if (!val && value) val = value;
    if (!val) val = '';
    changeInputValue(val);
  }, [inputFormat, value, convertDateToMomentFormat]);

  (0, _react.useEffect)(function () {
    var inputFormat = void 0;
    if (type === 'time' || !showCalendar && timePicker) inputFormat = format || timeFormat;else if (type === 'date') inputFormat = format || dateFormat;else inputFormat = format || dateTimeFormat;
    setInputFormat(inputFormat);
  }, [dateFormat, dateTimeFormat, format, showCalendar, timeFormat, timePicker, type]);

  var handleOnInputChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    changeInputValue(newValue);
    if (!showPicker) changeShowPicker(true);
  }, [changeInputValue, showPicker, changeShowPicker]);

  var handleOnFocus = (0, _react.useCallback)(function () {
    changeShowPicker(true);
    setIsFocused(true);
  }, [changeShowPicker]);

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

  var startDate = convertDateToMomentFormat(inputValue);

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
            id: elementId.current,
            className: className,
            name: name,
            value: inputValue,
            onChange: handleOnInputChange,
            disabled: readonly || disabled || !interactive,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            autoComplete: autoComplete,
            style: valueStyle,
            css: theme.value
          }),
          showPicker && (0, _core.jsx)(_DatePicker2.default, {
            elementId: elementId.current,
            handleOnChange: onChange,
            changeShowPicker: changeShowPicker,
            name: name,
            timePicker: timePicker,
            showCalendar: showCalendar,
            startDate: startDate,
            format: inputFormat
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

exports.default = DateInput;


DateInput.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  dateFormat: _propTypes2.default.string,
  dateTimeFormat: _propTypes2.default.string,
  timeFormat: _propTypes2.default.string,
  timePicker: _propTypes2.default.bool,
  showCalendar: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  format: _propTypes2.default.string,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};