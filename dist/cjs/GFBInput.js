"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _LabelContainer = _interopRequireDefault(require("./Inputs/core/LabelContainer"));

var _InputContainer = _interopRequireDefault(require("./Inputs/core/InputContainer"));

var _utils = require("./utils");

var _Inputs = require("./Inputs");

var _immutable = require("immutable");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var GFBInput = function GFBInput(props) {
  var name = props.name,
      label = props.label,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      validate = props.validate,
      required = props.required,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      onClick = props.onClick,
      cellTooltip = props.cellTooltip,
      _props$link = props.link,
      link = _props$link === void 0 ? {} : _props$link,
      _props$cascade = props.cascade,
      cascade = _props$cascade === void 0 ? {} : _props$cascade,
      onChange = props.onChange,
      tabIndex = props.tabIndex,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      _props$handleRTEImage = props.handleRTEImageClick,
      handleRTEImageClick = _props$handleRTEImage === void 0 ? function () {
    return null;
  } : _props$handleRTEImage,
      _props$dateFormat = props.dateFormat,
      dateFormat = _props$dateFormat === void 0 ? 'M/D/YYYY' : _props$dateFormat,
      _props$dateTimeFormat = props.dateTimeFormat,
      dateTimeFormat = _props$dateTimeFormat === void 0 ? 'M/D/YYYY h:mm a' : _props$dateTimeFormat,
      _props$timeFormat = props.timeFormat,
      timeFormat = _props$timeFormat === void 0 ? 'h:mm a' : _props$timeFormat,
      draggable = props.draggable,
      icon = props.icon,
      tooltips = props.tooltips,
      delimiter = props.delimiter;

  var _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$type = props.type,
      type = _props$type === void 0 ? 'input' : _props$type,
      _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? false : _props$autoComplete,
      _props$values = (0, _values.default)(props),
      values = _props$values === void 0 ? {} : _props$values;

  if (!values.toJS) values = (0, _immutable.fromJS)(values);
  if (!autoComplete) autoComplete = 'off';
  var cellId = (0, _react.useRef)((0, _utils.randomId)());
  if (!type) type = 'input';

  if (typeof type === 'string') {
    type = (0, _utils.uppercaseFirstLetter)(type);
  } else {
    type = 'Input';
  }

  var Type = (0, _Inputs.mapInputType)(type);
  var _style$innerCell = style.innerCell,
      innerCell = _style$innerCell === void 0 ? {} : _style$innerCell;
  className = className + ' gfb-inner-cell';

  if (type === 'Checkbox') {
    className = className + ' gfb-inline-cell gfb-checkbox';
  }

  if (type === 'Metadata') {
    className = className + ' gfb-inline-cell';
  }

  var config = _objectSpread(_objectSpread(_objectSpread({}, props), props.config), {}, {
    required: required,
    link: link,
    cascade: cascade,
    type: type,
    icon: icon,
    tooltips: tooltips,
    label: label,
    name: name,
    delimiter: delimiter
  });

  return /*#__PURE__*/_react.default.createElement("div", {
    style: innerCell,
    className: className,
    onClick: onClick,
    "data-tip": true,
    "data-for": cellId.current
  }, /*#__PURE__*/_react.default.createElement(_Tooltip.default, {
    id: cellId.current,
    message: cellTooltip
  }), /*#__PURE__*/_react.default.createElement(_LabelContainer.default, {
    config: config,
    handleLinkClick: link.handleLinkClick,
    handleCascadeKeywordClick: cascade.handleCascadeKeywordClick,
    value: value
  }), /*#__PURE__*/_react.default.createElement(_InputContainer.default, {
    config: config,
    value: value,
    values: values,
    onChange: onChange,
    requiredWarning: validate,
    tabIndex: tabIndex,
    draggable: draggable,
    dateFormat: dateFormat,
    dateTimeFormat: dateTimeFormat,
    timeFormat: timeFormat,
    handleRTEImageClick: handleRTEImageClick,
    autoComplete: autoComplete,
    interactive: interactive
  }, /*#__PURE__*/_react.default.createElement(Type, null)));
};

GFBInput.propTypes = {
  type: _propTypes.default.string,
  style: _propTypes.default.object,
  className: _propTypes.default.string,
  validate: _propTypes.default.bool,
  required: _propTypes.default.bool,
  onClick: _propTypes.default.func,
  cellTooltip: _propTypes.default.string,
  onChange: _propTypes.default.func,
  values: _propTypes.default.object,
  tabIndex: _propTypes.default.number,
  draggable: _propTypes.default.bool,
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  handleRTEImageClick: _propTypes.default.func,
  autoComplete: _propTypes.default.bool,
  interactive: _propTypes.default.bool,
  link: _propTypes.default.object,
  cascade: _propTypes.default.object,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  icon: _propTypes.default.string,
  tooltips: _propTypes.default.object,
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  delimiter: _propTypes.default.string,
  config: _propTypes.default.object
};
var _default = GFBInput;
exports.default = _default;