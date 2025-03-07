import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $generateHtmlFromNodes, $generateNodesFromDOM } from '@lexical/html';
import { $insertNodes, $getRoot } from 'lexical';
import useFocusContext from './focusContext';
var _window = window,
    DOMParser = _window.DOMParser;
var cache = null;

var HTMLPlugin = function HTMLPlugin(_ref) {
  var _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      _ref$onHtmlChanged = _ref.onHtmlChanged,
      onHtmlChanged = _ref$onHtmlChanged === void 0 ? function () {
    return null;
  } : _ref$onHtmlChanged;

  var _useLexicalComposerCo = useLexicalComposerContext(),
      _useLexicalComposerCo2 = _slicedToArray(_useLexicalComposerCo, 1),
      editor = _useLexicalComposerCo2[0];

  var _useFocusContext = useFocusContext(),
      setActiveElement = _useFocusContext.setActiveElement,
      focusActiveElement = _useFocusContext.focusActiveElement;

  useEffect(function () {
    if (value !== cache && editor) {
      cache = value;
      editor.update(function () {
        var parser = new DOMParser();
        var dom = parser.parseFromString(value, 'text/html');
        var root = $getRoot();
        root.clear();
        var nodes = $generateNodesFromDOM(editor, dom) || [];
        setActiveElement();
        $insertNodes(nodes); // this steals focus, even if this input isn't focused

        focusActiveElement();
      });
    }
  }, [editor, value, setActiveElement, focusActiveElement]);
  var onChange = useCallback(function (editorState) {
    editorState.read(function () {
      onHtmlChanged($generateHtmlFromNodes(editor));
    });
  }, [editor, onHtmlChanged]);
  return /*#__PURE__*/React.createElement(OnChangePlugin, {
    onChange: onChange
  });
};

HTMLPlugin.propTypes = {
  value: PropTypes.string,
  onHtmlChanged: PropTypes.func
};
export default HTMLPlugin;