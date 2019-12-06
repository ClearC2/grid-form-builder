import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {mapIcon} from '../../Icons'

const LabelContainer = props => {
  const {config, handleLinkClick} = props
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

  const onLinkClick = useCallback(() => {
    handleLinkClick(config.link)
  }, [handleLinkClick, config.link])

  return (
    <div className='gfb-label-container'>
      {Icon && <Icon />}
      {label}
      {LinkIcon && <LinkIcon onClick={onLinkClick} />}
      {CascadeIcon && <CascadeIcon />}
    </div>
  )
}

export default LabelContainer

LabelContainer.propTypes = {
  config: PropTypes.object,
  handleLinkClick: PropTypes.func
}
