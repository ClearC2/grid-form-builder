import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'

export class Header extends Component {
  componentDidUpdate = p => {
    const {didDrop, isOver} = this.props
    if (didDrop && !p.didDrop && !isOver && p.isOver) {
      // if it was just previously over and dropped (this is to make this event only trigger once)
      let {droppedItem, handleDragDropOnInput, config} = this.props
      droppedItem = droppedItem === null ? null : droppedItem.widget
      if (droppedItem && !p.droppedItem) {
        handleDragDropOnInput({
          source: droppedItem,
          target: config
        })
      }
    }
  }
  render = () => {
    const {config = {}, connectDropTarget} = this.props
    const {style = {}, name = null} = config
    if (!name) return null
    const {label = name} = config
    return (
      connectDropTarget(
        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
          <div style={{display: 'flex', flexDirection: 'row', width: 150, minWidth: 150, height: 15, marginTop: 4, ...style}}>
            <strong style={{display: 'flex', justifyContent: 'flex-start', lineHeight: '23px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: '13pt', ...style}}>{label}</strong>
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
