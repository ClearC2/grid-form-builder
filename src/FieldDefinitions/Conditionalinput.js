import React, {Component} from 'react'
import {Map, Set, List} from 'immutable'
import {Portal} from 'react-portal'
import {Dialog} from 'c2-dialog'
import ReactDom from 'react-dom'
import FormBuilder from '../GridFormBuilder'

export default class Conditionalinput extends Component {
  state = {
    formValues: Map(),
    doubleFields: Set(),
    showDialog: false
  }
  static defaultProps = {
    conditionOptions: ['is equal to', 'is not equal to', 'is between', 'contains:', 'does not contain'],
    doubleFields: ['is between'] // conditionOptions part of this set will have two input fields. others only one.
  }

  componentDidMount () {
    this.setState({
      formValues: this.state.formValues.set('condition', this.props.conditionOptions[0]),
      doubleFields: Set(this.props.doubleFields)
    })// sets a default condition value
  }

  componentWillReceiveProps (props) {
    if (props.formValues.get(this.props.config.name, '') === '') {
      this.setState({
        formValues: Map({
          condition: this.props.conditionOptions[0],
          doubleFields: Set(this.props.doubleFields),
          [`low ${this.props.config.name}`]: '',
          [`high ${this.props.config.name}`]: ''
        })
      })
    }
  }

  formSchema = () => { // for Dialog
    const {formValues, doubleFields} = this.state
    const {name} = this.props.config
    const condition = formValues.get('condition')
    const inputType = this.props.config.inputType || 'input'
    console.log(doubleFields.includes(condition) ? 1 : 0, doubleFields.includes(condition), doubleFields, condition, 'formSchema logggggg')
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
              dimensions: {x: 3, y: 1, h: 1, w: 6},
              config: {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                keyword: {
                  category: 'NONE',
                  options: this.props.conditionOptions.map(opt => { return {value: opt, label: opt} })
                }
                // options: this.props.conditionOptions
              }
            },
            {
              type: 'field',
              dimensions: {x: 3, y: 2, h: 1, w: 6},
              config: {
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
          dimensions: {x: 3, y: 3, h: 1, w: 6},
          config: {
            name: `high ${name}`,
            label: doubleFields.includes(condition) ? `${this.props.config.label || name}` : '',
            type: inputType
          }
        }
      )
    }
    if (inputType === 'Multiselect') {
      console.log('ERROR: Multiselect has not been implemented for conditional inputs')
    }
    return (
      schema.form
    )
  }

  handleOnChange = e => {
    console.log(e.target, e.target.name, e.target.value, this.state, 'e loggggggggggg')
    const {doubleFields} = this.state
    let newValues = this.state.formValues
    // fix field values if condition changes from multi to single input
    if (e.target.name === 'condition' && !doubleFields.includes(e.target.value)) {
      newValues = newValues.delete(`high ${this.props.config.name}`)
    }
    if (e.target.value === '') {
      newValues = newValues.delete(e.target.name)
    } else {
      newValues = newValues.set(e.target.name, e.target.value)
    }
    this.setState({formValues: newValues})
    if (this.props.handleOnChange) {
      const valObject = this.buildValueObject(newValues)
      const event = {target: {value: valObject, name: this.props.config.name}}
      this.props.handleOnChange(event)
    }
  }

  buildValueObject = (formValues) => {
    const {field} = this.props
    const {doubleFields} = this.state
    // get current values
    let condition = formValues.get('condition', '')
    let low = formValues.get(`low ${field}`, '')
    let high = formValues.get(`high ${field}`, '')
    if (!doubleFields.includes(condition)) {
      high = ''
    } else {
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
    const {inline, formValues = Map(), handleOnChange = () => {}, config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name} = config
    const value = formValues.get(name, '')
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
    const hideDisplay = false



    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5, width: 20}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        {this.state.showDialog &&
          <Dialog ref={`conditionalInput-${name}-dialog`} size={{width: '40%', height: '180px'}}
            style={{
              backgroundColor: '#f5f5f5',
              border: '2px solid #36a9e1',
              position: 'fixed',
              top: `${this.state.fieldPos.top - 180 > 0 ? this.state.fieldPos.top - 180 : 30}px`,
              left: `${this.state.fieldPos.left + 100}px`,
              bottom: '100px'
            }}
            enableResizing={true}
            disableDragging={false}
          >
            <button type='button' className='close' style={{paddingRight: '10px', paddingTop: '5px', display: 'inline-block'}} onClick={() => this.handleToggleDialog(false)}>
              <span>&times;</span>
            </button>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%'}}>
              <FormBuilder inline formName={`conditionalInput-${name}`} formSchema={this.formSchema()} formValues={this.state.formValues} handleOnChange={this.handleOnChange} draggable={false} />
            </div>
          </Dialog>}
        <div
          onClick={() => { this.handleToggleDialog(true) }}
          id={`conditionalInput-${name}-id`}
          style={{
            display: 'flex',
            flexGrow: 1,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            paddingLeft: 5,
            border: 0,
            backgroundColor: 'transparent',
            borderBottom: '1px solid #a0a0a0',
            minWidth: 90,
            color: '#1e8fc6',
            ...style
          }}
        >
          {hideDisplay ? '' : 'Values...'}
        </div>
      </div>
    )
  }
}
