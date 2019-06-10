import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {Map} from 'immutable'
import PropTypes from 'prop-types'

export class Icon extends Component {
  static propTypes = {
    formValues: PropTypes.object,
    config: PropTypes.object,
    didDrop: PropTypes.bool,
    isOver: PropTypes.bool,
    droppedItem: PropTypes.object,
    handleDragDropOnInput: PropTypes.func,
    handleAnywhereClick: PropTypes.func,
    handleCascadeKeywordClick: PropTypes.func,
    handleOnChange: PropTypes.func,
    draggable: PropTypes.bool,
    inline: PropTypes.bool,
    Icon: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    requiredWarning: PropTypes.bool,
    connectDropTarget: PropTypes.func,
    cascadingKeyword: PropTypes.string,
    CascadeIcon: PropTypes.func,
    tabIndex: PropTypes.number,
    LinkIcon: PropTypes.func,
    handleLinkClick: PropTypes.func
  }

  componentDidUpdate = p => {
    const {didDrop, isOver} = this.props
    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      let {droppedItem, handleDragDropOnInput, config = {}, formValues = Map()} = this.props
      droppedItem = droppedItem === null ? null : droppedItem.widget
      const currentValue = formValues.get(config.name, '')
      config = {currentValue, ...config}
      if (droppedItem && !p.droppedItem) {
        handleDragDropOnInput({
          source: droppedItem,
          target: config
        })
      }
    }
  }
  handleAnywhereClick = e => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleAnywhereClick(config, e)
  }

  handleCascadeKeywordClick = () => {
    const {handleCascadeKeywordClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleCascadeKeywordClick(config)
  }

  handleLinkClick = () => {
    const {config = {}, handleLinkClick} = this.props
    const {link} = config
    handleLinkClick(link)
  }

  render = () => {
    const {config = {}, Icon = null, connectDropTarget, cascadingKeyword, CascadeIcon, LinkIcon} = this.props
    const {onClick = () => null, link} = config
    let {style = {}, iconStyle = {}} = config
    style = typeof style === 'string' ? JSON.parse(style) : style
    iconStyle = typeof iconStyle === 'string' ? JSON.parse(iconStyle) : iconStyle
    const linkIconStyle = (link && typeof link.style === 'object') ? link.style : {}
    return (
      connectDropTarget(
        <div
          onClick={onClick}
          className='cursor-hand'
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            ...style
          }}
          onMouseUp={this.handleAnywhereClick}
        >
          {Icon && (
            <Icon
              style={{height: 20, width: 20, marginRight: 5, ...iconStyle}}
              onClick={
                !!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick
                  : link ? this.handleLinkClick : null
              }
              className={(!!cascadingKeyword && !CascadeIcon) || link ? 'cursor-hand' : ''}
            />
          )}
          {!!cascadingKeyword && !!CascadeIcon && (
            <CascadeIcon onClick={this.handleCascadeKeywordClick} className='cursor-hand' />
          )}
          {!!link && !!LinkIcon && (
            <LinkIcon onClick={this.handleLinkClick} className='cursor-hand' style={linkIconStyle} />
          )}
        </div>
      )
    )
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  }
}

const boxTarget = {
  drop (props, monitor) {
    return {
      widget: monitor.getItem()
    }
  }
}

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Icon)
