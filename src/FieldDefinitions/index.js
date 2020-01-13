import Colorpicker from './ColorPicker'
import Conditionalinput from './Conditionalinput'
import Currency from './Currency'
import Email from './Email'
import Header from './Header'
import Icon from './Icon'
import ImportSelect from './ImportSelect'
import Metadata from './Metadata'
import Number from './Number'
import Percentage from './Percentage'
import Phone from './Phone'
import Richtextareaquill from './Richtextareaquill'
import Total from './Total'
import {uppercaseFirstLetter} from '../utils'

let FormComponents = {
  Colorpicker,
  Conditionalinput,
  Currency,
  Email,
  Header,
  Icon,
  ImportSelect,
  Metadata,
  Number,
  Percentage,
  Phone,
  Richtextareaquill,
  Total
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
