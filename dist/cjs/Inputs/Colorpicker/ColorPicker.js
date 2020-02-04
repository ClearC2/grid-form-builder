"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Portal = _interopRequireDefault(require("../../Portal"));

var _reactColor = require("react-color");

require("../../styles/colorpicker.css");

// eslint-disable-line
var ColorPicker = (0, _react.forwardRef)(function (props, ref) {
  var inputId = props.inputId,
      onChange = props.onChange,
      value = props.value,
      name = props.name;

  var _useState = (0, _react.useState)('compact'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      picker = _useState2[0],
      setPicker = _useState2[1];

  var togglePickerType = (0, _react.useCallback)(function () {
    var newPicker = picker === 'compact' ? 'stretch' : 'compact';
    setPicker(newPicker);
  }, [picker]);
  var handleOnChange = (0, _react.useCallback)(function (e) {
    var hex = e.hex;
    onChange({
      target: {
        name: name,
        value: hex
      }
    });
  }, [onChange, name]);
  var Picker = picker === 'compact' ? _reactColor.CompactPicker : _reactColor.SketchPicker;
  return _react.default.createElement(_Portal.default, {
    id: inputId,
    ref: ref
  }, _react.default.createElement("div", {
    className: "gfb-color-picker-container"
  }, _react.default.createElement("div", {
    className: "gfb-color-picker-type-toggle"
  }, _react.default.createElement("button", {
    className: "btn btn-primary",
    onClick: togglePickerType
  }, "Toggle Picker Type")), _react.default.createElement(Picker, {
    onChange: handleOnChange,
    color: value
  })));
});
var _default = ColorPicker;
exports.default = _default;
ColorPicker.propTypes = {
  inputId: _propTypes.default.string,
  pickerId: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  onChange: _propTypes.default.func,
  name: _propTypes.default.string
};