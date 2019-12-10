import Checkbox from './Checkbox'
import Colorpicker from './ColorPicker'
import Conditionalinput from './Conditionalinput'
import Currency from './Currency'
import Date from './Date'
import Datetime from './Datetime'
import Email from './Email'
import Header from './Header'
import Icon from './Icon'
import ImportSelect from './ImportSelect'
import Input from './Input'
import Listselect from './Listselect'
import Metadata from './Metadata'
import Multicheckbox from './Multicheckbox'
import Multiselect from './Multiselect'
import Number from './Number'
import Percentage from './Percentage'
import Phone from './Phone'
import Radio from './Radio'
import Richtextareaquill from './Richtextareaquill'
import Select from './Select'
import Textarea from './Textarea'
import Time from './Time/Time'
import Total from './Total'
import {uppercaseFirstLetter} from '../utils'

let FormComponents = {
  Checkbox,
  Colorpicker,
  Conditionalinput,
  Currency,
  Date,
  Datetime,
  Email,
  Header,
  Icon,
  ImportSelect,
  Input,
  Listselect,
  Metadata,
  Multicheckbox,
  Multiselect,
  Number,
  Percentage,
  Phone,
  Radio,
  Richtextareaquill,
  Select,
  Textarea,
  Time,
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
