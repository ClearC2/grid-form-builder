import React, {createContext, useRef} from 'react'
import ReactTooltip from 'react-tooltip'

export const TooltipDismissalContext = createContext(null)

// eslint-disable-next-line react/prop-types
export function TooltipDismissalProvider ({children}) {
  const attachmentCount = useRef(0)

  const hideToolTip = (e) => {
    const target = e.target

    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || e.type === 'scroll') {
      ReactTooltip.hide()
    }
  }

  const registerListeners = () => {
    if (attachmentCount.current === 0) {
      window.addEventListener('scroll', hideToolTip, {passive: true, capture: true})
      window.addEventListener('input', hideToolTip, true)
      window.addEventListener('keydown', hideToolTip, true)
    }
    attachmentCount.current += 1
  }

  const unregisterListeners = () => {
    attachmentCount.current -= 1

    if (attachmentCount <= 0) {
      window.removeEventListener('scroll', hideToolTip, true)
      window.removeEventListener('input', hideToolTip, true)
      window.removeEventListener('keydown', hideToolTip, true)
    }
  }

  return (
    <TooltipDismissalContext.Provider value={{registerListeners, unregisterListeners}}>
      {children}
    </TooltipDismissalContext.Provider>
  )
};
