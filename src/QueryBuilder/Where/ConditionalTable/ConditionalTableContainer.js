import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {fromJS, Map, List, Set} from 'immutable'
import ConditionalTable from './ConditionalTable'
import {CONDITIONS, TEXT_INPUTS, DATES} from '../../../index'
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

const getDefaultFormat = (inputType) => {
  let i = 0
  const max = DATES.length
  while (i < max) {
    if (!Set(DATES[i].invalidInputTypes).has(inputType)) {
      return Object.keys(DATES)[i]
    }
    i++
  }
  return '' // type should not be a date
}
const getFieldSchema = (key, formSchema) => {
  if (formSchema && typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
  if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
    formSchema = convertFormSchemaToSearch(formSchema)
    return List(formSchema.jsonschema.layout).find(row => row.config.name === key)
  } else {
    return undefined
  }
}

const getBetweenDatesValues = (query) => {
  return query
    .filter(q => String(q.name).includes('date'))
    .map(q => {
      if (q.values && q.values.length) {
        return {
          field: q.name,
          value: q.values[0]
        }
      }
    })
    .filter(Boolean)
}

const convertSingleField = (c, formSchema, inBetweenDateValues) => {
  let newFormValue
  const schema = getFieldSchema(c.get('name'), formSchema)
  const type = schema.config && typeof schema.config.type === 'string' ? schema.config.type.toLowerCase() : 'input'
  const mergeDate = c.get('mergeDate', false)
  if (schema) {
    if (Set(TEXT_INPUTS).has(type) &&
        c.get('comparator') !== 'is blank' &&
        c.get('comparator') !== 'is not blank'
    ) {
      newFormValue = c.get('values') instanceof List ? c.getIn(['values', 0], ['']) : c.get('values', '')
    } else {
      if (c.get('rawValues') !== undefined && !mergeDate) {
        newFormValue = Map({
          condition: c.get('comparator'),
          values: c.get('rawValues', List()),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          isfield: c.get('isfield', false),
          format: c.get('format', '')
        })
        // https://github.com/ClearC2/bleu/issues/4734
      } else if (mergeDate) {
        const values = inBetweenDateValues.filter(v => v.field === c.get('name')).map(v => v.value)
        newFormValue = Map({
          condition: 'is between',
          values: List(values),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          isfield: c.get('isfield', false),
          format: c.get('format', '')
        })
      } else {
        newFormValue = Map({
          condition: c.get('comparator'),
          values: c.get('values', List()),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          isfield: c.get('isfield', false),
          format: c.get('format', '')
        })
      }
    }
  }
  return newFormValue
}
export const convertQueryToFormValues = (query, clearExistingValues = true, fValues, formSchema) => {
  let formValues = fromJS(fValues)
  if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      formValues.forEach((v, k) => {
        if (v instanceof Map) {
          const schema = getFieldSchema(k, formSchema)
          formValues = formValues.set(k, Map({
            condition: schema ? getDefaultCondition(schema.config.type) : v.get('condition'),
            values: List(),
            dynamicValues: v.get('dynamicValues'),
            not: v.get('not', false),
            format: schema ? getDefaultFormat(schema.config.format) : v.get('format', '')
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
      const inBetweenDateValues = getBetweenDatesValues(query.conditions)
      fromJS(query.conditions).forEach(c => {
        if (c.get('conditions')) {
          let conditions = List()
          c.get('conditions').forEach(pred => {
            let newField = convertSingleField(pred, formSchema, inBetweenDateValues)
            newField = newField.set('name', pred)
            conditions = conditions.push(newField)
          })
          formValues = formValues.set(c.getIn(['conditions', 0, 'name']), fromJS({
            conditions: conditions,
            type: c.get('type')
          }))
        } else {
          const newValue = convertSingleField(c, formSchema, inBetweenDateValues)
          formValues = formValues.set(c.get('name'), newValue)
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
    let {formSchema} = props
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
    this.state = {
      formSchema: convertFormSchemaToSearch(formSchema)
    }
  }

  componentDidUpdate (props) {
    let {formSchema} = props
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
    let {formSchema: stateSchema = []} = this.state
    if (typeof stateSchema.toJS === 'function') stateSchema = stateSchema.toJS()
    if (Object.keys(formSchema).length !== Object.keys(stateSchema).length) {
      this.setState({formSchema: convertFormSchemaToSearch(formSchema)})
    } else if (stateSchema &&
      stateSchema.jsonschema &&
      stateSchema.jsonschema.layout &&
      formSchema &&
      formSchema.jsonschema &&
      formSchema.jsonschema.layout &&
      stateSchema.jsonschema.layout.length !== formSchema.jsonschema.layout.length) {
      this.setState({formSchema: convertFormSchemaToSearch(formSchema)})
    }
  }

  convertQueryToFormValues = (query, clearExistingValues = true) => {
    let {formValues} = this.props
    let {formSchema} = this.state
    if (typeof formValues.toJS === 'function') formValues = formValues.toJS()
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
    return convertQueryToFormValues(query, clearExistingValues, formValues, formSchema)
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
    let {formSchema} = this.state
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
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
