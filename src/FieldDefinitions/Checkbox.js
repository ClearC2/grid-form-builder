import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Checkbox extends Component {
  handleOnChange = e => {
    const {field, formValues = Map(), handleOnChange = () => {}} = this.props
    let value = formValues.get(field, '')
    value = value === 'on' ? 'off' : 'on'
    handleOnChange({target: {name: e.target.name, value}})
  }

  render = () => {
    const {field, formValues = Map(), opts = {}} = this.props
    const {label = field, style = {}, props = {}} = opts
    const value = formValues.get(field, '')
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <label key={field} style={{display: 'flex', flex: 1, height: 27, margin: 0, marginBottom: 5, alignItems: 'center', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}}>
          <input className='checkbox-grid-input' onChange={this.handleOnChange} style={{display: 'flex', marginRight: 5, ...style}} type='checkbox' name={field} checked={value.toLowerCase() === 'on'} {...props} />
          {label}
        </label>
      </div>
    )
  }
}
