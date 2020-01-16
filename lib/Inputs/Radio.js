'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function Radio(props) {
  var name = props.name,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      keyword = props.keyword,
      inline = props.inline,
      value = props.value,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === undefined ? true : _props$interactive;
  var _keyword$options = keyword.options,
      options = _keyword$options === undefined ? [] : _keyword$options;


  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly) {
      var clickedValue = e.target.value;

      var newvalue = clickedValue === value ? '' : clickedValue; // if clicked value is already active, blank out the value to turn off the radio
      onChange({
        target: {
          name: name,
          value: newvalue
        }
      });
    }
  }, [name, onChange, value, disabled, readonly]);

  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container';
  }
  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer' },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner' },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input__control gfb-boxless-input' },
        _react2.default.createElement(
          'div',
          { className: valueContainerClassName },
          options.map(function (option, i) {
            var checked = value && (option.value + '').toLowerCase() === (value + '').toLowerCase(); // the option value may be a number but the field have the value as a string
            var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
            if (checked) className = className + ' gfb-multi-input-selected';
            if (disabled || readonly) className = className + ' gfb-disabled-input';
            return _react2.default.createElement(
              'label',
              { key: i, className: 'gfb-multi-input-label-wrapper ' + className },
              _react2.default.createElement('input', {
                className: className,
                name: name,
                value: option.value,
                checked: checked,
                onClick: handleOnChange // this makes on change fire twice, which is not ideal, but it lets the user uncheck a radio, is this good? - JRA 01/09/2019
                , onChange: handleOnChange,
                disabled: readonly || disabled,
                autoFocus: autofocus,
                type: 'radio',
                autoComplete: autoComplete
              }),
              option.label ? option.label : option.value
            );
          })
        ),
        _react2.default.createElement('div', { className: 'gfb-input__indicators' })
      )
    )
  );
};

exports.default = Radio;


Radio.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  keyword: _propTypes2.default.object,
  inline: _propTypes2.default.bool,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool
};