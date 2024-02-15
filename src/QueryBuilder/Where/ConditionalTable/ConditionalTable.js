import React, {Component} from 'react'
import {Map, List, Set} from 'immutable'
import PropTypes from 'prop-types'
import Toggle from './Toggle'
import {CONDITIONS} from '../../../index'

const X_ICON_CLASS = 'icon-close pull-right pointer'

export default class ConditionalTable extends Component {
  static propTypes = {
    formValues: PropTypes.object.isRequired,
    onNextClick: PropTypes.func.isRequired,
    formSchema: PropTypes.object,
    extraFooters: PropTypes.array,
    handleOnChange: PropTypes.func,
    title: PropTypes.string,
    primaryButtonClass: PropTypes.string,
    enableResetButton: PropTypes.bool,
    enableNextButton: PropTypes.bool,
    enableToggle: PropTypes.bool,
    toggleValue: PropTypes.string,
    initToggleValue: PropTypes.string,
    onToggleChange: PropTypes.func,
    enableDelete: PropTypes.bool,
    onQueryChange: PropTypes.func,
    getDefaultCondition: PropTypes.func,
    conditionRowOnClick: PropTypes.func,
    getFieldSchema: PropTypes.func,
    enableListToggle: PropTypes.bool
  }

  constructor (props) {
    super(props)
    const noValueConditions = []
    Object.keys(CONDITIONS).forEach((k) => {
      if (CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k)
      }
    })
    this.state = {
      conditionType: props.initToggleValue || 'and',
      noValueConditions: Set(noValueConditions),
      showEditReportFieldsModal: false,
      listOpen: true
    }
  }

  static defaultProps = {
    formValues: {},
    enableToggle: true,
    enableDelete: true,
    toggleValue: 'and',
    enableListToggle: false
  }

  componentDidUpdate (props) { // eslint-disable-line
    if (this.props.formValues !== props.formValues) {
      if (this.props.onQueryChange) {
        const query = this.buildRequest(this.props.formValues)
        this.props.onQueryChange(query)
      }
    }
  }

  buildMultiString = (key, value, exclude = false, rawValue) => {
    let valString = ''
    if (value) {
      if (typeof value === 'string') {
        const splitVal = value.split('¤')
        if (splitVal.length > 1) {
          value = splitVal
        } else {
          value = [value]
        }
      } else if (typeof value === 'object') {
        if (typeof value[0] === 'string' && value[0].split('¤').length > 1) {
          value = value[0].split('¤')
        } else {
          value = value.map(v => v ? v.label || v : '')
        }
      }
      let i = value.length
      const cond = this.getConditionValue(rawValue) || 'contains'
      if (i > CONDITIONS[cond].maxFields) {
        value = List(value).slice(0, CONDITIONS[cond].maxFields).toJS()
      }
      i = value.length

      if (value && value.forEach) {
        value.forEach(val => {
          if (typeof val === 'object') {
            if (val.values) {
              val = val.values
            } else {
              val = val.label || val
            }
          }
          valString = valString + val + ((i > 1) ? ', ' : '')
          i--
        })
      }
      return `${exclude ? ' (exclude) ' : ''}` + ' ' + this.getConditionValue(rawValue) + ' ' + valString
    } else {
      return ''
    }
  }

  getLabel = (key) => {
    let {formSchema = {}} = this.props
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
    if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
      const fieldSchema = this.props.getFieldSchema(key)
      let name = ''
      if (fieldSchema) {
        name = fieldSchema.config.label || (fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.label)
      }
      return name || ''
    } else {
      return 'No Key in schema'
    }
  }

  getFormat = (key) => {
    let {formSchema = {}} = this.props
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
    if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
      const fieldSchema = this.props.getFieldSchema(key)

      let format = ''
      let type = ''

      if (fieldSchema) {
        format = fieldSchema.config.format || (fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.format)
        type = fieldSchema.config.type || (fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.type)

        if (!format && (type === 'date' || type === 'datetime')) {
          format = type
        }
      }

      return format || ''
    }

    return ''
  }

  getNewValue = (value, key) => {
    let rawValues
    let newValue = List()
    if (typeof value === 'string') {
      if (value !== '') {
        const splitVal = value.split('¤')
        if (splitVal.length > 1) {
          newValue = List(splitVal)
        } else {
          newValue = List([value])
        }
      }
    } else if (typeof value === 'object' && value.condition === undefined) {
      if (!value.type && !value.values) {
        newValue = List(value)
      } else {
        newValue = List(value.values)
      }
    } else {
      if (typeof value.values[0] === 'object') {
        // for typeaheads
        rawValues = value.values
        const ids = value.values.map(obj => obj.value)
        newValue = List(ids)
      } else if (typeof value.values[0] === 'string') {
        // inputs
        if (typeof value.values === 'string') {
          const splitVal = value.values.split('¤')
          if (splitVal.length > 1) {
            newValue = List(splitVal)
          } else {
            newValue = List(value.values)
          }
        } else {
          newValue = List(value.values)
        }
      }
    }
    return ({newValue: newValue, rawValues: rawValues})
  }

  buildRequest = (formValues = this.props.formValues) => {
    if (typeof formValues.toJS === 'function') formValues = formValues.toJS()
    const req = {
      query: {
        type: this.state.conditionType,
        conditions: []
      }
    }
    Map(formValues).forEach((value, key) => {
      let newValue
      let rawValues
      if (!value.type) {
        const resp = this.getNewValue(value, key)
        newValue = resp.newValue
        rawValues = resp.rawValues
      }
      if (newValue && (newValue.size > 0 || this.state.noValueConditions.has(value.condition) || value.dynamicValues)) {
        let cond = 'contains'
        if (formValues[key] && formValues[key].condition) {
          cond = formValues[key].condition
        }
        if (newValue.size > CONDITIONS[cond].maxFields) {
          newValue = newValue.slice(0, CONDITIONS[cond].maxFields)
        }
        // https://github.com/ClearC2/bleu/issues/4734
        if (cond === 'is between') {
          req.query.conditions.push({
            fieldSchema: this.props.getFieldSchema(key),
            name: key,
            values: [newValue.get('0', '')],
            comparator: 'is greater than',
            mergeDate: true
          })
          req.query.conditions.push({
            fieldSchema: this.props.getFieldSchema(key),
            name: key,
            values: [newValue.get('1', '')],
            comparator: 'is less than',
            mergeDate: true
          })
        } else {
          req.query.conditions.push({
            fieldSchema: this.props.getFieldSchema(key),
            name: key,
            label: this.getLabel(key),
            comparator: cond,
            values: newValue,
            dynamicValues: value.dynamicValues,
            rawValues: rawValues,
            not: value.not || false,
            format: this.getFormat(key)
          })
        }
      } else if (value.type) {
        const newValues = []
        value.conditions.forEach(v => {
          let {newValue, rawValues} = this.getNewValue(v, key)
          if (newValue.size > 0 || this.state.noValueConditions.has(v.condition) ||
            v.dynamicValues || this.state.noValueConditions.has(v.comparator)) {
            let cond = 'contains'
            if (v && v.condition) {
              cond = v.condition
            }
            if (v && v.comparator) {
              cond = v.comparator
            }
            if (newValue.size > CONDITIONS[cond].maxFields) {
              newValue = newValue.slice(0, CONDITIONS[cond].maxFields)
            }
            // https://github.com/ClearC2/bleu/issues/4734
            if (cond === 'is between') {
              newValues.push({
                fieldSchema: this.props.getFieldSchema(key),
                name: key,
                values: [newValue.get('0', '')],
                comparator: 'is greater than',
                mergeDate: true
              })
              newValues.push({
                fieldSchema: this.props.getFieldSchema(key),
                name: key,
                values: [newValue.get('1', '')],
                comparator: 'is less than',
                mergeDate: true
              })
            } else {
              newValues.push({
                fieldSchema: this.props.getFieldSchema(key),
                name: key,
                label: this.getLabel(key),
                comparator: cond,
                values: newValue,
                dynamicValues: v.dynamicValues || value.dynamicValues,
                rawValues: rawValues,
                not: v.not || false,
                format: this.getFormat(key)
              })
            }
          }
        })
        value.conditions = newValues
        req.query.conditions.push(value)
      }
    })
    return req
  }

  onNextClick = () => {
    const req = this.buildRequest()
    if (this.props.onNextClick) {
      this.props.onNextClick(req)
    }
  }

  handleToggleClick = (e) => {
    if (this.props.enableToggle) {
      if (e) {
        this.setState({conditionType: 'or'})
        if (this.props.onToggleChange) {
          this.props.onToggleChange('or')
        }
      } else {
        this.setState({conditionType: 'and'})
        if (this.props.onToggleChange) {
          this.props.onToggleChange('and')
        }
      }
    }
  }

  resetForm = () => {
    let {formValues} = this.prop
    if (typeof formValues.toJS === 'function') formValues = formValues.toJS()
    Object.keys(formValues).map(key => {
      const schema = this.props.getFieldSchema(key)
      if (schema && schema.config && (schema.config.type === 'textarea' ||
          schema.config.type === 'checkbox' ||
          schema.config.type === 'radio'
      )) {
        this.props.handleOnChange({
          target: {
            name: key,
            value: ''
          }
        })
      } else {
        this.props.handleOnChange({
          target: {
            name: key,
            value: Map({
              condition: this.props.getDefaultCondition(schema.config.type),
              values: List()
            })
          }
        })
      }
    })
  }

  handleRemoveConditionClick = (e, key, predicateIndex) => {
    const schema = this.props.getFieldSchema(key)
    if (schema && schema.config && (schema.config.type === 'textarea' ||
        schema.config.type === 'checkbox' ||
        schema.config.type === 'radio')) {
      this.props.handleOnChange({
        target: {
          name: key,
          value: ''
        }
      })
    } else {
      if (predicateIndex >= 0) {
        const predicate = this.props.formValues[key]
        const newConditions = []
        predicate.conditions.forEach((c, i) => {
          if (i !== predicateIndex) {
            newConditions.push(c)
          }
        })
        if (newConditions.length === 0) {
          this.props.handleOnChange({
            target: {
              name: key,
              value: Map({
                condition: this.props.getDefaultCondition(schema.config.type),
                values: List()
              })
            }
          })
        } else if (newConditions.length === 1) {
          this.props.handleOnChange({
            target: {
              name: key,
              value: predicate.conditions[0]
            }
          })
        } else {
          predicate.conditions = newConditions
          this.props.handleOnChange({
            target: {
              name: key,
              value: predicate
            }
          })
        }
      } else {
        this.props.handleOnChange({
          target: {
            name: key,
            value: Map({
              condition: this.props.getDefaultCondition(schema.config.type),
              values: List()
            })
          }
        })
      }
    }
  }

  renderDeleteIcon = (key, value, predicateIndex) => {
    if (this.props.enableDelete) {
      return (
        <i
          id={'deleteIcon'}
          className={X_ICON_CLASS}
          style={{color: '#8c0000', marginTop: '3px'}}
          onClick={(e) => {
            this.handleRemoveConditionClick(e, key, predicateIndex)
            e.preventDefault()
          }}
        />
      )
    } else {
      return null
    }
  }

  getConditionValue = (rawValue) => {
    if (rawValue && rawValue.condition) {
      return rawValue.condition
    } else {
      return 'contains'
    }
  }

  getFieldType = (fieldName) => {
    let {formSchema = {}} = this.props
    if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS()
    let type = ''
    formSchema.jsonschema.layout.forEach((field) => {
      if (field.config.name === fieldName) {
        type = field.config.type
        return true
      }
    })
    return type
  }

  buildTableRow = (key, value, predicateIndex = -1) => {
    let extraCondRowStyles = {}
    let rowClick
    if (this.props.conditionRowOnClick) {
      extraCondRowStyles = {...extraCondRowStyles, cursor: 'pointer'}
      rowClick = (e) => {
        if (e.target.id !== 'deleteIcon') {
          this.props.conditionRowOnClick(key, value)
        }
      }
    }
    if (value && this.state.noValueConditions.has(value.condition)) {
      return (
        <tr key={`row-${key}-${predicateIndex}`} style={{...extraCondRowStyles}} onClick={rowClick}>
          <td key={`column-${key}-${predicateIndex}`} style={{wordWrap: 'break-word'}}>
            <strong>{this.getLabel(key)} </strong>
            {value.not && '(exclude) '}{value.condition}
            {this.renderDeleteIcon(key, value, predicateIndex)}
          </td>
        </tr>
      )
    }
    if (value && typeof value === 'string') { // raw inputs
      let val = value
      if (this.getFieldType(key) === 'checkbox') {
        if (val === '0' || val === 0) {
          val = 'false'
        } else {
          val = 'true'
        }
      }
      return ( // for basic input
        <tr key={`row-${key}-${predicateIndex}`} style={{...extraCondRowStyles}} onClick={rowClick}>
          <td key={`column-${key}-${predicateIndex}`} style={{wordWrap: 'break-word'}}>
            <strong>{this.getLabel(key)} </strong>
            {value.not && '(exclude) '}contains {val}
            {this.renderDeleteIcon(key, value, predicateIndex)}
          </td>
        </tr>
      )
    } else if (typeof value === 'boolean') {
      return (
        <tr key={`row-${key}-${predicateIndex}`} style={{...extraCondRowStyles}} onClick={rowClick}>
          <td key={`column-${key}-${predicateIndex}`}>
            <strong>{this.getLabel(key)} </strong>
            is {value ? 'True' : 'False'}
            {this.renderDeleteIcon(key, value, predicateIndex)}
          </td>
        </tr>
      )
    } else {
      if (value.values &&
        value.values.length === 0 &&
        (!value.dynamicValues || (value.dynamicValues && value.dynamicValues.length === 0))) {
        return null
      }

      return (
        <tr key={`row-${key}-${predicateIndex}`} style={{...extraCondRowStyles}} onClick={rowClick}>
          <td key={`column-${key}-${predicateIndex}`}>
            <strong>{this.getLabel(key)}</strong>
            {this.buildMultiString(key, value.values.concat(value.dynamicValues || []), value.not, value)}
            {this.renderDeleteIcon(key, value.values.concat(value.dynamicValues || []), predicateIndex)}
          </td>
        </tr>
      )
    }
  }

  render () {
    let {formValues = {}} = this.props
    if (typeof formValues.toJS === 'function') formValues = formValues.toJS()
    const singleRows = Object.keys(formValues)
      .sort((a, b) => {
        if (this.getLabel(a) === undefined || this.getLabel(b) === undefined) {
          return 0
        }
        return this.getLabel(a).localeCompare(this.getLabel(b))
      })
    const tbody = []
    singleRows.forEach((key) => {
      if (this.props.formValues[key]) {
        if (this.props.formValues[key].type) {
          this.props.formValues[key].conditions.forEach((v, predicateIndex) => {
            tbody.push(this.buildTableRow(key, v, predicateIndex))
          })
        } else {
          tbody.push(this.buildTableRow(key, this.props.formValues[key]))
        }
      }
    })
    const isDisabled = this.buildRequest(this.props.formValues).query.conditions.length === 0
    const {listOpen} = this.state
    const extraFooters = this.props.extraFooters ? this.props.extraFooters : []
    return (
      <div className='table-responsive' style={{width: '100%', maxHeight: '620px'}}>
        <div style={{width: '100%', maxHeight: '550px', overflowY: 'auto'}}>
          <table className='table table-bordered table-striped' style={{width: '100%'}}>
            <thead>
              <tr>
                <th className={`col-lg-${6} col-md-${6} col-sm-${6}`} style={{display: 'inlineBlock'}}>
                  <span>{this.props.title}</span>
                  <span className='pull-right'>
                    <Toggle
                      ref='row-toggle'
                      value={this.props.toggleValue === 'and'}
                      onToggle={this.handleToggleClick}
                      activeLabel='and'
                      inactiveLabel='or'
                    />
                  </span>
                </th>
              </tr>
            </thead>
            {tbody.length && listOpen ? <tbody>
              {tbody}
            </tbody> : null}
            {this.props.enableListToggle && <div
              style={{
                width: '100%',
                textAlign: 'center',
                transform: `scale(1, ${listOpen ? '' : '-'}1)`,
                userSelect: 'none'
              }}
              className='cursor-hand'
              onClick={() => this.setState(() => ({listOpen: !listOpen}))}
            >
              ^
            </div>}
            <tfoot>
              <tr>
                <td>
                  {(this.props.enableResetButton || this.props.enableNextButton) ? <div
                    style={{
                      marginRight: '10px',
                      marginBottom: '10px',
                      marginTop: '10px',
                      display: 'flex',
                      flexDirection: 'row-reverse',
                      width: '100%'
                    }}
                  >
                    {this.props.enableResetButton && <button
                      className={this.props.primaryButtonClass || 'btn btn-primary pull-right'}
                      style={{marginRight: '10px', marginBottom: '10px'}}
                      onClick={this.resetForm}
                      disabled={isDisabled}
                    >
                      Reset
                    </button>}
                    {this.props.enableNextButton && <button
                      className={this.props.primaryButtonClass || 'btn btn-primary pull-right'}
                      style={{marginRight: '10px', marginBottom: '10px'}}
                      onClick={this.onNextClick}
                      disabled={isDisabled}
                    >
                      Next
                    </button>}
                    {extraFooters}
                  </div> : null}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    )
  }
}
