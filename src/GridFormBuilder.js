import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WidgetGrid from './WidgetGrid'
import {Map, List, fromJS} from 'immutable'
import Input from './FieldDefinitions/Input'
import Textarea from './FieldDefinitions/Textarea'
import Datetime from './FieldDefinitions/Datetime'
import Date from './FieldDefinitions/Date'
import Select from './FieldDefinitions/Select'
import Radio from './FieldDefinitions/Radio'
import Checkbox from './FieldDefinitions/Checkbox'
import Multicheckbox from './FieldDefinitions/Multicheckbox'
import Header from './FieldDefinitions/Header'
import Typeahead from './FieldDefinitions/Typeahead'
import Listselect from './FieldDefinitions/Listselect'
import Conditionalinput from './FieldDefinitions/Conditionalinput'
import Multiselect from './FieldDefinitions/Multiselect'

let validComponents = Map()
export function initCustomFormComponents (defs = Map()) {
  defs = fromJS(defs)
  validComponents = defs
}

export const updateFormValues = (fieldsToUpdate, currentFormValues) => {
  let fields = fieldsToUpdate
  if (!Array.isArray(fields)) fields = [fields]
  let formValues = currentFormValues
  fields.map(field => {
    formValues = formValues.set(field.target.name, field.target.value)
  })
  return formValues
}

class Customcomponent extends Component {
  render = () => {
    const {opts = {}} = this.props // field, formValues = Map(), handleOnChange = () => {},
    const {props = {}, component = ''} = opts // label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {},
    const Component = validComponents.get((component + '').toLowerCase())
    if (Component) {
      return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
          <Component {...props} {...this.props} />
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

const FormComponents = { Input, Textarea, Datetime, Date, Select, Radio, Checkbox, Multicheckbox, Header, Typeahead, Listselect, Conditionalinput, Multiselect, Customcomponent }

export default class FormBuilder extends Component {
  static propTypes = {
    formName: PropTypes.string.isRequired,
    formSchema: PropTypes.object,
    formValues: PropTypes.object,
    prepops: PropTypes.object,
    handleOnChange: PropTypes.func,
    draggable: PropTypes.bool,
    inline: PropTypes.bool
  }

  static defaultProps = {
    inline: false
  }

  uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  render = () => {
    let {formSchema = {}, formValues = Map(), handleOnChange = () => {}, prepops = Map(), formName = 'form', draggable = false, inline = false} = this.props
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    prepops = (typeof prepops.isMap === 'function') ? prepops : Map(prepops)
    const dateFields = []
    const normalFields = []
    // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017
    Object.keys(formSchema).map((field, i) => {
      let {type = 'input', dimensions = {x: 0, y: i, h: 1, w: 6}} = formSchema[field]
      type = this.uppercaseFirstLetter(type)
      if (type === 'Textarea' && dimensions.h < 4) dimensions.h = 4
      if (type === 'Radio') {
        const {options = List()} = formSchema[field]
        dimensions.h = options.size ? options.size : options.length ? options.length : 1
      }
      const Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input
      if (type.indexOf('Date') >= 0 || type.indexOf('Typeahead') >= 0 || type.indexOf('Multiselect') >= 0) {
        dateFields.unshift(
          <Component
            inline={inline}
            draggable={draggable}
            key={field}
            handleOnChange={handleOnChange}
            formValues={formValues}
            prepops={prepops.get(formSchema[field].prepops)}
            field={field} opts={formSchema[field]}
            defaultDataGrid={{i: field, isResizable: false, isDraggable: draggable, ...dimensions}}
          />
        )
      } else if (type === 'Customcomponent') {
        normalFields.push(
          <Component
            formSchema={formSchema}
            inline={inline}
            draggable={draggable}
            key={field}
            handleOnChange={handleOnChange}
            formValues={formValues}
            prepops={prepops.get(formSchema[field].prepops)}
            field={field} opts={formSchema[field]}
            defaultDataGrid={{i: field, isResizable: false, isDraggable: draggable, ...dimensions}}
          />
        )
      } else {
        normalFields.push(
          <Component
            inline={inline}
            draggable={draggable}
            key={field}
            handleOnChange={handleOnChange}
            formValues={formValues}
            prepops={prepops.get(formSchema[field].prepops)}
            field={field} opts={formSchema[field]}
            defaultDataGrid={{i: field, isResizable: false, isDraggable: draggable, ...dimensions}}
          />
        )
      }
    })
    return (
      <div style={{height: '100%', minWidth: 350}}>
        <WidgetGrid compName={formName} verticalCompact={false} margin={[40, 5]} rowHeight={inline ? 27 : 40}>
          {normalFields}
          {dateFields}
        </WidgetGrid>
      </div>
    )
  }
}
