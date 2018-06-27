function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

var cardSource = {
  beginDrag: function beginDrag(props) {
    return {
      props: props
    };
  },
  endDrag: function endDrag(props) {
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
  return DragSource('FormBuilderDraggable', cardSource, collect)(function (_Component) {
    _inherits(FormDroppable, _Component);

    function FormDroppable() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, FormDroppable);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FormDroppable.__proto__ || Object.getPrototypeOf(FormDroppable)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
        var connectDragSource = _this.props.connectDragSource;

        return connectDragSource(React.createElement(
          'div',
          { className: 'form-droppable-handle' },
          React.createElement(Child, _this.props)
        ));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    return FormDroppable;
  }(Component));
}