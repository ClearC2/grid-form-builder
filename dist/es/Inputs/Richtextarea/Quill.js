import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
export var ReactQuill = /*#__PURE__*/function (_Component) {
  _inherits(ReactQuill, _Component);

  var _super = _createSuper(ReactQuill);

  function ReactQuill() {
    var _context;

    var _this;

    _classCallCheck(this, ReactQuill);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, _concatInstanceProperty(_context = [this]).call(_context, _args));

    _defineProperty(_assertThisInitialized(_this), "editor", null);

    _defineProperty(_assertThisInitialized(_this), "getEditor", function () {
      return _this.editor;
    });

    _defineProperty(_assertThisInitialized(_this), "createEditor", function () {
      var _this$props = _this.props,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? 'snow' : _this$props$theme,
          _this$props$modules = _this$props.modules,
          modules = _this$props$modules === void 0 ? {} : _this$props$modules,
          name = _this$props.name;
      _this.editor = new Quill("#".concat(name), {
        theme: theme,
        scrollingContainer: 'div',
        modules: modules
      });

      _this.attachEventListeners();

      _this.setReadOnly();

      _this.setCurrentValueInEditor();
    });

    _defineProperty(_assertThisInitialized(_this), "attachEventListeners", function () {
      if (!_this.editor) return;

      _this.editor.on('editor-change', _this.onEditorChange);
    });

    _defineProperty(_assertThisInitialized(_this), "setReadOnly", function () {
      _this.editor.enable(!_this.props.readOnly);
    });

    _defineProperty(_assertThisInitialized(_this), "onEditorChange", function (event) {
      if (event === 'text-change') {
        var _this2;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_this2 = _this).onTextChange.apply(_this2, args);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "debounce", null);

    _defineProperty(_assertThisInitialized(_this), "onTextChange", function (delta, oldDelta, source) {
      if (source !== 'api') {
        clearTimeout(_this.debounce);
        _this.debounce = _setTimeout(function () {
          var _this$editor, _this$editor$root, _this$editor2;

          var html = ((_this$editor = _this.editor) === null || _this$editor === void 0 ? void 0 : (_this$editor$root = _this$editor.root) === null || _this$editor$root === void 0 ? void 0 : _this$editor$root.innerHTML) || ((_this$editor2 = _this.editor) === null || _this$editor2 === void 0 ? void 0 : _this$editor2.getSemanticHTML()) || '';

          _this.props.onChange(html);
        }, 750);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "setCurrentValueInEditor", function () {
      var _this$props2 = _this.props,
          value = _this$props2.value,
          isFocused = _this$props2.isFocused;
      if (!_this.editor || typeof value === 'undefined') return;
      var cursor = 0;

      if (isFocused && _this.editor.getSelection(true)) {
        cursor = _this.editor.getSelection(true).index; // do not poll the selection if the input is not focused because it will scroll the element into view when you don't want it to - JRA 01/13/25
      }

      _this.editor.clipboard.dangerouslyPasteHTML(value);

      if (isFocused) {
        _this.editor.setSelection(cursor);
      } else {
        _this.editor.blur();
      }
    });

    return _this;
  }

  _createClass(ReactQuill, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(p) {
      if (this.props.value !== p.value) {
        this.setCurrentValueInEditor();
      }

      if (this.props.readOnly !== p.readOnly) {
        this.setReadOnly();
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setCurrentValueInEditor();
      this.createEditor();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          name = _this$props3.name,
          onFocus = _this$props3.onFocus,
          onBlur = _this$props3.onBlur,
          _this$props3$css = _this$props3.css,
          css = _this$props3$css === void 0 ? {} : _this$props3$css,
          tabIndex = _this$props3.tabIndex,
          className = _this$props3.className;
      return /*#__PURE__*/React.createElement("div", {
        id: name,
        className: className,
        style: _objectSpread({
          width: '100%'
        }, css),
        onFocus: onFocus,
        onBlur: onBlur,
        tabIndex: tabIndex
      });
    }
  }]);

  return ReactQuill;
}(Component);

_defineProperty(ReactQuill, "propTypes", {
  name: PropTypes.string,
  theme: PropTypes.string,
  modules: PropTypes.object,
  formats: PropTypes.array,
  onChange: PropTypes.func,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  isFocused: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  css: PropTypes.object,
  tabIndex: PropTypes.number,
  className: PropTypes.string
});

export default ReactQuill;