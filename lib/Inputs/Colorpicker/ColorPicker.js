import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../Portal';
import { SketchPicker, CompactPicker } from 'react-color'; // eslint-disable-line

import '../../../styles/colorpicker.css';
var ColorPicker = forwardRef(__signature__(function (props, ref) {
  var inputId = props.inputId,
      onChange = props.onChange,
      value = props.value,
      name = props.name;

  var _useState = useState('compact'),
      _useState2 = _slicedToArray(_useState, 2),
      picker = _useState2[0],
      setPicker = _useState2[1];

  var togglePickerType = useCallback(function () {
    var newPicker = picker === 'compact' ? 'stretch' : 'compact';
    setPicker(newPicker);
  }, [picker]);
  var handleOnChange = useCallback(function (e) {
    var hex = e.hex;
    onChange({
      target: {
        name: name,
        value: hex
      }
    });
  }, [onChange, name]);
  var Picker = picker === 'compact' ? CompactPicker : SketchPicker;
  return React.createElement(Portal, {
    id: inputId,
    ref: ref
  }, React.createElement("div", {
    className: "gfb-color-picker-container"
  }, React.createElement("div", {
    className: "gfb-color-picker-type-toggle"
  }, React.createElement("button", {
    className: "btn btn-primary",
    onClick: togglePickerType
  }, "Toggle Picker Type")), React.createElement(Picker, {
    onChange: handleOnChange,
    color: value
  })));
}, "useState{[picker, setPicker]('compact')}\nuseCallback{togglePickerType}\nuseCallback{handleOnChange}"));
var _default = ColorPicker;
export default _default;
ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ColorPicker, "ColorPicker", "/root/repo/src/Inputs/Colorpicker/ColorPicker.js");
  reactHotLoader.register(_default, "default", "/root/repo/src/Inputs/Colorpicker/ColorPicker.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();