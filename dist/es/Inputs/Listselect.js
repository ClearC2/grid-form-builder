import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import PortalTooltip from '../Tooltip';
import { randomId } from '../utils';
const Listselect = props => {
  const {
    name,
    onChange,
    keyword = {},
    disabled,
    readonly,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    warning,
    showOptionTooltips = false // this flag is used to show tooltips for each individual option
  } = props;
  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {},
    options: optionsStyle = {}
  } = style;
  const {
    theme
  } = useTheme();
  const {
    options = []
  } = keyword;
  const [value, updateValue] = useState([]);
  useEffect(() => {
    let val = props.value;
    if (typeof val === 'string') val = val.split('¤');
    val = _filterInstanceProperty(val).call(val, val => !!val);
    updateValue(val);
  }, [props.value, props.value.length]);
  const handleOnChange = useCallback(e => {
    if (!disabled && !readonly && interactive) {
      const {
        value: clickedValue
      } = e.target.dataset;
      let newvalue = [...value];
      if (_indexOfInstanceProperty(newvalue).call(newvalue, clickedValue) > -1) {
        newvalue = _filterInstanceProperty(newvalue).call(newvalue, val => val !== clickedValue);
      } else {
        newvalue.push(clickedValue);
      }
      onChange({
        target: {
          name,
          value: newvalue
        }
      });
    }
  }, [disabled, readonly, interactive, value, onChange, name]);
  const handleSelectAll = useCallback(() => {
    if (!readonly && !disabled && interactive) {
      const allvalues = _mapInstanceProperty(options).call(options, option => option.value);
      onChange({
        target: {
          name,
          value: allvalues
        }
      });
    }
  }, [readonly, disabled, interactive, options, onChange, name]);
  const handleDeselectAll = useCallback(() => {
    if (!readonly && !disabled && interactive) {
      onChange({
        target: {
          name,
          value: []
        }
      });
    }
  }, [readonly, disabled, interactive, onChange, name]);
  let controlClass = 'gfb-input__control';
  let validationError;
  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error';
    validationError = 'This Field is Required';
  }
  const inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);
  const inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);
  const inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);
  const valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);
  const valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);
  const indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);
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
  }, _mapInstanceProperty(options).call(options, (option, i) => {
    const display = option.label ? option.label : option.value;
    const selected = _indexOfInstanceProperty(value).call(value, option.value) > -1;
    let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (selected) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    const optionId = randomId();
    return jsx("div", {
      key: i,
      className: className,
      onClick: handleOnChange,
      style: _objectSpread(_objectSpread({}, valueStyle), optionsStyle),
      "data-value": option.value,
      css: valueCSS,
      "data-tip": true,
      "data-for": optionId
    }, display, showOptionTooltips ? jsx(PortalTooltip, {
      id: optionId,
      message: option?.tooltip
    }) : null);
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
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
    onClick: handleSelectAll
  }, "Select All"), jsx("span", {
    className: "gfb-action-link",
    onClick: handleDeselectAll
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
  showOptionTooltips: PropTypes.bool
};