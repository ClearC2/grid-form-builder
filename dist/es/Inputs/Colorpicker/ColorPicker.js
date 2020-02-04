import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../Portal';
import { SketchPicker, CompactPicker } from 'react-color'; // eslint-disable-line

import '../../../styles/colorpicker.css';
var ColorPicker = forwardRef(function (props, ref) {
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
});
export default ColorPicker;
ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  onChange: PropTypes.func,
  name: PropTypes.string
<<<<<<< HEAD:lib/Inputs/Colorpicker/ColorPicker.js
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ColorPicker, "ColorPicker", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Colorpicker\\ColorPicker.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\Inputs\\Colorpicker\\ColorPicker.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();
=======
};
>>>>>>> aa68762e12dc6f3f09855b63bf3638f1d4b23f1b:dist/es/Inputs/Colorpicker/ColorPicker.js
