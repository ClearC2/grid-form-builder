import {setPortalNode} from 'c2-dialog'
export reducer from './redux'
export {default as FormBuilder, updateFormValues, initCustomFormComponents, initComponentIconLibrary} from './GridFormBuilder'
export {initFormBuilderAjax} from './config'

setPortalNode(document.getElementById('dialogs'))
