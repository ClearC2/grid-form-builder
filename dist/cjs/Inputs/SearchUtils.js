"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.CONDITIONS = exports.TEXT_INPUTS = exports.NUMERICAL_CONDITIONS = exports.TYPEAHEAD_CONDITIONS = exports.DATES = exports.ALL_BUT_DATES = exports.ONLY_CATEGORICAL_INPUT = exports.MULTI_FIELD_INPUTS = exports.SINGLE_FIELD_INPUTS = void 0;

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _immutable = require("immutable");

var _context, _context2, _context3;

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

/*
* SINGLE_FIELD_INPUTS
* These inputs will have one input field. They can have more than one value, but it is in one field
*/
var SINGLE_FIELD_INPUTS = (0, _immutable.Set)(['multiselect', 'multicheckbox', 'listselect', 'typeahead']);
/*
* MULTI_FIELD_INPUTS
* These inputs can have more than one input field, with one value per field
*/

exports.SINGLE_FIELD_INPUTS = SINGLE_FIELD_INPUTS;
var MULTI_FIELD_INPUTS = (0, _immutable.Set)(['input', 'date', 'datetime', 'phone', 'email', 'currency', 'time', 'number', 'percent']); // eslint-disable-line

exports.MULTI_FIELD_INPUTS = MULTI_FIELD_INPUTS;
var ONLY_CATEGORICAL_INPUT = (0, _immutable.Set)(['multicheckbox', 'multiselect', 'listselect']);
exports.ONLY_CATEGORICAL_INPUT = ONLY_CATEGORICAL_INPUT;
var ALL_BUT_DATES = (0, _immutable.Set)(['input', 'number', 'percent', 'phone', 'email', 'currency', 'time', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']); // eslint-disable-line

exports.ALL_BUT_DATES = ALL_BUT_DATES;
var DATES = (0, _immutable.Set)(['date', 'datetime']);
/*
* TYPEAHEAD_CONDITIONS
* If a field is a typeahead on the original formSchema, it will only remain a typeahead input if the condition
* is one of the following. Otherwise it will be converted to an input. Typeaheads can have other conditions, but the
* the input type may change
*/

exports.DATES = DATES;
var TYPEAHEAD_CONDITIONS = (0, _immutable.Set)(['is equal to', 'is not equal to', 'is one of', 'is not one of']);
exports.TYPEAHEAD_CONDITIONS = TYPEAHEAD_CONDITIONS;
var NUMERICAL_CONDITIONS = (0, _immutable.Set)(['last (x) days', 'last (x) months', 'next (x) days', 'next (x) months']);
exports.NUMERICAL_CONDITIONS = NUMERICAL_CONDITIONS;
var TEXT_INPUTS = ['textarea', 'checkbox', 'radio']; // export const LIST_INPUTS = []

exports.TEXT_INPUTS = TEXT_INPUTS;
var CONDITIONS = {
  contains: {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: (0, _concat.default)(_context = []).call(_context, (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT), (0, _toConsumableArray2.default)(DATES))
  },
  'is equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT)
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT),
    joinString: "       and"
  },
  'is greater than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT)
  },
  'is less than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT)
  },
  'is one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is not between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: (0, _concat.default)(_context2 = []).call(_context2, (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT), (0, _toConsumableArray2.default)(DATES)),
    joinString: "      and"
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: (0, _concat.default)(_context3 = []).call(_context3, (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT), (0, _toConsumableArray2.default)(DATES))
  },
  'is not equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ONLY_CATEGORICAL_INPUT)
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
  yesterday: {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  today: {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  tomorrow: {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'this month': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'year to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'this quarter': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'quarter to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'last (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'last (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'next (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  'next (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: (0, _toConsumableArray2.default)(ALL_BUT_DATES)
  },
  '': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  }
};
exports.CONDITIONS = CONDITIONS;