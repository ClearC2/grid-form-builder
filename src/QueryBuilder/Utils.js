import {Set} from 'immutable'

const unconditionalFields = Set(['header', 'conditionalinput', 'checkbox'])

export const convertFormSchemaToSearch = (formSchema = {}) => {
  if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
  if (formSchema.jsonschema) {
    formSchema.jsonschema.layout = formSchema.jsonschema.layout.map(f => {
      if (f.config.type === 'metadata') {
        if (f.config.conditionalConfig) {
          if (f.config.conditionalConfig.type === 'typeahead') {
            f.config.conditionalConfig.type = 'input'
          }
          const conditionalConfig = Object.assign({}, f.config.conditionalConfig)
          const metaConfig = Object.assign({}, f.config)
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
      if (field.config.conditionalConfig) {
        field.config = {...field.config, ...field.config.conditionalConfig} // overwrite default config if special report config is provided
      }
      if (field.config.type === 'typeahead') {
        field.config.type = 'input'
        // if (field.config.typeahead && !field.config.typeahead.fieldId) {
        //   field.config.typeahead.fieldId = 'value'
        // }
        // field.config.multi = true
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
      if (['date', 'datetime', 'time', 'month'].indexOf(field.config.type) > -1) {
        field.config.onChangeValidator = null
      }
      if (field.config.type === 'metadata') {
        if (field.config.conditionalConfig) {
          const conditionalConfig = Object.assign({}, field.config.conditionalConfig)
          const metaConfig = Object.assign({}, field.config)
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
