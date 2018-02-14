import React, {Component} from 'react'
import DateTime from 'react-datetime'
import {Map} from 'immutable'

export default class Datetime extends Component {
  handleChange = val => {
    const {field, handleOnChange = () => {}} = this.props
    const value = typeof val === 'object' ? val.format('M/D/YYYY h:mm a') : val
    let e = {target: {name: field, value}}
    handleOnChange(e)
  }
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {field, formValues = Map(), opts = {}} = this.props
    const {label = field, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts
    let value = formValues.get(field, '')
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        <DateTime onMouseDown={this.onMouseDown} value={value} onChange={this.handleChange} dateFormat='M/D/YYYY' className='date-wrapper-grid-input' {...props} />
      </div>
    )
  }
}
