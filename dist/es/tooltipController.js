var activeTooltipRef = null;
export var trackActiveTooltip = function trackActiveTooltip(ref) {
  activeTooltipRef = ref;
};
export var hideActiveTooltip = function hideActiveTooltip() {
  var _activeTooltipRef, _activeTooltipRef$hid;

  return (_activeTooltipRef = activeTooltipRef) === null || _activeTooltipRef === void 0 ? void 0 : (_activeTooltipRef$hid = _activeTooltipRef.hide) === null || _activeTooltipRef$hid === void 0 ? void 0 : _activeTooltipRef$hid.call(_activeTooltipRef);
}; // Keep track of how many active consumers
// so can have many forms but only add event listeners once
// removes them if we get to a zero count

var attachmentCount = 0;
var listenersAttached = false;

var handler = function handler() {
  hideActiveTooltip();
};

export var attachGlobalTooltipListeners = function attachGlobalTooltipListeners() {
  attachmentCount += 1;

  if (!listenersAttached) {
    // eslint-disable-next-line no-console
    console.log('adding events!');
    window.addEventListener('scroll', handler, {
      passive: true,
      capture: true
    });
    window.addEventListener('input', handler, true);
    window.addEventListener('keydown', handler, true);
    listenersAttached = true;
  }
};
export var detachGlobalTooltipListeners = function detachGlobalTooltipListeners() {
  attachmentCount -= 1;

  if (attachmentCount <= 0 && listenersAttached) {
    // eslint-disable-next-line no-console
    console.log('removing events!');
    window.removeEventListener('scroll', handler, true);
    window.removeEventListener('input', handler, true);
    window.removeEventListener('keydown', handler, true);
    listenersAttached = false;
    attachmentCount = 0;
  }
};