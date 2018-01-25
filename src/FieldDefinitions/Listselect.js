import React, {Component} from 'react'
import {Map, List, fromJS} from 'immutable'

// this component is designed to return a List() of selected values to the forms handle change function
export default class Listselect extends Component {
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
    const updatingValue = e.target.innerHTML
    let {value} = this.state
    if (value.indexOf(updatingValue) > -1) {
      value = value.filter(option => option !== updatingValue)
    } else {
      value = value.push(updatingValue)
    }
    this.setState({value})
  }

  selectAllOptions = () => {
    const {opts = {}} = this.props
    const {options = List()} = opts
    this.setState({value: fromJS(options)})
  }

  deselectAllOptions = () => this.setState({value: List()})

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
    const {options = List(), label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}} = opts
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'column', height: '100%'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 27, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', height: 27, ...labelStyle}}>{label}</strong>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', minHeight: 10, border: '1px solid lightgrey', height: 'calc(100% - 18px)', marginTop: 3, overflowY: 'scroll'}}>
          {options.map(option => {
            return (
              <div
                key={option}
                onClick={this.handleOnChange}
                style={{
                  display: 'flex',
                  height: 27,
                  minHeight: 27,
                  margin: 0,
                  alignItems: 'center',
                  paddingLeft: 5,
                  width: '100%',
                  borderBottom: '1px solid lightgrey',
                  backgroundColor: value.indexOf(option) > -1 ? '#a1c3fa' : 'transparent',
                  ...style}}
              >
                {option}
              </div>
            )
          })}
        </div>
        <div style={{display: 'flex', justifyContent: 'flex-end', height: 15, minHeight: 15}}>
          <span onClick={this.selectAllOptions} style={{marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue'}} className='cursor-hand'>Select All</span>
          <span onClick={this.deselectAllOptions} style={{marginRight: 5, fontSize: '8pt', textDecoration: 'underline', color: 'blue'}} className='cursor-hand'>Deselect All</span>
        </div>
      </div>
    )
  }
}