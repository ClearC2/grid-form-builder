import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from './default';
import executiveTheme from './executive';
var ThemeContext = createContext({
  theme: {},
  setTheme: function setTheme() {},
  setThemeValue: function setThemeValue() {}
});

var ThemeProvider = function ThemeProvider(_ref) {
  var children = _ref.children,
      themeOverride = _ref.theme;

  var _useState = useState(defaultTheme),
      _useState2 = _slicedToArray(_useState, 2),
      theme = _useState2[0],
      setTheme = _useState2[1];

  var value = useMemo(function () {
    var newTheme;

    if (typeof themeOverride === 'string') {
      switch (themeOverride.toLowerCase()) {
        case 'classic':
        case 'default':
          {
            newTheme = defaultTheme;
            break;
          }

        case 'executive':
          {
            newTheme = executiveTheme;
            break;
          }

        default:
          newTheme = defaultTheme;
      }
    } else if (_typeof(themeOverride) === 'object') {
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
  return React.createElement(ThemeContext.Provider, {
    value: value
  }, children);
};

ThemeProvider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

var useTheme = function useTheme() {
  return useContext(ThemeContext);
};

export { ThemeContext, ThemeProvider };
export default useTheme;