"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = exports.ThemeProvider = exports.ThemeContext = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default2 = _interopRequireDefault(require("./default"));

var _executive = _interopRequireDefault(require("./executive"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var ThemeContext = (0, _react.createContext)({
  theme: {},
  setTheme: function setTheme() {},
  setThemeValue: function setThemeValue() {}
});
exports.ThemeContext = ThemeContext;

var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children,
      themeOverride = _ref.theme;

  var _useState = (0, _react.useState)(_default2.default),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      theme = _useState2[0],
      setTheme = _useState2[1];

  var value = (0, _react.useMemo)(function () {
    var newTheme;

    if (typeof themeOverride === 'string') {
      switch (themeOverride.toLowerCase()) {
        case 'classic':
        case 'default':
          {
            newTheme = _default2.default;
            break;
          }

        case 'executive':
          {
            newTheme = _executive.default;
            break;
          }

        default:
          newTheme = _default2.default;
      }
    } else if ((0, _typeof2.default)(themeOverride) === 'object') {
      newTheme = themeOverride;
    } else {
      newTheme = theme;
    }

    return {
      theme: newTheme,
      setTheme: setTheme,
      setThemeValue: function setThemeValue(key, value) {
        var updated = _objectSpread({}, theme);

        updated[key] = value;
        setTheme(updated);
      }
    };
  }, [theme, themeOverride]);
  return _react.default.createElement(ThemeContext.Provider, {
    value: value
  }, children);
};

exports.ThemeProvider = ThemeProvider;
ThemeProvider.propTypes = {
  children: _propTypes.default.node,
  theme: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
};

var useTheme = function useTheme() {
  return (0, _react.useContext)(ThemeContext);
};

var _default = useTheme;
exports.default = _default;