"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var Listselect = function Listselect(props) {
  var name = props.name,
      onChange = props.onChange,
      _props$keyword = props.keyword,
      keyword = _props$keyword === void 0 ? {} : _props$keyword,
      disabled = props.disabled,
      readonly = props.readonly,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required;
  var _style$value = style.value,
      valueStyle = _style$value === void 0 ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === void 0 ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === void 0 ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === void 0 ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === void 0 ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === void 0 ? {} : _style$indicators,
      _style$options = style.options,
      optionsStyle = _style$options === void 0 ? {} : _style$options;

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var _keyword$options = keyword.options,
      options = _keyword$options === void 0 ? [] : _keyword$options;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      value = _useState2[0],
      updateValue = _useState2[1];

  (0, _react.useEffect)(function () {
    var val = props.value;
    if (typeof val === 'string') val = val.split('¤');
    val = (0, _filter.default)(val).call(val, function (val) {
      return !!val;
    });
    updateValue(val);
  }, [props.value, props.value.length]);
  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.innerHTML;
      var newvalue = (0, _toConsumableArray2.default)(value);

      if ((0, _indexOf.default)(newvalue).call(newvalue, clickedValue) > -1) {
        newvalue = (0, _filter.default)(newvalue).call(newvalue, function (val) {
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
  var handleSelectAll = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && interactive) {
      var allvalues = (0, _map.default)(options).call(options, function (option) {
        return option.value;
      });
      onChange({
        target: {
          name: name,
          value: allvalues
        }
      });
    }
  }, [readonly, disabled, interactive, options, onChange, name]);
  var handleDeselectAll = (0, _react.useCallback)(function () {
    if (!readonly && !disabled && interactive) {
      onChange({
        target: {
          name: name,
          value: []
        }
      });
    }
  }, [readonly, disabled, interactive, onChange, name]);
  var controlClass = 'gfb-input__control';
  var validationError;

  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  return (0, _core.jsx)("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: theme.inputOuter
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, (0, _core.jsx)("div", {
    className: "gfb-input__value-container gfb-value-multi-input-container",
    style: valueContainer,
    css: theme.valueContainer
  }, (0, _map.default)(options).call(options, function (option, i) {
    var display = option.label ? option.label : option.value;
    var selected = (0, _indexOf.default)(value).call(value, option.value) > -1;
    var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (selected) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    return (0, _core.jsx)("div", {
      key: i,
      className: className,
      onClick: handleOnChange,
      style: _objectSpread({}, valueStyle, {}, optionsStyle),
      css: theme.value
    }, display);
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }, validationError && (0, _core.jsx)("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  }))), (0, _core.jsx)("div", {
    className: "gfb-input-control-bottom"
  }, (0, _core.jsx)("span", {
    className: "gfb-action-link",
    onClick: handleSelectAll
  }, "Select All"), (0, _core.jsx)("span", {
    className: "gfb-action-link",
    onClick: handleDeselectAll
  }, "Deselect All"))));
};

var _default = Listselect;
exports.default = _default;
Listselect.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  keyword: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool
};