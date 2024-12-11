"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ValidationErrorIcon = _interopRequireDefault(require("../ValidationErrorIcon"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

var _utils = require("../utils");

var _Tooltip = _interopRequireDefault(require("../Tooltip"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var Multicheckbox = function Multicheckbox(props) {
  var name = props.name,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      _props$keyword = props.keyword,
      keyword = _props$keyword === void 0 ? {} : _props$keyword,
      inline = props.inline,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      requiredWarning = props.requiredWarning,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      required = props.required,
      delimit = props.delimit,
      _props$delimiter = props.delimiter,
      delimiter = _props$delimiter === void 0 ? '¤' : _props$delimiter,
      stringify = props.stringify,
      warning = props.warning,
      _props$showOptionTool = props.showOptionTooltips,
      showOptionTooltips = _props$showOptionTool === void 0 ? false : _props$showOptionTool;
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

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      options = _useState2[0],
      updateSelectOptions = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      value = _useState4[0],
      updateValue = _useState4[1];

  (0, _react.useEffect)(function () {
    var formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter);
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();
    var duplicate = {}; // get rid of duplicates

    formattedOptions = (0, _filter.default)(formattedOptions).call(formattedOptions, function (option) {
      if (!option) return false;
      if (typeof option === 'string') return true;
      if ((0, _typeof2.default)(option) === 'object' && !option.value) option.value = option.label;

      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true;
        return true;
      }
    }); // format into an array of {label, value} objects

    formattedOptions = (0, _map.default)(formattedOptions).call(formattedOptions, function (option) {
      if (typeof option === 'string') option = {
        label: option,
        value: option
      };
      if (!option.value) option.value = option.label;
      return option;
    });
    updateSelectOptions(formattedOptions);
  }, [delimiter, keyword.options]);
  (0, _react.useEffect)(function () {
    var formattedValue = (0, _utils.convertDelimitedValueIntoLabelValueArray)({
      value: props.value,
      delimit: delimit,
      delimiter: delimiter,
      options: options
    });
    updateValue(formattedValue);
  }, [props.value, updateValue, name, delimit, delimiter, stringify, options]);
  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.value;
      var clickedOption = (0, _find.default)(options).call(options, function (option) {
        return option.value === clickedValue || option.value === +clickedValue;
      });
      var found = false;
      var newValue = (0, _filter.default)(value).call(value, function (val) {
        if (val.value === clickedOption.value) {
          found = true;
          return false;
        }

        return true;
      });

      if (!found) {
        newValue.push(clickedOption);
      }

      newValue = (0, _utils.convertLabelValueArrayIntoDelimitedValue)({
        value: newValue,
        delimiter: delimiter,
        delimit: delimit,
        stringify: stringify
      });
      onChange({
        target: {
          name: name,
          value: newValue
        }
      });
    }
  }, [disabled, readonly, interactive, value, delimiter, delimit, stringify, onChange, name, options]);
  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';

  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container';
  }

  var controlClass = 'gfb-input__control gfb-boxless-input';
  var validationError;

  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

  return (0, _core.jsx)("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: inputOuterCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: inputInnerCSS
  }, (0, _core.jsx)("div", {
    className: controlClass,
    style: inputControl,
    css: inputControlCSS
  }, (0, _core.jsx)("div", {
    className: valueContainerClassName,
    style: valueContainer,
    css: valueContainerCSS
  }, (0, _map.default)(options).call(options, function (option, i) {
    var checked = (0, _some.default)(value).call(value, function (val) {
      return val.value === option.value;
    });
    var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (checked) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    var optionId = (0, _utils.randomId)();
    return (0, _core.jsx)("label", {
      key: i,
      className: 'gfb-multi-input-label-wrapper ' + className,
      style: optionsStyle,
      css: theme.options,
      "data-tip": true,
      "data-for": optionId
    }, (0, _core.jsx)("input", {
      className: className,
      name: name,
      value: option.value,
      checked: checked,
      onChange: handleOnChange,
      disabled: readonly || disabled || !interactive,
      autoFocus: autofocus,
      type: "checkbox",
      autoComplete: autoComplete,
      style: valueStyle,
      css: valueCSS
    }), option.label ? option.label : option.value, showOptionTooltips ? (0, _core.jsx)(_Tooltip.default, {
      id: optionId,
      message: option === null || option === void 0 ? void 0 : option.tooltip
    }) : null);
  })), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
  }, warning && !validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: warning,
    color: "#FFCC00",
    type: "warning"
  }), validationError && (0, _core.jsx)(_ValidationErrorIcon.default, {
    message: validationError
  })))));
};

var _default = Multicheckbox;
exports.default = _default;
Multicheckbox.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  keyword: _propTypes.default.object,
  inline: _propTypes.default.bool,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool,
  stringify: _propTypes.default.bool,
  delimiter: _propTypes.default.string,
  delimit: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.array]),
  warning: _propTypes.default.string,
  showOptionTooltips: _propTypes.default.bool
};