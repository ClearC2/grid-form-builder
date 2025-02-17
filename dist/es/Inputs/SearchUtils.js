import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";

var _context;

import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
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

export var MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'month', 'phone', 'email', 'currency', 'time', 'number', 'percent', 'textarea']); // eslint-disable-line

export var ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect']);
export var ALL_BUT_DATES = Set(['input', 'number', 'percent', 'phone', 'email', 'currency', 'time', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']); // eslint-disable-line

export var DATES = Set(['date', 'datetime']);
/*
* TYPEAHEAD_CONDITIONS
* If a field is a typeahead on the original formSchema, it will only remain a typeahead input if the condition
* is one of the following. Otherwise it will be converted to an input. Typeaheads can have other conditions, but the
* the input type may change
*/

export var TYPEAHEAD_CONDITIONS = Set(['is equal to', 'is not equal to', 'is one of', 'is not one of']); // eslint-disable-next-line max-len

export var NUMERICAL_CONDITIONS = Set(['last (x) days', 'last (x) months', 'next (x) days', 'last (x) weeks', 'next (x) weeks', 'next (x) months', 'is top (x)', 'is bottom (x)', 'is top (%)', 'is bottom (%)']);
export var TEXT_INPUTS = ['checkbox', 'radio']; // export const LIST_INPUTS = []

export var CONDITIONS = {
  contains: {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(DATES)
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
    invalidInputTypes: _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES)),
    joinString: "      and"
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(DATES)
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
  yesterday: {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  today: {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  tomorrow: {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'this week': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'this month': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'this year': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last year': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'year to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'fiscal year to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'fiscal year': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last fiscal year': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'this quarter': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last quarter': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'quarter to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'last (x) weeks': {
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
  'next (x) weeks': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'next (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'match month': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'match date': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: _toConsumableArray(ALL_BUT_DATES)
  },
  'is top (x)': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: ['input', 'phone', 'email', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']
  },
  'is top (%)': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: ['input', 'phone', 'email', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']
  },
  'is bottom (x)': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: ['input', 'phone', 'email', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']
  },
  'is bottom (%)': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: ['input', 'phone', 'email', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']
  },
  '': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  }
};