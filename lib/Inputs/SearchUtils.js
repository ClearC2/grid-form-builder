import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";

var _context, _context2, _context3;

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import { Set } from 'immutable';
/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

/*
* SINGLE_FIELD_INPUTS
* These inputs will have one input field. They can have more than one value, but it is in one field
*/

export var SINGLE_FIELD_INPUTS = Set(['multiselect', 'multicheckbox', 'listselect', 'typeahead']);
/*
* MULTI_FIELD_INPUTS
* These inputs can have more than one input field, with one value per field
*/

export var MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'phone', 'email', 'currency', 'time', 'number', 'percent']); // eslint-disable-line

export var ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect']);
export var ALL_BUT_DATES = Set(['input', 'number', 'percent', 'phone', 'email', 'currency', 'time', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']); // eslint-disable-line

export var DATES = Set(['date', 'datetime']);
/*
* TYPEAHEAD_CONDITIONS
* If a field is a typeahead on the original formSchema, it will only remain a typeahead input if the condition
* is one of the following. Otherwise it will be converted to an input. Typeaheads can have other conditions, but the
* the input type may change
*/

export var TYPEAHEAD_CONDITIONS = Set(['is equal to', 'is not equal to', 'is one of', 'is not one of']);
export var NUMERICAL_CONDITIONS = Set(['last (x) days', 'last (x) months', 'next (x) days', 'next (x) months']);
export var TEXT_INPUTS = ['textarea', 'checkbox', 'radio']; // export const LIST_INPUTS = []

export var CONDITIONS = {
  'contains': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES))
  },
  'is equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ONLY_CATEGORICAL_INPUT)
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: _toConsumableArray(ONLY_CATEGORICAL_INPUT),
    joinString: "       and"
  },
  'is greater than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ONLY_CATEGORICAL_INPUT)
  },
  'is less than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ONLY_CATEGORICAL_INPUT)
  },
  'is one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is not between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: _concatInstanceProperty(_context2 = []).call(_context2, _toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES)),
    joinString: "      and"
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: _concatInstanceProperty(_context3 = []).call(_context3, _toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES))
  },
  'is not equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ONLY_CATEGORICAL_INPUT)
  },
  'is not one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is blank': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: []
  },
  'is not blank': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: []
  },
  'today': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'this month': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'year to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'next (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'next (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  '': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  }
};
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(SINGLE_FIELD_INPUTS, "SINGLE_FIELD_INPUTS", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(MULTI_FIELD_INPUTS, "MULTI_FIELD_INPUTS", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(ONLY_CATEGORICAL_INPUT, "ONLY_CATEGORICAL_INPUT", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(ALL_BUT_DATES, "ALL_BUT_DATES", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(DATES, "DATES", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(TYPEAHEAD_CONDITIONS, "TYPEAHEAD_CONDITIONS", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(NUMERICAL_CONDITIONS, "NUMERICAL_CONDITIONS", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(TEXT_INPUTS, "TEXT_INPUTS", "/root/repo/src/Inputs/SearchUtils.js");
  reactHotLoader.register(CONDITIONS, "CONDITIONS", "/root/repo/src/Inputs/SearchUtils.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();