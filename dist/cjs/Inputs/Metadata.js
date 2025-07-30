"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _core = require("@emotion/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _useTheme2 = _interopRequireDefault(require("../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var Metadata = function Metadata(props) {
  var _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$dataTestid = props['data-testid'],
      testId = _props$dataTestid === void 0 ? (props === null || props === void 0 ? void 0 : props['data-testid']) || (props === null || props === void 0 ? void 0 : props.name) : _props$dataTestid;
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

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var inputOuterCSS = _objectSpread(_objectSpread({}, theme.inputOuter), inputOuter);

  var inputInnerCSS = _objectSpread(_objectSpread({}, theme.inputInner), inputInner);

  var inputControlCSS = _objectSpread(_objectSpread({}, theme.inputControl), inputControl);

  var valueContainerCSS = _objectSpread(_objectSpread({}, theme.valueContainer), valueContainer);

  var valueCSS = _objectSpread(_objectSpread({}, theme.value), valueStyle);

  var indicatorsCSS = _objectSpread(_objectSpread({}, theme.indicators), indicators);

  return (0, _core.jsx)("div", {
    className: "gfb-input-outer",
    style: inputOuter,
    css: inputOuterCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input-inner",
    style: inputInner,
    css: inputInnerCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input__control gfb-boxless-input",
    style: inputControl,
    css: inputControlCSS
  }, (0, _core.jsx)("div", {
    className: "gfb-input__value-container",
    style: valueContainer,
    css: valueContainerCSS,
    "data-testid": testId
  }, (0, _core.jsx)("strong", {
    style: valueStyle,
    css: valueCSS
  }, value)), (0, _core.jsx)("div", {
    className: "gfb-input__indicators",
    style: indicators,
    css: indicatorsCSS
  }))));
};

var _default = Metadata;
exports.default = _default;
Metadata.propTypes = {
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  style: _propTypes.default.object,
  'data-testid': _propTypes.default.string
};