/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import HTMLPlugin from './HTMLPlugin';
import ToolbarPlugin from './ToolbarPlugin';
import theme from './theme';
import '../../../styles/rich-text-editor.css';
var LexicalRTE = /*#__PURE__*/forwardRef(function (props, ref) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {
    return null;
  } : _props$onChange;
  var onError = useCallback(function (e) {
    console.error(e); //eslint-disable-line
  }, []);
  var initialConfig = {
    namespace: name,
    nodes: [TableNode, TableCellNode, TableRowNode],
    theme: theme,
    onError: onError
  };
  return jsx(LexicalComposer, {
    initialConfig: initialConfig
  }, jsx(ToolbarPlugin, null), jsx(RichTextPlugin, {
    contentEditable: jsx("div", {
      className: "lexical-rte-parent"
    }, jsx(ContentEditable, {
      className: "lexical-rte-content-editable"
    })),
    ErrorBoundary: LexicalErrorBoundary
  }), jsx(HTMLPlugin, {
    onHtmlChanged: onChange,
    value: value
  }), jsx(TablePlugin, null));
});
LexicalRTE.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  format: PropTypes.string,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string
};
export default LexicalRTE;