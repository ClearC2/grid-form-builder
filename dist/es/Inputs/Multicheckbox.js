import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import { convertDelimitedValueIntoLabelValueArray, convertLabelValueArrayIntoDelimitedValue, randomId } from '../utils';
import PortalTooltip from '../Tooltip';
const Multicheckbox = props => {
  const {
    name,
    onChange,
    readonly,
    disabled,
    autofocus,
    keyword = {},
    inline,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    delimit,
    delimiter = '¤',
    stringify,
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
  const [options, updateSelectOptions] = useState([]);
  const [value, updateValue] = useState([]);
  useEffect(() => {
    let formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter);
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();
    const duplicate = {};
    // get rid of duplicates
    formattedOptions = _filterInstanceProperty(formattedOptions).call(formattedOptions, option => {
      if (!option) return false;
      if (typeof option === 'string') return true;
      if (typeof option === 'object' && !option.value) option.value = option.label;
      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true;
        return true;
      }
    });

    // format into an array of {label, value} objects
    formattedOptions = _mapInstanceProperty(formattedOptions).call(formattedOptions, option => {
      if (typeof option === 'string') option = {
        label: option,
        value: option
      };
      if (!option.value) option.value = option.label;
      return option;
    });
    updateSelectOptions(formattedOptions);
  }, [delimiter, keyword.options]);
  useEffect(() => {
    const formattedValue = convertDelimitedValueIntoLabelValueArray({
      value: props.value,
      delimit,
      delimiter,
      options
    });
    updateValue(formattedValue);
  }, [props.value, updateValue, name, delimit, delimiter, stringify, options]);
  const handleOnChange = useCallback(e => {
    if (!disabled && !readonly && interactive) {
      const {
        value: clickedValue
      } = e.target;
      const clickedOption = _findInstanceProperty(options).call(options, option => {
        return option.value === clickedValue || option.value === +clickedValue;
      });
      let found = false;
      let newValue = _filterInstanceProperty(value).call(value, val => {
        if (val.value === clickedOption.value) {
          found = true;
          return false;
        }
        return true;
      });
      if (!found) {
        newValue.push(clickedOption);
      }
      newValue = convertLabelValueArrayIntoDelimitedValue({
        value: newValue,
        delimiter,
        delimit,
        stringify
      });
      onChange({
        target: {
          name,
          value: newValue
        }
      });
    }
  }, [disabled, readonly, interactive, value, delimiter, delimit, stringify, onChange, name, options]);
  let valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container';
  }
  let controlClass = 'gfb-input__control gfb-boxless-input';
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
    className: valueContainerClassName,
    style: valueContainer,
    css: valueContainerCSS
  }, _mapInstanceProperty(options).call(options, (option, i) => {
    const checked = _someInstanceProperty(value).call(value, val => {
      return val.value === option.value;
    });
    let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (checked) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    const optionId = randomId();
    return jsx("label", {
      key: i,
      className: 'gfb-multi-input-label-wrapper ' + className,
      style: optionsStyle,
      css: theme.options,
      "data-tip": true,
      "data-for": optionId
    }, jsx("input", {
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
    }), option.label ? option.label : option.value, showOptionTooltips ? jsx(PortalTooltip, {
      id: optionId,
      message: option?.tooltip
    }) : null);
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
  }, warning && !validationError && jsx(ValidationErrorIcon, {
    message: warning,
    color: "#FFCC00",
    type: "warning"
  }), validationError && jsx(ValidationErrorIcon, {
    message: validationError
  })))));
};
export default Multicheckbox;
Multicheckbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  keyword: PropTypes.object,
  inline: PropTypes.bool,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  stringify: PropTypes.bool,
  delimiter: PropTypes.string,
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  warning: PropTypes.string,
  showOptionTooltips: PropTypes.bool
};