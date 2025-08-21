import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../Portal';
import { SketchPicker, CompactPicker } from 'react-color'; // eslint-disable-line

import '../../styles/colorpicker.css';
var ColorPicker = /*#__PURE__*/forwardRef(function (props, ref) {
  var inputId = props.inputId,
      onChange = props.onChange,
      value = props.value,
      name = props.name,
      onChangeComplete = props.onChangeComplete,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? props === null || props === void 0 ? void 0 : props.name : _props$dataTestid;

  var _useState = useState('compact'),
      _useState2 = _slicedToArray(_useState, 2),
      picker = _useState2[0],
      setPicker = _useState2[1];

  var togglePickerType = useCallback(function () {
    var newPicker = picker === 'compact' ? 'stretch' : 'compact';
    setPicker(newPicker);
  }, [picker]);

  var decimalToHex = function decimalToHex(alpha) {
    return alpha === 0 ? '00' : Math.round(255 * alpha).toString(16);
  };

  var handleOnChange = useCallback(function (e) {
    var _context;

    var hexCode = _concatInstanceProperty(_context = "".concat(e.hex)).call(_context, decimalToHex(e.rgb.a));

    onChange({
      target: {
        name: name,
        value: hexCode
      }
    });
  }, [onChange, name]);
  var Picker = picker === 'compact' ? CompactPicker : SketchPicker;
  return /*#__PURE__*/React.createElement(Portal, {
    id: inputId,
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-color-picker-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-color-picker-type-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: togglePickerType,
    "data-testid": "".concat(testId, "-picker-type")
  }, "Toggle Picker Type")), /*#__PURE__*/React.createElement(Picker, {
    onChangeComplete: onChangeComplete,
    onChange: handleOnChange,
    color: value,
    "data-testid": testId
  })));
});
export default ColorPicker;
ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  name: PropTypes.string,
  'data-testid': PropTypes.string
};