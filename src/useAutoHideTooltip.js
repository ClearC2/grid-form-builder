import {useEffect} from 'react'
import ReactTooltip from 'react-tooltip'

// Keep track of how many active consumers
// so can have many forms but only add event listeners once
// removes them if we get to a zero count
let attachmentCount = 0

function hideToolTip (e) {
  const target = e.target

  if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || e.type === 'scroll') {
    ReactTooltip.hide()
  }
}

const registerListeners = () => {
  if (attachmentCount === 0) {
    window.addEventListener('scroll', hideToolTip, {passive: true, capture: true})
    window.addEventListener('input', hideToolTip, true)
    window.addEventListener('keydown', hideToolTip, true)
  }
  attachmentCount += 1
}

const unregisterListeners = () => {
  attachmentCount -= 1

  if (attachmentCount <= 0) {
    window.removeEventListener('scroll', hideToolTip, true)
    window.removeEventListener('input', hideToolTip, true)
    window.removeEventListener('keydown', hideToolTip, true)
  }
}

export const useAutoHideTooltip = () => {
  useEffect(() => {
    registerListeners()
    return () => {
      unregisterListeners()
    }
  }, [])
}
