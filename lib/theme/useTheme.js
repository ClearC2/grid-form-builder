'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = exports.ThemeContext = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _default = require('./default');

var _default2 = _interopRequireDefault(_default);

var _executive = require('./executive');

var _executive2 = _interopRequireDefault(_executive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ThemeContext = (0, _react.createContext)({ theme: {}, setTheme: function setTheme() {}, setThemeValue: function setThemeValue() {} });

var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children,
      themeOverride = _ref.theme;

  var _useState = (0, _react.useState)(_default2.default),
      _useState2 = _slicedToArray(_useState, 2),
      theme = _useState2[0],
      setTheme = _useState2[1];

  var value = (0, _react.useMemo)(function () {
    var newTheme = void 0;
    if (typeof themeOverride === 'string') {
      switch (themeOverride.toLowerCase()) {
        case 'classic':
        case 'default':
          {
            newTheme = _default2.default;break;
          }
        case 'executive':
          {
            newTheme = _executive2.default;break;
          }
        default:
          newTheme = _default2.default;
      }
    } else if ((typeof themeOverride === 'undefined' ? 'undefined' : _typeof(themeOverride)) === 'object') {
      newTheme = themeOverride;
    } else {
      newTheme = theme;
    }
    return {
      theme: newTheme,
      setTheme: setTheme,
      setThemeValue: function setThemeValue(key, value) {
        var updated = _extends({}, theme);
        updated[key] = value;
        setTheme(updated);
      }
    };
  }, [theme, themeOverride]);

  return _react2.default.createElement(
    ThemeContext.Provider,
    { value: value },
    children
  );
};

ThemeProvider.propTypes = {
  children: _propTypes2.default.node,
  theme: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};

var useTheme = function useTheme() {
  return (0, _react.useContext)(ThemeContext);
};

exports.ThemeContext = ThemeContext;
exports.ThemeProvider = ThemeProvider;
exports.default = useTheme;