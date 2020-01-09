import Core from './core'
import {uppercaseFirstLetter} from '../utils'
import Input from './Input'
import Select from './Select'
import Textarea from './Textarea'
import Typeahead from './Typeahead'
import Multiselect from './Multiselect'
import Listselect from './Listselect'
import Checkbox from './Checkbox'
import Multicheckbox from './Multicheckbox'
import Radio from './Radio'

let FormComponents = {
  Input,
  Select,
  Textarea,
  Typeahead,
  Multiselect,
  Listselect,
  Checkbox,
  Multicheckbox,
  Radio
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
  if (FormComponents[type]) {
    type = FormComponents[type]
  } else {
    // console.warn(type, 'is not a valid field type. This is a noop and the field type will fall back to a normal input.') //eslint-disable-line
    type = FormComponents.Input
  }
  return type
}

export {FormComponents}

export default Core
