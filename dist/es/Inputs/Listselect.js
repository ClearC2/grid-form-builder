import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import PortalTooltip from '../Tooltip';
import { randomId } from '../utils';

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
      required = props.required,
      warning = props.warning,
      _props$showOptionTool = props.showOptionTooltips,
      showOptionTooltips = _props$showOptionTool === void 0 ? false : _props$showOptionTool,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? props === null || props === void 0 ? void 0 : props.name : _props$dataTestid;
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

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var _keyword$options = keyword.options,
      options = _keyword$options === void 0 ? [] : _keyword$options;

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      updateValue = _useState2[1];

  useEffect(function () {
    var val = props.value;
    if (typeof val === 'string') val = val.split('¤');
    val = _filterInstanceProperty(val).call(val, function (val) {
      return !!val;
    });
    updateValue(val);
  }, [props.value, props.value.length]);
  var handleOnChange = useCallback(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.dataset.value;

      var newvalue = _toConsumableArray(value);

      if (_indexOfInstanceProperty(newvalue).call(newvalue, clickedValue) > -1) {
        newvalue = _filterInstanceProperty(newvalue).call(newvalue, function (val) {
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
  var handleSelectAll = useCallback(function () {
    if (!readonly && !disabled && interactive) {
      var allvalues = _mapInstanceProperty(options).call(options, function (option) {
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
  var handleDeselectAll = useCallback(function () {
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

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

  return jsx("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: inputOuterCSS
  }, jsx("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: inputInnerCSS
  }, jsx("div", {
    className: controlClass,
    style: inputControl,
    css: inputControlCSS
  }, jsx("div", {
    className: "gfb-input__value-container gfb-value-multi-input-container",
    style: valueContainer,
    css: valueContainerCSS
  }, _mapInstanceProperty(options).call(options, function (option, i) {
    var _context;

    var display = option.label ? option.label : option.value;
    var selected = _indexOfInstanceProperty(value).call(value, option.value) > -1;
    var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (selected) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    var optionId = randomId();
    return jsx("div", {
      key: i,
      className: className,
      onClick: handleOnChange,
      style: _objectSpread(_objectSpread({}, valueStyle), optionsStyle),
      "data-value": option.value,
      css: valueCSS,
      "data-tip": true,
      "data-for": optionId,
      "data-testid": _concatInstanceProperty(_context = "".concat(testId, "-")).call(_context, option.value)
    }, display, showOptionTooltips ? jsx(PortalTooltip, {
      id: optionId,
      message: option === null || option === void 0 ? void 0 : option.tooltip
    }) : null);
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS,
    "data-testid": "".concat(testId, "-errors")
  }, (validationError || warning) && jsx("span", {
    className: "gfb-input__indicator-separator css-1okebmr-indicatorSeparator"
  }), warning && !validationError && jsx(ValidationErrorIcon, {
    message: warning,
    color: "#FFCC00",
    type: "warning"
  }), validationError && jsx(ValidationErrorIcon, {
    message: validationError
  }))), jsx("div", {
    className: "gfb-input-control-bottom"
  }, jsx("span", {
    className: "gfb-action-link",
    onClick: handleSelectAll,
    "data-testid": "".concat(testId, "-select-all")
  }, "Select All"), jsx("span", {
    className: "gfb-action-link",
    onClick: handleDeselectAll,
    "data-testid": "".concat(testId, "-deselect-all")
  }, "Deselect All"))));
};

export default Listselect;
Listselect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  keyword: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  warning: PropTypes.string,
  showOptionTooltips: PropTypes.bool,
  'data-testid': PropTypes.string
};