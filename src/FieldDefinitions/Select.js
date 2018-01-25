import React, {Component} from 'react'
import {Map, List} from 'immutable'

export default class Select extends Component {
  render = () => {
    const {field, formValues = Map(), handleOnChange = () => {}, prepops = List(), opts = {}} = this.props
    const {options = List(), label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {}, props = {}} = opts
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', ...labelStyle}}>{label}</strong>
        </div>
        <select onChange={handleOnChange} className='select-grid-input' style={{display: 'flex', flexGrow: 1, height: 27, paddingLeft: 5, minWidth: 90, ...style}} name={field} value={formValues.get(field, '')} {...props}>
          <option key='blank' value='' />{/* {should all selects have a blank option?} */}
          {options.map(value => <option key={value} value={value}>{value}</option>)}
          {prepops.map(value => {
            if (typeof value === 'string') return <option key={value} value={value}>{value}</option>
            else if (typeof value === 'object') {
              return value.map((i, subval) => { // returning a Map throws a React warning, but ideally prepops are not Maps
                if (typeof subval === 'string') return <option key={subval} value={subval}>{subval}</option>
              })
            } else return null
          })
          }
        </select>
      </div>
    )
  }
}