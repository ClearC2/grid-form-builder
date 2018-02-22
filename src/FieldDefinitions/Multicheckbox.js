import React, {Component} from 'react'
import {Map, List} from 'immutable'

// this component is designed to return a List() of selected values to the forms handle change function
export default class Multicheckbox extends Component {
  constructor (props) {
    super(props)
    const {field, formValues = Map(), opts = {}} = props
    const value = formValues.get(field, List())
    const {options = List()} = opts
    let currentVals = List()
    options.map(option => {
      if (value.indexOf(option) > -1) currentVals = currentVals.push(option)
    })
    this.state = {
      value: currentVals
    }
  }

  handleOnChange = e => {
    const updatingValue = e.target.value
    let {value} = this.state
    if (value.indexOf(updatingValue) > -1) {
      value = value.filter(option => option !== updatingValue)
    } else {
      value = value.push(updatingValue)
    }
    this.setState({value})
  }

  componentDidUpdate = (p, s) => {
    const {field, handleOnChange = () => {}} = this.props
    const {value} = this.state
    if (value.size !== s.value.size) {
      handleOnChange({target: {name: field, value}})
    }
  }

  render = () => {
    const {inline, config = {}, Icon = null} = this.props
    const {labelStyle = {}, style = {}, name = null, iconStyle = {}, required = false} = config
    if (!name) return null
    const {label = name, keyword = {}, boxed} = config
    const {options = []} = keyword
    const {value} = this.state
    const boxStyle = !boxed ? {} : {border: '1px solid lightgrey', backgroundColor: '#f5f5f5'}

    const styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent',
        ...boxStyle
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
        lineHeight: inline ? '12pt' : '11pt',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        background: 'transparent',
        ...labelStyle
      },
      optionsContainer: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        marginLeft: inline ? 0 : 10,
        marginTop: inline ? 10 : 5
      },
      input: {
        display: 'flex',
        marginRight: 5,
        marginTop: 0,
        ...style
      },
      icon: {
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: -1,
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
        <div style={styles.optionsContainer}>
          {options.map((option, i) => {
            return (
              <label key={i} style={styles.label}>
                <input className='radio-grid-input' onChange={this.handleOnChange} style={styles.input} type='checkbox' name={name} value={option.value} checked={value.indexOf(option.value) > -1} />
                {option.label ? option.label : option.value}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}
