let activeTooltipRef = null;
export const trackActiveTooltip = ref => {
  activeTooltipRef = ref;
};
export const hideActiveTooltip = () => {
  return activeTooltipRef?.hide?.();
};

// Keep track of how many active consumers
// so can have many forms but only add event listeners once
// removes them if we get to a zero count
let attachmentCount = 0;
let listenersAttached = false;
const handler = () => {
  hideActiveTooltip();
};
export const attachGlobalTooltipListeners = () => {
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
export const detachGlobalTooltipListeners = () => {
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