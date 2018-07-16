import { setPortalNode } from 'c2-dialog';
import _reducer from './redux';
export { _reducer as reducer };
import _FormDroppable from './FormDroppable';
export { _FormDroppable as FormDroppable };

export { default as FormBuilder, updateFormValues, initCustomFormComponents, initComponentIconLibrary } from './GridFormBuilder';
export { initFormBuilderAjax } from './config';
export { CONDITIONS, TEXT_INPUTS } from './FieldDefinitions/Conditionalinput';

setPortalNode(document.getElementById('dialogs'));