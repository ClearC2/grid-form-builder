import React, {Component} from 'react'
import {Map, Set, List, fromJS} from 'immutable'
import {Dialog} from 'c2-dialog'
import FormBuilder from '../GridFormBuilder'

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

const SINGLE_FIELD_INPUTS = Set(['multiselect', 'multicheckbox', 'listselect'])
const MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'phone', 'typeahead'])
const ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect'])

const CONDITIONS = {
  'contains': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT],
    joinString: `       and`
  },
  'is equal to': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [...ONLY_CATEGORICAL_INPUT]
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
    maxFields: 999,
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
  }
}

export default class Conditionalinput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      formValues: Map({
        condition: 'contains'
      }),
      values: List(),
      showDialog: false,
      typeaheadValues: List()
    }
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
    if (props.formValues.get(this.parentFieldName(), '') === '') {
      this.setState({
        formValues: Map({
          condition: this.inputTypeOptionsList(this.inputType())[0]
        })
      })
    }
  }

  maxFieldCount = () => CONDITIONS[this.condition()].maxFields
  minFieldCount = () => CONDITIONS[this.condition()].minFields
  parentFieldName = () => this.props.config.name
  parentLabel = () => this.props.config.label || this.props.config.name
  inputType = () => this.props.config.inputType || 'input'
  condition = () => this.state.formValues.get('condition', '')
  getEventFieldIndex = (e) => {
    let name = e.target.name.split('-')
    return name[name.length - 1]
  }

  convertListToOptions = (list) => list.map(opt => { return {value: opt, label: opt} })
  inputTypeOptionsList = (type) => {
    let options = []
    Object.keys(CONDITIONS).forEach((key) => {
      if (!Set(CONDITIONS[key].invalidInputTypes).has(type)) {
        options.push(key)
      }
    })
    return options
  }

  calculateModalHeight = () => {
    const titleAndConditionHeight = 145
    const singleFieldHight = this.calculateFieldHeight(this.inputType()) * 32
    let nFields = ONLY_CATEGORICAL_INPUT.has(this.inputType()) ? 1 : Math.max(this.state.values.size || 0, 1)
    nFields = Math.min(nFields, this.maxFieldCount())
    const footerHeight = 50
    const size = titleAndConditionHeight + (singleFieldHight * nFields) + footerHeight
    return (size > 500) ? '500' : `${size}`
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
              dimensions: {x: 1, y: 1, h: 1, w: 6},
              config: {
                name: 'condition',
                label: 'Condition',
                type: 'select',
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
    if (fieldCount < this.maxFieldCount()) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 1, y: 2, h: this.calculateFieldHeight(this.inputType()), w: 8},
        config: {
          ...this.props.config,
          readonly: false,
          name: `${this.parentFieldName()}-0`,
          label: `${this.parentLabel()}`,
          type: this.inputType()
        }
      })
      fieldCount++
    }
    if (MULTI_FIELD_INPUTS.has(this.inputType())) {
      while (fieldCount < minFieldCount || (fieldCount < maxFieldCount && fieldCount < this.state.values.size + 1)) {
        let newField = {
          type: 'field',
          dimensions: {x: 1, y: fieldCount + 2, h: this.calculateFieldHeight(this.inputType()), w: 8},
          config: {
            readonly: false,
            name: `${this.parentFieldName()}-${fieldCount}`,
            label: CONDITIONS[this.condition()].joinString || `     ...or`,
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
    if (e.target.value === 'is between' || e.target.value === 'is not between') {
      let change = this.state.formValues.set(e.target.name, e.target.value)
      let i = 2
      while (i < this.state.values.size) {
        change = change.delete(`${this.parentFieldName()}-${i}`)
        i++
      }
      this.setState({formValues: change, values: change})
    } else {
      this.setState({formValues: this.state.formValues.set(e.target.name, e.target.value)})
    }
    if (this.props.handleOnChange) {
      this.props.handleOnChange({target: {value: e.target.value, name: `${this.parentFieldName()}-CONDITION`}})
      if (e.target.value === 'is blank' || e.target.value === 'is not blank') {
        this.props.handleOnChange({target: {value: [], name: this.parentFieldName()}})
      }
      if (e.target.value === 'is between' || e.target.value === 'is not between') {
        this.props.handleOnChange({
          target: {
            value: this.state.formValues.get(this.parentFieldName(), List()).slice(0, 2),
            name: this.parentFieldName()
          }
        })
      }
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

  handleOnChange = e => {
    if (e.target.name === 'condition') {
      this.handleConditionChange(e)
      return
    }
    let newTypeaheadValues = List() // list of all the values
    if (this.inputType() === 'typeahead') {
      if (this.parentFieldName() !== e.target.name.split('-')[0]) {
        return // escape if its an extraneous typeahead field)
      }
      if (e.target.id !== undefined) {
        if (e.target.id === null) {
          newTypeaheadValues = this.state.typeaheadValues.delete(this.getEventFieldIndex(e))
          newTypeaheadValues = this.squashValues(this.getEventFieldIndex(e), newTypeaheadValues)
        } else {
          newTypeaheadValues = this.state.typeaheadValues.set(this.getEventFieldIndex(e), e.target.id)
        }
      }
    }
    /* Categorical input come back as arrays and are always one field, and should be put directly into values.
      Other fields have one value per input field, and can have many fields, so have to be put into an array
      based on their input field index.
     */
    let newValues = List()
    let newFormValues = this.state.formValues.set(e.target.name, e.target.value)
    if (SINGLE_FIELD_INPUTS.has(this.inputType())) {
      newValues = e.target.value
    } else {
      if (e.target.value === '') {
        newValues = this.state.values.delete(this.getEventFieldIndex(e))
        newValues = this.squashValues(this.getEventFieldIndex(e), newValues)
        newFormValues = this.squashValues(this.getEventFieldIndex(e), newFormValues, this.parentFieldName() + '-')
      } else {
        newValues = this.state.values.set(this.getEventFieldIndex(e), e.target.value)
      }
    }
    this.setState({
      formValues: newFormValues, // to update mini form
      values: newValues, // to update parent readable values
      typeaheadValues: newTypeaheadValues
    })

    if (this.props.handleOnChange) {
      if (newValues instanceof Map || newValues instanceof List) {
        newValues = newValues.toJS()
      }
      const valEvent = {
        target: {
          value: (this.inputType() === 'typeahead') ? newTypeaheadValues : newValues,
          name: this.parentFieldName()
        }
      }
      this.props.handleOnChange(valEvent)
      const conditionEvent = {
        target: {
          value: this.condition(),
          name: `${this.parentFieldName()}-CONDITION`
        }
      }
      this.props.handleOnChange(conditionEvent)
    }
  }

  // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
  hideDisplay = () => {
    if (this.condition() === 'is blank' || this.condition() === 'is not blank') {
      return false
    } else {
      return this.state.values.size === 0
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
          center
          style={{
            background: '#fff',
            boxShadow: '0px 0px 15px #444',
            borderRadius: '5px',
            border: '2px solid #36a9e1',
            position: 'fixed',
            top: '30%', // `${this.state.fieldPos.top - 180 > 0 ? this.state.fieldPos.top - 180 : 30}px`,
            left: '30%', // `${this.state.fieldPos.left + 100}px`,
            overflowY: 'visible'
          }}
          enableResizing
          disableDragging
        >
          <button type='button' className='close' style={{paddingRight: '10px', paddingTop: '5px', display: 'inline-block'}} onClick={() => this.handleToggleDialog(false)}>
            <span>&times;</span>
          </button>
          <div style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%', height: '100%', marginBottom: '-80px'}} >
            <FormBuilder inline formName={`conditionalInput-${name}`} formSchema={this.formSchema()} formValues={this.state.formValues} handleOnChange={this.handleOnChange} draggable={false} />
          </div>
          <button type='button' className='btn-primary pull-right' style={{paddingRight: '10px', paddingTop: '5px', marginRight: '30px', display: 'inline-block'}} onClick={() => this.handleToggleDialog(false)}>
            <span>Ok</span>
          </button>
        </Dialog>}
      </div>
    )
  }
}
