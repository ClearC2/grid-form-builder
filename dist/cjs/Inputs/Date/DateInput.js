"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DatePicker = _interopRequireDefault(require("./DatePicker"));

var _MonthPicker = _interopRequireDefault(require("./MonthPicker"));

var _moment = _interopRequireDefault(require("moment"));

var _utils = require("../../utils");

var _ValidationErrorIcon = _interopRequireDefault(require("../../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

/** @jsx jsx */
var DateInput = function DateInput(props) {
  var _context;

  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
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
      timePicker = _props$timePicker === void 0 ? false : _props$timePicker,
      _props$showCalendar = props.showCalendar,
      showCalendar = _props$showCalendar === void 0 ? true : _props$showCalendar,
      format = props.format,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required,
      _props$maxlength = props.maxlength,
      maxlength = _props$maxlength === void 0 ? 524288 : _props$maxlength,
      _props$canPickDay = props.canPickDay,
      canPickDay = _props$canPickDay === void 0 ? true : _props$canPickDay,
      _props$pastYears = props.pastYears,
      pastYears = _props$pastYears === void 0 ? 12 : _props$pastYears,
      _props$futureYears = props.futureYears,
      futureYears = _props$futureYears === void 0 ? 12 : _props$futureYears,
      minDate = props.minDate,
      maxDate = props.maxDate,
      onChangeValidator = props.onChangeValidator;
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

  var _props$type = props.type,
      type = _props$type === void 0 ? 'date' : _props$type;
  type = type.toLowerCase();

  var _useState = (0, _react.useState)(''),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      inputValue = _useState2[0],
      changeInputValue = _useState2[1];

  var elementId = (0, _react.useRef)((0, _utils.randomId)());
  var portalRef = (0, _react.useRef)();

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      showPicker = _useState4[0],
      changeShowPicker = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      inputFormat = _useState6[0],
      setInputFormat = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isFocused = _useState8[0],
      setIsFocused = _useState8[1];

  var allowCalendarChangeEvent = (0, _react.useRef)(true);

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      manualBlurCheck = _useState10[0],
      setManualBlurCheck = _useState10[1];

  var convertDateToMomentFormat = (0, _react.useMemo)(function () {
    return function (value) {
      var time;

      if (value) {
        var date = (0, _moment.default)(value, inputFormat);

        if (date.isValid()) {
          time = date;
        } else {
          // this is a fallback, if we can't get the date valid by trying, see if moment can figure it out one last time by itself - JRA 01/23/2020
          // using moment in this way is deprecated and will throw a warning
          date = (0, _moment.default)(value);

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
    var blank = false;

    if (typeof val === 'string') {
      val = convertDateToMomentFormat(val);
    }

    if (val && val._isAMomentObject) {
      if (val.format('MM-DD-YYYY') === '01-01-1900') {
        // this is the default SQL date, we can ignore this value and assume it is blank
        val = '';
        blank = true;
      } else {
        val = val.format(inputFormat);
      }
    }

    if (!val && value && !blank) val = value;
    if (!val) val = '';
    changeInputValue(val);
  }, [inputFormat, value, convertDateToMomentFormat]);
  (0, _react.useEffect)(function () {
    var inputFormat;
    if (type === 'time' || !showCalendar && timePicker) inputFormat = format || timeFormat;else if (type === 'date') inputFormat = format || dateFormat;else inputFormat = format || dateTimeFormat;
    setInputFormat(inputFormat);
  }, [dateFormat, dateTimeFormat, format, showCalendar, timeFormat, timePicker, type]);
  var handleOnInputChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    if (newValue === '') {
      // if the input was just blanked out, send up a blank value as the new value for this field - JRA 02/07/2020
      // also suppress the calendar's change event so it does not send up what is selected when the calendar closes
      allowCalendarChangeEvent.current = false;
      onChange({
        target: {
          name: name,
          value: ''
        }
      });
    } else {
      allowCalendarChangeEvent.current = true;
    }

    changeInputValue(newValue);
    if (!showPicker) changeShowPicker(true);
  }, [showPicker, onChange, name]);
  var handleOnFocus = (0, _react.useCallback)(function () {
    changeShowPicker(true);
    setIsFocused(true);
    setManualBlurCheck(true);
  }, [changeShowPicker]);
  var handleOnBlur = (0, _react.useCallback)(function (e) {
    if (manualBlurCheck) {
      // this is to circumvent an issue where the daterangepicker change handler isn't firing when you tab out of the input - JRA 03/26/2021
      var formatted = inputValue ? (0, _moment.default)(inputValue).format(dateFormat) : '';
      var validate = onChangeValidator({
        raw: inputValue,
        formatted: formatted
      });

      if (typeof validate === 'string') {
        changeInputValue(validate);
        onChange({
          target: {
            name: name,
            value: validate
          }
        });
      } else if (!validate) {
        changeInputValue('');
        onChange({
          target: {
            name: name,
            value: ''
          }
        });
      } else {
        onChange({
          target: {
            name: name,
            value: formatted
          }
        });
      }
    }

    setManualBlurCheck(true);
    setIsFocused(false);
  }, [manualBlurCheck, inputValue, dateFormat, onChangeValidator, onChange, name]);
  var handleOnCalendarChange = (0, _react.useCallback)(function (e) {
    if (allowCalendarChangeEvent.current) {
      setManualBlurCheck(false);
      var validate = onChangeValidator({
        raw: inputValue,
        formatted: e.target.value
      });

      if (typeof validate === 'string') {
        changeInputValue(validate);
        onChange({
          target: {
            name: name,
            value: validate
          }
        });
      } else if (!validate) {
        changeInputValue('');
        onChange({
          target: {
            name: name,
            value: ''
          }
        });
      } else {
        onChange(e);
      }
    } else {
      allowCalendarChangeEvent.current = true;
    }
  }, [onChangeValidator, inputValue, onChange, name]);
  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && (0, _trim.default)(_context = value + '').call(_context).length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  var validationWarning;

  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationWarning = "Maximum character limit of ".concat(maxlength, " reached.");
  }

  var outerClass = 'gfb-input-outer';

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  var startDate = convertDateToMomentFormat(inputValue);
  var isFirefox = navigator.userAgent.search('Firefox') > -1;
  var isDisabled = readonly || disabled || !interactive;
  var valueOverride = type === 'month' && startDate ? startDate.format('MM/YYYY') : inputValue; // if this is a special input that only shows months, manually overwrite what the display value is - JRA 12/08/2020

  return (0, _core.jsx)("div", {
    className: outerClass,
    style: inputOuter,
    css: theme.inputOuter
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, (0, _core.jsx)("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, (0, _core.jsx)("input", {
    id: elementId.current,
    className: className,
    name: name,
    value: valueOverride,
    onChange: handleOnInputChange,
    disabled: isFirefox ? false : isDisabled,
    readOnly: isFirefox && isDisabled,
    autoFocus: autofocus,
    placeholder: placeholder,
    tabIndex: tabIndex,
    onFocus: handleOnFocus,
    onBlur: handleOnBlur,
    onKeyDown: function onKeyDown(e) {
      if (e.keyCode === 9 && type === 'month') {
        changeShowPicker(false);
      }
    },
    autoComplete: autoComplete,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength
  }), showPicker && canPickDay && (0, _core.jsx)(_DatePicker.default, {
    elementId: elementId.current,
    handleOnChange: handleOnCalendarChange,
    changeShowPicker: changeShowPicker,
    name: name,
    timePicker: timePicker,
    showCalendar: showCalendar,
    startDate: startDate,
    format: inputFormat,
    minDate: minDate,
    maxDate: maxDate
  }), showPicker && !canPickDay && (0, _core.jsx)(_MonthPicker.default, {
    elementId: elementId.current,
    ref: portalRef,
    onChange: onChange,
    changeShowPicker: changeShowPicker,
    startDate: startDate,
    format: inputFormat,
    pastYears: pastYears,
    futureYears: futureYears,
    showPicker: showPicker,
    name: name
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationWarning && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationWarning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && validationError && (0, _core.jsx)("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

var _default = DateInput;
exports.default = _default;
DateInput.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  timePicker: _propTypes.default.bool,
  showCalendar: _propTypes.default.bool,
  type: _propTypes.default.string,
  format: _propTypes.default.string,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool,
  maxlength: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  canPickDay: _propTypes.default.bool,
  pastYears: _propTypes.default.number,
  futureYears: _propTypes.default.number,
  minDate: _propTypes.default.string,
  maxDate: _propTypes.default.string,
  onChangeValidator: _propTypes.default.func
};
DateInput.defaultProps = {
  onChangeValidator: function onChangeValidator() {
    return true;
  }
};