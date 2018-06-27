import { setPortalNode } from 'c2-dialog';
import _reducer from './redux';
export { _reducer as reducer };

export { default as FormBuilder, updateFormValues, initCustomFormComponents, initComponentIconLibrary, FormBuilderWithContext } from './GridFormBuilder';
export { initFormBuilderAjax } from './config';

setPortalNode(document.getElementById('dialogs'));