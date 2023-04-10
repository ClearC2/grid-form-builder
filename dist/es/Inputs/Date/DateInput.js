import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _trimInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/trim";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useState, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import MonthPicker from './MonthPicker';
import moment from 'moment';
import { randomId } from '../../utils';
import ValidationErrorIcon from '../../ValidationErrorIcon';
import useTheme from '../../theme/useTheme';

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

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var _props$type = props.type,
      type = _props$type === void 0 ? 'date' : _props$type;
  type = type.toLowerCase();

  var _useState = useState(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      changeInputValue = _useState2[1];

  var elementId = useRef(randomId());
  var portalRef = useRef();
  var inputRef = useRef();

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showPicker = _useState4[0],
      changeShowPicker = _useState4[1];

  var _useState5 = useState(),
      _useState6 = _slicedToArray(_useState5, 2),
      inputFormat = _useState6[0],
      setInputFormat = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isFocused = _useState8[0],
      setIsFocused = _useState8[1];

  var allowCalendarChangeEvent = useRef(true);

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      manualBlurCheck = _useState10[0],
      setManualBlurCheck = _useState10[1];

  var _useState11 = useState(true),
      _useState12 = _slicedToArray(_useState11, 2),
      showMonthFormatted = _useState12[0],
      setShowMonthFormatted = _useState12[1];

  var convertDateToMomentFormat = useMemo(function () {
    return function (value) {
      var time;

      if (value) {
        var date = moment(value, inputFormat);

        if (date.isValid()) {
          time = date;
        } else {
          // this is a fallback, if we can't get the date valid by trying, see if moment can figure it out one last time by itself - JRA 01/23/2020
          // using moment in this way is deprecated and will throw a warning
          date = moment(value);

          if (date.isValid()) {
            time = date;
          }
        }
      }

      return time;
    };
  }, [inputFormat]);
  useEffect(function () {
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
  useEffect(function () {
    var inputFormat;
    if (type === 'time' || !showCalendar && timePicker) inputFormat = format || timeFormat;else if (type === 'date') inputFormat = format || dateFormat;else inputFormat = format || dateTimeFormat;
    setInputFormat(inputFormat);
  }, [dateFormat, dateTimeFormat, format, showCalendar, timeFormat, timePicker, type]);
  var handleOnInputChange = useCallback(function (e) {
    allowCalendarChangeEvent.current = false;
    var newValue = e.target.value;

    if (newValue === '') {
      // if the input was just blanked out, send up a blank value as the new value for this field - JRA 02/07/2020
      // also suppress the calendar's change event so it does not send up what is selected when the calendar closes
      onChange({
        target: {
          name: name,
          value: ''
        }
      });
    }

    changeInputValue(newValue);
    if (!showPicker && type !== 'month') changeShowPicker(true);
    if (type === 'datetime') setManualBlurCheck(true);
  }, [showPicker, onChange, name, type]);
  var handleOnFocus = useCallback(function () {
    changeShowPicker(true);
    setIsFocused(true);
    setManualBlurCheck(type !== 'month' && type !== 'datetime');
  }, [changeShowPicker, type]);
  var handleOnBlur = useCallback(function (e) {
    if (type === 'month' && manualBlurCheck) {
      var formatted = inputValue ? moment(inputValue, 'MM/YYYY').format(inputFormat) : '';
      setShowMonthFormatted(true);
      onChange({
        target: {
          name: name,
          value: formatted
        }
      });
    } else if (type !== 'time' && manualBlurCheck && typeof onChangeValidator === 'function') {
      // this is to circumvent an issue where the daterangepicker change handler isn't firing when you tab out of the input - JRA 03/26/2021
      var _formatted = inputValue ? moment(inputValue).format(type === 'datetime' ? dateTimeFormat : dateFormat) : '';

      var validate = onChangeValidator({
        raw: inputValue,
        formatted: _formatted
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
            value: _formatted
          }
        });
      }
    }

    setManualBlurCheck(true);
    setIsFocused(false);
  }, [type, manualBlurCheck, inputValue, dateFormat, onChangeValidator, onChange, name, dateTimeFormat]);
  var handleOnCalendarChange = useCallback(function (e) {
    if (allowCalendarChangeEvent.current) {
      setManualBlurCheck(false);
      var validate = typeof onChangeValidator === 'function' ? onChangeValidator({
        raw: inputValue,
        formatted: e.target.value
      }) : true;

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

  if (required && requiredWarning && _trimInstanceProperty(_context = value + '').call(_context).length === 0 && !isFocused) {
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
  var valueOverride = inputValue;

  if (type === 'month' && showMonthFormatted && startDate) {
    // if this is a special input that only shows months, manually overwrite what the display value is - JRA 12/08/2020
    valueOverride = startDate.format('MM/YYYY');
  }

  return jsx("div", {
    className: outerClass,
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
    id: elementId.current,
    ref: inputRef,
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
    autoComplete: autoComplete,
    style: valueStyle,
    css: theme.value,
    maxLength: maxlength,
    onKeyDown: function onKeyDown(e) {
      if (type === 'month') {
        if (showPicker) changeInputValue(e.target.value);
        setManualBlurCheck(true);
        changeShowPicker(false);
        setShowMonthFormatted(false);
      }
    }
  }), showPicker && canPickDay && jsx(DatePicker, {
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
  }), showPicker && !canPickDay && jsx(MonthPicker, {
    elementId: elementId.current,
    ref: portalRef,
    inputRef: inputRef,
    onChange: onChange,
    changeShowPicker: changeShowPicker,
    startDate: startDate,
    format: inputFormat,
    pastYears: pastYears,
    futureYears: futureYears,
    showPicker: showPicker,
    name: name,
    setManualBlurCheck: setManualBlurCheck
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationWarning && jsx(ValidationErrorIcon, {
    message: validationWarning,
    color: "#FFCC00",
    type: "warning"
  }), validationWarning && validationError && jsx("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};

export default DateInput;
DateInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  timePicker: PropTypes.bool,
  showCalendar: PropTypes.bool,
  type: PropTypes.string,
  format: PropTypes.string,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  canPickDay: PropTypes.bool,
  pastYears: PropTypes.number,
  futureYears: PropTypes.number,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  onChangeValidator: PropTypes.func
};
DateInput.defaultProps = {
  onChangeValidator: function onChangeValidator() {
    return true;
  }
};