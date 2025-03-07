"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _LexicalComposerContext = require("@lexical/react/LexicalComposerContext");

var _utils = require("@lexical/utils");

var _lexical = require("lexical");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var LowPriority = 1;

var Divider = function Divider() {
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "divider"
  });
};

var ToolbarPlugin = function ToolbarPlugin() {
  var _useLexicalComposerCo = (0, _LexicalComposerContext.useLexicalComposerContext)(),
      _useLexicalComposerCo2 = (0, _slicedToArray2.default)(_useLexicalComposerCo, 1),
      editor = _useLexicalComposerCo2[0];

  var toolbarRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      canUndo = _useState2[0],
      setCanUndo = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      canRedo = _useState4[0],
      setCanRedo = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isBold = _useState6[0],
      setIsBold = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isItalic = _useState8[0],
      setIsItalic = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      isUnderline = _useState10[0],
      setIsUnderline = _useState10[1];

  var _useState11 = (0, _react.useState)(false),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      isStrikethrough = _useState12[0],
      setIsStrikethrough = _useState12[1];

  var $updateToolbar = (0, _react.useCallback)(function () {
    var selection = (0, _lexical.$getSelection)();

    if ((0, _lexical.$isRangeSelection)(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);
  (0, _react.useEffect)(function () {
    return (0, _utils.mergeRegister)(editor.registerUpdateListener(function (_ref) {
      var editorState = _ref.editorState;
      editorState.read(function () {
        $updateToolbar();
      });
    }), editor.registerCommand(_lexical.SELECTION_CHANGE_COMMAND, function (_payload, _newEditor) {
      $updateToolbar();
      return false;
    }, LowPriority), editor.registerCommand(_lexical.CAN_UNDO_COMMAND, function (payload) {
      setCanUndo(payload);
      return false;
    }, LowPriority), editor.registerCommand(_lexical.CAN_REDO_COMMAND, function (payload) {
      setCanRedo(payload);
      return false;
    }, LowPriority));
  }, [editor, $updateToolbar]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "toolbar",
    ref: toolbarRef
  }, /*#__PURE__*/_react.default.createElement("button", {
    disabled: !canUndo,
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.UNDO_COMMAND, undefined);
    },
    className: "toolbar-item spaced",
    "aria-label": "Undo"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format undo"
  })), /*#__PURE__*/_react.default.createElement("button", {
    disabled: !canRedo,
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.REDO_COMMAND, undefined);
    },
    className: "toolbar-item",
    "aria-label": "Redo"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format redo"
  })), /*#__PURE__*/_react.default.createElement(Divider, null), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_TEXT_COMMAND, 'bold');
    },
    className: 'toolbar-item spaced ' + (isBold ? 'active' : ''),
    "aria-label": "Format Bold"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format bold"
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_TEXT_COMMAND, 'italic');
    },
    className: 'toolbar-item spaced ' + (isItalic ? 'active' : ''),
    "aria-label": "Format Italics"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format italic"
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_TEXT_COMMAND, 'underline');
    },
    className: 'toolbar-item spaced ' + (isUnderline ? 'active' : ''),
    "aria-label": "Format Underline"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format underline"
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_TEXT_COMMAND, 'strikethrough');
    },
    className: 'toolbar-item spaced ' + (isStrikethrough ? 'active' : ''),
    "aria-label": "Format Strikethrough"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format strikethrough"
  })), /*#__PURE__*/_react.default.createElement(Divider, null), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_ELEMENT_COMMAND, 'left');
    },
    className: "toolbar-item spaced",
    "aria-label": "Left Align"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format left-align"
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_ELEMENT_COMMAND, 'center');
    },
    className: "toolbar-item spaced",
    "aria-label": "Center Align"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format center-align"
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_ELEMENT_COMMAND, 'right');
    },
    className: "toolbar-item spaced",
    "aria-label": "Right Align"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format right-align"
  })), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      editor.dispatchCommand(_lexical.FORMAT_ELEMENT_COMMAND, 'justify');
    },
    className: "toolbar-item",
    "aria-label": "Justify Align"
  }, /*#__PURE__*/_react.default.createElement("i", {
    className: "format justify-align"
  })), ' ');
};

var _default = ToolbarPlugin;
exports.default = _default;