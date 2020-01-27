'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _utils = require('../../utils');

var _ValidationErrorIcon = require('../../ValidationErrorIcon');

var _ValidationErrorIcon2 = _interopRequireDefault(_ValidationErrorIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorInput = function ColorInput(props) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      onChange = props.onChange,
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

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPicker = _useState2[0],
      setShowPicker = _useState2[1];

  var inputId = (0, _react.useRef)((0, _utils.randomId)());
  var portalRef = (0, _react.useRef)();

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isFocused = _useState4[0],
      setIsFocused = _useState4[1];

  var windowClickListener = (0, _react.useMemo)(function () {
    return function (e) {
      var insideClick = e.path.some(function (path) {
        return path.id === inputId.current || path.id === portalRef.current.state.id;
      });
      if (!insideClick) {
        setShowPicker(false);
      }
    };
  }, []);

  (0, _react.useEffect)(function () {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
  }, [showPicker, windowClickListener]);

  var handleOnInputChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    if (typeof newValue === 'string') newValue = newValue.toUpperCase();
    onChange({
      target: {
        name: name,
        value: newValue
      }
    });
    if (!showPicker) setShowPicker(true);
  }, [showPicker, setShowPicker, name, onChange]);

  var handleOnFocus = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && interactive) {
      setShowPicker(true);
      setIsFocused(true);
    }
  }, [readonly, disabled, interactive]);

  var handleOnBlur = (0, _react.useCallback)(function () {
    setIsFocused(false);
  }, []);

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input';
  if (!interactive) className = className + ' gfb-non-interactive-input';
  var controlClass = 'gfb-input__control';
  var validationError = void 0;
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }
  var outerClass = 'gfb-input-outer';
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus';
  }

  return _react2.default.createElement(
    'div',
    { className: outerClass, style: inputOuter },
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
            id: inputId.current,
            className: className,
            name: name,
            value: value,
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
          showPicker && _react2.default.createElement(_ColorPicker2.default, {
            ref: portalRef,
            inputId: inputId.current,
            value: value,
            onChange: handleOnInputChange,
            name: name
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__indicators', style: indicators },
          _react2.default.createElement('div', {
            className: 'gfb-color-input-indicator',
            style: { backgroundColor: value },
            onClick: handleOnFocus
          }),
          validationError && _react2.default.createElement(_ValidationErrorIcon2.default, { message: validationError }),
          validationError && _react2.default.createElement('span', { className: 'gfb-input__indicator-separator css-1okebmr-indicatorSeparator' })
        )
      )
    )
  );
};

exports.default = ColorInput;


ColorInput.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  required: _propTypes2.default.bool
};