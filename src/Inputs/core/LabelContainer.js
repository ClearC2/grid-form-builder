import React, {useCallback} from 'react'
import PropTypes from 'prop-types'
import {mapIcon} from '../../Icons'

const LabelContainer = props => {
  const {config, handleLinkClick, handleCascadeKeywordClick, value} = props
  let {
    icon: Icon = '',
    cascade = {},
    link = {},
    type = ''
  } = config
  const {required} = config
  type = type.toLowerCase()
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

  let className = 'gfb-inner-cell-label'
  if (type === 'icon' || type === 'header') {
    className = className + ' gfb-full-cell-label'
  }

  if (type === 'metadata') {
    className = className + ' gfb-small'
  }

  const size = className.indexOf('full-cell-label') > -1 ? 40 : 15

  return (
    <div className={className}>
      {Icon && (
        <Icon size={size} />
      )}
      {required && <strong className='gfb-validation-indicator'>*</strong>}
      {label && type !== 'header' && (
        <strong
          onClick={onLabelTextClick}
          className={LinkIcon || CascadeIcon ? 'cursor-hand gfb-field-label' : 'gfb-field-label'}
        >
          {label}
        </strong>
      )}
      {label && type === 'header' && (
        <h3
          onClick={onLabelTextClick}
          className={LinkIcon || CascadeIcon ? 'cursor-hand' : ''}
        >
          {label}
        </h3>
      )}
      {LinkIcon && (
        <LinkIcon className='cursor-hand' onClick={onLinkClick} />
      )}
      {CascadeIcon && (
        <CascadeIcon className='cursor-hand' onClick={onCascadeKeywordClick} />
      )}
    </div>
  )
}

export default LabelContainer

LabelContainer.propTypes = {
  config: PropTypes.object,
  handleLinkClick: PropTypes.func,
  handleCascadeKeywordClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array, PropTypes.object]),
  type: PropTypes.string
}
