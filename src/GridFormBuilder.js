import React, {Component} from 'react'
import PropTypes from 'prop-types'
import $ from 'jquery'
import WidgetGrid from './WidgetGrid'
import {Map, Set} from 'immutable'
import Input from './FieldDefinitions/Input'
import Number from './FieldDefinitions/Number'
import Email from './FieldDefinitions/Email'
import Currency from './FieldDefinitions/Currency'
import Textarea from './FieldDefinitions/Textarea'
import Richtextarea from './FieldDefinitions/Richtextarea'
import Richtextareaquill from './FieldDefinitions/Richtextareaquill'
import Datetime from './FieldDefinitions/Datetime'
import Date from './FieldDefinitions/Date'
import Time from './FieldDefinitions/Time'
import Select from './FieldDefinitions/Select'
import ImportSelect from './FieldDefinitions/ImportSelect'
import Radio from './FieldDefinitions/Radio'
import Checkbox from './FieldDefinitions/Checkbox'
import Multicheckbox from './FieldDefinitions/Multicheckbox'
import Header from './FieldDefinitions/Header'
import Typeahead from './FieldDefinitions/Typeahead'
import Listselect from './FieldDefinitions/Listselect'
import Conditionalinput from './FieldDefinitions/Conditionalinput'
import Multiselect from './FieldDefinitions/Multiselect'
import Phone from './FieldDefinitions/Phone'
import Icon from './FieldDefinitions/Icon'
import Metadata from './FieldDefinitions/Metadata'
import Total from './FieldDefinitions/Total'
import Percentage from './FieldDefinitions/Percentage'
import {emailValidator} from './utils'

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
// v fields that cannot be transformed into conditional inputs v
const unconditionalFields = Set(['header', 'conditionalinput', 'checkbox', 'textarea'])
let FormComponents = {
  Input,
  Email,
  Currency,
  Textarea,
  Richtextarea,
  Richtextareaquill,
  Datetime,
  Time,
  Date,
  Select,
  Radio,
  Checkbox,
  Multicheckbox,
  Metadata,
  Header,
  Typeahead,
  Listselect,
  Conditionalinput,
  Multiselect,
  Phone,
  Icon,
  Number,
  ImportSelect,
  Total,
  Percentage
}
export function initCustomFormComponents (defs = {}) {
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs
  FormComponents = {...FormComponents, ...defs}
}

export default class FormBuilder extends Component {
  static propTypes = {
    formName: PropTypes.string.isRequired,
    formSchema: PropTypes.object,
    formValues: PropTypes.object,
    prepops: PropTypes.object,
    handleOnChange: PropTypes.func,
    draggable: PropTypes.bool,
    inline: PropTypes.bool,
    handleSubmit: PropTypes.func,
    conditionalSearch: PropTypes.bool,
    conditionalFieldValues: PropTypes.bool,
    noStore: PropTypes.bool
  }

  static defaultProps = {
    inline: false
  }

  static count = 0

  constructor (props) {
    super(props)
    FormBuilder.count++
    this.state = {
      id: `gfb-${Math.floor(Math.random() * 10000) + 1}`,
      requiredWarning: !!props.validate,
      myOffset: FormBuilder.count
    }
  }

  componentDidUpdate = p => {
    if (p.validate !== this.props.validate) {
      this.setState({requiredWarning: this.props.validate})
    }
  }

  componentWillUnmount = () => {
    this.detatchInputFocusListeners()
  }

  attachBuffer = null
  attachInputFocusListeners = () => {
    clearTimeout(this.attachBuffer)
    this.attachBuffer = null
    this.attachBuffer = setTimeout(() => {
      const {id} = this.state
      const inputs = $(`#${id} :input`)
      inputs.off('focus')
      inputs.off('blur')
      inputs.on('focus', e => {
        $(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within')
      })
      inputs.on('blur', e => {
        $(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within')
      })
    }, 500)
  }

  detatchInputFocusListeners = () => {
    const {id} = this.state
    const inputs = $(`#${id} :input`)
    inputs.off('focus')
    inputs.off('blur')
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

  validate = () => {
    let {formSchema = Map(), formValues = Map()} = this.props
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    let {layout = []} = jsonschema
    layout = (typeof layout.toJS === 'function') ? layout.toJS() : layout
    let reasons = []
    layout.map(field => {
      const {config = {}} = field
      const {required = false, name, label = name, type} = config
      if (required && formValues.get(name, '').length === 0) {
        reasons.push({
          reason: 'required',
          message: `${label} cannot be blank.`,
          description: `The field ${name} is marked as required, but its value is empty.`
        })
      }
      if (type === 'email' && !emailValidator(formValues.get(name, ''))) {
        reasons.push({
          reason: 'incorrect format',
          message: `${label} is invalid`,
          description: `The field ${name} has an invalid email`
        })
      }
    })
    if (reasons.length > 0) {
      this.setState({requiredWarning: true})
    }
    return reasons
  }

  uppercaseFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

  convertFieldToSearch = (field = {}) => {
    if (!unconditionalFields.has(field.config.type ? field.config.type.toLowerCase() : 'input')) {
      if (!field.config.forceUnconditional && !field.config.forceunconditional) {
        if (field.config.type === 'typeahead' && field.config.typeahead && !field.config.typeahead.fieldId) {
          field.config.typeahead.fieldId = 'value'
          field.config.multi = true
        }
        if (field.config.type === 'radio') { // inputs that are normally radios should be multicheckboxes in search
          field.config.type = 'multicheckbox'
        }
        if (field.config.type === 'select') {
          field.config.type = 'multiselect'
        }
        if (field.config.type === 'email') {
          field.config.type = 'input'
        }
        field.config.inputType = field.config.type || 'input'
        field.config.type = 'conditionalInput'
      }
    }
    field.config.required = false
    field.config.readonly = false
    field.config.disabled = false
    return field
  }

  handleAnywhereClick = (config, e) => {
    const {onClick = () => null} = this.props
    onClick(config, e)
  }

  handleDragDropOnInput = ({source, target}) => {
    const {handleOnDrop = () => null} = this.props
    handleOnDrop({source, target})
  }

  handleCascadeKeywordClick = e => {
    const {handleCascade = () => null} = this.props
    handleCascade(e)
  }

  handleRTEImageClick = e => {
    const {handleRTEImageClick = () => null} = this.props
    handleRTEImageClick()
  }

  render = () => {
    this.attachInputFocusListeners()
    let {formSchema = Map(), formValues = Map(),
      handleOnChange = () => {}, formName = 'form', draggable = false, inline = false,
      style = {}, marginX = 40, marginY = 5, rowHeight, readonly, interactive = true,
      handleRTEImageClick = () => {}} = this.props
    const {requiredWarning} = this.state
    formValues = (typeof formValues.isMap === 'function') ? formValues : Map(formValues)
    formSchema = (typeof formSchema.toJS === 'function') ? formSchema.toJS() : formSchema
    const normalFields = []
    let {form, jsonschema} = formSchema
    jsonschema = jsonschema || form || {}
    let {layout = []} = jsonschema
    // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017
    let specifiedTabs = Set()
    layout.map(field => {
      const {config = {}} = field
      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex)
    })
    let tabNumber = 1
    layout.map((field, i) => {
      if (this.props.conditionalSearch) {
        field = this.convertFieldToSearch(field)
      }
      const {config = {}, dimensions = {x: 0, y: i, h: 1, w: 6}, type: Type = 'field'} = field
      // AutoComplete OFF does not turn off autocomplete browser feature, you need to pass anything other than 'off' to turn off autocomplete because latest browsers stopped supporting 'off'
      let {type = 'input', icon = '', cascade = {}, tabindex: tabIndex, autoComplete = 'off'} = config
      if (!tabIndex) {
        while (specifiedTabs.has(tabNumber)) {
          tabNumber++
        }
        tabIndex = this.state.myOffset + '' + tabNumber
        specifiedTabs = specifiedTabs.add(tabNumber)
        tabNumber++
      } else {
        tabIndex = this.state.myOffset + '' + tabIndex
      }
      if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) config.readonly = true
      let {keyword = null, icon: cascadeIcon = ''} = cascade

      if (interactive || type === 'header') {
        type = this.uppercaseFirstLetter(type)
      } else if (type === 'select') {
        type = 'ImportSelect'
      } else {
        type = 'input'
      }

      icon = this.uppercaseFirstLetter(icon)
      cascadeIcon = this.uppercaseFirstLetter(cascadeIcon)
      if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2
      const Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input
      icon = IconLibrary[icon] ? IconLibrary[icon] : null
      cascadeIcon = IconLibrary[cascadeIcon] ? IconLibrary[cascadeIcon] : null
      if (Type === 'Customcomponent') {
        normalFields.push(
          <Component
            autoComplete={autoComplete}
            requiredWarning={requiredWarning}
            rowHeight={rowHeight}
            inline={inline}
            draggable={draggable}
            formSchema={formSchema}
            key={'' + i}
            handleOnChange={handleOnChange}
            handleAnywhereClick={this.handleAnywhereClick}
            formValues={formValues}
            config={config}
            Icon={icon}
            cascadingKeyword={keyword}
            CascadeIcon={cascadeIcon}
            handleCascadeKeywordClick={this.handleCascadeKeywordClick}
            handleRTEImageClick={handleRTEImageClick}
            handleDragDropOnInput={this.handleDragDropOnInput}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
            tabIndex={+tabIndex}
          />
        )
      } else {
        normalFields.push(
          <Component
            autoComplete={autoComplete}
            requiredWarning={requiredWarning}
            rowHeight={rowHeight}
            inline={inline}
            draggable={draggable}
            key={'' + i}
            handleOnChange={handleOnChange}
            handleAnywhereClick={this.handleAnywhereClick}
            formValues={formValues}
            config={config}
            Icon={icon}
            cascadingKeyword={keyword}
            CascadeIcon={cascadeIcon}
            handleCascadeKeywordClick={this.handleCascadeKeywordClick}
            handleRTEImageClick={handleRTEImageClick}
            handleDragDropOnInput={this.handleDragDropOnInput}
            defaultDataGrid={{i: '' + i, isResizable: false, isDraggable: draggable, ...dimensions}}
            interactive={interactive}
            tabIndex={+tabIndex}
            conditionalSearch={this.props.conditionalSearch || this.props.conditionalFieldValues}
          />
        )
      }
    })
    let P = {}
    if (this.props.noStore) P.store = {subscribe: () => {}, getState: () => Map(), dispatch: () => {}}
    return (
      <div id={this.state.id} className='grid-form-builder-parent' style={{height: '100%', minWidth: inline ? 700 : 440, ...style}}>
        <WidgetGrid {...P} compName={formName} verticalCompact={false} margin={[marginX, marginY]} rowHeight={rowHeight || (inline ? 27 : 45)}>
          {normalFields}
        </WidgetGrid>
      </div>
    )
  }
}
