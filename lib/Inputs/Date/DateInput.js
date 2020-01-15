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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateInput = function DateInput(props) {
  var name = props.name,
      value = props.value,
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
      autoComplete = props.autoComplete;
  var _props$type = props.type,
      type = _props$type === undefined ? 'date' : _props$type;

  type = type.toLowerCase();

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      changeInputValue = _useState2[1];

  var elementId = (0, _react.useRef)(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showPicker = _useState4[0],
      changeShowPicker = _useState4[1];

  var _useState5 = (0, _react.useState)(),
      _useState6 = _slicedToArray(_useState5, 2),
      inputFormat = _useState6[0],
      setInputFormat = _useState6[1];

  (0, _react.useEffect)(function () {
    changeInputValue(value);
  }, [value]);

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
  }, [changeShowPicker]);

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled) className = className + ' gfb-disabled-input';

  var startDate = void 0;
  if (inputValue) {
    var date = (0, _moment2.default)(inputValue, inputFormat);
    if (date.isValid()) startDate = date;
  }
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
          _react2.default.createElement('input', {
            id: elementId.current,
            className: className,
            name: name,
            value: inputValue,
            onChange: handleOnInputChange,
            disabled: readonly || disabled,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            onFocus: handleOnFocus,
            autoComplete: autoComplete
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
        _react2.default.createElement('div', { className: 'gfb-input__indicators' })
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
  autoComplete: _propTypes2.default.string
};