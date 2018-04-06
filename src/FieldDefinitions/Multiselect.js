import React, {Component} from 'react'
import {List, fromJS} from 'immutable'
import ReactSelect from 'react-select'

export default class Multiselect extends Component {
  constructor (props) {
    super(props)
    const {config = {}} = props
    const {keyword = {}} = config
    const {options = []} = keyword
    this.state = {
      fieldValues: [],
      builtOptions: options
    }
  }

  componentWillReceiveProps (props) {
    let val = props.formValues.get(props.config.name, null)
    if (!val && this.state.fieldValues !== []) {
      this.setState({fieldValues: []})
    }
  }

  onChange = (e) => {
    this.setState({fieldValues: e})
    if (e.length === 0) {
      this.props.handleOnChange({target: {name: this.props.config.name, value: ''}})
    } else {
      this.props.handleOnChange({target: {name: this.props.config.name, value: fromJS({condition: 'is one of', values: List(e.map(val => val.value))})}})
    }
  }

  render = () => {
    const {inline, config = {}, Icon = null, requiredWarning} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name} = config
    const warn = requiredWarning && this.state.fieldValues.length === 0 && required
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
        height: inline ? 'auto' : 25,
        backgroundColor: disabled ? '#eee' : 'white',
        minWidth: 177,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 3 : -1,
        ...iconStyle
      }
    }

    let className = inline ? `select-grid-input select-grid-input-inline` : `select-grid-input`
    className = !warn ? className : className + ' warn-required'

    return (
      <div style={styles.container}>
        <div style={styles.labelContainer}>
          {required && <div style={{color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt'}}>*</div>}
          {Icon && <Icon style={styles.icon} />}
          <strong style={styles.label}>{label}</strong>
        </div>
        <ReactSelect
          onChange={this.onChange}
          className={className}
          style={styles.input}
          multi
          name={name}
          options={this.state.builtOptions}
          value={this.state.fieldValues}
          disabled={disabled}
        />
      </div>
    )
  }
}
