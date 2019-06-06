import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {Map} from 'immutable'
import PropTypes from 'prop-types'

export class Header extends Component {
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

  handleCascadeKeywordClick = e => {
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
    const {config = {}, connectDropTarget, cascadingKeyword, CascadeIcon, formValues = Map(), LinkIcon} = this.props
    const {name = null, link} = config
    let {style = {}, containerStyle = {}, labelStyle = {}} = config
    style = typeof style === 'string' ? JSON.parse(style) : style
    if (!name) return null
    const {label = name} = config
    return (
      connectDropTarget(
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'row',
            ...containerStyle
          }}
          onMouseUp={this.handleAnywhereClick}
        >
          <div
            style={{
              color: '#a0a0a0',
              fontSize: '9pt',
              fontWeight: 'bold',
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              minWidth: 150,
              marginTop: 4,
              justifyContent: 'space-between',
              alignItems: 'center',
              ...style
            }}
          >
            <span
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                marginRight: 5,
                ...labelStyle
              }}
              onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null}
              className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}
            >
              {label}
            </span>
            <span
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                marginRight: 5,
                ...style
              }}
              onClick={
                !!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick
                  : link ? this.handleLinkClick : null
              }
              className={(!!cascadingKeyword && !CascadeIcon) || link ? 'cursor-hand' : ''}
            >
              {formValues.get(name, '')}
            </span>
            {!!cascadingKeyword && !!CascadeIcon && (
              <CascadeIcon size={13} onClick={this.handleCascadeKeywordClick} className='cursor-hand' />
            )}
            {!!link && !!LinkIcon && (
              <LinkIcon onClick={this.handleLinkClick} className='cursor-hand' />
            )}
          </div>
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

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(Header)
