/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback} from 'react'
import PropTypes from 'prop-types'
import {mapIcon} from '../../Icons'
import useTheme from '../../theme/useTheme'

const LabelContainer = props => {
  const {
    config,
    handleLinkClick,
    handleCascadeKeywordClick,
    value,
    expandable,
    expandItem,
    shrinkItem,
    tooltipId
  } = props
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
  let ExpandIcon
  let ShrinkIcon
  if (expandable) {
    ExpandIcon = mapIcon('caretdown')
    ShrinkIcon = mapIcon('caretup')
  }
  const {name, label = name} = config
  const {theme} = useTheme()

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
    <div className={className} style={cellStyle} css={theme.cellLabel}>
      {Icon && (
        <Icon
          size={size}
          style={iconStyle}
          data-tip={iconTooltip}
          data-for={tooltipId}
          css={theme.icon}
        />
      )}
      {required && <strong className='gfb-validation-indicator'>*</strong>}
      {label && type !== 'header' && (
        <strong
          onClick={onLabelTextClick}
          className={LinkIcon || CascadeIcon ? 'cursor-hand gfb-field-label' : 'gfb-field-label'}
          style={labelStyle}
          data-tip={labelTooltip}
          data-for={tooltipId}
          css={theme.label}
        >
          {label}
        </strong>
      )}
      {label && type === 'header' && (
        <h3
          onClick={onLabelTextClick}
          className={LinkIcon || CascadeIcon ? 'cursor-hand' : ''}
          style={labelStyle}
          data-tip={labelTooltip}
          data-for={tooltipId}
          css={theme.label}
        >
          {label}
        </h3>
      )}
      {LinkIcon && (
        <LinkIcon
          className='cursor-hand'
          onClick={onLinkClick}
          style={linkStyle}
          data-tip={linkTooltip}
          data-for={tooltipId}
          css={theme.link}
        />
      )}
      {CascadeIcon && (
        <CascadeIcon
          className='cursor-hand'
          onClick={onCascadeKeywordClick}
          style={cascadeStyle}
          data-tip={cascadeTooltip}
          data-for={tooltipId}
          css={theme.cascade}
        />
      )}
      {!expandable ? null : (
        <div className='gfb-input-expand-controls'>
          <button onClick={shrinkItem} className='gfb-expand-input-btn'>
            <ShrinkIcon
              className='cursor-hand'
              data-tip='Condense Input'
              data-for={tooltipId}
            />
          </button>
          <button onClick={expandItem} className='gfb-expand-input-btn'>
            <ExpandIcon
              className='cursor-hand'
              data-tip='Expand Input'
              data-for={tooltipId}
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default LabelContainer

LabelContainer.propTypes = {
  config: PropTypes.object,
  handleLinkClick: PropTypes.func,
  handleCascadeKeywordClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  type: PropTypes.string,
  expandItem: PropTypes.func,
  shrinkItem: PropTypes.func,
  expandable: PropTypes.bool,
  tooltipId: PropTypes.string
}
