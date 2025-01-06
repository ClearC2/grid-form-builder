import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

/** @jsx jsx */
import { jsx } from '@emotion/core';
import PropTypes from 'prop-types';
import { FaImage as Image, FaTable as Table, FaArrowUp as Up, FaArrowDown as Down, FaArrowLeft as Left, FaArrowRight as Right, FaTrash as Delete, FaCaretLeft as DeleteColumn, FaCaretUp as DeleteRow } from 'react-icons/fa';
import { useRef, useState } from 'react';
import { randomId } from '../../utils';
import PortalTooltip from '../../Tooltip';

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
  var tooltipId = useRef('gfb-' + randomId());

  var _useState = useState('Table Controls'),
      _useState2 = _slicedToArray(_useState, 2),
      message = _useState2[0],
      setMessage = _useState2[1];

  return jsx("div", {
    id: id,
    style: {
      backgroundColor: '#fafafa',
      display: 'flex'
    }
  }, jsx(PortalTooltip, {
    id: tooltipId.current,
    message: message
  }), jsx("select", {
    className: "ql-header",
    defaultValue: 'normal',
    onChange: function onChange(e) {
      return e.persist();
    }
  }, jsx("option", {
    value: "1"
  }), jsx("option", {
    value: "2"
  }), jsx("option", {
    value: "3"
  }), jsx("option", {
    value: "normal"
  })), jsx("button", {
    className: "ql-bold"
  }), jsx("button", {
    className: "ql-italic"
  }), jsx("button", {
    className: "ql-underline"
  }), jsx("button", {
    className: "ql-strike"
  }), jsx("select", {
    className: "ql-color"
  }), jsx("select", {
    className: "ql-background"
  }), jsx("button", {
    className: "ql-link"
  }), jsx("button", {
    className: "ql-list",
    value: "bullet"
  }), jsx("button", {
    className: "ql-list",
    value: "ordered"
  }), jsx("button", {
    className: "ql-blockquote"
  }), jsx("button", {
    className: "ql-insertImage"
  }, jsx(Image, null)), jsx("button", {
    onClick: addTable,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Add Table');
    }
  }, jsx(Table, null)), jsx("button", {
    onClick: insertRowAbove,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Row Above Cursor');
    }
  }, jsx(Up, null)), jsx("button", {
    onClick: insertRowBelow,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Row Below Cursor');
    }
  }, jsx(Down, null)), jsx("button", {
    onClick: insertColumnLeft,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Column Left Of Cursor');
    }
  }, jsx(Left, null)), jsx("button", {
    onClick: insertColumnRight,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Insert Column Right Of Cursor');
    }
  }, jsx(Right, null)), jsx("button", {
    onClick: removeTable,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Delete Table');
    }
  }, jsx(Delete, null)), jsx("button", {
    onClick: deleteRow,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Delete Row');
    }
  }, jsx(DeleteRow, null)), jsx("button", {
    onClick: deleteColumn,
    "data-tip": true,
    "data-for": tooltipId.current,
    onMouseOver: function onMouseOver() {
      return setMessage('Delete Column');
    }
  }, jsx(DeleteColumn, null)));
};

export default Toolbar;
Toolbar.propTypes = {
  id: PropTypes.string,
  addTable: PropTypes.func,
  removeTable: PropTypes.func,
  insertRowAbove: PropTypes.func,
  insertRowBelow: PropTypes.func,
  deleteRow: PropTypes.func,
  insertColumnLeft: PropTypes.func,
  insertColumnRight: PropTypes.func,
  deleteColumn: PropTypes.func
};