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

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ConditionalDialog = _interopRequireDefault(require("./ConditionalDialog"));

var _immutable = require("immutable");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var ConditionalInput = function ConditionalInput(props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      _props$name = props.name,
      name = _props$name === void 0 ? '' : _props$name,
      _props$value = props.value,
      value = _props$value === void 0 ? (0, _immutable.List)() : _props$value,
      _props$values = (0, _values.default)(props),
      values = _props$values === void 0 ? (0, _immutable.Map)() : _props$values,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {} : _props$onChange;

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
    // const v = values[props.name]
    if (name) {
      var defaults = (0, _immutable.Map)({
        condition: 'contains',
        values: (0, _immutable.List)()
      });

      if (typeof value === 'string') {
        if (value !== '') {
          defaults = defaults.set('values', (0, _immutable.List)([value]));
        } else {
          defaults = defaults.set('values', (0, _immutable.List)());
        }
      } else if (value instanceof _immutable.List || (0, _isArray.default)(value)) {
        defaults = defaults.set('values', (0, _immutable.fromJS)(value));
      }

      onChange({
        target: {
          name: name,
          value: defaults
        }
      });
    }
  }, [name, onChange]);
  var cond = values.getIn([name, 'condition'], '');
  var vals = values.getIn([name, 'values'], (0, _immutable.List)());
  var hasValue = vals.size > 0 || (0, _includes.default)(cond).call(cond, 'blank') || cond === 'today' || cond === 'this month' || cond === 'year to date';
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
    style: _objectSpread({}, valueContainer, {
      color: '#36a9e1'
    })
  }, hasValue ? 'Values...' : ''), showDialog && _react.default.createElement(_ConditionalDialog.default, (0, _extends2.default)({
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