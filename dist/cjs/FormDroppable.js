"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = _default;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactDnd = require("react-dnd");

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

function _default(Child) {
  var _temp;

  return (0, _reactDnd.DragSource)('FormBuilderDraggable', cardSource, collect)((_temp =
  /*#__PURE__*/
  function (_Component) {
    (0, _inherits2.default)(FormDroppable, _Component);

    function FormDroppable() {
      var _getPrototypeOf2, _context;

      var _this;

      (0, _classCallCheck2.default)(this, FormDroppable);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormDroppable)).call.apply(_getPrototypeOf2, (0, _concat.default)(_context = [this]).call(_context, args)));
      (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
        var connectDragSource = _this.props.connectDragSource;
        return connectDragSource(_react.default.createElement("div", {
          className: "form-droppable-handle"
        }, _react.default.createElement(Child, _this.props)));
      });
      return _this;
    }

    return FormDroppable;
  }(_react.Component), _temp));
}