import React, {Component} from 'react'
import {DragSource} from 'react-dnd'

const cardSource = {
  beginDrag (props) {
    return {
      props: props
    }
  },

  endDrag (props) {
    return {
      props: props
    }
  }
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    droppedItem: monitor.getDropResult()
  }
}

export default function (Child) {
  return DragSource('FormBuilderDraggable', cardSource, collect)(class FormDroppable extends Component {
    render = () => {
      const {connectDragSource} = this.props
      return (
        connectDragSource(
          <div className='form-droppable-handle'>
            <Child
              {...this.props}
            />
          </div>
        )
      )
    }
  })
}
