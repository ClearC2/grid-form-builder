import React, {Component} from 'react'
import {Map} from 'immutable'
import ReactSelect from 'react-select'

export default class Typeahead extends Component {
  static defaultProps = {
    minChars: 1
  }

  state = {
    shouldRemount: false,
    currentOptions: {}
  }

  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }

  setShouldRemount = (shouldRemount = true) => this.setState({shouldRemount})

  handleChange = (typeahead) => {
    const {handleOnChange = () => {}, opts = {}} = this.props
    const {currentOptions = Map()} = this.state
    const {props = {}} = opts
    const {cfd = []} = props
    const {field} = this.props
    const value = typeahead ? typeahead.value : ''
    const label = typeahead ? typeahead.label : ''
    let fieldsToUpdate = []
    fieldsToUpdate.push({target: {name: field, value: Map({value, label})}})
    cfd.map(cfdField => {
      const cfdValue = currentOptions.getIn([value, 'cfd', cfdField], '')
      fieldsToUpdate.push({target: {name: cfdField, value: cfdValue}})
      if (cfdField.indexOf('cfd_') === -1) fieldsToUpdate.push({target: {name: 'cfd_' + cfdField, value: cfdValue}})
    })
    handleOnChange(fieldsToUpdate)
  }

  loadOptions = input => {
    const {field, formValues = Map()} = this.props
    const currentValue = formValues.get(field, '')

    let values = []

    if (currentValue && currentValue !== '') {
      values.push({value: currentValue, label: currentValue})
    }

    if (input.trim() !== '' && !values.some(o => o.value === input)) {
      values.push({value: input, label: input})
    }

    if (input.length < this.props.minChars) {
      return Promise.resolve({options: values})
    }

    return [] // refactor to handle ajax prepop options?
  }

  render = () => {
    const {field, formValues = Map(), opts = {}} = this.props
    const {label = field, labelStyle = {}} = opts
    const currentValue = formValues.get(field, Map({value: '', label: ''}))
    let value = ''
    let valueLabel = ''
    if (typeof currentValue === 'string') {
      value = currentValue
      valueLabel = currentValue
    } else if (typeof currentValue === 'object') {
      if (typeof currentValue.get === 'function') {
        value = currentValue.get('value', '')
        valueLabel = currentValue.get('label', '')
      } else {
        value = currentValue.value ? currentValue.value : ''
        valueLabel = currentValue.label ? currentValue.label : ''
      }
    }
    if (this.state.shouldRemount) {
      return <Placeholder handleMount={this.setShouldRemount} />
    } else {
      return (
        <div style={{display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'flex-start', alignItems: 'center'}} >
          <span style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 3, fontWeight: 'bold', ...labelStyle}}>{label}</span>
          <ReactSelect.Async
            onMouseDown={this.onMouseDown}
            name={field}
            value={{value, label: valueLabel}}
            onChange={this.handleChange}
            loadOptions={this.loadOptions}
          />
        </div>
      )
    }
  }
}
