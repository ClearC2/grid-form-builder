'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.DateTime = DateTime;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Portal = require('../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

DateTime.propTypes = {
  inputProps: _propTypes2.default.object,
  timeFormat: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  className: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default)])
};

var Time = (0, _react.createContext)({ timeFormat: 'hh:mm a', typing: false, setTyping: function setTyping() {} });

function DateTime(props) {
  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      inputId = _useState2[0],
      setId = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      display = _useState4[0],
      setDisplay = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      typedValues = _useState6[0],
      setValues = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = _slicedToArray(_useState7, 2),
      open = _useState8[0],
      setOpen = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = _slicedToArray(_useState9, 2),
      typing = _useState10[0],
      setTyping = _useState10[1];

  var _props$inputProps = props.inputProps,
      inputProps = _props$inputProps === undefined ? {} : _props$inputProps,
      _props$timeFormat = props.timeFormat,
      timeFormat = _props$timeFormat === undefined ? 'hh:mm a' : _props$timeFormat,
      _props$onChange = props.onChange,
      onChange = _props$onChange === undefined ? function () {} : _props$onChange,
      _props$className = props.className,
      className = _props$className === undefined ? '' : _props$className,
      value = props.value,
      timeProps = _objectWithoutProperties(props, ['inputProps', 'timeFormat', 'onChange', 'className', 'value']);

  (0, _react.useEffect)(function () {
    setId(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
    // eslint-disable-next-line
  }, []);

  return _react2.default.createElement(
    Time.Provider,
    { value: { timeFormat: timeFormat, typing: typing, setTyping: setTyping } },
    _react2.default.createElement(
      'div',
      { className: className },
      _react2.default.createElement(Input, _extends({}, inputProps, {
        onChange: onChange,
        display: display,
        setDisplay: setDisplay,
        setOpen: setOpen,
        setValues: setValues,
        open: open,
        id: inputId
      })),
      _react2.default.createElement(TimePopout, _extends({}, timeProps, {
        display: display,
        setDisplay: setDisplay,
        typedValues: typedValues,
        onChange: onChange,
        open: open,
        value: value,
        id: inputId
      }))
    )
  );
}

function OnOutsideClick(e, id, onBlur, ref, setOpen) {
  var found = false;
  var onClickPath = e.path || e.composedPath();

  onClickPath.forEach(function (path) {
    if (path.id === id) {
      found = true;
      ref.focus();
    } else if (path.id === 'timePicker-' + id) {
      found = true;
      ref.focus();
    }
  });

  if (!found) {
    setOpen(false);
    ref.blur();
    if (onBlur) {
      onBlur(e);
    }
  }
}

Input.propTypes = {
  display: _propTypes2.default.string,
  onClick: _propTypes2.default.func,
  setOpen: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  setRef: _propTypes2.default.func,
  onChange: _propTypes2.default.func,
  setDisplay: _propTypes2.default.func,
  setValues: _propTypes2.default.func,
  id: _propTypes2.default.string
};

function Input(props) {
  var display = props.display,
      onClick = props.onClick,
      setOpen = props.setOpen,
      onBlur = props.onBlur,
      open = props.open,
      setRef = props.setRef,
      onChange = props.onChange,
      setDisplay = props.setDisplay,
      setValues = props.setValues,
      id = props.id,
      rest = _objectWithoutProperties(props, ['display', 'onClick', 'setOpen', 'onBlur', 'open', 'setRef', 'onChange', 'setDisplay', 'setValues', 'id']);

  var _useContext = (0, _react.useContext)(Time),
      typing = _useContext.typing,
      setTyping = _useContext.setTyping;

  var _useState11 = (0, _react.useState)({}),
      _useState12 = _slicedToArray(_useState11, 2),
      listener = _useState12[0],
      setListener = _useState12[1];

  var _useState13 = (0, _react.useState)(display),
      _useState14 = _slicedToArray(_useState13, 2),
      inputValue = _useState14[0],
      setInput = _useState14[1];

  var _useState15 = (0, _react.useState)((0, _react.createRef)()),
      _useState16 = _slicedToArray(_useState15, 1),
      inputRef = _useState16[0];

  var OnInputClick = (0, _react.useCallback)(function (e) {
    setListener({
      type: 'click',
      func: function func(e) {
        return OnOutsideClick(e, id, onBlur, inputRef.current, setOpen);
      }
    });

    if (onClick) {
      onClick(e);
    }

    setOpen(true);
  }, [onClick, setOpen, id, onBlur, inputRef]);

  var OnInputChange = (0, _react.useCallback)(function (e) {
    setTyping(true);
    var value = e.target.value;

    if (value) {
      setDisplay(value);

      var _value$split = value.split(/[: ]/g),
          _value$split2 = _slicedToArray(_value$split, 3),
          _value$split2$ = _value$split2[0],
          newHour = _value$split2$ === undefined ? 12 : _value$split2$,
          _value$split2$2 = _value$split2[1],
          newMinute = _value$split2$2 === undefined ? 0 : _value$split2$2,
          _value$split2$3 = _value$split2[2],
          newZone = _value$split2$3 === undefined ? 'am' : _value$split2$3;

      if (isNaN(newHour) || !newHour || +newHour > 23 || +newHour < 0) {
        newHour = 12;
      }
      if (isNaN(newMinute) || !newMinute || +newMinute > 59 || +newMinute < 0) {
        newMinute = 0;
      }
      if (!newZone || newZone.length > 2) {
        newZone = 'am';
      }

      onChange(value);
      setInput(value);
      setValues([newHour, newMinute, newZone]);
    } else {
      onChange('');
      setInput('');
      setValues([12, 0, 'am']);
    }
  }, [onChange, setDisplay, setValues, setTyping]);

  var showDisplay = (0, _react.useCallback)(function (inputValue, display) {
    if (typing) {
      return inputValue;
    } else {
      return display;
    }
  }, [typing]);

  (0, _react.useEffect)(function () {
    if (setRef) {
      setRef(inputRef.current);
    }
  }, [setRef, inputRef]);

  (0, _react.useEffect)(function () {
    if (!open) {
      setListener({});
      window.removeEventListener(listener.type, listener.func);
    } else if (listener.type) {
      window.addEventListener(listener.type, listener.func);
    }
  }, [open, listener.type, listener.func]);

  return _react2.default.createElement('input', _extends({}, rest, {
    value: showDisplay(inputValue, display),
    onClick: OnInputClick,
    onChange: OnInputChange,
    ref: inputRef,
    id: id
  }));
}

TimePopout.propTypes = {
  setDisplay: _propTypes2.default.func,
  open: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.instanceOf(_moment2.default)]),
  typedValues: _propTypes2.default.array,
  onChange: _propTypes2.default.func,
  id: _propTypes2.default.string
};

function TimePopout(props) {
  var _useState17 = (0, _react.useState)(12),
      _useState18 = _slicedToArray(_useState17, 2),
      hour = _useState18[0],
      setHour = _useState18[1];

  var _useState19 = (0, _react.useState)(0),
      _useState20 = _slicedToArray(_useState19, 2),
      minute = _useState20[0],
      setMinute = _useState20[1];

  var _useState21 = (0, _react.useState)('am'),
      _useState22 = _slicedToArray(_useState21, 2),
      zone = _useState22[0],
      setZone = _useState22[1];

  var _useState23 = (0, _react.useState)(true),
      _useState24 = _slicedToArray(_useState23, 2),
      isInit = _useState24[0],
      setInit = _useState24[1];

  var _useContext2 = (0, _react.useContext)(Time),
      timeFormat = _useContext2.timeFormat;

  var setDisplay = props.setDisplay,
      open = props.open,
      value = props.value,
      typedValues = props.typedValues,
      onChange = props.onChange,
      id = props.id;


  (0, _react.useEffect)(function () {
    if (value._d && value.isValid()) {
      var initHour = value.hour() % 12 === 0 ? 12 : value.hour() % 12;
      var initZone = value.hour() > 11 ? 'pm' : 'am';
      setHour(initHour);
      setMinute(value.minutes());
      setZone(initZone);
    }
    // eslint-disable-next-line
  }, []);

  (0, _react.useEffect)(function () {
    var _typedValues = _slicedToArray(typedValues, 3),
        newHour = _typedValues[0],
        newMinute = _typedValues[1],
        newZone = _typedValues[2];

    if (newHour !== undefined) {
      setHour(+newHour);
    }
    if (newMinute !== undefined) {
      setMinute(+newMinute);
    }
    if (newZone !== undefined) {
      newZone = newZone.includes('a') ? 'am' : 'pm';
      setZone(newZone);
    }
  }, [typedValues]);

  (0, _react.useEffect)(function () {
    if (!isInit) {
      var display = (0, _moment2.default)(hour + ':' + minute + ' ' + zone, timeFormat).format(timeFormat);
      onChange(display);
      setDisplay(display);
    } else {
      setInit(false);
    }
  }, [hour, minute, zone, timeFormat, setDisplay, onChange, isInit]);

  return _react2.default.createElement(
    _Portal2.default,
    { id: id },
    _react2.default.createElement(
      'div',
      { className: 'row ml-0', id: 'timePicker-' + id },
      _react2.default.createElement(
        'div',
        { className: 'rdtPicker rdtTime', style: { display: open ? 'inline-flex' : 'none', alignItems: 'center' } },
        _react2.default.createElement(
          'div',
          { className: 'rdtCounters', style: { margin: 'auto' } },
          _react2.default.createElement(Hour, { display: hour, setDisplay: setHour }),
          _react2.default.createElement(
            'div',
            { className: 'rdtCounterSeparator' },
            ':'
          ),
          _react2.default.createElement(Minutes, { display: minute, setDisplay: setMinute }),
          _react2.default.createElement(AMPM, { display: zone, setDisplay: setZone })
        )
      )
    )
  );
}

Counter.propTypes = {
  children: _propTypes2.default.any,
  onClick: _propTypes2.default.func
};

function Counter(props) {
  var _props$onClick = props.onClick,
      onClick = _props$onClick === undefined ? function () {} : _props$onClick;

  var _useContext3 = (0, _react.useContext)(Time),
      setTyping = _useContext3.setTyping;

  var upClick = (0, _react.useCallback)(function () {
    setTyping(false);
    onClick('up');
  }, [onClick, setTyping]);

  var downClick = (0, _react.useCallback)(function () {
    setTyping(false);
    onClick('down');
  }, [onClick, setTyping]);

  return _react2.default.createElement(
    'div',
    {
      className: 'rdtCounter',
      style: { textAlign: 'center' }
    },
    _react2.default.createElement(
      'span',
      { className: 'rdtBtn', onClick: upClick },
      '\u25B2'
    ),
    props.children,
    _react2.default.createElement(
      'span',
      { className: 'rdtBtn', onClick: downClick },
      '\u25BC'
    )
  );
}

Hour.propTypes = {
  display: _propTypes2.default.number,
  setDisplay: _propTypes2.default.func
};

function Hour(props) {
  var display = props.display,
      setDisplay = props.setDisplay;

  var _useState25 = (0, _react.useState)(12),
      _useState26 = _slicedToArray(_useState25, 2),
      range = _useState26[0],
      setRange = _useState26[1];

  var _useContext4 = (0, _react.useContext)(Time),
      timeFormat = _useContext4.timeFormat;

  (0, _react.useEffect)(function () {
    if (timeFormat.includes('h')) {
      setRange(12);
    } else if (timeFormat.includes('H')) {
      setRange(24);
    }
  }, [timeFormat]);

  var callBack = (0, _react.useCallback)(function (env) {
    if (env === 'up') {
      if (display + 1 > range) {
        setDisplay(1);
      } else {
        setDisplay(display + 1);
      }
    } else if (env === 'down') {
      if (display - 1 < 1) {
        setDisplay(range - 1);
      } else {
        setDisplay(display - 1);
      }
    }
  }, [display, setDisplay, range]);

  display = display % range === 0 && range === 12 ? 12 : display % range;

  return _react2.default.createElement(
    Counter,
    { onClick: callBack },
    _react2.default.createElement(
      'div',
      { className: 'rdtCount' },
      display
    )
  );
}

Minutes.propTypes = {
  display: _propTypes2.default.number,
  setDisplay: _propTypes2.default.func
};

function Minutes(props) {
  var display = props.display,
      setDisplay = props.setDisplay;

  var _useState27 = (0, _react.useState)(60),
      _useState28 = _slicedToArray(_useState27, 1),
      range = _useState28[0];

  var callBack = (0, _react.useCallback)(function (env) {
    if (env === 'up') {
      if (display + 1 >= range) {
        setDisplay(1);
      } else {
        setDisplay(display + 1);
      }
    } else if (env === 'down') {
      if (display - 1 < 0) {
        setDisplay(range - 1);
      } else {
        setDisplay(display - 1);
      }
    }
  }, [display, setDisplay, range]);

  return _react2.default.createElement(
    Counter,
    { onClick: callBack },
    _react2.default.createElement(
      'div',
      { className: 'rdtCount' },
      '' + (display < 10 ? '0' : ''),
      display
    )
  );
}

AMPM.propTypes = {
  display: _propTypes2.default.string,
  setDisplay: _propTypes2.default.func
};

function AMPM(props) {
  var display = props.display,
      setDisplay = props.setDisplay;

  var _useState29 = (0, _react.useState)(false),
      _useState30 = _slicedToArray(_useState29, 2),
      isUpper = _useState30[0],
      setUpper = _useState30[1];

  var _useContext5 = (0, _react.useContext)(Time),
      timeFormat = _useContext5.timeFormat;

  (0, _react.useEffect)(function () {
    if (timeFormat.includes('A')) {
      setUpper(true);
    } else if (timeFormat.includes('a')) {
      setUpper(false);
    }
  }, [timeFormat]);

  var callBack = (0, _react.useCallback)(function (env) {
    var value = 'am';
    if (display.toLowerCase() === 'am') {
      value = 'pm';
    }
    value = isUpper ? value.toUpperCase() : value;
    setDisplay(value);
  }, [setDisplay, display, isUpper]);

  return _react2.default.createElement(
    Counter,
    { onClick: callBack },
    _react2.default.createElement(
      'div',
      { className: 'rdtCount' },
      display
    )
  );
}