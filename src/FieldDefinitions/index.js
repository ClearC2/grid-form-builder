
import Input from './Input'

import {uppercaseFirstLetter} from '../utils'

let FormComponents = {

  Input
}

export function initCustomFormComponents (defs = {}) {
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs
  FormComponents = {...FormComponents, ...defs}
}

export const mapInputType = (type) => {
  if (typeof type !== 'string') return null
  type = uppercaseFirstLetter(type)
  type = FormComponents[type] || null
  return type
}

export {FormComponents}
