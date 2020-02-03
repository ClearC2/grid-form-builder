'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _immutable = require('immutable');

var _Tooltip = require('../../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require('../../utils');

var _useTheme2 = require('../../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @jsx jsx */


var InputPerformanceOptimizer = function (_Component) {
  _inherits(InputPerformanceOptimizer, _Component);

  function InputPerformanceOptimizer() {
    _classCallCheck(this, InputPerformanceOptimizer);

    return _possibleConstructorReturn(this, (InputPerformanceOptimizer.__proto__ || Object.getPrototypeOf(InputPerformanceOptimizer)).apply(this, arguments));
  }

  _createClass(InputPerformanceOptimizer, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(p) {
      var _props = this.props,
          config = _props.config,
          values = _props.values,
          value = _props.value;

      var type = typeof config.type === 'string' && config.type.toLowerCase() || 'input';
      if (type !== 'typeahead') {
        if (!values.equals(p.values) && value === p.value) {
          // if this is not a typeahead and its own value hasn't changed, don't rerender due to form values changing - JRA 01/24/2020
          return false;
        }
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _core.jsx)(InputContainer, this.props);
    }
  }]);

  return InputPerformanceOptimizer;
}(_react.Component);

InputPerformanceOptimizer.propTypes = {
  config: _propTypes2.default.object,
  values: _propTypes2.default.object,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.array, _propTypes2.default.string, _propTypes2.default.number])
};


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
  var _style$cellInput = style.cellInput,
      cellInput = _style$cellInput === undefined ? {} : _style$cellInput;

  var inputId = (0, _react.useRef)((0, _utils.randomId)());

  var _useTheme = (0, _useTheme3.default)(),
      theme = _useTheme.theme;

  return (0, _core.jsx)(
    'div',
    { className: 'gfb-inner-cell-input', style: cellInput, 'data-tip': true, 'data-for': inputId.current, css: theme.cellInput },
    (0, _core.jsx)(_Tooltip2.default, { id: inputId.current, message: inputTooltip }),
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

exports.default = InputPerformanceOptimizer;


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