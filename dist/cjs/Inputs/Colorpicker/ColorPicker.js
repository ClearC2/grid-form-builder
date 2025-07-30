"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Portal = _interopRequireDefault(require("../../Portal"));

var _reactColor = require("react-color");

require("../../styles/colorpicker.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// eslint-disable-line
var ColorPicker = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var inputId = props.inputId,
      onChange = props.onChange,
      value = props.value,
      name = props.name,
      onChangeComplete = props.onChangeComplete,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? (props === null || props === void 0 ? void 0 : props['data-testid']) || (props === null || props === void 0 ? void 0 : props.name) : _props$dataTestid;

  var _useState = (0, _react.useState)('compact'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      picker = _useState2[0],
      setPicker = _useState2[1];

  var togglePickerType = (0, _react.useCallback)(function () {
    var newPicker = picker === 'compact' ? 'stretch' : 'compact';
    setPicker(newPicker);
  }, [picker]);

  var decimalToHex = function decimalToHex(alpha) {
    return alpha === 0 ? '00' : Math.round(255 * alpha).toString(16);
  };

  var handleOnChange = (0, _react.useCallback)(function (e) {
    var _context;

    var hexCode = (0, _concat.default)(_context = "".concat(e.hex)).call(_context, decimalToHex(e.rgb.a));
    onChange({
      target: {
        name: name,
        value: hexCode
      }
    });
  }, [onChange, name]);
  var Picker = picker === 'compact' ? _reactColor.CompactPicker : _reactColor.SketchPicker;
  return /*#__PURE__*/_react.default.createElement(_Portal.default, {
    id: inputId,
    ref: ref
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-color-picker-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-color-picker-type-toggle"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "btn btn-primary",
    onClick: togglePickerType,
    "data-testid": "".concat(testId, "-picker-type")
  }, "Toggle Picker Type")), /*#__PURE__*/_react.default.createElement(Picker, {
    onChangeComplete: onChangeComplete,
    onChange: handleOnChange,
    color: value,
    "data-testid": testId
  })));
});
var _default = ColorPicker;
exports.default = _default;
ColorPicker.propTypes = {
  inputId: _propTypes.default.string,
  pickerId: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  onChange: _propTypes.default.func,
  onChangeComplete: _propTypes.default.func,
  name: _propTypes.default.string,
  'data-testid': _propTypes.default.string
};