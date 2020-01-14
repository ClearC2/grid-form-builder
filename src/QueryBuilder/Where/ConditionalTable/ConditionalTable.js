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
    extraFooters: PropTypes.object,
    handleOnChange: PropTypes.func,
    title: PropTypes.string,
    primaryButtonClass: PropTypes.string,
    enableResetButton: PropTypes.bool,
    enableNextButton: PropTypes.bool,
    enableToggle: PropTypes.bool,
    toggleValue: PropTypes.string,
    onToggleChange: PropTypes.func,
    enableDelete: PropTypes.bool,
    onQueryChange: PropTypes.func,
    getDefaultCondition: PropTypes.func,
    getFieldSchema: PropTypes.func,
    enableListToggle: PropTypes.bool
  }

  constructor (props) {
    super(props)
    let noValueConditions = []
    Object.keys(CONDITIONS).forEach((k) => {
      if (CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k)
      }
    })
    this.state = {
      conditionType: 'and',
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

  UNSAFE_componentWillReceiveProps (props) { // eslint-disable-line
    if (this.props.formValues !== props.formValues) {
      if (this.props.onQueryChange) {
        this.props.onQueryChange(this.buildRequest(props.formValues))
      }
    }
  }

  buildMultiString = (key, value) => {
    let valString = ''
    if (value) {
      if (typeof value === 'string') {
        let splitVal = value.split('¤')
        if (splitVal.length > 1) {
          value = splitVal
        } else {
          value = [value]
        }
      } else if (typeof value === 'object') {
        if (typeof value[0] === 'string' && value[0].split('¤').length > 1) {
          value = value[0].split('¤')
        } else {
          value = value.map(v => v.label || v)
        }
      }
      let i = value.length
      let cond = this.getConditionValue(key) || 'contains'
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
              val = val.label
            }
          }
          valString = valString + val + ((i > 1) ? ', ' : '')
          i--
        })
      }
      return ' ' + this.getConditionValue(key) + ' ' + valString
    } else {
      return ''
    }
  }

  getLabel = (key) => {
    if (this.props.formSchema && this.props.formSchema.jsonschema && this.props.formSchema.jsonschema.layout) {
      let fieldSchema = this.props.getFieldSchema(key)
      let name = ''
      if (fieldSchema) {
        name = fieldSchema.config.label || (fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.label)
      }
      return name || ''
    } else {
      return 'No Key in schema'
    }
  }

  buildRequest = (formValues = this.props.formValues) => {
    let req = {
      query: {
        type: this.state.conditionType,
        conditions: []
      }
    }
    Map(formValues).forEach((value, key) => {
      let rawValues
      let newValue = List()
      if (typeof value === 'string') {
        if (value !== '') {
          let splitVal = value.split('¤')
          if (splitVal.length > 1) {
            newValue = List(splitVal)
          } else {
            newValue = List([value])
          }
        }
      } else if (typeof value === 'object' && value.condition === undefined) {
        newValue = List(value)
      } else {
        if (typeof value.values[0] === 'object') {
          // for typeaheads
          rawValues = value.values
          let ids = value.values.map(obj => obj.value)
          newValue = List(ids)
        } else if (typeof value.values[0] === 'string') {
          // inputs
          if (typeof value.values === 'string') {
            let splitVal = value.values.split('¤')
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
      if (newValue.size > 0 || this.state.noValueConditions.has(value.condition)) {
        let cond = 'contains'
        if (formValues[key] && formValues[key].condition) {
          cond = formValues[key].condition
        }
        if (newValue.size > CONDITIONS[cond].maxFields) {
          newValue = newValue.slice(0, CONDITIONS[cond].maxFields)
        }
        req.query.conditions.push({
          name: key,
          label: this.getLabel(key),
          comparator: cond,
          values: newValue,
          rawValues: rawValues
        })
      }
    })
    return req
  }
  onNextClick = () => {
    let req = this.buildRequest()
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
    Object.keys(this.props.formValues).map(key => {
      let schema = this.props.getFieldSchema(key)
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

  handleRemoveConditionClick = (e, key) => {
    let schema = this.props.getFieldSchema(key)
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

  renderDeleteIcon = (key) => {
    if (this.props.enableDelete) {
      return (
        <i
          className={X_ICON_CLASS}
          style={{color: '#8c0000', marginTop: '3px'}}
          onClick={(e) => {
            this.handleRemoveConditionClick(e, key)
          }}
        />
      )
    } else {
      return null
    }
  }

  getConditionValue = (key) => {
    if (this.props.formValues[key] && this.props.formValues[key].condition) {
      return this.props.formValues[key].condition
    } else {
      return 'contains'
    }
  }
  getFieldType = (fieldName) => {
    let type = ''
    this.props.formSchema.jsonschema.layout.forEach((field) => {
      if (field.config.name === fieldName) {
        type = field.config.type
        return true
      }
    })
    return type
  }

  buildTableRow = (key, value) => {
    if (value && this.state.noValueConditions.has(value.condition)) {
      return (
        <tr key={`row-${key}`}>
          <td key={`column-${key}`} style={{wordWrap: 'break-word'}}>
            <strong>{this.getLabel(key)} </strong>
            {value.condition}
            {this.renderDeleteIcon(key)}
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
        <tr key={`row-${key}`}>
          <td key={`column-${key}`} style={{wordWrap: 'break-word'}}>
            <strong>{this.getLabel(key)} </strong>
            is equal to {val}
            {this.renderDeleteIcon(key, value)}
          </td>
        </tr>
      )
    } else if (typeof value === 'boolean') {
      return (
        <tr key={`row-${key}`}>
          <td key={`column-${key}`}>
            <strong>{this.getLabel(key)} </strong>
            is {value ? 'True' : 'False'}
            {this.renderDeleteIcon(key, value)}
          </td>
        </tr>
      )
    } else {
      if (value.values && value.values.length === 0) {
        return null
      }
      return (
        <tr key={`row-${key}`}>
          <td key={`column-${key}`}>
            <strong>{this.getLabel(key)}</strong>
            {this.buildMultiString(key, value.values)}
            {this.renderDeleteIcon(key, value.values)}
          </td>
        </tr>
      )
    }
  }

  render () {
    const tbody = Object.keys(this.props.formValues)
      .sort((a, b) => {
        if (this.getLabel(a) === undefined || this.getLabel(b) === undefined) {
          return 0
        }
        return this.getLabel(a).localeCompare(this.getLabel(b))
      })
      .map((key) => {
        if (this.props.formValues[key]) {
          return this.buildTableRow(key, this.props.formValues[key])
        } else {
          return null
        }
      })
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
                      value={this.state.conditionType === this.props.toggleValue}
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
                      disabled={this.buildRequest().query.conditions.length === 0}
                    >
                      Reset
                    </button>}
                    {this.props.enableNextButton && <button
                      className={this.props.primaryButtonClass || 'btn btn-primary pull-right'}
                      style={{marginRight: '10px', marginBottom: '10px'}}
                      onClick={this.onNextClick}
                      disabled={this.buildRequest().query.conditions.length === 0}
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
