import React, {Component} from 'react'
import {Map, List} from 'immutable'

// this component is designed to return a List() of selected values to the forms handle change function
export default class Multicheckbox extends Component {
  constructor (props) {
    super(props)
    const {field, formValues = Map(), opts = {}} = this.props
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
    const {field, opts = {}} = this.props
    const {value} = this.state
    const {options = List(), label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}, boxed = false} = opts
    const boxStyle = !boxed ? {} : {border: '1px solid lightgrey', backgroundColor: '#f5f5f5'}
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row', ...boxStyle}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          {options.map(option => {
            return (
              <label key={option} style={{display: 'flex', flex: 1, height: 27, margin: 0, marginBottom: 5, alignItems: 'center', paddingLeft: 5, fontWeight: 'bold'}}>
                <input className='radio-grid-input' onChange={this.handleOnChange} style={{marginRight: 5, ...style}} type='checkbox' name={field} value={option} checked={value.indexOf(option) > -1} {...props} />
                {option}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}
