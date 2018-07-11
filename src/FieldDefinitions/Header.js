import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {Map} from 'immutable'

export class Header extends Component {
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
  handleAnywhereClick = () => {
    const {handleAnywhereClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleAnywhereClick(config)
  }
  handleCascadeKeywordClick = e => {
    const {handleCascadeKeywordClick = () => null, formValues = Map()} = this.props
    let {config = {}} = this.props
    const currentValue = formValues.get(config.name, '')
    config = {currentValue, ...config}
    handleCascadeKeywordClick(config)
  }
  render = () => {
    const {config = {}, connectDropTarget, cascadingKeyword, CascadeIcon} = this.props
    const {style = {}, name = null} = config
    if (!name) return null
    const {label = name} = config
    return (
      connectDropTarget(
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}} onMouseUp={this.handleAnywhereClick}>
          <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, alignItems: 'center', ...style}}>
            <strong
              style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '13pt', marginRight: 5, ...style}}
              onClick={!!cascadingKeyword && !CascadeIcon ? this.handleCascadeKeywordClick : null} className={!!cascadingKeyword && !CascadeIcon ? 'cursor-hand' : ''}
            >
              {label}
            </strong>
            {!!cascadingKeyword && !!CascadeIcon && <CascadeIcon size={13} onClick={this.handleCascadeKeywordClick} className='cursor-hand' />}
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
