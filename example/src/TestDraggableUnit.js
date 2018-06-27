import React from 'react'
import {DragSource} from 'react-dnd'

export class TestDraggableUnit extends React.Component {
  render = () => {
    const {connectDragSource} = this.props
    return (
      connectDragSource(
        <div style={{marginLeft: 10, height: 30, display: 'flex', alignItems: 'center', border: '2px solid black', paddingLeft: 10, paddingRight: 10}}>
          Drag Me
        </div>
      )
    )
  }
}

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

export default DragSource('FormBuilderDraggable', cardSource, collect)(TestDraggableUnit)
