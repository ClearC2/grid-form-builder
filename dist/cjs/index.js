"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

_Object$defineProperty(exports, "FormDroppable", {
  enumerable: true,
  get: function get() {
    return _FormDroppable.default;
  }
});

_Object$defineProperty(exports, "initFormBuilderAjax", {
  enumerable: true,
  get: function get() {
    return _config.initFormBuilderAjax;
  }
});

_Object$defineProperty(exports, "Conditionalinput", {
  enumerable: true,
  get: function get() {
    return _ConditionalInput.default;
  }
});

_Object$defineProperty(exports, "CONDITIONS", {
  enumerable: true,
  get: function get() {
    return _SearchUtils.CONDITIONS;
  }
});

_Object$defineProperty(exports, "TEXT_INPUTS", {
  enumerable: true,
  get: function get() {
    return _SearchUtils.TEXT_INPUTS;
  }
});

_Object$defineProperty(exports, "DATES", {
  enumerable: true,
  get: function get() {
    return _SearchUtils.DATES;
  }
});

_Object$defineProperty(exports, "GFBInput", {
  enumerable: true,
  get: function get() {
    return _GFBInput.default;
  }
});

_Object$defineProperty(exports, "Typeahead", {
  enumerable: true,
  get: function get() {
    return _Typeahead.default;
  }
});

_Object$defineProperty(exports, "Checkbox", {
  enumerable: true,
  get: function get() {
    return _Checkbox.default;
  }
});

_Object$defineProperty(exports, "Currency", {
  enumerable: true,
  get: function get() {
    return _Currency.default;
  }
});

_Object$defineProperty(exports, "Colorpicker", {
  enumerable: true,
  get: function get() {
    return _Colorpicker.default;
  }
});

_Object$defineProperty(exports, "Date", {
  enumerable: true,
  get: function get() {
    return _Date.default;
  }
});

_Object$defineProperty(exports, "Datetime", {
  enumerable: true,
  get: function get() {
    return _Datetime.default;
  }
});

_Object$defineProperty(exports, "Email", {
  enumerable: true,
  get: function get() {
    return _Email.default;
  }
});

_Object$defineProperty(exports, "Input", {
  enumerable: true,
  get: function get() {
    return _Input.default;
  }
});

_Object$defineProperty(exports, "Listselect", {
  enumerable: true,
  get: function get() {
    return _Listselect.default;
  }
});

_Object$defineProperty(exports, "Multicheckbox", {
  enumerable: true,
  get: function get() {
    return _Multicheckbox.default;
  }
});

_Object$defineProperty(exports, "Multiselect", {
  enumerable: true,
  get: function get() {
    return _Multiselect.default;
  }
});

_Object$defineProperty(exports, "Number", {
  enumerable: true,
  get: function get() {
    return _Number.default;
  }
});

_Object$defineProperty(exports, "Phone", {
  enumerable: true,
  get: function get() {
    return _Phone.default;
  }
});

_Object$defineProperty(exports, "Radio", {
  enumerable: true,
  get: function get() {
    return _Radio.default;
  }
});

_Object$defineProperty(exports, "Richtextarea", {
  enumerable: true,
  get: function get() {
    return _Richtextarea.default;
  }
});

_Object$defineProperty(exports, "Select", {
  enumerable: true,
  get: function get() {
    return _Select.default;
  }
});

_Object$defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return _Textarea.default;
  }
});

_Object$defineProperty(exports, "Time", {
  enumerable: true,
  get: function get() {
    return _Time.default;
  }
});

_Object$defineProperty(exports, "Percentage", {
  enumerable: true,
  get: function get() {
    return _Percentage.default;
  }
});

_Object$defineProperty(exports, "Portal", {
  enumerable: true,
  get: function get() {
    return _Portal.default;
  }
});

_Object$defineProperty(exports, "FormBuilder", {
  enumerable: true,
  get: function get() {
    return _FormBuilder.default;
  }
});

_Object$defineProperty(exports, "ConditionalTable", {
  enumerable: true,
  get: function get() {
    return _ConditionalTableContainer.default;
  }
});

_Object$defineProperty(exports, "convertQueryToFormValues", {
  enumerable: true,
  get: function get() {
    return _ConditionalTableContainer.convertQueryToFormValues;
  }
});

_Object$defineProperty(exports, "ReportBuilder", {
  enumerable: true,
  get: function get() {
    return _ReportBuilder.ReportBuilder;
  }
});

_Object$defineProperty(exports, "buildAvailableColumnsFromFieldDefs", {
  enumerable: true,
  get: function get() {
    return _ReportBuilder.buildAvailableColumnsFromFieldDefs;
  }
});

_Object$defineProperty(exports, "buildDefaultColumnsFromQuery", {
  enumerable: true,
  get: function get() {
    return _ReportBuilder.buildDefaultColumnsFromQuery;
  }
});

_Object$defineProperty(exports, "initComponentIconLibrary", {
  enumerable: true,
  get: function get() {
    return _Icons.initComponentIconLibrary;
  }
});

_Object$defineProperty(exports, "initCustomFormComponents", {
  enumerable: true,
  get: function get() {
    return _Inputs.initCustomFormComponents;
  }
});

exports.reducer = exports.updateFormValues = void 0;

var _immutable = require("immutable");

var _FormDroppable = _interopRequireDefault(require("./FormDroppable"));

var _config = require("./config");

var _ConditionalInput = _interopRequireDefault(require("./Inputs/ConditionalInput"));

var _SearchUtils = require("./Inputs/SearchUtils");

var _GFBInput = _interopRequireDefault(require("./GFBInput"));

var _Typeahead = _interopRequireDefault(require("./Inputs/Typeahead"));

var _Checkbox = _interopRequireDefault(require("./Inputs/Checkbox"));

var _Currency = _interopRequireDefault(require("./Inputs/Currency"));

var _Colorpicker = _interopRequireDefault(require("./Inputs/Colorpicker"));

var _Date = _interopRequireDefault(require("./Inputs/Date/Date"));

var _Datetime = _interopRequireDefault(require("./Inputs/Date/Datetime"));

var _Email = _interopRequireDefault(require("./Inputs/Email"));

var _Input = _interopRequireDefault(require("./Inputs/Input"));

var _Listselect = _interopRequireDefault(require("./Inputs/Listselect"));

var _Multicheckbox = _interopRequireDefault(require("./Inputs/Multicheckbox"));

var _Multiselect = _interopRequireDefault(require("./Inputs/Multiselect"));

var _Number = _interopRequireDefault(require("./Inputs/Number"));

var _Phone = _interopRequireDefault(require("./Inputs/Phone"));

var _Radio = _interopRequireDefault(require("./Inputs/Radio"));

var _Richtextarea = _interopRequireDefault(require("./Inputs/Richtextarea"));

var _Select = _interopRequireDefault(require("./Inputs/Select"));

var _Textarea = _interopRequireDefault(require("./Inputs/Textarea"));

var _Time = _interopRequireDefault(require("./Inputs/Date/Time"));

var _Percentage = _interopRequireDefault(require("./Inputs/Percentage"));

var _Portal = _interopRequireDefault(require("./Portal"));

var _FormBuilder = _interopRequireDefault(require("./FormBuilder"));

var _ConditionalTableContainer = _interopRequireWildcard(require("./QueryBuilder/Where/ConditionalTable/ConditionalTableContainer"));

var _ReportBuilder = require("./QueryBuilder/ReportBuilder/ReportBuilder");

var _Icons = require("./Icons");

var _Inputs = require("./Inputs");

/* eslint-disable max-len */
// declaring depricated methods below to give implementors time to refactor base code - JRA 12/05/2019
var updateFormValues = function updateFormValues() {
  return console.error('updateFormValues is depricated and has been removed. You must handle your own form values.');
}; //eslint-disable-line


exports.updateFormValues = updateFormValues;

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _immutable.Map)();
  console.warn('grid-form-builder no longer uses redux. Remove the grid-form-builder reducer from your combine reducers.'); //eslint-disable-line

  return state;
};

exports.reducer = reducer;
reducer.key = 'form-layouts';