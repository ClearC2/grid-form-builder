"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.ReactQuill = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _replaceAll = _interopRequireDefault(require("@babel/runtime-corejs3/core-js/instance/replace-all"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _quill = _interopRequireDefault(require("quill"));

require("quill/dist/quill.snow.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context2, _context3; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context2 = ownKeys(Object(source), !0)).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context3 = ownKeys(Object(source))).call(_context3, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ReactQuill = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ReactQuill, _Component);

  var _super = _createSuper(ReactQuill);

  function ReactQuill() {
    var _context;

    var _this;

    (0, _classCallCheck2.default)(this, ReactQuill);

    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, (0, _concat.default)(_context = [this]).call(_context, _args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "editor", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getEditor", function () {
      return _this.editor;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "createEditor", function () {
      var _this$props = _this.props,
          _this$props$theme = _this$props.theme,
          theme = _this$props$theme === void 0 ? 'snow' : _this$props$theme,
          _this$props$modules = _this$props.modules,
          modules = _this$props$modules === void 0 ? {} : _this$props$modules,
          name = _this$props.name;
      _this.editor = new _quill.default("#".concat(name), {
        theme: theme,
        modules: modules
      });

      _this.attachEventListeners();

      _this.setReadOnly();

      _this.setCurrentValueInEditor();
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "attachEventListeners", function () {
      if (!_this.editor) return;

      _this.editor.on('editor-change', _this.onEditorChange);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setReadOnly", function () {
      _this.editor.enable(!_this.props.readOnly);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onEditorChange", function (event) {
      if (event === 'text-change') {
        var _this2;

        for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        (_this2 = _this).onTextChange.apply(_this2, args);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "debounce", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onTextChange", function (delta, oldDelta, source) {
      if (source !== 'api') {
        clearTimeout(_this.debounce);
        _this.debounce = (0, _setTimeout2.default)(function () {
          var _this$editor, _this$editor$root, _this$editor2;

          var html = ((_this$editor = _this.editor) === null || _this$editor === void 0 ? void 0 : (_this$editor$root = _this$editor.root) === null || _this$editor$root === void 0 ? void 0 : _this$editor$root.innerHTML) || ((_this$editor2 = _this.editor) === null || _this$editor2 === void 0 ? void 0 : _this$editor2.getSemanticHTML()) || '';

          _this.props.onChange(html);
        }, 750);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "setCurrentValueInEditor", function () {
      var isFocused = _this.props.isFocused;
      var value = _this.props.value;
      if (!_this.editor || typeof value === 'undefined') return;
      var cursor = 0;

      if (isFocused) {
        cursor = _this.editor.getSelection(true) ? _this.editor.getSelection(true).index : 0;
      }

      if (typeof value === 'string') {
        value = (0, _replaceAll.default)(value).call(value, ' <', '&nbsp;<');
        value = (0, _replaceAll.default)(value).call(value, '  ', '&nbsp;&nbsp;'); // this fixes an issue where multiple spaces/trailing spaces in the markup are truncated - JRA 01/16/25

        if ((0, _indexOf.default)(value).call(value, '<html') > -1) {
          // this markup was generated by something else, Quill does not include the html tag - JRA 01/31/25
          value = (0, _replaceAll.default)(value).call(value, '<html', '<div'); // replace this reference so the user can use normal tables - JRA 01/31/25

          value = (0, _replaceAll.default)(value).call(value, '</html', '</div'); // replace this reference so the user can use normal tables - JRA 01/31/25

          value = (0, _replaceAll.default)(value).call(value, '<table', '<div');
          value = (0, _replaceAll.default)(value).call(value, '</table', '</div');
          value = (0, _replaceAll.default)(value).call(value, '<tbody', '<div style="display: flex; flex-direction: column;"');
          value = (0, _replaceAll.default)(value).call(value, '</tbody', '</div');
          value = (0, _replaceAll.default)(value).call(value, '<tr', '<div style="display: flex; flex-direction: row;"');
          value = (0, _replaceAll.default)(value).call(value, '</tr', '</div');
          value = (0, _replaceAll.default)(value).call(value, '<td', '<div style="display: flex; flex-direction: column;"');
          value = (0, _replaceAll.default)(value).call(value, '</td', '</div');
        }
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

  (0, _createClass2.default)(ReactQuill, [{
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
      var _this$props2 = this.props,
          name = _this$props2.name,
          onFocus = _this$props2.onFocus,
          onBlur = _this$props2.onBlur,
          _this$props2$css = _this$props2.css,
          css = _this$props2$css === void 0 ? {} : _this$props2$css,
          tabIndex = _this$props2.tabIndex,
          className = _this$props2.className;
      return /*#__PURE__*/_react.default.createElement("div", {
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
}(_react.Component);

exports.ReactQuill = ReactQuill;
(0, _defineProperty2.default)(ReactQuill, "propTypes", {
  name: _propTypes.default.string,
  theme: _propTypes.default.string,
  modules: _propTypes.default.object,
  formats: _propTypes.default.array,
  onChange: _propTypes.default.func,
  value: _propTypes.default.string,
  readOnly: _propTypes.default.bool,
  isFocused: _propTypes.default.bool,
  onFocus: _propTypes.default.func,
  onBlur: _propTypes.default.func,
  css: _propTypes.default.object,
  tabIndex: _propTypes.default.number,
  className: _propTypes.default.string
});
var _default = ReactQuill;
exports.default = _default;