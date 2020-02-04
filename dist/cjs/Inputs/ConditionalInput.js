"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ConditionalDialog = _interopRequireDefault(require("./ConditionalDialog"));

var _immutable = require("immutable");

var ConditionalInput = function ConditionalInput(props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style;
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
      indicators = _style$indicators === void 0 ? {} : _style$indicators; // eslint-disable-line

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      showDialog = _useState2[0],
      setShowDialog = _useState2[1];

  var handleClose = (0, _react.useCallback)(function (newFieldVal) {
    setShowDialog(false);
  }, []);
  (0, _react.useEffect)(function () {
    // const v = props.values[props.name]
    if (props.name) {
      var defaults = (0, _immutable.Map)({
        condition: 'contains',
        values: (0, _immutable.List)()
      });

      if (typeof props.value === 'string') {
        if (props.value !== '') {
          defaults = defaults.set('values', (0, _immutable.List)([props.value]));
        } else {
          defaults = defaults.set('values', (0, _immutable.List)());
        }
      } else if (props.value instanceof _immutable.List || (0, _isArray.default)(props.value)) {
        defaults = defaults.set('values', (0, _immutable.fromJS)(props.value));
      }

      props.onChange({
        target: {
          name: props.name,
          value: defaults
        }
      });
    }
  }, [props, props.name]);
  return _react.default.createElement("div", {
    className: "gfb-input-outer",
    style: inputOuter
  }, _react.default.createElement("div", {
    className: "gfb-input-inner",
    style: inputInner
  }, _react.default.createElement("div", {
    className: 'gfb-input__control',
    style: inputControl
  }, _react.default.createElement("div", {
    className: "gfb-input__value-container",
    onClick: function onClick() {
      return setShowDialog(true);
    },
    style: valueContainer
  }, (0, _values.default)(props).getIn([props.name, 'values'], (0, _immutable.List)()).size > 0 ? 'Values...' : ''), showDialog && _react.default.createElement(_ConditionalDialog.default, (0, _extends2.default)({
    handleClose: handleClose
  }, props)))));
};

var _default = ConditionalInput;
exports.default = _default;
ConditionalInput.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  values: _propTypes.default.object,
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object
};