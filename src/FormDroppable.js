import React from 'react'
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

export default function (Component) {
  return DragSource('FormBuilderDraggable', cardSource, collect)(class FormDraggable extends Component {
    render = () => {
      const {connectDragSource} = this.props
      return (
        connectDragSource(
          <div className='form-droppable-handle'>
            <Component
              {...this.props}
            />
          </div>
        )
      )
    }
  })
}
