import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
  return DragSource('FormBuilderDraggable', cardSource, collect)( /*#__PURE__*/function (_Component) {
    _inherits(FormDroppable, _Component);

    var _super = _createSuper(FormDroppable);

    function FormDroppable() {
      var _context;

      var _this;

      _classCallCheck(this, FormDroppable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, _concatInstanceProperty(_context = [this]).call(_context, args));

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        var connectDragSource = _this.props.connectDragSource;
        return connectDragSource( /*#__PURE__*/React.createElement("div", {
          className: "form-droppable-handle"
        }, /*#__PURE__*/React.createElement(Child, _this.props)));
      });

      return _this;
    }

    return _createClass(FormDroppable);
  }(Component));
}