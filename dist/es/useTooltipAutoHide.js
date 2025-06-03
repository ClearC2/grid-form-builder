import { useEffect } from 'react';
import { attachGlobalTooltipListeners, detachGlobalTooltipListeners } from './tooltipController';
export var useTooltipAutoHide = function useTooltipAutoHide() {
  useEffect(function () {
    console.log('use effect!!!');
    attachGlobalTooltipListeners();
    return function () {
      detachGlobalTooltipListeners();
    };
  }, []);
};