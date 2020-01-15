'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Textarea = function Textarea(props) {
  var name = props.name,
      value = props.value,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      autoComplete = props.autoComplete;

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
          _react2.default.createElement('textarea', {
            className: className,
            name: name,
            value: value,
            onChange: onChange,
            disabled: readonly || disabled,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            autoComplete: autoComplete
          })
        ),
        _react2.default.createElement('div', { className: 'gfb-input__indicators' })
      )
    )
  );
};

exports.default = Textarea;


Textarea.propTypes = {
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