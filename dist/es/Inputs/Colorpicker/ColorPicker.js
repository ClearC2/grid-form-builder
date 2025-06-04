import React, { forwardRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../Portal';
import { SketchPicker, CompactPicker } from 'react-color'; // eslint-disable-line
import '../../styles/colorpicker.css';
const ColorPicker = /*#__PURE__*/forwardRef((props, ref) => {
  const {
    inputId,
    onChange,
    value,
    name,
    onChangeComplete
  } = props;
  const [picker, setPicker] = useState('compact');
  const togglePickerType = useCallback(() => {
    const newPicker = picker === 'compact' ? 'stretch' : 'compact';
    setPicker(newPicker);
  }, [picker]);
  const decimalToHex = alpha => alpha === 0 ? '00' : Math.round(255 * alpha).toString(16);
  const handleOnChange = useCallback(e => {
    const hexCode = `${e.hex}${decimalToHex(e.rgb.a)}`;
    onChange({
      target: {
        name,
        value: hexCode
      }
    });
  }, [onChange, name]);
  const Picker = picker === 'compact' ? CompactPicker : SketchPicker;
  return /*#__PURE__*/React.createElement(Portal, {
    id: inputId,
    ref: ref
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-color-picker-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-color-picker-type-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: togglePickerType
  }, "Toggle Picker Type")), /*#__PURE__*/React.createElement(Picker, {
    onChangeComplete: onChangeComplete,
    onChange: handleOnChange,
    color: value
  })));
});
export default ColorPicker;
ColorPicker.propTypes = {
  inputId: PropTypes.string,
  pickerId: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  onChangeComplete: PropTypes.func,
  name: PropTypes.string
};