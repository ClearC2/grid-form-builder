import React, {Component} from 'react'
import {Map} from 'immutable'

export default class Input extends Component {
  onMouseDown = e => {
    if (this.props.draggable) e.stopPropagation()
  }
  render = () => {
    const {field, formValues = Map(), handleOnChange = () => {}, opts = {}} = this.props
    const {label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5, width: 20}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        <input onMouseDown={this.onMouseDown} onChange={handleOnChange} style={{display: 'flex', flexGrow: 1, paddingLeft: 5, border: 0, backgroundColor: 'transparent', borderBottom: '1px solid #a0a0a0', minWidth: 90, ...style}} type='text' name={field} value={formValues.get(field, '')} {...props} />
      </div>
    )
  }
}
