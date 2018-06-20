import React, {Component} from 'react'
import {Map, Set, List} from 'immutable'
import {Dialog} from 'c2-dialog'
import ReactDom from 'react-dom'
import FormBuilder from '../GridFormBuilder'

const TEXT_INPUTS = Set(['textarea'])
const NUMBER_INPUTS = Set(['phone', 'input', 'date', 'datetime'])
const CATEGORICAL_INPUTS = Set(['multiselect', 'typeahead', 'checkbox', 'radio', 'select', 'listselect', 'multicheckbox'])
export default class Conditionalinput extends Component {
  state = {
    formValues: Map(),
    doubleFields: Set(),
    showDialog: false
  }
  static defaultProps = {
    doubleFields: ['is between', 'is not between'], // conditionOptions part of this set will have two input fields. others only one.
    options: {
      text: ['contains', 'is equal to', 'is not equal to', 'does not contain', 'is between', 'is not between'],
      number: ['is equal to', 'is not equal to', 'is between', 'is not between', 'contains', 'does not contain', 'is greater than', 'is less than'],
      categorical: ['is one of', 'is not one of']
    }
  }

  componentDidMount () {
    this.setState({
      formValues: this.state.formValues.set('condition', this.getInputTypeOptionsList(this.getInputType())[0]),
      doubleFields: Set(this.props.doubleFields)
    })// sets a default condition value
  }

  typeaheadValues = Map()
  componentWillReceiveProps (props) {
    if (props.formValues.get(this.props.config.name, '') === '') {
      this.setState({
        formValues: Map({
          condition: this.getInputTypeOptionsList(this.getInputType())[0],
          doubleFields: Set(this.props.doubleFields),
          [`low ${this.props.config.name}`]: '',
          [`high ${this.props.config.name}`]: ''
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
    if (TEXT_INPUTS.has(type)) {
      return this.props.options.text
    } else if (NUMBER_INPUTS.has(type)) {
      return this.props.options.number
    } else if (CATEGORICAL_INPUTS.has(type)) {
      return this.props.options.categorical
    }
    return this.props.options.text
  }

  calculateFieldHeight = (type) => {
    if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
      return this.props.config.keyword.options.length
    }
    return 1
  }

  formSchema = () => { // for Dialog
    const {formValues, doubleFields} = this.state
    const {name} = this.props.config
    const condition = formValues.get('condition')
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
                  options: this.convertListToOptions(this.getInputTypeOptionsList(inputType))
                }
              }
            },
            {
              type: 'field',
              dimensions: {x: 1, y: 2, h: this.calculateFieldHeight(inputType), w: 6},
              config: {
                ...this.props.config,
                name: `low ${name}`,
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
    if (doubleFields.includes(condition)) {
      schema.form.jsonschema.layout.push(
        {
          type: 'field',
          dimensions: {x: 1, y: 3, h: 1, w: 6},
          config: {
            ...this.props.config,
            name: `high ${name}`,
            label: doubleFields.includes(condition) ? `${this.props.config.label || name}` : '',
            type: inputType
          }
        }
      )
    }
    return (
      schema.form
    )
  }

  handleOnChange = e => {
    const {doubleFields} = this.state
    let newValues = this.state.formValues
    if (e.target.value === '') {
      const event = {target: {value: '', name: this.props.config.name}}
        this.setState({
          formValues: Map({
            condition: this.getInputTypeOptionsList(this.getInputType())[0],
            doubleFields: Set(this.props.doubleFields),
            [`low ${this.props.config.name}`]: '',
            [`high ${this.props.config.name}`]: ''
          })
        })
      if (this.props.handleOnChange) {
        this.props.handleOnChange(event)
      }
      return
    }
    if (this.props.config.inputType === 'multiselect') {
      if (e.target.name === 'condition') {
        newValues = newValues.set(e.target.name, e.target.value)
      } else {
        newValues = newValues.set(e.target.name, e.target.value.get('values', []).toJS())
      }
    } else if (this.props.config.inputType === 'typeahead') {
      if (e.target.name === 'condition' || e.target.name.split(' ')[0] === 'low') {
        this.typeaheadValues = this.typeaheadValues.set(e.target.name, e.target.value)
      }
      this.typeaheadValues.forEach((value, key) => {
        newValues = newValues.set(key, value)
      })
    } else {
        newValues = newValues.set(e.target.name, e.target.value)
    }
    this.setState({formValues: newValues})
    if (this.props.handleOnChange) {
      const valObject = this.buildValueObject(newValues)
      const event = {target: {value: valObject, name: this.props.config.name}}
      this.props.handleOnChange(event)
    }
    // else {
    //   // fix field values if condition changes from multi to single input
    //   if (e.target.name === 'condition' && !doubleFields.includes(e.target.value)) {
    //     newValues = newValues.delete(`high ${this.props.config.name}`)
    //   }
    //   if (e.target.value === '') {
    //     newValues = newValues.delete(e.target.name)
    //   } else {
    //     newValues = newValues.set(e.target.name, e.target.value)
    //   }
    //   this.setState({formValues: newValues})
    //   console.log(e.target.name, e.target.value, 'formValues:', this.state.formValues, 'newValues:', newValues, 'props:', this.props, 'state:', this.state, 'val loggggggg 2')
    //   if (this.props.handleOnChange) {
    //     const valObject = this.buildValueObject(newValues)
    //     const event = {target: {value: valObject, name: this.props.config.name}}
    //     this.props.handleOnChange(event)
    //   }
    // }
  }

  buildValueObject = (formValues) => {
    const {name} = this.props.config
    if (this.props.config.inputType === 'multiselect') {
      return (Map({condition: formValues.get('condition', ''), values: formValues.get(`low ${name}`, '')}))
    }

    const {doubleFields} = this.state
    // get current values
    let condition = formValues.get('condition', '')
    let low = formValues.get(`low ${name}`, '')
    let high = formValues.get(`high ${name}`, '')
    if (!doubleFields.includes(condition)) {
      high = ''
    }  else {
      if (parseInt(low) > parseInt(high)) {
        const tmp = low
        low = high
        high = tmp
      }
    }
    let vals = List()
    if (condition !== '' || low !== '') { vals = vals.push(low) }
    if (high !== '') { vals = vals.push(high) }
    return (Map({condition: condition, values: vals}))
  }

  handleToggleDialog = (newState = !this.state.showDialog) => {
    this.setState({showDialog: newState})
    this.onModalOpen()
  }
  onModalOpen = () => {
    const fieldPos = ReactDom.findDOMNode(this).getBoundingClientRect()
    this.setState({fieldPos: fieldPos})
  }

  render = () => {
    const inputType = this.getInputType()
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
    const hideDisplay = !(this.state.formValues.get(`low ${this.props.config.name}`, false) || this.state.formValues.get(`high ${this.props.config.name}`, false))

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
        <Dialog ref={`conditionalInput-${name}-dialog`} size={{width: '40%', height: `${170 + (this.calculateFieldHeight(inputType) * 22)}px`}}
          center
          style={{
            background: '#fff',
            boxShadow: '0px 0px 15px #444',
            borderRadius: '5px',
            padding: 10,
            // backgroundColor: '#f5f5f5',
            border: '2px solid #36a9e1',
            position: 'fixed',
            top: '30%', // `${this.state.fieldPos.top - 180 > 0 ? this.state.fieldPos.top - 180 : 30}px`,
            left: '30%', // `${this.state.fieldPos.left + 100}px`,
            bottom: '100px',
            overflowY: 'visible'
          }}
          enableResizing
          disableDragging
        >
          <button type='button' className='close' style={{paddingRight: '10px', paddingTop: '5px', display: 'inline-block'}} onClick={() => this.handleToggleDialog(false)}>
            <span>&times;</span>
          </button>
          <div style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%'}} >
            <FormBuilder inline formName={`conditionalInput-${name}`} formSchema={this.formSchema()} formValues={this.state.formValues} handleOnChange={this.handleOnChange} draggable={false} />
          </div>
        </Dialog>}
      </div>
    )
  }
}
