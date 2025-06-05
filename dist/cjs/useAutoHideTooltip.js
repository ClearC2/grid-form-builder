"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.useAutoHideTooltip = void 0;

var _react = require("react");

var _reactTooltip = _interopRequireDefault(require("react-tooltip"));

// Keep track of how many active consumers
// so can have many forms but only add event listeners once
// removes them if we get to a zero count
var attachmentCount = 0;

function hideToolTip(e) {
  var target = e.target;

  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || e.type === 'scroll') {
    _reactTooltip.default.hide();
  }
}

function registerListeners() {
  if (attachmentCount === 0) {
    window.addEventListener('scroll', hideToolTip, {
      passive: true,
      capture: true
    });
    window.addEventListener('input', hideToolTip, true);
    window.addEventListener('keydown', hideToolTip, true);
  }

  attachmentCount += 1;
}

function unregisterListeners() {
  attachmentCount -= 1;

  if (attachmentCount <= 0) {
    window.removeEventListener('scroll', hideToolTip, true);
    window.removeEventListener('input', hideToolTip, true);
    window.removeEventListener('keydown', hideToolTip, true);
  }
}

var useAutoHideTooltip = function useAutoHideTooltip() {
  (0, _react.useEffect)(function () {
    registerListeners();
    return function () {
      unregisterListeners();
    };
  }, []);
};

exports.useAutoHideTooltip = useAutoHideTooltip;