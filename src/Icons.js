import {uppercaseFirstLetter} from './utils'

let IconLibrary = {}

export function initComponentIconLibrary (defs = {}) {
  if (typeof defs !== 'object') {
    IconLibrary = {}
    return
  }
  const formattedKeys = {}
  Object.keys(defs).map(name => {
    const component = defs[name]
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    formattedKeys[name] = component
  })
  IconLibrary = formattedKeys
}

export const mapIcon = icon => {
  if (typeof icon !== 'string') return null
  icon = uppercaseFirstLetter(icon)
  icon = IconLibrary[icon] || null
  return icon
}

export {IconLibrary}
