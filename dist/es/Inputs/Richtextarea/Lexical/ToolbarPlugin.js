import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND } from 'lexical';
var LowPriority = 1;

var Divider = function Divider() {
  return /*#__PURE__*/React.createElement("div", {
    className: "divider"
  });
};

var ToolbarPlugin = function ToolbarPlugin() {
  var _useLexicalComposerCo = useLexicalComposerContext(),
      _useLexicalComposerCo2 = _slicedToArray(_useLexicalComposerCo, 1),
      editor = _useLexicalComposerCo2[0];

  var toolbarRef = useRef(null);

  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      canUndo = _useState2[0],
      setCanUndo = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      canRedo = _useState4[0],
      setCanRedo = _useState4[1];

  var _useState5 = useState(false),
      _useState6 = _slicedToArray(_useState5, 2),
      isBold = _useState6[0],
      setIsBold = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isItalic = _useState8[0],
      setIsItalic = _useState8[1];

  var _useState9 = useState(false),
      _useState10 = _slicedToArray(_useState9, 2),
      isUnderline = _useState10[0],
      setIsUnderline = _useState10[1];

  var _useState11 = useState(false),
      _useState12 = _slicedToArray(_useState11, 2),
      isStrikethrough = _useState12[0],
      setIsStrikethrough = _useState12[1];

  var $updateToolbar = useCallback(function () {
    var selection = $getSelection();

    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);
  useEffect(function () {
    return mergeRegister(editor.registerUpdateListener(function (_ref) {
      var editorState = _ref.editorState;
      editorState.read(function () {
        $updateToolbar();
      });
    }), editor.registerCommand(SELECTION_CHANGE_COMMAND, function (_payload, _newEditor) {
      $updateToolbar();
      return false;
    }, LowPriority), editor.registerCommand(CAN_UNDO_COMMAND, function (payload) {
      setCanUndo(payload);
      return false;
    }, LowPriority), editor.registerCommand(CAN_REDO_COMMAND, function (payload) {
      setCanRedo(payload);
      return false;
    }, LowPriority));
  }, [editor, $updateToolbar]);
  return /*#__PURE__*/React.createElement("div", {
    className: "toolbar",
    ref: toolbarRef
  }, /*#__PURE__*/React.createElement("button", {
    disabled: !canUndo,
    onClick: function onClick() {
      editor.dispatchCommand(UNDO_COMMAND, undefined);
    },
    className: "toolbar-item spaced",
    "aria-label": "Undo"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format undo"
  })), /*#__PURE__*/React.createElement("button", {
    disabled: !canRedo,
    onClick: function onClick() {
      editor.dispatchCommand(REDO_COMMAND, undefined);
    },
    className: "toolbar-item",
    "aria-label": "Redo"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format redo"
  })), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
    },
    className: 'toolbar-item spaced ' + (isBold ? 'active' : ''),
    "aria-label": "Format Bold"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format bold"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
    },
    className: 'toolbar-item spaced ' + (isItalic ? 'active' : ''),
    "aria-label": "Format Italics"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format italic"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
    },
    className: 'toolbar-item spaced ' + (isUnderline ? 'active' : ''),
    "aria-label": "Format Underline"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format underline"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
    },
    className: 'toolbar-item spaced ' + (isStrikethrough ? 'active' : ''),
    "aria-label": "Format Strikethrough"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format strikethrough"
  })), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
    },
    className: "toolbar-item spaced",
    "aria-label": "Left Align"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format left-align"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
    },
    className: "toolbar-item spaced",
    "aria-label": "Center Align"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format center-align"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
    },
    className: "toolbar-item spaced",
    "aria-label": "Right Align"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format right-align"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
    },
    className: "toolbar-item",
    "aria-label": "Justify Align"
  }, /*#__PURE__*/React.createElement("i", {
    className: "format justify-align"
  })), ' ');
};

export default ToolbarPlugin;