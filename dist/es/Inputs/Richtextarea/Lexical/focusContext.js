import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import { createContext, useContext } from 'react';
var element = document.activeElement;
var debounceSet = null;
var debounceFocus = null;

var setActiveElement = function setActiveElement() {
  if (debounceSet === null) {
    debounceSet = true;

    _setTimeout(function () {
      // if multiple of these are rendered simultaneously, only let the first one work
      debounceSet = null;
    }, 1000);

    element = document.activeElement;
  }
};

var focusActiveElement = function focusActiveElement() {
  if (debounceFocus === null && element instanceof window.HTMLElement) {
    debounceFocus = true;

    _setTimeout(function () {
      element.focus();
      debounceFocus = null;
    }, 50); // debounce this in case mulitple RTE's render at the same time and all try to refocus an element at the same time

  }
};

var FocusContext = /*#__PURE__*/createContext({
  activeElement: element,
  setActiveElement: setActiveElement,
  focusActiveElement: focusActiveElement
});

var useFocusContext = function useFocusContext() {
  return useContext(FocusContext);
};

export default useFocusContext;