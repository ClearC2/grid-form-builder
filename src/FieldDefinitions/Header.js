import React, {Component} from 'react'

export default class Header extends Component {
  render = () => {
    const {field, opts = {}} = this.props
    const {label = field, labelStyle = {}, Icon = null, iconProps = {}} = opts
    return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
        <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...labelStyle}}>
          {!!Icon && <Icon size={20} style={{marginRight: 5, width: 20}} {...iconProps} />}
          <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '13pt', ...labelStyle}}>{label}</strong>
        </div>
      </div>
    )
  }
}
