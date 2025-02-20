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

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ConditionalDialog = _interopRequireDefault(require("./ConditionalDialog"));

var _immutable = require("immutable");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var defaults = {
  object: {},
  map: (0, _immutable.Map)(),
  nullFunction: function nullFunction() {
    return null;
  }
};

var ConditionalInput = function ConditionalInput(props) {
  var _props$style = props.style,
      style = _props$style === void 0 ? defaults.object : _props$style,
      _props$name = props.name,
      name = _props$name === void 0 ? '' : _props$name,
      _props$value = props.value,
      value = _props$value === void 0 ? (0, _map.default)(defaults) : _props$value,
      _props$values = (0, _values.default)(props),
      values = _props$values === void 0 ? (0, _map.default)(defaults) : _props$values,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? defaults.nullFunction : _props$onChange;

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
    var setDefaults = true;

    if (value instanceof _immutable.Map) {
      if (value.has('condition') && value.has('values')) setDefaults = false;
      if (value.has('conditions') && value.has('type')) setDefaults = false;
    }

    if (name && setDefaults) {
      var _defaults = (0, _immutable.Map)({
        condition: 'contains',
        values: (0, _immutable.List)()
      });

      if (typeof value === 'string') {
        if (value !== '') {
          _defaults = _defaults.set('values', (0, _immutable.List)([value]));
        } else {
          _defaults = _defaults.set('values', (0, _immutable.List)());
        }
      } else if (value instanceof _immutable.List || (0, _isArray.default)(value)) {
        _defaults = _defaults.set('values', (0, _immutable.fromJS)(value));
      }

      onChange({
        target: {
          name: name,
          value: _defaults
        }
      });
    }
  }, [name, onChange, value]);
  var cond = values.getIn([name, 'condition'], '');
  var vals = values.getIn([name, 'values'], (0, _immutable.List)());
  var hasValue = vals.size > 0 || (0, _includes.default)(cond).call(cond, 'blank') ||
  /* eslint-disable-next-line max-len */
  cond === 'today' || cond === 'this month' || cond === 'year to date' || cond === 'fiscal year to date' || cond === 'fiscal year' || cond === 'this quarter' || cond === 'quarter to date' || cond === 'this week' || cond === 'last year' || cond === 'this year' || cond === 'last fiscal year' || values.getIn([name, 'dynamicValues']) && values.getIn([name, 'dynamicValues']).size || values.getIn([name, 'conditions'], (0, _immutable.List)()).size > 0;
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-input-outer",
    style: inputOuter
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-input-inner",
    style: inputInner
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: 'gfb-input__control',
    style: inputControl
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-input__value-container",
    onClick: function onClick() {
      return setShowDialog(true);
    },
    style: _objectSpread(_objectSpread({}, valueContainer), {}, {
      color: '#36a9e1'
    })
  }, hasValue ? 'Values...' : ''), showDialog && /*#__PURE__*/_react.default.createElement(_ConditionalDialog.default, (0, _extends2.default)({
    handleClose: handleClose
  }, props, {
    style: style,
    name: name,
    value: value,
    values: values,
    onChange: onChange
  })))));
};

var _default = ConditionalInput;
exports.default = _default;
ConditionalInput.propTypes = {
  onChange: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
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