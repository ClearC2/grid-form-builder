import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import Core from './core';
import { uppercaseFirstLetter } from '../utils';
import Checkbox from './Checkbox';
import Colorpicker from './Colorpicker';
import Currency from './Currency';
import { Date, Datetime, Time } from './Date';
import Email from './Email';
import Header from './Header';
import Icon from './Icon';
import Input from './Input';
import Listselect from './Listselect';
import Metadata from './Metadata';
import Multicheckbox from './Multicheckbox';
import Multiselect from './Multiselect';
import Number from './Number';
import Percentage from './Percentage';
import Phone from './Phone';
import Radio from './Radio';
import Richtextarea from './Richtextarea';
import Select from './Select';
import Textarea from './Textarea';
import Typeahead from './Typeahead';
import Conditionalinput from './ConditionalInput';
var FormComponents = {
  Checkbox: Checkbox,
  Colorpicker: Colorpicker,
  Currency: Currency,
  Date: Date,
  Datetime: Datetime,
  Email: Email,
  Header: Header,
  Icon: Icon,
  Input: Input,
  Listselect: Listselect,
  Metadata: Metadata,
  Multicheckbox: Multicheckbox,
  Multiselect: Multiselect,
  Number: Number,
  Percentage: Percentage,
  Phone: Phone,
  Radio: Radio,
  Richtextarea: Richtextarea,
  Select: Select,
  Textarea: Textarea,
  Time: Time,
  Typeahead: Typeahead,
  Conditionalinput: Conditionalinput
};
export function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  FormComponents = _objectSpread({}, FormComponents, {}, defs);
}
export var mapInputType = function mapInputType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input';
  if (typeof type !== 'string') type = 'input';
  type = uppercaseFirstLetter(type);

  if (_indexOfInstanceProperty(type).call(type, 'Richtext') > -1) {
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
export { FormComponents };
var _default = Core;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(FormComponents, "FormComponents", "/Users/davidadams/code/grid-form-builder/src/Inputs/index.js");
  reactHotLoader.register(initCustomFormComponents, "initCustomFormComponents", "/Users/davidadams/code/grid-form-builder/src/Inputs/index.js");
  reactHotLoader.register(mapInputType, "mapInputType", "/Users/davidadams/code/grid-form-builder/src/Inputs/index.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/Inputs/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();