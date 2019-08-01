import React, {Component} from 'react'
import {Map, Set, List, fromJS} from 'immutable'
import {Dialog} from 'c2-dialog'
import FormBuilder from '../GridFormBuilder'
import PropTypes from 'prop-types'
/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

const SINGLE_FIELD_INPUTS = Set(['multiselect', 'multicheckbox', 'listselect', 'typeahead'])
const MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'phone', 'email', 'datetime', 'currency', 'time'])
const ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect'])

export const TEXT_INPUTS = ['textarea', 'checkbox', 'radio']
// export const LIST_INPUTS = []
export const CONDITIONS = {
  'contains': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT],
    joinString: `       and`
  },
  'is greater than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is less than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is not between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT],
    joinString: `      and`
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is not equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is not one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is blank': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: []
  },
  'is not blank': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: []
  },
  '': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  }
}

export default class Conditionalinput extends Component {
  constructor (props) {
    super(props)
    let conditionalFieldValues = Map()
    let i = 0
    let valueList = this.getValuesFromFormValues(props.formValues, true)
    valueList.forEach((value) => {
      conditionalFieldValues = conditionalFieldValues.set(`${this.parentFieldName()}-${i}`, value)
      i++
    })
    // take any form-builder values from props and convert them to contitional table form readable values
    let conds = []
    if (this.props.config.conditions) {
      conds = this.props.config.conditions
    } else {
      conds = CONDITIONS
    }
    if (this.props.config.excludeConditions) {
      let excludes = Set(this.props.config.excludeConditions)
      let newConds = {}
      Object.keys(conds).forEach((key) => {
        if (!excludes.has(key)) {
          newConds[key] = conds[key]
        }
      })
      conds = newConds
    }
    this.state = {
      modalFormValues: Map({
        condition: this.getConditionFromFormValues() || this.inputTypeOptionsList(this.inputType())[0],
        ...conditionalFieldValues.toJS()
      }),
      values: List(),
      showDialog: false,
      typeaheadValues: List(),
      conditions: conds
    }

    this.props.handleOnChange({
      target: {
        name: this.parentFieldName(),
        value: Map({
          condition: this.getConditionFromFormValues() || this.inputTypeOptionsList(this.inputType())[0],
          values: valueList
        })
      }
    })
  }

  static propTypes = {
    handleOnChange: PropTypes.func,
    config: PropTypes.object,
    formValues: PropTypes.object,
    inline: PropTypes.bool,
    Icon: PropTypes.func
  }

  getConditionFromFormValues = (formValues = this.props.formValues) => {
    let val = formValues.get(this.parentFieldName())
    if (val && val instanceof Map) {
      return formValues.get(this.parentFieldName(), Map()).get('condition', null)
    } else {
      return null
    }
  }
  getValuesFromFormValues = (formValues = this.props.formValues, isConstructor = false) => {
    let val
    if (isConstructor && this.props.config.metaConfig) {
      val = formValues.get(this.props.config.metaConfig.name)
    } else {
      val = formValues.get(this.parentFieldName())
    }
    if (val) {
      if (val instanceof Map) {
        return val.get('values', List())
      } else if (val instanceof List) {
        return val
      } else {
        // val is typeof string
        return List([val])
      }
    }
    return List()
  }

  closeDialogOnEnterPress = (event) => this.state.showDialog && event.key === 'Enter' && this.handleToggleDialog(false)

  componentDidMount () {
    document.addEventListener('keypress', this.closeDialogOnEnterPress)
  }

  componentWillUnmount () {
    document.removeEventListener('keypress', this.closeDialogOnEnterPress)
  }

  handleToggleDialog = (newState = !this.state.showDialog) => {
    this.setState({showDialog: newState})
  }

  componentWillReceiveProps (props) {
    if (props.formValues.get(this.parentFieldName()) !== this.props.formValues.get(this.parentFieldName())) {
      let conditionalFieldValues = Map()
      let i = 0
      let valueList = this.getValuesFromFormValues(props.formValues)
      if (!valueList) {
        valueList = List()
      }
      if (typeof valueList === 'string') {
        valueList = List()
      }
      if (SINGLE_FIELD_INPUTS.has(this.inputType())) {
        conditionalFieldValues = conditionalFieldValues.set(`${this.parentFieldName()}-0`, valueList)
      } else {
        valueList.forEach((value) => {
          conditionalFieldValues = conditionalFieldValues.set(`${this.parentFieldName()}-${i}`, value)
          i++
        })
      }

      // take any form-builder values from props and convert them to contitional table form readable values
      this.setState({
        modalFormValues: Map({
          condition: this.getConditionFromFormValues(props.formValues) || this.inputTypeOptionsList(this.inputType())[0],
          ...conditionalFieldValues.toJS()
        })})
    }
  }

  maxFieldCount = () => {
    if (this.state.conditions[this.condition()]) {
      return this.state.conditions[this.condition()].maxFields
    } else {
      return 999
    }
  }
  minFieldCount = () => {
    if (this.state.conditions[this.condition()]) {
      return this.state.conditions[this.condition()].minFields
    } else {
      return 0
    }
  }
  parentFieldName = () => this.props.config.name
  parentLabel = () => this.props.config.label || this.props.config.name
  inputType = () => (this.props.config.inputType || this.props.config.inputtype || 'input').toLowerCase()
  condition = () => {
    let oldValue = this.props.formValues.get(this.parentFieldName())
    if (oldValue && oldValue instanceof Map) {
      return this.props.formValues.get(this.parentFieldName(), Map()).get('condition', '')
    } else {
      return this.state.modalFormValues.get('condition', '')
    }
  }
  getEventFieldIndex = (e) => {
    let name = e.target.name.split('-')
    return name[name.length - 1]
  }

  convertListToOptions = (list) => list.map(opt => { return {value: opt, label: opt} })
  inputTypeOptionsList = (type) => {
    if (this.state) {
      const {conditions} = this.state
      let options = []
      Object.keys(conditions).forEach((key) => {
        if (!Set(conditions[key].invalidInputTypes).has(type)) {
          options.push(key)
        }
      })
      return options
    } else {
      const conditions = CONDITIONS
      let options = []
      Object.keys(conditions).forEach((key) => {
        if (!Set(conditions[key].invalidInputTypes).has(type)) {
          options.push(key)
        }
      })
      return options
    }
  }

  calculateModalHeight = () => {
    const titleAndConditionHeight = 145
    const singleFieldHight = this.calculateFieldHeight(this.inputType()) * 32
    let nFields = SINGLE_FIELD_INPUTS.has(this.inputType()) ? 1 : this.nFieldsWithValues() + 1
    nFields = Math.min(nFields, this.maxFieldCount())
    const footerHeight = 50
    const size = titleAndConditionHeight + (singleFieldHight * nFields) + footerHeight
    return (size > 500) ? '500' : `${size}`
  }
  nFieldsWithValues = () => {
    if (SINGLE_FIELD_INPUTS.has(this.inputType())) {
      if (this.props.formValues.getIn([this.parentFieldName(), 'values'], List()).size > 0) {
        return 1
      } else {
        return 0
      }
    } else {
      return this.props.formValues.getIn([this.parentFieldName(), 'values'], List()).size
    }
  }

  calculateFieldHeight = (type) => {
    if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
      return this.props.config.keyword.options.length
    }
    return 1
  }

  formSchema = () => { // for Dialog
    let schema = {
      form: {
        name: 'Conditional Input1',
        description: 'allow more complex inputs.',
        jsonschema: {
          layout: [
            {
              type: 'field',
              dimensions: {x: 0, y: 0, h: 1, w: 6},
              config: {
                name: this.parentFieldName(),
                type: 'header',
                label: `${this.parentLabel()} condition:`
              }
            },
            {
              type: 'field',
              dimensions: {x: 1, y: 1, h: 1, w: 8},
              config: {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                suppressBlankOption: true,
                clearable: false,
                keyword: {
                  category: 'NONE',
                  options: this.convertListToOptions(this.inputTypeOptionsList(this.inputType()))
                }
              }
            }
          ]
        }
      },
      id: 'FDC58F0F0B2099E61BE23AB6110572E1',
      lastUpdateDate: '2018-02-26 10:16:14',
      lastUpdateBy: 'will darden',
      createdDate: '2018-02-26 10:16:14',
      createdBy: 'will darden'
    }
    const maxFieldCount = this.maxFieldCount()
    const minFieldCount = this.minFieldCount()
    let fieldCount = 0
    if (maxFieldCount < 3 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 4, y: 2, h: 1, w: 6},
        config: {
          name: this.parentFieldName(),
          type: 'header',
          style: {lineHeight: '12px', fontSize: '12px'},
          label: `(${maxFieldCount} value${maxFieldCount === 1 ? '' : 's'} allowed)`
        }
      })
    }
    if (fieldCount < this.nFieldsWithValues() + 1 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 1, y: 3, h: this.calculateFieldHeight(this.inputType()), w: 8},
        config: {
          ...this.props.config,
          autofocus: true,
          readonly: false,
          name: `${this.parentFieldName()}-0`,
          label: `${this.parentLabel()}`,
          type: this.inputType()
        }
      })
      fieldCount++
    }
    if (MULTI_FIELD_INPUTS.has(this.inputType()) && maxFieldCount > 0) {
      while (fieldCount < minFieldCount || (fieldCount < maxFieldCount && fieldCount < this.nFieldsWithValues() + 1)) {
        let label = this.state.conditions[this.condition()]
        if (typeof label === 'object') {
          label = label.joinString
        }
        if (!label) {
          label = `     ...or`
        }
        let newField = {
          type: 'field',
          dimensions: {x: 1, y: fieldCount + 3, h: this.calculateFieldHeight(this.inputType()), w: 8},
          config: {
            ...this.props.config,
            readonly: false,
            name: `${this.parentFieldName()}-${fieldCount}`,
            label: label,
            type: this.inputType()
          }
        }
        if (this.props.config.typeahead) {
          newField.config.typeahead = this.props.config.typeahead
        }
        schema.form.jsonschema.layout.push(newField)
        fieldCount++
      }
    }
    return (
      schema.form
    )
  }

  handleConditionChange = (e) => {
    this.setState({modalFormValues: this.state.modalFormValues.set(e.target.name, e.target.value)})
    let oldValue = this.props.formValues.get(this.parentFieldName())
    if (oldValue && oldValue instanceof Map) {
      let newFieldValue = this.props.formValues.get(this.parentFieldName(), Map()).set(e.target.name, e.target.value)
      let maxFieldValues = this.state.conditions[newFieldValue.get('condition', 'contains')].maxFields
      if (newFieldValue.get('values', List()).size >= maxFieldValues) {
        newFieldValue = newFieldValue.set('values', newFieldValue.get('values', List()).slice(0, maxFieldValues))
      }
      this.props.handleOnChange({target: {name: this.parentFieldName(), value: newFieldValue}})
    }
  }

  squashValues = (deletedIndex, list, fieldPrefix) => {
    let i = typeof deletedIndex === 'string' ? parseInt(deletedIndex) : deletedIndex
    let copyField = fieldPrefix ? fieldPrefix + (i + 1) : i + 1
    let pasteField = fieldPrefix ? fieldPrefix + (i) : i
    while ((i + 1) < this.state.values.size) {
      copyField = fieldPrefix ? fieldPrefix + (i + 1) : i + 1
      pasteField = fieldPrefix ? fieldPrefix + (i) : i
      list = list.set(pasteField, list.get(copyField))
      i++
    }
    list = list.delete(copyField)
    return list
  }
  /*
  this.props.formValues: {
    key: [values]
  }
  this.state.modalFormValues: {
    key: {
      condition: '',
      values: [''] || [{label: '', values: ''}]
    }
 */
  handleOnChange = e => {
    if (e.target.name === 'condition') {
      this.handleConditionChange(e)
      return
    }
    let values = List()
    if (this.inputType() === 'typeahead' || e.target.value instanceof List) {
      values = e.target.value
    } else {
      if (typeof e.target.value === 'string') {
        if (e.target.value === '' && this.inputType() === 'multiselect') {
          values = List()
        } else {
          values = e.target.value
        }
      } else {
        values = e.target.value.get('values')
      }
    }
    if (!(values instanceof List)) {
      values = fromJS(values)
    }
    if (this.maxFieldCount() < values.size) {
      return // escape if more values than allowed selected
    }
    if (this.inputType() === 'typeahead') {
      if (this.parentFieldName() !== e.target.name.split('-')[0]) {
        return // escape if its an extraneous typeahead field)
      }
      this.setState({modalFormValues: this.state.modalFormValues.set(e.target.name, e.target.value)})
      if (e.target.value !== undefined || e.target.value !== null) {
        let oldValue
        if (typeof e.target.value === 'string') {
          oldValue = this.props.formValues.get(this.parentFieldName(), Map()).setIn(['values'], List([e.target.value]))
        } else {
          oldValue = this.props.formValues.get(this.parentFieldName(), Map()).setIn(['values'], List(e.target.value))
        }

        this.props.handleOnChange({target: {name: this.parentFieldName(), value: oldValue}})
        this.setState({modalFormValues: this.state.modalFormValues.set(e.target.name, e.target.value)})
      }
    } else if (e.target.value instanceof List) {
      let oldValue = this.props.formValues.get(this.parentFieldName(), Map())
      oldValue = oldValue.setIn(['values'], e.target.value)
      this.props.handleOnChange({target: {name: this.parentFieldName(), value: oldValue}})
      this.setState({modalFormValues: this.state.modalFormValues.set(e.target.name, e.target.value)})
    } else {
      let oldValue = this.props.formValues.get(this.parentFieldName(), Map())
      if (MULTI_FIELD_INPUTS.has(this.inputType())) {
        oldValue = oldValue.setIn(['values', this.getEventFieldIndex(e)], typeof e.target.value === 'string' ? e.target.value : e.target.value.get('values'))
      } else {
        if (typeof e.target.value === 'string') {
          if (e.target.value === '' && this.inputType() === 'multiselect') {
            oldValue = oldValue.setIn(['values'], List())
          } else {
            oldValue = oldValue.setIn(['values'], e.target.value)
          }
        } else {
          oldValue = oldValue.setIn(['values'], e.target.value.get('values'))
        }
      }
      this.props.handleOnChange({target: {name: this.parentFieldName(), value: oldValue}})
      this.setState({modalFormValues: this.state.modalFormValues.set(e.target.name, e.target.value)})
    }
  }

  // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
  hideDisplay = () => {
    if (this.condition() === 'is blank' || this.condition() === 'is not blank') {
      return false
    } else {
      let tmp = this.props.formValues.get(this.parentFieldName(), Map())
      if (tmp instanceof Map) {
        return tmp.get('values', List()).size === 0
      } else {
        return true
      }
    }
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent'
      },
      labelContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent',
        ...labelStyle
      },
      label: {
        display: 'flex',
        justifyContent: 'flex-start',
        lineHeight: inline ? '23px' : '15px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        color: '#383e4b',
        background: 'transparent',
        ...labelStyle
      },
      input: {
        display: 'flex',
        flexGrow: inline ? 1 : 0,
        paddingLeft: 5,
        backgroundColor: 'transparent',
        borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        minWidth: 177,
        color: '#2b71e2',
        height: inline ? 'auto' : 25,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : -1,
        ...iconStyle
      }
    }
    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
          {Icon && <Icon style={styles.icon} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <div onClick={() => { this.handleToggleDialog(true) }} id={`conditionalInput-${name}-id`} style={styles.input}>
          {this.hideDisplay() ? '' : 'Values...'}
        </div>
        {this.state.showDialog &&
        <Dialog
          ref={`conditionalInput-${name}-dialog`}
          size={{
            width: '40%',
            height: this.calculateModalHeight()
          }}
          default={{
            y: ((window.innerHeight / 2) - 250 + window.scrollY),
            x: ((window.innerWidth / 2) - 260)
          }}
          center
          style={{
            background: '#fff',
            boxShadow: '0px 0px 15px #444',
            borderRadius: '5px',
            border: '2px solid #36a9e1',
            overflowY: 'visible'
          }}
          enableResizing
          disableDragging
        >
          <button type='button' className='close' style={{paddingRight: '10px', paddingTop: '5px', display: 'inline-block'}} onClick={() => this.handleToggleDialog(false)}>
            <span>&times;</span>
          </button>
          <div style={{width: '90%', height: '70%', marginTop: '30px'}} >
            <FormBuilder inline formName={`conditionalInput-${name}`} formSchema={this.formSchema()} formValues={this.state.modalFormValues} conditionalFieldValues handleOnChange={this.handleOnChange} draggable={false} />
          </div>
          <div>
            <button type='button' className='btn-primary pull-right' style={{paddingRight: '10px', paddingTop: '5px', marginRight: '30px', display: 'inline-block'}} onClick={() => this.handleToggleDialog(false)}>
              Ok
            </button>
          </div>
        </Dialog>}
      </div>
    )
  }
}
