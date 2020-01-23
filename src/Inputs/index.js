import Core from './core'
import {uppercaseFirstLetter} from '../utils'
import Checkbox from './Checkbox'
import Colorpicker from './Colorpicker'
import Currency from './Currency'
import {Date, Datetime, Time} from './Date'
import Email from './Email'
import Header from './Header'
import Icon from './Icon'
import Input from './Input'
import Listselect from './Listselect'
import Metadata from './Metadata'
import Multicheckbox from './Multicheckbox'
import Multiselect from './Multiselect'
import Number from './Number'
import Percentage from './Percentage'
import Phone from './Phone'
import Radio from './Radio'
import Richtextarea from './Richtextarea'
import Select from './Select'
import Textarea from './Textarea'
import Typeahead from './Typeahead'
import Conditionalinput from './ConditionalInput'

let FormComponents = {
  Checkbox,
  Colorpicker,
  Currency,
  Date,
  Datetime,
  Email,
  Header,
  Icon,
  Input,
  Listselect,
  Metadata,
  Multicheckbox,
  Multiselect,
  Number,
  Percentage,
  Phone,
  Radio,
  Richtextarea,
  Select,
  Textarea,
  Time,
  Typeahead,
  Conditionalinput
}

export function initCustomFormComponents (defs = {}) {
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs
  FormComponents = {...FormComponents, ...defs}
}

export const mapInputType = (type = 'input') => {
  if (typeof type !== 'string') type = 'input'
  type = uppercaseFirstLetter(type)
  if (type.indexOf('Richtext') > -1) {
    type = 'Richtextarea'
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
