"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _LexicalComposerContext = require("@lexical/react/LexicalComposerContext");

var _lexical = require("lexical");

var FocusPlugin = function FocusPlugin(_ref) {
  var _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? function () {
    return null;
  } : _ref$onFocus,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? function () {
    return null;
  } : _ref$onBlur;

  var _useLexicalComposerCo = (0, _LexicalComposerContext.useLexicalComposerContext)(),
      _useLexicalComposerCo2 = (0, _slicedToArray2.default)(_useLexicalComposerCo, 1),
      editor = _useLexicalComposerCo2[0];

  (0, _react.useEffect)(function () {
    return editor.registerCommand(_lexical.BLUR_COMMAND, function () {
      onBlur();
      return false;
    }, _lexical.COMMAND_PRIORITY_LOW);
  }, [editor, onBlur]);
  (0, _react.useEffect)(function () {
    return editor.registerCommand(_lexical.FOCUS_COMMAND, function () {
      onFocus();
      return false;
    }, _lexical.COMMAND_PRIORITY_LOW);
  }, [editor, onFocus]);
  return null;
};

FocusPlugin.propTypes = {
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func
};
var _default = FocusPlugin;
exports.default = _default;