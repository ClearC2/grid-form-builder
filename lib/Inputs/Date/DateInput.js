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
      _props$dateFormat = props.dateFormat,
      dateFormat = _props$dateFormat === undefined ? 'M/D/YYYY hh:mm a' : _props$dateFormat,
      _props$timePicker = props.timePicker,
      timePicker = _props$timePicker === undefined ? false : _props$timePicker;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputValue = _useState2[0],
      changeInputValue = _useState2[1];

  var elementId = (0, _react.useRef)(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showPicker = _useState4[0],
      changeShowPicker = _useState4[1];

  (0, _react.useEffect)(function () {
    changeInputValue(value);
  }, [value]);

  var handleOnInputChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    changeInputValue(newValue);
    if (!showPicker) changeShowPicker(true);
  }, [changeInputValue, showPicker, changeShowPicker]);

  var handleOnFocus = (0, _react.useCallback)(function () {
    changeShowPicker(true);
  }, [changeShowPicker]);

  var handleOnBlur = (0, _react.useCallback)(function () {
    changeShowPicker(false);
  }, [changeShowPicker]);

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled) className = className + ' gfb-disabled-input';

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
            onBlur: handleOnBlur,
            autoComplete: 'off'
          }),
          showPicker && _react2.default.createElement(_DatePicker2.default, {
            elementId: elementId.current,
            handleOnChange: onChange,
            dateFormat: dateFormat,
            changeShowPicker: changeShowPicker,
            name: name,
            timePicker: timePicker
          })
        ),
        _react2.default.createElement('div', { className: 'gfb-input-indicators' })
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
  timePicker: _propTypes2.default.bool
};