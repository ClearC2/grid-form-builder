'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DatePicker = require('./DatePicker');

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../../utils');

var _ValidationErrorIcon = require('../../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

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
      style = _props$style === undefined ? {} : _props$style;
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

  (0, _react.useEffect)(function () {
    var val = value;
    if (val._isAMomentObject) {
      val = val.format(inputFormat);
    }
    changeInputValue(val);
  }, [inputFormat, value]);

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
  if (requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  var startDate = void 0;
  if (inputValue) {
    var date = (0, _moment2.default)(inputValue, inputFormat);
    if (date.isValid()) {
      startDate = date;
    } else {
      // this is a fallback, if we can't get the date valid by trying, see if moment can figure it out one last time by itself - JRA 01/23/2020
      // using moment in this way is deprecated and will throw a warning
      date = (0, _moment2.default)(inputValue);
      if (date.isValid()) {
        startDate = date;
      }
    }
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
          _react2.default.createElement('input', {
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
            style: valueStyle
          }),
          showPicker && _react2.default.createElement(_DatePicker2.default, {
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
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__indicators', style: indicators },
          validationError && _react2.default.createElement(_ValidationErrorIcon2.default, { message: validationError })
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
  style: _propTypes2.default.object
};