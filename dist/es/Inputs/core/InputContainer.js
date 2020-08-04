import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Component, cloneElement, useRef } from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import PortalTooltip from '../../Tooltip';
import { randomId } from '../../utils';
import useTheme from '../../theme/useTheme';

var InputPerformanceOptimizer =
/*#__PURE__*/
function (_Component) {
  _inherits(InputPerformanceOptimizer, _Component);

  function InputPerformanceOptimizer() {
    _classCallCheck(this, InputPerformanceOptimizer);

    return _possibleConstructorReturn(this, _getPrototypeOf(InputPerformanceOptimizer).apply(this, arguments));
  }

  _createClass(InputPerformanceOptimizer, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(p) {
      var _this$props = this.props,
          config = _this$props.config,
          values = _valuesInstanceProperty(_this$props),
          value = _this$props.value;

      var type = typeof config.type === 'string' && config.type.toLowerCase() || 'input';

      if (!values.equals(_valuesInstanceProperty(p)) && value === p.value) {
        // if the values object is the thing changing but it isn't the value for this field
        if (type !== 'typeahead' || // if its not a typeahead, don't update just because the entire fields object updated
        config.typeahead && !_filterInstanceProperty(config.typeahead) && !config.typeahead.fieldvalue // if it is a typeahead but doesn't have filters or use a fieldvalue as a key, it doesn't care either
        ) {
            return false;
          }
      }

      return true;
    }
  }, {
    key: "render",
    value: function render() {
      return jsx(InputContainer, this.props);
    }
  }]);

  return InputPerformanceOptimizer;
}(Component);

_defineProperty(InputPerformanceOptimizer, "propTypes", {
  config: PropTypes.object,
  values: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool])
});

var InputContainer = function InputContainer(props) {
  var children = props.children,
      config = props.config,
      values = _valuesInstanceProperty(props),
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
      interactive = props.interactive,
      device = props.device;

  var name = config.name,
      required = config.required,
      _config$style = config.style,
      style = _config$style === void 0 ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === void 0 ? {} : _config$tooltips,
      other = _objectWithoutProperties(config, ["name", "required", "style", "tooltips"]);

  var inputTooltip = tooltips.input;
  var _style$cellInput = style.cellInput,
      cellInput = _style$cellInput === void 0 ? {} : _style$cellInput;
  var inputId = useRef(randomId());

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  return jsx("div", {
    className: "gfb-inner-cell-input",
    style: cellInput,
    "data-tip": true,
    "data-for": inputId.current,
    css: theme.cellInput
  }, jsx(PortalTooltip, {
    id: inputId.current,
    message: inputTooltip
  }), cloneElement(children, _objectSpread({
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
  }, other, {
    device: device
  })));
};

export default InputPerformanceOptimizer;
InputContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  config: PropTypes.object,
  values: PropTypes.instanceOf(Map),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  requiredWarning: PropTypes.bool,
  tabIndex: PropTypes.number,
  draggable: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  device: PropTypes.object
};