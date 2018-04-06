import React, {Component} from 'react'
import {Map} from 'immutable'
import ReactSelect from 'react-select'
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

  handleChange = typeahead => {
    const {handleOnChange, config = {}} = this.props
    const {name = null} = config
    const psudoEventObject = {
      target: {
        value: typeahead,
        name
      }
    }
    // This is where we need to make the magic happen. - JRA 3/22/2018
    // If all we do is handleOnChange it will only update it's own field value with the entire typeahead object and have no effect on the rest of the form values. - JRA 3/22/2018
    handleOnChange(psudoEventObject)
  }

  loadOptions = search => {
    const {config = {}, formValues = Map()} = this.props
    const {name = null, typeahead = {}} = config
    const {key = null} = typeahead

    if (!key) {
      console.error(`The JSON schema representation for ${name} does not have a typeahead key. A typeahead.key is required for this field type to search for results.`)
      return Promise.resolve({options: []})
    }

    const currentValue = formValues.get(name, {value: '', label: ''})

    let values = []

    if (currentValue && currentValue.value && currentValue.value !== '') {
      values.push({value: currentValue, label: currentValue})
    }

    if (search.trim() !== '' && !values.some(o => o.value === search)) {
      values.push({value: search, label: search})
    }

    if (search.length > this.props.minChars) {
      return GFBConfig.ajax.get(`/api/typeahead/name/${key}/search/${search}`)
        .then(resp => {
          return {options: values.concat(resp.data.data)}
        })
    }

    return Promise.resolve({options: []})
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, name = null, iconStyle = {}, required = false, multi = false} = config
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
      },
      input: {
        backgroundColor: disabled ? '#eee' : 'white',
        minWidth: 176
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

    if (this.state.shouldRemount) {
      return <Placeholder handleMount={this.setShouldRemount} />
    } else {
      return (
        <div style={styles.container} >
          <div style={styles.labelContainer}>
            {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
            {Icon && <Icon style={styles.icon} />}
            <strong style={styles.label}>{label}</strong>
          </div>
          <ReactSelect.Async
            style={styles.input}
            onMouseDown={this.onMouseDown}
            className={className}
            name={name}
            multi={multi}
            value={value}
            onChange={this.handleChange}
            loadOptions={this.loadOptions}
            disabled={disabled}
          />
        </div>
      )
    }
  }
}
