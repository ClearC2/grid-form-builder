"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _fa = require("react-icons/fa");

var _react = require("react");

var _utils = require("../../utils");

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

/** @jsx jsx */
var Toolbar = function Toolbar(_ref) {
  var id = _ref.id,
      addTable = _ref.addTable,
      removeTable = _ref.removeTable,
      insertRowAbove = _ref.insertRowAbove,
      insertRowBelow = _ref.insertRowBelow,
      deleteRow = _ref.deleteRow,
      insertColumnLeft = _ref.insertColumnLeft,
      insertColumnRight = _ref.insertColumnRight,
      deleteColumn = _ref.deleteColumn;
  var tooltipId = (0, _react.useRef)('gfb-' + (0, _utils.randomId)());

  var _useState = (0, _react.useState)('Table Controls'),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      message = _useState2[0],
      setMessage = _useState2[1];

  return (0, _core.jsx)("div", {
    id: id,
    style: {
      backgroundColor: '#fafafa',
      display: 'flex'
    }
  }, (0, _core.jsx)(_Tooltip.default, {
    id: tooltipId.current,
    message: message
  }), (0, _core.jsx)("select", {
    className: "ql-header",
    defaultValue: 'normal',
    onChange: function onChange(e) {
      return e.persist();
    }
  }, (0, _core.jsx)("option", {
    value: "1"
  }), (0, _core.jsx)("option", {
    value: "2"
  }), (0, _core.jsx)("option", {
    value: "3"
  }), (0, _core.jsx)("option", {
    value: "normal"
  })), (0, _core.jsx)("button", {
    className: "ql-bold"
  }), (0, _core.jsx)("button", {
    className: "ql-italic"
  }), (0, _core.jsx)("button", {
    className: "ql-underline"
  }), (0, _core.jsx)("button", {
    className: "ql-strike"
  }), (0, _core.jsx)("select", {
    className: "ql-color"
  }), (0, _core.jsx)("select", {
    className: "ql-background"
  }), (0, _core.jsx)("button", {
    className: "ql-link"
  }), (0, _core.jsx)("button", {
    className: "ql-list",
    value: "bullet"
  }), (0, _core.jsx)("button", {
    className: "ql-list",
    value: "ordered"
  }), (0, _core.jsx)("button", {
    className: "ql-blockquote"
  }), (0, _core.jsx)("button", {
    className: "ql-insertImage"
  }, (0, _core.jsx)(_fa.FaImage, null)), (0, _core.jsx)("button", {
    onClick: addTable,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Add Table');
    }
  }, (0, _core.jsx)(_fa.FaTable, null)), (0, _core.jsx)("button", {
    onClick: insertRowAbove,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Row Above Cursor');
    }
  }, (0, _core.jsx)(_fa.FaArrowUp, null)), (0, _core.jsx)("button", {
    onClick: insertRowBelow,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Row Below Cursor');
    }
  }, (0, _core.jsx)(_fa.FaArrowDown, null)), (0, _core.jsx)("button", {
    onClick: insertColumnLeft,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Column Left Of Cursor');
    }
  }, (0, _core.jsx)(_fa.FaArrowLeft, null)), (0, _core.jsx)("button", {
    onClick: insertColumnRight,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Column Right Of Cursor');
    }
  }, (0, _core.jsx)(_fa.FaArrowRight, null)), (0, _core.jsx)("button", {
    onClick: removeTable,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Delete Table');
    }
  }, (0, _core.jsx)(_fa.FaTrash, null)), (0, _core.jsx)("button", {
    onClick: deleteRow,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Delete Row');
    }
  }, (0, _core.jsx)(_fa.FaCaretUp, null)), (0, _core.jsx)("button", {
    onClick: deleteColumn,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Delete Column');
    }
  }, (0, _core.jsx)(_fa.FaCaretLeft, null)));
};

var _default = Toolbar;
exports.default = _default;
Toolbar.propTypes = {
  id: _propTypes.default.string,
  addTable: _propTypes.default.func,
  removeTable: _propTypes.default.func,
  insertRowAbove: _propTypes.default.func,
  insertRowBelow: _propTypes.default.func,
  deleteRow: _propTypes.default.func,
  insertColumnLeft: _propTypes.default.func,
  insertColumnRight: _propTypes.default.func,
  deleteColumn: _propTypes.default.func
};