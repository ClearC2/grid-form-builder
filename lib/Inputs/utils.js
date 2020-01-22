'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONDITIONS = exports.TEXT_INPUTS = exports.NUMERICAL_CONDITIONS = exports.TYPEAHEAD_CONDITIONS = exports.DATES = exports.ALL_BUT_DATES = exports.ONLY_CATEGORICAL_INPUT = exports.MULTI_FIELD_INPUTS = exports.SINGLE_FIELD_INPUTS = undefined;

var _immutable = require('immutable');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */
/*
* SINGLE_FIELD_INPUTS
* These inputs will have one input field. They can have more than one value, but it is in one field
*/
var SINGLE_FIELD_INPUTS = exports.SINGLE_FIELD_INPUTS = (0, _immutable.Set)(['multiselect', 'multicheckbox', 'listselect', 'typeahead']);
/*
* MULTI_FIELD_INPUTS
* These inputs can have more than one input field, with one value per field
*/
var MULTI_FIELD_INPUTS = exports.MULTI_FIELD_INPUTS = (0, _immutable.Set)(['input', 'date', 'datetime', 'phone', 'email', 'currency', 'time', 'number', 'percent']); // eslint-disable-line
var ONLY_CATEGORICAL_INPUT = exports.ONLY_CATEGORICAL_INPUT = (0, _immutable.Set)(['multicheckbox', 'multiselect', 'listselect']);

var ALL_BUT_DATES = exports.ALL_BUT_DATES = (0, _immutable.Set)(['input', 'phone', 'email', 'currency', 'time', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']); // eslint-disable-line
var DATES = exports.DATES = (0, _immutable.Set)(['date', 'datetime']);
/*
* TYPEAHEAD_CONDITIONS
* If a field is a typeahead on the original formSchema, it will only remain a typeahead input if the condition
* is one of the following. Otherwise it will be converted to an input. Typeaheads can have other conditions, but the
* the input type may change
*/
var TYPEAHEAD_CONDITIONS = exports.TYPEAHEAD_CONDITIONS = (0, _immutable.Set)(['is equal to', 'is not equal to', 'is one of', 'is not one of']);
var NUMERICAL_CONDITIONS = exports.NUMERICAL_CONDITIONS = (0, _immutable.Set)(['last (x) days', 'last (x) months', 'next (x) days', 'next (x) months']);
var TEXT_INPUTS = exports.TEXT_INPUTS = ['textarea', 'checkbox', 'radio'];
// export const LIST_INPUTS = []

var CONDITIONS = exports.CONDITIONS = {
  'contains': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES))
  },
  'is equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT)),
    joinString: '       and'
  },
  'is greater than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is less than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is not between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES)),
    joinString: '      and'
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES))
  },
  'is not equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
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
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'this month': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'year to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'last (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'last (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'next (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'next (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  '': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  }
};