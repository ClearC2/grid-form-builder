import React, {Component} from 'react'

export default class Header extends Component {
  render = () => {
    const {config = {}} = this.props
    const {style = {}, name = null} = config
    if (!name) return null
    const {label = name} = config
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...style}}>
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '13pt', ...style}}>{label}</strong>
        </div>
      </div>
    )
  }
}
