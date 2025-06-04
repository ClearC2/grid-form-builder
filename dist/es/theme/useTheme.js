import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import React, { createContext, useContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import defaultTheme from './default';
import executiveTheme from './executive';
const ThemeContext = /*#__PURE__*/createContext({
  theme: {},
  setTheme: () => {},
  setThemeValue: () => {}
});
const ThemeProvider = _ref => {
  let {
    children,
    theme: themeOverride
  } = _ref;
  const [theme, setTheme] = useState(defaultTheme);
  const value = useMemo(() => {
    let newTheme;
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
    } else if (typeof themeOverride === 'object') {
      newTheme = themeOverride;
    } else {
      newTheme = theme;
    }
    return {
      theme: newTheme,
      setTheme,
      setThemeValue: (key, value) => {
        const updated = _objectSpread({}, theme);
        updated[key] = value;
        setTheme(updated);
      }
    };
  }, [theme, themeOverride]);
  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: value
  }, children);
};
ThemeProvider.propTypes = {
  children: PropTypes.node,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};
const useTheme = () => useContext(ThemeContext);
export { ThemeContext, ThemeProvider };
export default useTheme;