(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import { Map } from 'immutable';
/* eslint-disable max-len */

export { default as FormDroppable } from './FormDroppable';
export { initFormBuilderAjax } from './config';
export { default as Conditionalinput } from './Inputs/ConditionalInput';
export { CONDITIONS, TEXT_INPUTS } from './Inputs/SearchUtils';
export { default as GFBInput } from './GFBInput';
export { default as Typeahead } from './Inputs/Typeahead';
export { default as Checkbox } from './Inputs/Checkbox';
export { default as Currency } from './Inputs/Currency';
export { default as Colorpicker } from './Inputs/Colorpicker';
export { default as Date } from './Inputs/Date/Date';
export { default as Datetime } from './Inputs/Date/Datetime';
export { default as Email } from './Inputs/Email';
export { default as Input } from './Inputs/Input';
export { default as Listselect } from './Inputs/Listselect';
export { default as Multicheckbox } from './Inputs/Multicheckbox';
export { default as Multiselect } from './Inputs/Multiselect';
export { default as Number } from './Inputs/Number';
export { default as Phone } from './Inputs/Phone';
export { default as Radio } from './Inputs/Radio';
export { default as Richtextarea } from './Inputs/Richtextarea';
export { default as Select } from './Inputs/Select';
export { default as Textarea } from './Inputs/Textarea';
export { default as Time } from './Inputs/Date/Time';
export { default as Percentage } from './Inputs/Percentage';
export { default as Portal } from './Portal';
export { default as FormBuilder } from './FormBuilder';
export { default as ConditionalTable, convertQueryToFormValues } from './QueryBuilder/Where/ConditionalTable/ConditionalTableContainer';
export { ReportBuilder, buildAvailableColumnsFromFieldDefs, buildDefaultColumnsFromQuery } from './QueryBuilder/ReportBuilder/ReportBuilder';
export { initComponentIconLibrary } from './Icons';
export { initCustomFormComponents } from './Inputs'; // declaring depricated methods below to give implementors time to refactor base code - JRA 12/05/2019

var updateFormValues = function updateFormValues() {
  return console.error('updateFormValues is depricated and has been removed. You must handle your own form values.');
}; //eslint-disable-line


var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map();
  console.warn('grid-form-builder no longer uses redux. Remove the grid-form-builder reducer from your combine reducers.'); //eslint-disable-line

  return state;
};

reducer.key = 'form-layouts';
export { updateFormValues, reducer };
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(updateFormValues, "updateFormValues", "/Users/davidadams/code/grid-form-builder/src/index.js");
  reactHotLoader.register(reducer, "reducer", "/Users/davidadams/code/grid-form-builder/src/index.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();