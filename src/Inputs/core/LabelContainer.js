import React from 'react'
import PropTypes from 'prop-types'
import {mapIcon} from '../../Icons'

const LabelContainer = props => {
  const {config} = props

  let {
    icon: Icon = '',
    cascade = {},
    link = {}
  } = config
  let {icon: CascadeIcon = ''} = cascade
  let {icon: LinkIcon = ''} = link
  Icon = mapIcon(Icon)
  LinkIcon = mapIcon(LinkIcon)
  CascadeIcon = mapIcon(CascadeIcon)

  const {name, label = name} = config
  return (
    <div className='gfb-label-container'>
      {Icon && <Icon />}
      {label}
      {LinkIcon && <LinkIcon />}
      {CascadeIcon && <CascadeIcon />}
    </div>
  )
}

export default LabelContainer

LabelContainer.propTypes = {
  config: PropTypes.object
}
