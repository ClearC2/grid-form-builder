import {Set} from 'immutable'

const unconditionalFields = Set(['header', 'conditionalinput', 'checkbox', 'textarea'])

export const convertFormSchemaToSearch = (formSchema = {}) => {
  if (formSchema.jsonschema) {
    formSchema.jsonschema.layout = formSchema.jsonschema.layout.map(f => {
      if (f.config.type === 'metadata') {
        if (f.config.conditionalConfig) {
          let conditionalConfig = Object.assign({}, f.config.conditionalConfig)
          let metaConfig = Object.assign({}, f.config)
          delete metaConfig.conditionalConfig
          f.config = conditionalConfig
          f.config.metaConfig = metaConfig
        } else {
          f.config.type = 'input'
        }
      }
      return f
    })
  }
  return formSchema
}

export const convertFieldToSearch = (field = {}, forCondTable = false) => {
  if (!unconditionalFields.has(field.config.type ? field.config.type.toLowerCase() : 'input')) {
    if (!field.config.forceUnconditional && !field.config.forceunconditional) {
      if (field.config.type === 'typeahead') {
        if (field.config.typeahead && !field.config.typeahead.fieldId) {
          field.config.typeahead.fieldId = 'value'
        }
        field.config.multi = true
      }
      if (field.config.type === 'radio') { // inputs that are normally radios should be multicheckboxes in search
        field.config.type = 'multicheckbox'
      }
      if (field.config.type === 'select') {
        field.config.type = 'multiselect'
      }
      if (field.config.type === 'email') {
        field.config.type = 'input'
      }
      if (field.config.type === 'metadata') {
        if (field.config.conditionalConfig) {
          let conditionalConfig = Object.assign({}, field.config.conditionalConfig)
          let metaConfig = Object.assign({}, field.config)
          delete metaConfig.conditionalConfig
          field.config = conditionalConfig
          field.config.metaConfig = metaConfig
        } else {
          field.config.type = 'input'
        }
      }
      field.config.inputType = field.config.type || 'input'
      if (!forCondTable) {
        field.config.type = 'conditionalInput'
      }
    }
  }
  field.config.required = false
  field.config.readonly = false
  field.config.disabled = false
  return field
}