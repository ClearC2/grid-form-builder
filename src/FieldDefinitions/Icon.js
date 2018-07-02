import React, {Component} from 'react'
import {DropTarget} from 'react-dnd'
import {Map} from 'immutable'

export class Icon extends Component {
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
  render = () => {
    const {config = {}, Icon = null, connectDropTarget} = this.props
    const {style = {}, iconStyle = {}, onClick = () => null} = config
    return (
      connectDropTarget(
        <div onClick={onClick} style={{display: 'flex', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', ...style}}>
          {Icon && <Icon style={{height: 20, width: 20, ...iconStyle}} />}
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
