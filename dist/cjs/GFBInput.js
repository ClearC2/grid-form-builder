"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _LabelContainer = _interopRequireDefault(require("./Inputs/core/LabelContainer"));

var _InputContainer = _interopRequireDefault(require("./Inputs/core/InputContainer"));

var _utils = require("./utils");

var _Inputs = require("./Inputs");

var _immutable = require("immutable");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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

  var config = _objectSpread({}, props, {
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

  return _react.default.createElement("div", {
    style: innerCell,
    className: className,
    onClick: onClick,
    "data-tip": true,
    "data-for": cellId.current
  }, _react.default.createElement(_Tooltip.default, {
    id: cellId.current,
    message: cellTooltip
  }), _react.default.createElement(_LabelContainer.default, {
    config: config,
    handleLinkClick: link.handleLinkClick,
    handleCascadeKeywordClick: cascade.handleCascadeKeywordClick,
    value: value
  }), _react.default.createElement(_InputContainer.default, {
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
  }, _react.default.createElement(Type, null)));
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
  value: _propTypes.default.oneOfType([_propTypes.default.object, _propTypes.default.array, _propTypes.default.string, _propTypes.default.number]),
  icon: _propTypes.default.string,
  tooltips: _propTypes.default.object,
  label: _propTypes.default.string,
  name: _propTypes.default.string,
  delimiter: _propTypes.default.string
};
var _default = GFBInput;
exports.default = _default;