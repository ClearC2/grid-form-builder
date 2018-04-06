import React, {Component} from 'react'
import PropTypes from 'prop-types'
import WidgetGrid from './WidgetGrid'
import {Map, fromJS} from 'immutable'
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
import Phone from './FieldDefinitions/Phone'

let validComponents = Map()
export function initCustomFormComponents (defs = Map()) {
  defs = fromJS(defs)
  validComponents = defs
}

let IconLibrary = {}
export function initComponentIconLibrary (defs = {}) {
  if (typeof defs !== 'object') {
    IconLibrary = {}
    return
  }
  let formattedKeys = {}
  Object.keys(defs).map(name => {
    const component = defs[name]
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
    formattedKeys[name] = component
  })
  IconLibrary = formattedKeys
}

export const updateFormValues = (fieldsToUpdate, currentFormValues) => {
  let fields = fieldsToUpdate
  if (!Array.isArray(fields)) fields = [fields]
  let formValues = currentFormValues
  if (typeof formValues === 'undefined') {
    console.error('You did something wrong, grid form builder is trying to update values but there are no values.')
    return Map()
  }
  fields.map(field => {
    formValues = formValues.set(field.target.name, field.target.value)
  })
  return formValues
}

class Customcomponent extends Component {
  render = () => {
    const Component = validComponents.get((this.props.config.component + '').toLowerCase())
    if (Component) {
      return (
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
          <Component {...this.props} />
        </div>
      )
    } else {
      return (
        <div />
      )
    }
  }
}

const FormComponents = { Input, Textarea, Datetime, Date, Select, Radio, Checkbox, Multicheckbox, Header, Typeahead, Listselect, Conditionalinput, Multiselect, Customcomponent, Phone }

export default class FormBuilder extends Component {
  static propTypes = {
    formName: PropTypes.string.isRequired,
    formSchema: PropTypes.object,
    formValues: PropTypes.object,
    prepops: PropTypes.object,
    handleOnChange: PropTypes.func,
    draggable: PropTypes.bool,
    inline: PropTypes.bool,
    handleSubmit: PropTypes.func
  }

  static defaultProps = {
    inline: false
  }

  state = {
    requiredWarning: false
  }

  onSubmit = () => {
    let {formSchema = Map(), formValues = Map(), handleSubmit = () => { console.warn('onSubmit was called but no handleSubmit function was provided.') }} = this.props
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    let {layout = []} = jsonschema
    layout = (typeof layout.toJS === 'function') ? layout.toJS() : layout
    const formIncomplete = layout.some(field => {
      const {config = {}} = field
      const {required = false} = config
      if (!required) return false
      if (required && formValues.get(field.name, '').length === 0) return true
    })
    if (formIncomplete) this.setState({requiredWarning: true})
    else handleSubmit()
  }

  uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  render = () => {
    let {formSchema = Map(), formValues = Map(), handleOnChange = () => {}, formName = 'form', draggable = false, inline = false, style = {}} = this.props
    const {requiredWarning} = this.state
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    const dateFields = []
    const normalFields = []
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    let {layout = []} = jsonschema
    // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017
    layout.map((field, i) => {
      const {config = {}, dimensions = {x: 0, y: i, h: 1, w: 6}} = field
      let {type = 'input', icon = ''} = config
      type = this.uppercaseFirstLetter(type)
      icon = this.uppercaseFirstLetter(icon)
      if (type === 'Textarea' && dimensions.h < 4) dimensions.h = 4
      const Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input
      icon = IconLibrary[icon] ? IconLibrary[icon] : null
      if (type.indexOf('Date') >= 0 || type.indexOf('Typeahead') >= 0 || type.indexOf('Multiselect') >= 0) {
        dateFields.unshift(
          <Component
            requiredWarning={requiredWarning}
            inline={inline}
            draggable={draggable}
            key={'' + i}
            handleOnChange={handleOnChange}
            formValues={formValues}
            config={config}
            Icon={icon}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
          />
        )
      } else if (type === 'Customcomponent') {
        normalFields.push(
          <Component
            requiredWarning={requiredWarning}
            inline={inline}
            draggable={draggable}
            formSchema={formSchema}
            key={'' + i}
            handleOnChange={handleOnChange}
            formValues={formValues}
            config={config}
            Icon={icon}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
          />
        )
      } else {
        normalFields.push(
          <Component
            requiredWarning={requiredWarning}
            inline={inline}
            draggable={draggable}
            key={'' + i}
            handleOnChange={handleOnChange}
            formValues={formValues}
            config={config}
            Icon={icon}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
          />
        )
      }
    })
    return (
      <div style={{height: '100%', minWidth: inline ? 700 : 400, ...style}}>
        <WidgetGrid compName={formName} verticalCompact={false} margin={[40, 5]} rowHeight={inline ? 27 : 45}>
          {normalFields}
          {dateFields}
        </WidgetGrid>
      </div>
    )
  }
}
