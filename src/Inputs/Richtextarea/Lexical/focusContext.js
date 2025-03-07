import {createContext, useContext} from 'react'

let element = document.activeElement
let debounceSet = null
let debounceFocus = null

const setActiveElement = () => {
  if (debounceSet === null) {
    debounceSet = true
    setTimeout(() => { // if multiple of these are rendered simultaneously, only let the first one work
      debounceSet = null
    }, 1000)
    element = document.activeElement
  }
}

const focusActiveElement = () => {
  if (debounceFocus === null && element instanceof window.HTMLElement) {
    debounceFocus = true
    setTimeout(() => {
      element.focus()
      debounceFocus = null
    }, 50) // debounce this in case mulitple RTE's render at the same time and all try to refocus an element at the same time
  }
}

const FocusContext = createContext({
  activeElement: element,
  setActiveElement,
  focusActiveElement
})

const useFocusContext = () => useContext(FocusContext)

export default useFocusContext
