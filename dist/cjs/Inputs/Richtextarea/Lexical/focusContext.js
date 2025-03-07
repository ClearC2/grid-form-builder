"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _react = require("react");

var element = document.activeElement;
var debounceSet = null;
var debounceFocus = null;

var setActiveElement = function setActiveElement() {
  if (debounceSet === null) {
    debounceSet = true;
    (0, _setTimeout2.default)(function () {
      // if multiple of these are rendered simultaneously, only let the first one work
      debounceSet = null;
    }, 1000);
    element = document.activeElement;
  }
};

var focusActiveElement = function focusActiveElement() {
  if (debounceFocus === null && element instanceof window.HTMLElement) {
    debounceFocus = true;
    (0, _setTimeout2.default)(function () {
      element.focus();
      debounceFocus = null;
    }, 50); // debounce this in case mulitple RTE's render at the same time and all try to refocus an element at the same time
  }
};

var FocusContext = /*#__PURE__*/(0, _react.createContext)({
  activeElement: element,
  setActiveElement: setActiveElement,
  focusActiveElement: focusActiveElement
});

var useFocusContext = function useFocusContext() {
  return (0, _react.useContext)(FocusContext);
};

var _default = useFocusContext;
exports.default = _default;