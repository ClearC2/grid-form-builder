'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _LabelContainer = require('./Inputs/core/LabelContainer');

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _InputContainer = require('./Inputs/core/InputContainer');

var _InputContainer2 = _interopRequireDefault(_InputContainer);

var _utils = require('./utils');

var _Inputs = require('./Inputs');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GFBInput = function GFBInput(props) {
  var name = props.name,
      label = props.label,
      _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style,
      validate = props.validate,
      required = props.required,
      _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      onClick = props.onClick,
      cellTooltip = props.cellTooltip,
      _props$link = props.link,
      link = _props$link === undefined ? {} : _props$link,
      _props$cascade = props.cascade,
      cascade = _props$cascade === undefined ? {} : _props$cascade,
      onChange = props.onChange,
      tabIndex = props.tabIndex,
      _props$interactive = props.interactive,
      interactive = _props$interactive === undefined ? true : _props$interactive,
      _props$handleRTEImage = props.handleRTEImageClick,
      handleRTEImageClick = _props$handleRTEImage === undefined ? function () {
    return null;
  } : _props$handleRTEImage,
      _props$dateFormat = props.dateFormat,
      dateFormat = _props$dateFormat === undefined ? 'M/D/YYYY' : _props$dateFormat,
      _props$dateTimeFormat = props.dateTimeFormat,
      dateTimeFormat = _props$dateTimeFormat === undefined ? 'M/D/YYYY h:mm a' : _props$dateTimeFormat,
      _props$timeFormat = props.timeFormat,
      timeFormat = _props$timeFormat === undefined ? 'h:mm a' : _props$timeFormat,
      draggable = props.draggable,
      icon = props.icon,
      tooltips = props.tooltips,
      delimiter = props.delimiter;
  var _props$className = props.className,
      className = _props$className === undefined ? '' : _props$className,
      _props$type = props.type,
      type = _props$type === undefined ? 'input' : _props$type,
      _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === undefined ? false : _props$autoComplete,
      _props$values = props.values,
      values = _props$values === undefined ? {} : _props$values;


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
      innerCell = _style$innerCell === undefined ? {} : _style$innerCell;


  className = className + ' gfb-inner-cell';
  if (type === 'Checkbox') {
    className = className + ' gfb-inline-cell gfb-checkbox';
  }
  if (type === 'Metadata') {
    className = className + ' gfb-inline-cell';
  }

  var config = _extends({}, props, {
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

  return _react2.default.createElement(
    'div',
    {
      style: innerCell,
      className: className,
      onClick: onClick,
      'data-tip': true,
      'data-for': cellId.current
    },
    _react2.default.createElement(_Tooltip2.default, { id: cellId.current, message: cellTooltip }),
    _react2.default.createElement(_LabelContainer2.default, {
      config: config,
      handleLinkClick: link.handleLinkClick,
      handleCascadeKeywordClick: cascade.handleCascadeKeywordClick,
      value: value
    }),
    _react2.default.createElement(
      _InputContainer2.default,
      {
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
      },
      _react2.default.createElement(Type, null)
    )
  );
};

GFBInput.propTypes = {
  type: _propTypes2.default.string,
  style: _propTypes2.default.object,
  className: _propTypes2.default.string,
  validate: _propTypes2.default.bool,
  required: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  cellTooltip: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  values: _propTypes2.default.object,
  tabIndex: _propTypes2.default.number,
  draggable: _propTypes2.default.bool,
  dateFormat: _propTypes2.default.string,
  dateTimeFormat: _propTypes2.default.string,
  timeFormat: _propTypes2.default.string,
  handleRTEImageClick: _propTypes2.default.func,
  autoComplete: _propTypes2.default.bool,
  interactive: _propTypes2.default.bool,
  link: _propTypes2.default.object,
  cascade: _propTypes2.default.object,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array, _propTypes2.default.string, _propTypes2.default.number]),
  icon: _propTypes2.default.string,
  tooltips: _propTypes2.default.object,
  label: _propTypes2.default.string,
  name: _propTypes2.default.string,
  delimiter: _propTypes2.default.string
};

exports.default = GFBInput;