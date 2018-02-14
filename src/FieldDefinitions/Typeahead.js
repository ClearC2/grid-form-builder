import React, {Component} from 'react'
import {Map} from 'immutable'
import ReactSelect from 'react-select'
import PropTypes from 'prop-types'

class Placeholder extends Component {
  static propTypes = {
    handleMount: PropTypes.func.isRequired
  }
  componentDidMount = () => this.props.handleMount()
  render = () => null
}

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

    return Promise.resolve({options: []}) // refactor to handle ajax prepop options?
  }

  render = () => {
    const {inline, field, formValues = Map(), opts = {}} = this.props
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
        background: 'transparent',
        ...labelStyle
      }
    }

    const className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`

    if (this.state.shouldRemount) {
      return <Placeholder handleMount={this.setShouldRemount} />
    } else {
      return (
        <div style={styles.container} >
          <div style={styles.labelContainer}>
            <strong style={styles.label}>{label}</strong>
          </div>
          <ReactSelect.Async
            onMouseDown={this.onMouseDown}
            className={className}
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
