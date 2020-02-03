'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @jsx jsx */


var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ValidationErrorIcon = require('../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

var _useTheme2 = require('../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Multicheckbox = function Multicheckbox(props) {
  var name = props.name,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      _props$keyword = props.keyword,
      keyword = _props$keyword === undefined ? {} : _props$keyword,
      inline = props.inline,
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
      indicators = _style$indicators === undefined ? {} : _style$indicators,
      _style$options = style.options,
      optionsStyle = _style$options === undefined ? {} : _style$options;

  var _useTheme = (0, _useTheme3.default)(),
      theme = _useTheme.theme;

  var _keyword$options = keyword.options,
      options = _keyword$options === undefined ? [] : _keyword$options;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      updateValue = _useState2[1];

  (0, _react.useEffect)(function () {
    var val = props.value;
    if (typeof val === 'string') val = val.split('¤');
    val = val.filter(function (val) {
      return !!val;
    });
    updateValue(val);
  }, [props.value, props.value.length]);

  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.value;

      var newvalue = [].concat(_toConsumableArray(value));
      if (newvalue.indexOf(clickedValue) > -1) {
        newvalue = newvalue.filter(function (val) {
          return val !== clickedValue;
        });
      } else {
        newvalue.push(clickedValue);
      }
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

  return (0, _core.jsx)(
    'div',
    { className: 'gfb-input-outer', style: inputOuter, css: theme.inputOuter },
    (0, _core.jsx)(
      'div',
      { className: 'gfb-input-inner', style: inputInner, css: theme.inputInner },
      (0, _core.jsx)(
        'div',
        { className: controlClass, style: inputControl, css: theme.inputControl },
        (0, _core.jsx)(
          'div',
          { className: valueContainerClassName, style: valueContainer, css: theme.valueContainer },
          options.map(function (option, i) {
            var checked = value.indexOf(option.value) > -1 || value.indexOf(option.value + '') > -1; // the option value may be a number but the field have the value as a string
            var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
            if (checked) className = className + ' gfb-multi-input-selected';
            if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
            if (!interactive) className = className + ' gfb-non-interactive-input';
            return (0, _core.jsx)(
              'label',
              {
                key: i,
                className: 'gfb-multi-input-label-wrapper ' + className,
                style: optionsStyle,
                css: theme.options
              },
              (0, _core.jsx)('input', {
                className: className,
                name: name,
                value: option.value,
                checked: checked,
                onChange: handleOnChange,
                disabled: readonly || disabled || !interactive,
                autoFocus: autofocus,
                type: 'checkbox',
                autoComplete: autoComplete,
                style: valueStyle,
                css: theme.value
              }),
              option.label ? option.label : option.value
            );
          })
        ),
        (0, _core.jsx)(
          'div',
          { className: 'gfb-input__indicators', style: indicators },
          validationError && (0, _core.jsx)(_ValidationErrorIcon2.default, { message: validationError })
        )
      )
    )
  );
};

exports.default = Multicheckbox;


Multicheckbox.propTypes = {
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