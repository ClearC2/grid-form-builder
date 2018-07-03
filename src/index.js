import {setPortalNode} from 'c2-dialog'
export reducer from './redux'
export FormDroppable from './FormDroppable'
export {default as FormBuilder, updateFormValues, initCustomFormComponents, initComponentIconLibrary} from './GridFormBuilder'
export {initFormBuilderAjax} from './config'
export {CONDITIONS} from './FieldDefinitions/Conditionalinput'

setPortalNode(document.getElementById('dialogs'))
