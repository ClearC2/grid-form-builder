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
    console.log(typeahead)
  }

  loadOptions = input => {
    const {config = {}, formValues = Map()} = this.props
    const {name = null} = config
    const currentValue = formValues.get(name, {value: '', label: ''})

    let values = []

    if (currentValue && currentValue.value && currentValue.value !== '') {
      values.push({value: currentValue, label: currentValue})
    }

    if (input.trim() !== '' && !values.some(o => o.value === input)) {
      values.push({value: input, label: input})
    }

    if (input.length > this.props.minChars) {
      console.log('Fetch Data From Here?', window.location.origin + `/api/typeahead/name/${name}/search/${input}`)
      return Promise.resolve({options: values})
    }

    return Promise.resolve({options: []})
  }

  render = () => {
    const {inline, formValues = Map(), config = {}, Icon = null} = this.props
    const {labelStyle = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name} = config
    const value = formValues.get(name, {value: '', label: ''})

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
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : 0,
        ...iconStyle
      }
    }

    const className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`

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
            onMouseDown={this.onMouseDown}
            className={className}
            name={name}
            value={value}
            onChange={this.handleChange}
            loadOptions={this.loadOptions}
          />
        </div>
      )
    }
  }
}
