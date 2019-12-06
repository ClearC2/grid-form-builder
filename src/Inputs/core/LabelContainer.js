import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {mapIcon} from '../../Icons'

const LabelContainer = props => {
  const {config, handleLinkClick, handleCascadeKeywordClick, value} = props
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

  const onCascadeKeywordClick = useCallback(e => {
    handleCascadeKeywordClick({currentValue: value, ...config})
  }, [handleCascadeKeywordClick, value, config])

  return (
    <div className='gfb-label-container'>
      {Icon && <Icon />}
      {label}
      {LinkIcon && <LinkIcon onClick={onLinkClick} />}
      {CascadeIcon && <CascadeIcon onClick={onCascadeKeywordClick} />}
    </div>
  )
}

export default LabelContainer

LabelContainer.propTypes = {
  config: PropTypes.object,
  handleLinkClick: PropTypes.func,
  handleCascadeKeywordClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object])
}
