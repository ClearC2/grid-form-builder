import {useEffect} from 'react'
import {
  attachGlobalTooltipListeners,
  detachGlobalTooltipListeners
} from './tooltipController'

export const useTooltipAutoHide = () => {
  useEffect(() => {
    attachGlobalTooltipListeners()
    return () => {
      detachGlobalTooltipListeners()
    }
  }, [])
}
