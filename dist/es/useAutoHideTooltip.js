import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip'; // Keep track of how many active consumers
// so can have many forms but only add event listeners once
// removes them if we get to a zero count

var attachmentCount = 0;

function hideToolTip(e) {
  var target = e.target;

  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || e.type === 'scroll') {
    ReactTooltip.hide();
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

export var useAutoHideTooltip = function useAutoHideTooltip() {
  useEffect(function () {
    registerListeners();
    return function () {
      unregisterListeners();
    };
  }, []);
};