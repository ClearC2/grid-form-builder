import React, {Component} from 'react'
import {Map, List} from 'immutable'

export default class Radio extends Component {
  render = () => {
    const {field, formValues = Map(), handleOnChange = () => {}, opts = {}} = this.props
    const value = formValues.get(field, '')
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
                <input className='radio-grid-input' onChange={handleOnChange} style={{marginRight: 5, ...style}} type='radio' name={field} value={option} checked={option.toLowerCase() === value.toLowerCase()} {...props} />
                {option}
              </label>
            )
          })}
        </div>
      </div>
    )
  }
}
