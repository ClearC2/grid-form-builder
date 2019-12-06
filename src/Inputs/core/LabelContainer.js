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

  const onCascadeKeywordClick = useCallback(() => {
    handleCascadeKeywordClick({currentValue: value, ...config})
  }, [handleCascadeKeywordClick, value, config])

  const onLabelTextClick = useCallback(() => {
    if (LinkIcon) onLinkClick()
    if (CascadeIcon) onCascadeKeywordClick()
  }, [
    LinkIcon,
    onLinkClick,
    CascadeIcon,
    onCascadeKeywordClick
  ])

  return (
    <div className='gfb-label-container'>
      {Icon && <Icon />}
      <strong
        onClick={onLabelTextClick}
        className={LinkIcon || CascadeIcon ? 'cursor-hand' : ''}
      >
        {label}
      </strong>
      {LinkIcon && <LinkIcon className='cursor-hand' onClick={onLinkClick} />}
      {CascadeIcon && <CascadeIcon className='cursor-hand' onClick={onCascadeKeywordClick} />}
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
