import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { BLUR_COMMAND, FOCUS_COMMAND, COMMAND_PRIORITY_LOW } from 'lexical';

var FocusPlugin = function FocusPlugin(_ref) {
  var _ref$onFocus = _ref.onFocus,
      onFocus = _ref$onFocus === void 0 ? function () {
    return null;
  } : _ref$onFocus,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? function () {
    return null;
  } : _ref$onBlur;

  var _useLexicalComposerCo = useLexicalComposerContext(),
      _useLexicalComposerCo2 = _slicedToArray(_useLexicalComposerCo, 1),
      editor = _useLexicalComposerCo2[0];

  useEffect(function () {
    return editor.registerCommand(BLUR_COMMAND, function () {
      onBlur();
      return false;
    }, COMMAND_PRIORITY_LOW);
  }, [editor, onBlur]);
  useEffect(function () {
    return editor.registerCommand(FOCUS_COMMAND, function () {
      onFocus();
      return false;
    }, COMMAND_PRIORITY_LOW);
  }, [editor, onFocus]);
  return null;
};

FocusPlugin.propTypes = {
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};
export default FocusPlugin;