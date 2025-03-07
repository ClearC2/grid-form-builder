"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _LexicalComposer = require("@lexical/react/LexicalComposer");

var _LexicalRichTextPlugin = require("@lexical/react/LexicalRichTextPlugin");

var _LexicalContentEditable = require("@lexical/react/LexicalContentEditable");

var _LexicalErrorBoundary = require("@lexical/react/LexicalErrorBoundary");

var _LexicalTablePlugin = require("@lexical/react/LexicalTablePlugin");

var _table = require("@lexical/table");

var _HTMLPlugin = _interopRequireDefault(require("./HTMLPlugin"));

var _ToolbarPlugin = _interopRequireDefault(require("./ToolbarPlugin"));

var _theme = _interopRequireDefault(require("./theme"));

require("../../../styles/rich-text-editor.css");

/** @jsx jsx */
var LexicalRTE = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var name = props.name,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      _props$onChange = props.onChange,
      onChange = _props$onChange === void 0 ? function () {
    return null;
  } : _props$onChange;
  var onError = (0, _react.useCallback)(function (e) {
    console.error(e); //eslint-disable-line
  }, []);
  var initialConfig = {
    namespace: name,
    nodes: [_table.TableNode, _table.TableCellNode, _table.TableRowNode],
    theme: _theme.default,
    onError: onError
  };
  return (0, _core.jsx)(_LexicalComposer.LexicalComposer, {
    initialConfig: initialConfig
  }, (0, _core.jsx)(_ToolbarPlugin.default, null), (0, _core.jsx)(_LexicalRichTextPlugin.RichTextPlugin, {
    contentEditable: (0, _core.jsx)("div", {
      className: "lexical-rte-parent"
    }, (0, _core.jsx)(_LexicalContentEditable.ContentEditable, {
      className: "lexical-rte-content-editable"
    })),
    ErrorBoundary: _LexicalErrorBoundary.LexicalErrorBoundary
  }), (0, _core.jsx)(_HTMLPlugin.default, {
    onHtmlChanged: onChange,
    value: value
  }), (0, _core.jsx)(_LexicalTablePlugin.TablePlugin, null));
});
LexicalRTE.propTypes = {
  onChange: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  name: _propTypes.default.string,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  required: _propTypes.default.bool,
  format: _propTypes.default.string,
  maxlength: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  warning: _propTypes.default.string
};
var _default = LexicalRTE;
exports.default = _default;