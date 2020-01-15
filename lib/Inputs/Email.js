'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('../utils');

var _fa = require('react-icons/fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Email = function Email(props) {
  var name = props.name,
      value = props.value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      autoComplete = props.autoComplete;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isFocused = _useState2[0],
      setIsFocused = _useState2[1];

  var handleOnFocus = (0, _react.useCallback)(function () {
    setIsFocused(true);
  }, []);

  var handleOnBlur = (0, _react.useCallback)(function () {
    setIsFocused(false);
  }, []);

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled) className = className + ' gfb-disabled-input';
  var controlClass = 'gfb-input__control';
  if (value && !(0, _utils.emailValidator)(value) && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
  }

  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer something-custom' },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner' },
      _react2.default.createElement(
        'div',
        { className: controlClass },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container' },
          _react2.default.createElement('input', {
            className: className,
            name: name,
            value: value,
            onChange: onChange,
            disabled: readonly || disabled,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
            autoComplete: autoComplete === 'off' ? 'ac-off' : autoComplete
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__indicators' },
          _react2.default.createElement(_fa.FaExclamationTriangle, null)
        )
      )
    )
  );
};

exports.default = Email;


Email.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string
};