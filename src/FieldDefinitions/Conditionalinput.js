import React, {Component} from 'react'
import {Map, Set} from 'immutable'
import {Portal} from 'react-portal'
import {Dialog} from 'c2-dialog'
import ReactDom from 'react-dom'

export default class Conditionalinput extends Component {
  state = {
    formValues: Map(),
    doubleFields: Set()
  }
  static defaultProps = {
    conditionOptions: ['is equal to', 'is not equal to', 'is between', 'contains:', 'does not contain'],
    doubleFields: ['is between'] // conditionOptions part of this set will have two input fields. others only one.
  }

  componentDidMount () {
    this.setState({formValues: this.state.formValues.set('condition', this.props.conditionOptions[0]), doubleFields: Set(this.props.doubleFields)})// sets a default condition value
  }

  componentWillReceiveProps (props) {
    if (props.formValues.get(this.props.field, '') === '') {
      this.setState({formValues: Map({condition: this.props.conditionOptions[0], doubleFields: Set(this.props.doubleFields), [`low ${this.props.field}`]: '', [`low ${this.props.field}`]: ''})})
    }
  }

  formSchema = () => { // for Dialog
    const {formValues, doubleFields} = this.state
    const {field} = this.props
    const condition = formValues.get('condition')
    const inputType = this.props.opts.inputType || 'input'
    let schema = Map({
      [field]: {label: `${this.props.opts.label || field} condition:`, type: 'Header', dimensions: {x: 0, y: 0, h: 1, w: 1}},
      'condition': {type: 'select', options: this.props.conditionOptions, dimensions: {x: 1, y: 0, h: 1, w: 3}, label: 'Condition'},
      [`low ${field}`]: {type: inputType, label: `${this.props.opts.label || field}`, dimensions: {x: 3, y: 0, h: 1, w: 3}},
      [`high ${field}`]: {type: inputType, label: doubleFields.includes(condition) ? `${this.props.opts.label || field}` : '', dimensions: {x: 6, y: 3, h: 1, w: 3}, style: {opacity: doubleFields.includes(condition) ? 1 : 0}}
    })
    if (inputType === 'Multiselect') {
      schema = schema.set('')
      console.log('ERROR: Multiselect has not been implemented for conditional inputs')
    }
    return (
      schema.toJS()
    )
  }

  handleOnChange = e => {
    const {doubleFields} = this.state
    let newValues = this.state.formValues
    // fix field values if condition changes from multi to single input
    if (e.target.name === 'condition' && !doubleFields.includes(e.target.value)) {
      newValues = newValues.delete(`high ${this.props.field}`)
    }
    if (e.target.value === '') {
      newValues = newValues.delete(e.target.name)
    } else {
      newValues = newValues.set(e.target.name, e.target.value)
    }
    this.setState({formValues: newValues})
    if (this.props.handleOnChange) {
      const valObject = this.buildValueObject(newValues)
      const event = {target: {value: valObject, name: this.props.field}}
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
  }

  onModalOpen = () => {
    const portal = this.refs[`conditionalInput-${this.props.field}-portal`]
    const fieldPos = ReactDom.findDOMNode(this).getBoundingClientRect()
    portal.node.style.position = 'absolute'
    portal.node.style.top = `${fieldPos.top + document.documentElement.scrollTop}px`
    portal.node.style.left = `${fieldPos.left + document.documentElement.scrollLeft}px`
  }

  render = () => {
    const {field, opts = {}} = this.props // formValues = Map(), handleOnChange = () => {},
    const {label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}} = opts // , props = {}
    // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not
    const hideDisplay = (this.props.formValues.getIn([field, 'condition'], '') === '' && this.props.formValues.getIn([field, 'values', 0], '') === '')
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5, width: 20}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        <Portal isOpened={this.state.showDialog} ref={`conditionalInput-${field}-portal`} closeOnOutsideClick closeOnEsc onOpen={this.onModalOpen} onClose={() => { this.handleToggleDialog(false) }}>
          <Dialog size={{width: '430px', height: '180px', overflow: 'hidden'}} style={{backgroundColor: '#f5f5f5', border: '2px solid #36a9e1'}}>
            <button type='button' className='close' style={{paddingRight: '10px', paddingTop: '5px', display: 'inline-block'}} onClick={() => { this.handleToggleDialog(false) }}>
              <span>&times;</span>
            </button>
            <div style={{display: 'flex', flexDirection: 'column', flex: 1, width: '100%'}}>
              <FormBuilder formName={`conditionalInput-${field}`} formSchema={this.formSchema()} formValues={this.state.formValues} handleOnChange={this.handleOnChange} draggable={false} />
            </div>
          </Dialog>
        </Portal>
        <div onClick={() => { this.handleToggleDialog(true) }} style={{display: 'flex', flexGrow: 1, textAlign: 'center', whiteSpace: 'nowrap', paddingLeft: 5, border: 0, backgroundColor: 'transparent', borderBottom: '1px solid #a0a0a0', minWidth: 90, color: '#1e8fc6', ...style}}>
          {hideDisplay ? '' : 'Values...'}
        </div>
      </div>
    )
  }
}