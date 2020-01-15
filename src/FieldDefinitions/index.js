import Conditionalinput from './Conditionalinput'
import Currency from './Currency'
import Email from './Email'
import Header from './Header'
import Icon from './Icon'
import ImportSelect from './ImportSelect'
import Metadata from './Metadata'
import Number from './Number'
import Percentage from './Percentage'
import Total from './Total'
import {uppercaseFirstLetter, isMobile} from '../utils'

let FormComponents = {
  Conditionalinput,
  Currency,
  Email,
  Header,
  Icon,
  ImportSelect,
  Metadata,
  Number,
  Percentage,
  Total
}

export function initCustomFormComponents (defs = {}) {
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs
  FormComponents = {...FormComponents, ...defs}
}

export const mapInputType = (type) => {
  if (typeof type !== 'string') return null
  type = uppercaseFirstLetter(type)
  if (isMobile && type === 'Time') {
    type = 'Input'
  }
  type = FormComponents[type] || null
  return type
}

export {FormComponents}
