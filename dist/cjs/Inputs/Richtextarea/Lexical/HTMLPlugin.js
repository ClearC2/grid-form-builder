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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _LexicalOnChangePlugin = require("@lexical/react/LexicalOnChangePlugin");

var _LexicalComposerContext = require("@lexical/react/LexicalComposerContext");

var _html = require("@lexical/html");

var _lexical = require("lexical");

var _focusContext = _interopRequireDefault(require("./focusContext"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

  var _useLexicalComposerCo = (0, _LexicalComposerContext.useLexicalComposerContext)(),
      _useLexicalComposerCo2 = (0, _slicedToArray2.default)(_useLexicalComposerCo, 1),
      editor = _useLexicalComposerCo2[0];

  var _useFocusContext = (0, _focusContext.default)(),
      setActiveElement = _useFocusContext.setActiveElement,
      focusActiveElement = _useFocusContext.focusActiveElement;

  (0, _react.useEffect)(function () {
    if (value !== cache && editor) {
      cache = value;
      editor.update(function () {
        var parser = new DOMParser();
        var dom = parser.parseFromString(value, 'text/html');
        var root = (0, _lexical.$getRoot)();
        root.clear();
        var nodes = (0, _html.$generateNodesFromDOM)(editor, dom) || [];
        setActiveElement();
        (0, _lexical.$insertNodes)(nodes); // this steals focus, even if this input isn't focused

        focusActiveElement();
      });
    }
  }, [editor, value, setActiveElement, focusActiveElement]);
  var onChange = (0, _react.useCallback)(function (editorState) {
    editorState.read(function () {
      onHtmlChanged((0, _html.$generateHtmlFromNodes)(editor));
    });
  }, [editor, onHtmlChanged]);
  return /*#__PURE__*/_react.default.createElement(_LexicalOnChangePlugin.OnChangePlugin, {
    onChange: onChange
  });
};

HTMLPlugin.propTypes = {
  value: _propTypes.default.string,
  onHtmlChanged: _propTypes.default.func
};
var _default = HTMLPlugin;
exports.default = _default;