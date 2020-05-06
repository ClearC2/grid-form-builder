/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import useTheme from '../theme/useTheme';

var Metadata = function Metadata(props) {
  var _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
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
      indicators = _style$indicators === void 0 ? {} : _style$indicators;

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  return jsx("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: theme.inputOuter
  }, jsx("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: theme.inputInner
  }, jsx("div", {
    className: "gfb-input__control gfb-boxless-input",
    style: inputControl,
    css: theme.inputControl
  }, jsx("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: theme.valueContainer
  }, jsx("strong", {
    style: valueStyle,
    css: theme.value
  }, value)), jsx("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: theme.indicators
  }))));
};

export default Metadata;
Metadata.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  style: PropTypes.object
};