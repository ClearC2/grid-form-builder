"use strict";

var _Object$keys = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.FormComponents = void 0;
exports.initCustomFormComponents = initCustomFormComponents;
exports.mapInputType = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _core = _interopRequireDefault(require("./core"));

var _utils = require("../utils");

var _Checkbox = _interopRequireDefault(require("./Checkbox"));

var _Colorpicker = _interopRequireDefault(require("./Colorpicker"));

var _Currency = _interopRequireDefault(require("./Currency"));

var _Date = require("./Date");

var _Email = _interopRequireDefault(require("./Email"));

var _Header = _interopRequireDefault(require("./Header"));

var _Icon = _interopRequireDefault(require("./Icon"));

var _Input = _interopRequireDefault(require("./Input"));

var _Listselect = _interopRequireDefault(require("./Listselect"));

var _Metadata = _interopRequireDefault(require("./Metadata"));

var _Multicheckbox = _interopRequireDefault(require("./Multicheckbox"));

var _Multiselect = _interopRequireDefault(require("./Multiselect"));

var _Number = _interopRequireDefault(require("./Number"));

var _Percentage = _interopRequireDefault(require("./Percentage"));

var _Phone = _interopRequireDefault(require("./Phone"));

var _Radio = _interopRequireDefault(require("./Radio"));

var _Richtextarea = _interopRequireDefault(require("./Richtextarea"));

var _Select = _interopRequireDefault(require("./Select"));

var _Textarea = _interopRequireDefault(require("./Textarea"));

var _Typeahead = _interopRequireDefault(require("./Typeahead"));

var _ConditionalInput = _interopRequireDefault(require("./ConditionalInput"));

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var FormComponents = {
  Checkbox: _Checkbox.default,
  Colorpicker: _Colorpicker.default,
  Currency: _Currency.default,
  Date: _Date.Date,
  Datetime: _Date.Datetime,
  Email: _Email.default,
  Header: _Header.default,
  Icon: _Icon.default,
  Input: _Input.default,
  Listselect: _Listselect.default,
  Metadata: _Metadata.default,
  Month: _Date.Month,
  Monthday: _Date.Monthday,
  Multicheckbox: _Multicheckbox.default,
  Multiselect: _Multiselect.default,
  Number: _Number.default,
  Percentage: _Percentage.default,
  Phone: _Phone.default,
  Radio: _Radio.default,
  Richtextarea: _Richtextarea.default,
  Select: _Select.default,
  Textarea: _Textarea.default,
  Time: _Date.Time,
  Typeahead: _Typeahead.default,
  Conditionalinput: _ConditionalInput.default
};
exports.FormComponents = FormComponents;

function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  exports.FormComponents = FormComponents = _objectSpread(_objectSpread({}, FormComponents), defs);
}

var mapInputType = function mapInputType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input';
  if (typeof type !== 'string') type = 'input';
  type = (0, _utils.uppercaseFirstLetter)(type);

  if ((0, _indexOf.default)(type).call(type, 'Richtext') > -1) {
    type = 'Richtextarea';
  }

  if (FormComponents[type]) {
    type = FormComponents[type];
  } else {
    // console.warn(type, 'is not a valid field type. This is a noop and the field type will fall back to a normal input.') //eslint-disable-line
    type = FormComponents.Input;
  }

  return type;
};

exports.mapInputType = mapInputType;
var _default = _core.default;
exports.default = _default;