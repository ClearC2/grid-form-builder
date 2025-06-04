import { useEffect } from 'react';
import { attachGlobalTooltipListeners, detachGlobalTooltipListeners } from './tooltipController';
export const useTooltipAutoHide = () => {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('use effect!!!');
    attachGlobalTooltipListeners();
    return () => {
      detachGlobalTooltipListeners();
    };
  }, []);
};