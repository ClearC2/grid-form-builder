import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

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

var _default = function _default(Child) {
  var _temp;

  return DragSource('FormBuilderDraggable', cardSource, collect)((_temp =
  /*#__PURE__*/
  function (_Component) {
    _inherits(FormDroppable, _Component);

    function FormDroppable() {
      var _getPrototypeOf2, _context;

      var _this;

      _classCallCheck(this, FormDroppable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormDroppable)).call.apply(_getPrototypeOf2, _concatInstanceProperty(_context = [this]).call(_context, args)));

      _defineProperty(_assertThisInitialized(_this), "render", function () {
        var connectDragSource = _this.props.connectDragSource;
        return connectDragSource(React.createElement("div", {
          className: "form-droppable-handle"
        }, React.createElement(Child, _this.props)));
      });

      return _this;
    }

    _createClass(FormDroppable, [{
      key: "__reactstandin__regenerateByEval",
      // @ts-ignore
      value: function __reactstandin__regenerateByEval(key, code) {
        // @ts-ignore
        this[key] = eval(code);
      }
    }]);

    return FormDroppable;
  }(Component), _temp));
};

export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(cardSource, "cardSource", "/Users/davidadams/code/grid-form-builder/src/FormDroppable.js");
  reactHotLoader.register(collect, "collect", "/Users/davidadams/code/grid-form-builder/src/FormDroppable.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/FormDroppable.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();