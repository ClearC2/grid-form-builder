"use strict";

var _typeof3 = require("@babel/runtime-corejs3/helpers/typeof");

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

exports.default = exports.ThemeProvider = exports.ThemeContext = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _default2 = _interopRequireDefault(require("./default"));

var _executive = _interopRequireDefault(require("./executive"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var ThemeContext = /*#__PURE__*/(0, _react.createContext)({
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
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
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