import React, {Component} from 'react'
import {Map} from 'immutable'
import {AsyncCreatable} from 'react-select'
import PropTypes from 'prop-types'
import GFBConfig from '../config'

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

  handleChange = newValue => {
    const {handleOnChange, config = {}} = this.props
    const {name = null, typeahead = {}} = config
    if (newValue.className || (newValue.value.trim() === '' && newValue.label.trim() === '')) {
      newValue[name] = newValue.value || ''
      const {fields = []} = typeahead
      let resetValues = {
        [name]: ''
      }
      fields.map(field => { resetValues[field] = '' })
      Object.keys(resetValues).forEach(field => {
        handleOnChange({
          target: {
            name: field,
            value: resetValues[field]
          }
        })
      })
    }
    console.log(this.props, this.state, 'typeahead loggggggggg')
    Object.keys(newValue).forEach(field => {
      let value = newValue[field]
      if (field === 'duplication') value = newValue.value
      let id = null
      if (field === 'label') {
        id = newValue[this.props.config.typeahead.fieldId || 'value'] || newValue.label
        field = name
      }
      let e = {
        target: {
          name: field,
          value,
          id
        }
      }
      if (field !== 'className' && field !== 'value' && field !== 'label') {
        handleOnChange(e)
      }
    })
  }

  loadOptions = search => {
    const {config = {}} = this.props
    const {name = null, typeahead = {}} = config
    const {key = null, duplication = false} = typeahead

    if (!key) {
      console.error(`The JSON schema representation for ${name} does not have a typeahead key. A typeahead.key is required for this field type to search for results.`)
      return Promise.resolve({options: []})
    }

    if (search.length > this.props.minChars) {
      return GFBConfig.ajax.get(`/typeahead/name/${key}/search/${search}`)
        .then(resp => {
          const results = resp.data.data.map(value => {
            value.duplication = duplication
            return value
          })
          return {options: results}
        })
    }

    return Promise.resolve({options: []})
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, name = null, iconStyle = {}, required = false, multi = false, style = {}, containerStyle = {}, onKeyDown = () => null} = config
    if (!name) return null
    const {label = name} = config
    let value = formValues.get(name, null)
    if (typeof value === 'string' && value.length > 0) value = {value, label: value}
    const warn = requiredWarning && formValues.get(name, '').length === 0 && required
    let {readonly = false, disabled = false} = config
    disabled = disabled || readonly

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        ...containerStyle
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
      },
      input: {
        backgroundColor: disabled ? '#eee' : 'white',
        minWidth: 177,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : 0,
        ...iconStyle
      }
    }

    let className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`
    className = !warn ? className : className + ' warn-required'
    const placeholder = warn ? '* This Field Is Required' : ''

    if (this.state.shouldRemount) {
      return <Placeholder handleMount={this.setShouldRemount} />
    } else {
      return (
        <div style={styles.container}>
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label}>{label}</strong>
          </div>
          <AsyncCreatable
            style={style}
            onMouseDown={this.onMouseDown}
            className={className}
            name={name}
            multi={multi}
            value={value}
            onChange={this.handleChange}
            loadOptions={this.loadOptions}
            disabled={disabled}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            resetValue={{[name]: '', value: '', label: ''}}
          />
        </div>
      )
    }
  }
}
