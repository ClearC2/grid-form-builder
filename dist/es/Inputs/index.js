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
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
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
let FormComponents = {
  Checkbox,
  Colorpicker,
  Currency,
  Date,
  Datetime,
  Email,
  Header,
  Html,
  Icon,
  Input,
  Listselect,
  Metadata,
  Month,
  Monthday,
  Multicheckbox,
  Multiselect,
  Number,
  Percentage,
  Phone,
  Radio,
  Richtextarea,
  Select,
  Textarea,
  Time,
  Typeahead,
  Conditionalinput
};
export function initCustomFormComponents() {
  let defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  FormComponents = _objectSpread(_objectSpread({}, FormComponents), defs);
}
export const mapInputType = function () {
  let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input';
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