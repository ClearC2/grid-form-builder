import { useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
export function useGlobalTooltipHelper() {
  useEffect(() => {
    const hideTooltip = () => {
      ReactTooltip.hide();
    };
    window.addEventListener('keydown', hideTooltip);
    window.addEventListener('scroll', hideTooltip);
    window.addEventListener('touchmove', hideTooltip); // for mobile scrolls

    return () => {
      window.removeEventListener('keydown', hideTooltip);
      window.removeEventListener('scroll', hideTooltip, true);
      window.removeEventListener('touchmove', hideTooltip);
    };
  }, []);
}