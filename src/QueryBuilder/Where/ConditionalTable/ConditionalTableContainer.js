import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fromJS, Map, List, Set} from 'immutable'
import ConditionalTable from './ConditionalTable'
import {CONDITIONS, TEXT_INPUTS} from '../../../index'
import {convertFormSchemaToSearch} from '../../Utils'

const getDefaultCondition = (inputType) => {
  let i = 0
  const max = CONDITIONS.length
  while (i < max) {
    if (!Set(CONDITIONS[i].invalidInputTypes).has(inputType)) {
      return Object.keys(CONDITIONS)[i]
    }
    i++
  }
  return '' // no conditions are valid for this input type ??? you shouldnt get here.
}
const getFieldSchema = (key, formSchema) => {
  if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
    formSchema = convertFormSchemaToSearch(formSchema)
    return List(formSchema.jsonschema.layout).find(row => row.config.name === key)
  } else {
    return undefined
  }
}
export const convertQueryToFormValues = (query, clearExistingValues = true, fValues, formSchema) => {
  let formValues = fromJS(fValues)
  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      formValues.forEach((v, k) => {
        if (v instanceof Map) {
          const schema = getFieldSchema(k, formSchema)
          formValues = formValues.set(k, Map({
            condition: schema ? getDefaultCondition(schema.config.type) : v.get('condition'),
            values: List(),
            dynamicValues: v.get('dynamicValues')
          }))
        } else if (typeof v === 'string') {
          formValues = formValues.set(k, '')
        }
      })
    }
    // put query into form values
    if (query.query) {
      query = query.query
    }
    if (query.conditions) {
      fromJS(query.conditions).forEach(c => {
        const schema = getFieldSchema(c.get('name'), formSchema)
        if (schema) {
          if (Set(TEXT_INPUTS).has(schema.config.type.toLowerCase())) {
            const val = c.get('values') instanceof List ? c.getIn(['values', 0], ['']) : c.get('values', '')
            formValues = formValues.set(c.get('name'), val)
          } else {
            if (c.get('rawValues') !== undefined) {
              formValues = formValues.set(c.get('name'), Map({
                condition: c.get('comparator'),
                values: c.get('rawValues', List()),
                dynamicValues: c.get('dynamicValues')
              }))
            } else {
              formValues = formValues.set(c.get('name'), Map({
                condition: c.get('comparator'),
                values: c.get('values', List()),
                dynamicValues: c.get('dynamicValues')
              }))
            }
          }
        }
      })
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('Empty Query object received')
  }
  return formValues
}

class _ConditionalTableContainer extends Component {
  static propTypes = {
    formSchema: PropTypes.object.isRequired,
    formValues: PropTypes.object.isRequired,
    handleFormValueChange: PropTypes.func.isRequired,
    primaryButtonClass: PropTypes.string,
    enableResetButton: PropTypes.bool,
    onNextClick: PropTypes.func,
    enableNextButton: PropTypes.bool,
    onQueryChange: PropTypes.func,
    title: PropTypes.string,
    enableToggle: PropTypes.bool,
    enableDelete: PropTypes.bool,
    onToggleChange: PropTypes.func,
    enableListToggle: PropTypes.bool
  }

  static defaultProps = {
    enableResetButton: false,
    enableNextButton: false,
    enableToggle: true,
    enableDelete: true
  }

  constructor (props) {
    super(props)
    this.state = {
      formSchema: convertFormSchemaToSearch(props.formSchema)
    }
  }

  componentDidUpdate (props) {
    if (Object.keys(props.formSchema).length !== Object.keys(this.state.formSchema).length) {
      this.setState({formSchema: convertFormSchemaToSearch(props.formSchema)})
    }
  }

  convertQueryToFormValues = (query, clearExistingValues = true) => {
    return convertQueryToFormValues(query, clearExistingValues, this.props.formValues, this.state.formSchema)
  }

  getDefaultCondition = (inputType) => {
    let i = 0
    const max = CONDITIONS.length
    while (i < max) {
      if (!Set(CONDITIONS[i].invalidInputTypes).has(inputType)) {
        return Object.keys(CONDITIONS)[i]
      }
      i++
    }
    return '' // no conditions are valid for this input type ??? you shouldnt get here.
  }

  getFieldSchema = (key) => {
    const formSchema = this.state.formSchema
    if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
      return List(formSchema.jsonschema.layout).find(row => row.config.name === key)
    } else {
      return undefined
    }
  }

  render () {
    return (
      <ConditionalTable
        {...this.props}
        formSchema={this.state.formSchema}
        formValues={fromJS(this.props.formValues).toJS()}
        title={this.props.title || 'Query:'}
        handleOnChange={this.props.handleFormValueChange}
        onNextClick={this.props.onNextClick}
        primaryButtonClass={this.props.primaryButtonClass}
        enableResetButton={this.props.enableResetButton}
        enableNextButton={this.props.enableNextButton}
        onQueryChange={this.props.onQueryChange}
        getDefaultCondition={this.getDefaultCondition}
        getFieldSchema={this.getFieldSchema}
        enableDelete={this.props.enableDelete}
        enableToggle={this.props.enableToggle}
        onToggleChange={this.props.onToggleChange}
        enableListToggle={this.props.enableListToggle}
      />
    )
  }
}

export default connect(null, null, null, {forwardRef: true})(_ConditionalTableContainer)
