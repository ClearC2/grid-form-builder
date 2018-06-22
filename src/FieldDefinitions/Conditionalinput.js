import React, {Component} from 'react'
import {Map, Set, List} from 'immutable'
import {Dialog} from 'c2-dialog'
import FormBuilder from '../GridFormBuilder'

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

const SINGLE_FIELD_INPUTS = Set(['multiselect', 'typeahead', 'multicheckbox', 'listselect'])
const MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'phone'])
const ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect'])

export default class Conditionalinput extends Component {
  constructor (props) {
    super(props)

    this.state = {
      formValues: Map({
        condition: this.getInputTypeOptionsList(this.getInputType())[0]
      }),
      values: List(),
      showDialog: false
    }

  }

  static defaultProps = {
    options: {
      all: ['contains', 'is equal to', 'is not equal to', 'does not contain', 'is between', 'is not between',
        'is equal to', 'is not equal to', 'is between', 'is not between', 'contains', 'does not contain',
        'is greater than', 'is less than', 'is one of', 'is not one of'],
      text: ['contains', 'is equal to', 'is not equal to', 'does not contain', 'is between', 'is not between'],
      number: ['is equal to', 'is not equal to', 'is between', 'is not between', 'contains', 'does not contain', 'is greater than', 'is less than'],
      categorical: ['is one of', 'is not one of']
    }
  }

  closeDialogOnEnterPress = (event) => {
    if (this.state.showDialog && event.key === 'Enter') {
      this.handleToggleDialog(false)
    }
  }

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
          condition: this.getInputTypeOptionsList(this.getInputType())[0]
        })
      })
    }
  }

  getInputType = () => {
    return this.props.config.inputType || 'input'
  }

  convertListToOptions = (list) => {
    return list.map(opt => { return {value: opt, label: opt} })
  }

  getInputTypeOptionsList = (type) => {
    if (ONLY_CATEGORICAL_INPUT.has(type)) {
      return this.props.options.categorical
    }
    return this.props.options.all
  }

  calculateModalHeight = () => {
    const titleAndConditionHeight = 145
    const singleFieldHight = this.calculateFieldHeight(this.getInputType()) * 32
    let nFields = ONLY_CATEGORICAL_INPUT.has(this.getInputType()) ? 1 : Math.max(this.state.values.size, 1)
    nFields = Math.min(nFields, this.getMaxFields())
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
    const {name} = this.props.config
    const inputType = this.getInputType()
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
                name: name,
                type: 'header',
                label: `${this.props.config.label || name} condition:`
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
                  options: this.convertListToOptions(this.getInputTypeOptionsList(this.getInputType()))
                }
              }
            },
            {
              type: 'field',
              dimensions: {x: 1, y: 2, h: this.calculateFieldHeight(inputType), w: 8},
              config: {
                ...this.props.config,
                readonly: false,
                name: `${name}-0`,
                label: `${this.props.config.label || name}`,
                type: inputType
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
    const maxFieldCount = this.getMaxFields()
    if (MULTI_FIELD_INPUTS.has(this.getInputType())) {
      let fieldCount = 1
      while (fieldCount < maxFieldCount && fieldCount < this.state.values.size + 1) {
        schema.form.jsonschema.layout.push({
          type: 'field',
          dimensions: {x: 1, y: fieldCount + 2, h: this.calculateFieldHeight(inputType), w: 8},
          config: {
            readonly: false,
            name: `${name}-${fieldCount}`,
            label: `     ...or`,
            type: inputType
          }
        })
        fieldCount++
      }
    }
    return (
      schema.form
    )
  }

  getMaxFields = () => {
    switch (this.state.formValues.get('condition', '')) {
      case 'is between':
      case 'is not between':
        return 2
      default:
        return 999
    }
  }
  parentFieldName = () => this.props.config.name
  getEventFieldIndex = (e) => {
    let name = e.target.name.split('-')
    return name[name.length - 1]
  }
  handleOnChange = e => {
    if (this.getInputType() === 'typeahead') {
      if (e.target.value.label) {
        e.target.name = `${this.parentFieldName()}-${this.state.values.size}`
        e.target.value = e.target.value.label
      } else if (this.parentFieldName() !== e.target.name.split('-')[0]) {
        return // escape if its an extraneous typeahead field)
      }
    }
    /* Categorical input come back as arrays and are always one field, and should be put directly into values.
      Other fields have one value per input field, and can have many fields, so have to be put into an array
      based on their input field index.
     */
    let newValues
    if (SINGLE_FIELD_INPUTS.has(this.getInputType())) {
      newValues = e.target.value
    } else {
      newValues = this.state.values.set(this.getEventFieldIndex(e), e.target.value)
    }
    this.setState({
      formValues: this.state.formValues.set(e.target.name, e.target.value), // to update mini form
      values: newValues // to update parent readable values
    })
    if (e.target.name === 'condition') {
      const valEvent = {
        target: {
          value: e.target.value,
          name: `${this.parentFieldName()}-CONDITION`
        }
      }
      this.props.handleOnChange(valEvent)
    } else if (this.props.handleOnChange) {
      if (typeof newValues === typeof Map() || typeof newValues === typeof List()) {
        newValues = newValues.toJS()
      }
      const valEvent = {
        target: {
          value: newValues,
          name: this.parentFieldName()
        }
      }
      this.props.handleOnChange(valEvent)
      const conditionEvent = {
        target: {
          value: this.state.formValues.get('condition', ''),
          name: `${this.parentFieldName()}-CONDITION`
        }
      }
      this.props.handleOnChange(conditionEvent)
    }
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
    let hideDisplay = this.state.values.size === 0
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
          {hideDisplay ? '' : 'Values...'}
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
