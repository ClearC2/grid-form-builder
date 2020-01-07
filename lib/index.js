'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reducer = exports.updateFormValues = exports.initCustomFormComponents = exports.initComponentIconLibrary = exports.buildDefaultColumnsFromQuery = exports.buildAvailableColumnsFromFieldDefs = exports.ReportBuilder = exports.convertQueryToFormValues = exports.ConditionalTable = exports.FormBuilder = exports.Portal = exports.Total = exports.Percentage = exports.Time = exports.Textarea = exports.Select = exports.RichtextareaQuill = exports.Radio = exports.Phone = exports.Number = exports.Multiselect = exports.Multicheckbox = exports.Listselect = exports.Input = exports.Email = exports.Datetime = exports.Date = exports.Currency = exports.Checkbox = exports.Typeahead = exports.TEXT_INPUTS = exports.CONDITIONS = exports.Conditionalinput = exports.initFormBuilderAjax = exports.FormDroppable = undefined;

var _FormDroppable = require('./FormDroppable');

Object.defineProperty(exports, 'FormDroppable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormDroppable).default;
  }
});

var _config = require('./config');

Object.defineProperty(exports, 'initFormBuilderAjax', {
  enumerable: true,
  get: function get() {
    return _config.initFormBuilderAjax;
  }
});

var _Conditionalinput = require('./FieldDefinitions/Conditionalinput');

Object.defineProperty(exports, 'Conditionalinput', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Conditionalinput).default;
  }
});
Object.defineProperty(exports, 'CONDITIONS', {
  enumerable: true,
  get: function get() {
    return _Conditionalinput.CONDITIONS;
  }
});
Object.defineProperty(exports, 'TEXT_INPUTS', {
  enumerable: true,
  get: function get() {
    return _Conditionalinput.TEXT_INPUTS;
  }
});

var _Typeahead = require('./Inputs/Typeahead');

Object.defineProperty(exports, 'Typeahead', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Typeahead).default;
  }
});

var _Checkbox = require('./FieldDefinitions/Checkbox');

Object.defineProperty(exports, 'Checkbox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Checkbox).default;
  }
});

var _Currency = require('./FieldDefinitions/Currency');

Object.defineProperty(exports, 'Currency', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Currency).default;
  }
});

var _Date = require('./FieldDefinitions/Date');

Object.defineProperty(exports, 'Date', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Date).default;
  }
});

var _Datetime = require('./FieldDefinitions/Datetime');

Object.defineProperty(exports, 'Datetime', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Datetime).default;
  }
});

var _Email = require('./FieldDefinitions/Email');

Object.defineProperty(exports, 'Email', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Email).default;
  }
});

var _Input = require('./FieldDefinitions/Input');

Object.defineProperty(exports, 'Input', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Input).default;
  }
});

var _Listselect = require('./FieldDefinitions/Listselect');

Object.defineProperty(exports, 'Listselect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Listselect).default;
  }
});

var _Multicheckbox = require('./FieldDefinitions/Multicheckbox');

Object.defineProperty(exports, 'Multicheckbox', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Multicheckbox).default;
  }
});

var _Multiselect = require('./FieldDefinitions/Multiselect');

Object.defineProperty(exports, 'Multiselect', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Multiselect).default;
  }
});

var _Number = require('./FieldDefinitions/Number');

Object.defineProperty(exports, 'Number', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Number).default;
  }
});

var _Phone = require('./FieldDefinitions/Phone');

Object.defineProperty(exports, 'Phone', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Phone).default;
  }
});

var _Radio = require('./FieldDefinitions/Radio');

Object.defineProperty(exports, 'Radio', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Radio).default;
  }
});

var _Richtextareaquill = require('./FieldDefinitions/Richtextareaquill');

Object.defineProperty(exports, 'RichtextareaQuill', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Richtextareaquill).default;
  }
});

var _Select = require('./FieldDefinitions/Select');

Object.defineProperty(exports, 'Select', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Select).default;
  }
});

var _Textarea = require('./FieldDefinitions/Textarea');

Object.defineProperty(exports, 'Textarea', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Textarea).default;
  }
});

var _Time = require('./FieldDefinitions/Time/Time');

Object.defineProperty(exports, 'Time', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Time).default;
  }
});

var _Percentage = require('./FieldDefinitions/Percentage');

Object.defineProperty(exports, 'Percentage', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Percentage).default;
  }
});

var _Total = require('./FieldDefinitions/Total');

Object.defineProperty(exports, 'Total', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Total).default;
  }
});

var _Portal = require('./FieldDefinitions/Portal');

Object.defineProperty(exports, 'Portal', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Portal).default;
  }
});

var _FormBuilder = require('./FormBuilder');

Object.defineProperty(exports, 'FormBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormBuilder).default;
  }
});

var _ConditionalTableContainer = require('./QueryBuilder/Where/ConditionalTable/ConditionalTableContainer');

Object.defineProperty(exports, 'ConditionalTable', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ConditionalTableContainer).default;
  }
});
Object.defineProperty(exports, 'convertQueryToFormValues', {
  enumerable: true,
  get: function get() {
    return _ConditionalTableContainer.convertQueryToFormValues;
  }
});

var _ReportBuilder = require('./QueryBuilder/ReportBuilder/ReportBuilder');

Object.defineProperty(exports, 'ReportBuilder', {
  enumerable: true,
  get: function get() {
    return _ReportBuilder.ReportBuilder;
  }
});
Object.defineProperty(exports, 'buildAvailableColumnsFromFieldDefs', {
  enumerable: true,
  get: function get() {
    return _ReportBuilder.buildAvailableColumnsFromFieldDefs;
  }
});
Object.defineProperty(exports, 'buildDefaultColumnsFromQuery', {
  enumerable: true,
  get: function get() {
    return _ReportBuilder.buildDefaultColumnsFromQuery;
  }
});

var _Icons = require('./Icons');

Object.defineProperty(exports, 'initComponentIconLibrary', {
  enumerable: true,
  get: function get() {
    return _Icons.initComponentIconLibrary;
  }
});

var _FieldDefinitions = require('./FieldDefinitions');

Object.defineProperty(exports, 'initCustomFormComponents', {
  enumerable: true,
  get: function get() {
    return _FieldDefinitions.initCustomFormComponents;
  }
});

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declaring depricated methods below to give implementors time to refactor base code - JRA 12/05/2019
var updateFormValues = function updateFormValues() {
  return console.error('updateFormValues is depricated and has been removed. You must handle your own form values.');
}; //eslint-disable-line

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();

  console.warn('grid-form-builder no longer uses redux. Remove the grid-form-builder reducer from your combine reducers.'); //eslint-disable-line
  return state;
};
reducer.key = 'form-layouts';

exports.updateFormValues = updateFormValues;
exports.reducer = reducer;