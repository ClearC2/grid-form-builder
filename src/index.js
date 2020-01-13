import {Map} from 'immutable'
/* eslint-disable max-len */
export {default as FormDroppable} from './FormDroppable'
export {initFormBuilderAjax} from './config'
export {default as Conditionalinput, CONDITIONS, TEXT_INPUTS} from './FieldDefinitions/Conditionalinput'
export {default as Typeahead} from './Inputs/Typeahead'
export {default as Checkbox} from './Inputs/Checkbox'
export {default as Currency} from './FieldDefinitions/Currency'
export {default as Date} from './Inputs/Date/Date'
export {default as Datetime} from './Inputs/Date/Datetime'
export {default as Email} from './FieldDefinitions/Email'
export {default as Input} from './Inputs/Input'
export {default as Listselect} from './Inputs/Listselect'
export {default as Multicheckbox} from './Inputs/Multicheckbox'
export {default as Multiselect} from './Inputs/Multiselect'
export {default as Number} from './FieldDefinitions/Number'
export {default as Phone} from './FieldDefinitions/Phone'
export {default as Radio} from './Inputs/Radio'
export {default as RichtextareaQuill} from './FieldDefinitions/Richtextareaquill'
export {default as Select} from './Inputs/Select'
export {default as Textarea} from './Inputs/Textarea'
export {default as Time} from './Inputs/Date/Time'
export {default as Percentage} from './FieldDefinitions/Percentage'
export {default as Total} from './FieldDefinitions/Total'
export {default as Portal} from './Portal'
export {default as FormBuilder} from './FormBuilder'
export {default as ConditionalTable, convertQueryToFormValues} from './QueryBuilder/Where/ConditionalTable/ConditionalTableContainer'
export {ReportBuilder, buildAvailableColumnsFromFieldDefs, buildDefaultColumnsFromQuery} from './QueryBuilder/ReportBuilder/ReportBuilder'
export {initComponentIconLibrary} from './Icons'
export {initCustomFormComponents} from './FieldDefinitions'

// declaring depricated methods below to give implementors time to refactor base code - JRA 12/05/2019
const updateFormValues = () => console.error('updateFormValues is depricated and has been removed. You must handle your own form values.') //eslint-disable-line

const reducer = (state = Map()) => {
  console.warn('grid-form-builder no longer uses redux. Remove the grid-form-builder reducer from your combine reducers.') //eslint-disable-line
  return state
}
reducer.key = 'form-layouts'

export {
  updateFormValues,
  reducer
}
