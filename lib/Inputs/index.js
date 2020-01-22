'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponents = exports.mapInputType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.initCustomFormComponents = initCustomFormComponents;

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _utils = require('../utils');

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Colorpicker = require('./Colorpicker');

var _Colorpicker2 = _interopRequireDefault(_Colorpicker);

var _Currency = require('./Currency');

var _Currency2 = _interopRequireDefault(_Currency);

var _Date = require('./Date');

var _Email = require('./Email');

var _Email2 = _interopRequireDefault(_Email);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Input = require('./Input');

var _Input2 = _interopRequireDefault(_Input);

var _Listselect = require('./Listselect');

var _Listselect2 = _interopRequireDefault(_Listselect);

var _Metadata = require('./Metadata');

var _Metadata2 = _interopRequireDefault(_Metadata);

var _Multicheckbox = require('./Multicheckbox');

var _Multicheckbox2 = _interopRequireDefault(_Multicheckbox);

var _Multiselect = require('./Multiselect');

var _Multiselect2 = _interopRequireDefault(_Multiselect);

var _Number = require('./Number');

var _Number2 = _interopRequireDefault(_Number);

var _Percentage = require('./Percentage');

var _Percentage2 = _interopRequireDefault(_Percentage);

var _Phone = require('./Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _Radio = require('./Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Richtextarea = require('./Richtextarea');

var _Richtextarea2 = _interopRequireDefault(_Richtextarea);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Typeahead = require('./Typeahead');

var _Typeahead2 = _interopRequireDefault(_Typeahead);

var _ConditionalInput = require('./SearchComponents/ConditionalInput');

var _ConditionalInput2 = _interopRequireDefault(_ConditionalInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormComponents = {
  Checkbox: _Checkbox2.default,
  Colorpicker: _Colorpicker2.default,
  Currency: _Currency2.default,
  Date: _Date.Date,
  Datetime: _Date.Datetime,
  Email: _Email2.default,
  Header: _Header2.default,
  Icon: _Icon2.default,
  Input: _Input2.default,
  Listselect: _Listselect2.default,
  Metadata: _Metadata2.default,
  Multicheckbox: _Multicheckbox2.default,
  Multiselect: _Multiselect2.default,
  Number: _Number2.default,
  Percentage: _Percentage2.default,
  Phone: _Phone2.default,
  Radio: _Radio2.default,
  Richtextarea: _Richtextarea2.default,
  Select: _Select2.default,
  Textarea: _Textarea2.default,
  Time: _Date.Time,
  Typeahead: _Typeahead2.default,
  Conditionalinput: _ConditionalInput2.default
};

function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  exports.FormComponents = FormComponents = _extends({}, FormComponents, defs);
}

var mapInputType = exports.mapInputType = function mapInputType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'input';

  if (typeof type !== 'string') type = 'input';
  type = (0, _utils.uppercaseFirstLetter)(type);
  if (type.indexOf('Richtext') > -1) {
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

exports.FormComponents = FormComponents;
exports.default = _core2.default;