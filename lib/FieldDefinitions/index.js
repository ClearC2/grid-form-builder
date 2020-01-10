'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormComponents = exports.mapInputType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.initCustomFormComponents = initCustomFormComponents;

var _Checkbox = require('./Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

var _Conditionalinput = require('./Conditionalinput');

var _Conditionalinput2 = _interopRequireDefault(_Conditionalinput);

var _Currency = require('./Currency');

var _Currency2 = _interopRequireDefault(_Currency);

var _Date = require('./Date');

var _Date2 = _interopRequireDefault(_Date);

var _Datetime = require('./Datetime');

var _Datetime2 = _interopRequireDefault(_Datetime);

var _Email = require('./Email');

var _Email2 = _interopRequireDefault(_Email);

var _Header = require('./Header');

var _Header2 = _interopRequireDefault(_Header);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _ImportSelect = require('./ImportSelect');

var _ImportSelect2 = _interopRequireDefault(_ImportSelect);

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

var _Richtextareaquill = require('./Richtextareaquill');

var _Richtextareaquill2 = _interopRequireDefault(_Richtextareaquill);

var _Select = require('./Select');

var _Select2 = _interopRequireDefault(_Select);

var _Textarea = require('./Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Time = require('./Time/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Total = require('./Total');

var _Total2 = _interopRequireDefault(_Total);

var _Typeahead = require('./Typeahead');

var _Typeahead2 = _interopRequireDefault(_Typeahead);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormComponents = {
  Checkbox: _Checkbox2.default,
  Colorpicker: _ColorPicker2.default,
  Conditionalinput: _Conditionalinput2.default,
  Currency: _Currency2.default,
  Date: _Date2.default,
  Datetime: _Datetime2.default,
  Email: _Email2.default,
  Header: _Header2.default,
  Icon: _Icon2.default,
  ImportSelect: _ImportSelect2.default,
  Input: _Input2.default,
  Listselect: _Listselect2.default,
  Metadata: _Metadata2.default,
  Multicheckbox: _Multicheckbox2.default,
  Multiselect: _Multiselect2.default,
  Number: _Number2.default,
  Percentage: _Percentage2.default,
  Phone: _Phone2.default,
  Radio: _Radio2.default,
  Richtextareaquill: _Richtextareaquill2.default,
  Select: _Select2.default,
  Textarea: _Textarea2.default,
  Time: _Time2.default,
  Total: _Total2.default,
  Typeahead: _Typeahead2.default
};

function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  exports.FormComponents = FormComponents = _extends({}, FormComponents, defs);
}

var mapInputType = exports.mapInputType = function mapInputType(type) {
  if (typeof type !== 'string') return null;
  type = (0, _utils.uppercaseFirstLetter)(type);
  if (_utils.isMobile && type === 'Time') {
    type = 'Input';
  }
  type = FormComponents[type] || null;
  return type;
};

exports.FormComponents = FormComponents;