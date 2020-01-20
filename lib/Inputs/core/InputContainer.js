'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _Tooltip = require('../../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var InputContainer = function InputContainer(props) {
  var children = props.children,
      config = props.config,
      values = props.values,
      value = props.value,
      onChange = props.onChange,
      requiredWarning = props.requiredWarning,
      tabIndex = props.tabIndex,
      draggable = props.draggable,
      dateFormat = props.dateFormat,
      dateTimeFormat = props.dateTimeFormat,
      timeFormat = props.timeFormat,
      handleRTEImageClick = props.handleRTEImageClick,
      autoComplete = props.autoComplete,
      interactive = props.interactive;

  var name = config.name,
      required = config.required,
      _config$style = config.style,
      style = _config$style === undefined ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === undefined ? {} : _config$tooltips,
      other = _objectWithoutProperties(config, ['name', 'required', 'style', 'tooltips']);

  var inputTooltip = tooltips.input;
  var _style$innerCell = style.innerCell,
      innerCell = _style$innerCell === undefined ? {} : _style$innerCell;

  var inputId = (0, _react.useRef)((0, _utils.randomId)());
  return _react2.default.createElement(
    'div',
    { className: 'gfb-inner-cell-input', style: innerCell, 'data-tip': true, 'data-for': inputId.current },
    _react2.default.createElement(_Tooltip2.default, { id: inputId.current, message: inputTooltip }),
    (0, _react.cloneElement)(children, _extends({
      requiredWarning: requiredWarning,
      tabIndex: tabIndex,
      draggable: draggable,
      name: name,
      values: values,
      value: value,
      onChange: onChange,
      dateFormat: dateFormat,
      dateTimeFormat: dateTimeFormat,
      timeFormat: timeFormat,
      handleRTEImageClick: handleRTEImageClick,
      autoComplete: autoComplete,
      interactive: interactive,
      required: required,
      style: style
    }, other))
  );
};

exports.default = InputContainer;


InputContainer.propTypes = {
  children: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.array]),
  config: _propTypes2.default.object,
  values: _propTypes2.default.instanceOf(_immutable.Map),
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array, _propTypes2.default.string, _propTypes2.default.number]),
  onChange: _propTypes2.default.func,
  requiredWarning: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  draggable: _propTypes2.default.bool,
  dateFormat: _propTypes2.default.string,
  dateTimeFormat: _propTypes2.default.string,
  timeFormat: _propTypes2.default.string,
  handleRTEImageClick: _propTypes2.default.func,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool
};