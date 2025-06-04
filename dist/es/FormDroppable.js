import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
const cardSource = {
  beginDrag(props) {
    return {
      props: props
    };
  },
  endDrag(props) {
    return {
      props: props
    };
  }
};
function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
    droppedItem: monitor.getDropResult()
  };
}
export default function (Child) {
  return DragSource('FormBuilderDraggable', cardSource, collect)(class FormDroppable extends Component {
    constructor() {
      super(...arguments);
      _defineProperty(this, "render", () => {
        const {
          connectDragSource
        } = this.props;
        return connectDragSource(/*#__PURE__*/React.createElement("div", {
          className: "form-droppable-handle"
        }, /*#__PURE__*/React.createElement(Child, this.props)));
      });
    }
  });
}