import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import Core from './core';
import { uppercaseFirstLetter } from '../utils';
import Checkbox from './Checkbox';
import Colorpicker from './Colorpicker';
import Currency from './Currency';
import { Date, Datetime, Time, Month, Monthday } from './Date';
import Email from './Email';
import Header from './Header';
import Html from './HTML';
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
  Html: Html,
  Icon: Icon,
  Input: Input,
  Listselect: Listselect,
  Metadata: Metadata,
  Month: Month,
  Monthday: Monthday,
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
  FormComponents = _objectSpread(_objectSpread({}, FormComponents), defs);
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
export default Core;