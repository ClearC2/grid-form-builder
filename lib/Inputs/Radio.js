'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Radio = function Radio(props) {
  var name = props.name,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      _props$keyword = props.keyword,
      keyword = _props$keyword === undefined ? {} : _props$keyword,
      inline = props.inline,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
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
  var _keyword$options = keyword.options,
      options = _keyword$options === undefined ? [] : _keyword$options;


  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.value;

      var newvalue = clickedValue === value ? '' : clickedValue; // if clicked value is already active, blank out the value to turn off the radio
      onChange({
        target: {
          name: name,
          value: newvalue
        }
      });
    }
  }, [disabled, readonly, interactive, value, onChange, name]);

  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container';
  }
  var controlClass = 'gfb-input__control gfb-boxless-input';
  var validationError = void 0;
  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
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
          { className: valueContainerClassName, style: valueContainer },
          options.map(function (option, i) {
            var checked = value && (option.value + '').toLowerCase() === (value + '').toLowerCase(); // the option value may be a number but the field have the value as a string
            var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
            if (checked) className = className + ' gfb-multi-input-selected';
            if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
            if (!interactive) className = className + ' gfb-non-interactive-input';
            return _react2.default.createElement(
              'label',
              { key: i, className: 'gfb-multi-input-label-wrapper ' + className, style: valueStyle },
              _react2.default.createElement('input', {
                className: className,
                name: name,
                value: option.value,
                checked: checked,
                onClick: handleOnChange // this makes on change fire twice, which is not ideal, but it lets the user uncheck a radio, is this good? - JRA 01/09/2019
                , onChange: handleOnChange,
                disabled: readonly || disabled || !interactive,
                autoFocus: autofocus,
                type: 'radio',
                autoComplete: autoComplete
              }),
              option.label ? option.label : option.value
            );
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
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};