import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ValidationErrorIcon from '../ValidationErrorIcon';
import useTheme from '../theme/useTheme';
import { convertDelimitedValueIntoLabelValueArray, convertLabelValueArrayIntoDelimitedValue } from '../utils';

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
      stringify = props.stringify;
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

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      options = _useState2[0],
      updateSelectOptions = _useState2[1];

  var _useState3 = useState([]),
      _useState4 = _slicedToArray(_useState3, 2),
      value = _useState4[0],
      updateValue = _useState4[1];

  useEffect(function () {
    var formattedOptions = keyword.options || [];
    if (!formattedOptions) formattedOptions = [];
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter);
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS();
    var duplicate = {}; // get rid of duplicates

    formattedOptions = _filterInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
      if (!option) return false;
      if (typeof option === 'string') return true;
      if (_typeof(option) === 'object' && !option.value) option.value = option.label;

      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true;
        return true;
      }
    }); // format into an array of {label, value} objects

    formattedOptions = _mapInstanceProperty(formattedOptions).call(formattedOptions, function (option) {
      if (typeof option === 'string') option = {
        label: option,
        value: option
      };
      if (!option.value) option.value = option.label;
      return option;
    });
    updateSelectOptions(formattedOptions);
  }, [delimiter, keyword.options]);
  useEffect(function () {
    var formattedValue = convertDelimitedValueIntoLabelValueArray({
      value: props.value,
      delimit: delimit,
      delimiter: delimiter,
      options: options
    });
    updateValue(formattedValue);
  }, [props.value, updateValue, name, delimit, delimiter, stringify, options]);
  var handleOnChange = useCallback(function (e) {
    if (!disabled && !readonly && interactive) {
      var clickedValue = e.target.value;

      var clickedOption = _findInstanceProperty(options).call(options, function (option) {
        return option.value === clickedValue || option.value === +clickedValue;
      });

      var found = false;

      var newValue = _filterInstanceProperty(value).call(value, function (val) {
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

  return jsx("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: theme.inputOuter
  }, jsx("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, jsx("div", {
    className: controlClass,
    style: inputControl,
    css: theme.inputControl
  }, jsx("div", {
    className: valueContainerClassName,
    style: valueContainer,
    css: theme.valueContainer
  }, _mapInstanceProperty(options).call(options, function (option, i) {
    var checked = _someInstanceProperty(value).call(value, function (val) {
      return val.value === option.value;
    });

    var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
    if (checked) className = className + ' gfb-multi-input-selected';
    if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input';
    if (!interactive) className = className + ' gfb-non-interactive-input';
    return jsx("label", {
      key: i,
      className: 'gfb-multi-input-label-wrapper ' + className,
      style: optionsStyle,
      css: theme.options
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
      css: theme.value
    }), option.label ? option.label : option.value);
  })), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators
  }, validationError && jsx(ValidationErrorIcon, {
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
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
};