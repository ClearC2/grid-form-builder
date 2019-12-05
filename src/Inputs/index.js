import Core from './core'
import {uppercaseFirstLetter} from '../utils'
import Input from './Input'
import Select from './Select'
import Textarea from './Textarea'

let FormComponents = {
  Input,
  Select,
  Textarea
}

export function initCustomFormComponents (defs = {}) {
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs
  FormComponents = {...FormComponents, ...defs}
}

export const mapInputType = (type = 'input', interactive) => {
  if (typeof type !== 'string') type = 'input'
  type = uppercaseFirstLetter(type)
  if (type === 'Richtextarea') {
    type = 'Richtextareaquill'
  }
  if (!interactive && type === 'Select') {
    type = 'ImportSelect'
  }
  type = FormComponents[type] || FormComponents.Input
  return type
}

export {FormComponents}

export default Core
