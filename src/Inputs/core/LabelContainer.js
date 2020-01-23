import React, {useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import {mapIcon} from '../../Icons'
import PortalTooltip from '../../Tooltip'
import {randomId} from '../../utils'

const LabelContainer = props => {
  const {config, handleLinkClick, handleCascadeKeywordClick, value} = props
  let {
    icon: Icon = '',
    cascade = {},
    link = {},
    type = ''
  } = config
  const {required, style = {}, tooltips = {}} = config
  type = type.toLowerCase()
  let {icon: CascadeIcon = '', tooltip: cascadeTooltip} = cascade
  let {icon: LinkIcon = '', tooltip: linkTooltip} = link
  const {icon: iconTooltip, label: labelTooltip} = tooltips
  Icon = mapIcon(Icon)
  LinkIcon = mapIcon(LinkIcon)
  CascadeIcon = mapIcon(CascadeIcon)
  const {name, label = name} = config
  const iconId = useRef(randomId())
  const linkId = useRef(randomId())
  const cascadeId = useRef(randomId())
  const labelId = useRef(randomId())

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

  const {
    label: labelStyle = {},
    icon: iconStyle = {},
    link: linkStyle = {},
    cascade: cascadeStyle = {},
    cellLabel: cellStyle = {}
  } = style

  return (
    <div className={className} style={cellStyle}>
      <PortalTooltip id={iconId.current} message={iconTooltip} />
      <PortalTooltip id={linkId.current} message={linkTooltip} />
      <PortalTooltip id={cascadeId.current} message={cascadeTooltip} />
      <PortalTooltip id={labelId.current} message={labelTooltip} />
      {Icon && (
        <Icon
          size={size}
          style={iconStyle}
          data-tip
          data-for={iconId.current}
        />
      )}
      {required && <strong className='gfb-validation-indicator'>*</strong>}
      {label && type !== 'header' && (
        <strong
          onClick={onLabelTextClick}
          className={LinkIcon || CascadeIcon ? 'cursor-hand gfb-field-label' : 'gfb-field-label'}
          style={labelStyle}
          data-tip
          data-for={labelId.current}
        >
          {label}
        </strong>
      )}
      {label && type === 'header' && (
        <h3
          onClick={onLabelTextClick}
          className={LinkIcon || CascadeIcon ? 'cursor-hand' : ''}
          style={labelStyle}
          data-tip
          data-for={labelId.current}
        >
          {label}
        </h3>
      )}
      {LinkIcon && (
        <LinkIcon
          className='cursor-hand'
          onClick={onLinkClick}
          style={linkStyle}
          data-tip
          data-for={linkId.current}
        />
      )}
      {CascadeIcon && (
        <CascadeIcon
          className='cursor-hand'
          onClick={onCascadeKeywordClick}
          style={cascadeStyle}
          data-tip
          data-for={cascadeId.current}
        />
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
