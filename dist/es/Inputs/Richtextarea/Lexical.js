import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
var theme = {};

var onError = function onError(err) {
  console.error(err);
};

var LexicalRTE = function LexicalRTE() {
  var initialConfig = {
    namespace: 'MyEditor',
    theme: theme,
    onError: onError
  };
  return /*#__PURE__*/React.createElement(LexicalComposer, {
    initialConfig: initialConfig
  }, /*#__PURE__*/React.createElement(RichTextPlugin, {
    contentEditable: /*#__PURE__*/React.createElement(ContentEditable, null),
    placeholder: /*#__PURE__*/React.createElement("div", null, "Enter some text..."),
    ErrorBoundary: LexicalErrorBoundary
  }));
};

export default LexicalRTE;