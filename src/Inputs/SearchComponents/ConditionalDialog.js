import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Dialog} from 'c2-dialog'
import {FormBuilder} from '../../index'
import {Map, List, fromJS, Set} from 'immutable'
import {CONDITIONS, TYPEAHEAD_CONDITIONS, NUMERICAL_CONDITIONS, MULTI_FIELD_INPUTS, DATES, SINGLE_FIELD_INPUTS} from './utils'// eslint-disable-line
const STRING_VALUES = Set(['input', 'number', 'percentage', 'currency', 'datetime'])
const ConditionalDialog = props => {
  function inputTypeOptionsList () {
    return Object.keys(CONDITIONS).map(c => ({label: c, value: c}))
  }

  const [modalValues, setModalValues] = useState(Map({condition: 'contains'}))
  useEffect(() => {
    // const v = props.values[props.name]
    if (props.name) {
      let initCondition = 'contains'
      if (props.values.getIn([props.name, 'condition'])) {
        initCondition = props.values.getIn([props.name, 'condition'])
      }
      let initialModalValues = {condition: initCondition}
      if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues[`${props.name}-0`] = props.value.get('values', List())
      } else {
        if (props.value.get('values', List()).size) {
          props.value.get('values', List()).forEach((v, i) => {
            initialModalValues[`${props.name}-${i}`] = v
          })
        } else {
          initialModalValues[`${props.name}-0`] = ''
        }
      }

      setModalValues(Map(initialModalValues))
    }
  }, [props.name])
  function getMaxFieldCount () {
    if (CONDITIONS[condition()]) {
      return CONDITIONS[condition()].maxFields
    } else {
      return 999
    }
  }
  function getMinFieldCount () {
    if (CONDITIONS[condition()]) {
      return CONDITIONS[condition()].minFields
    } else {
      return 0
    }
  }
  function calculateFieldHeight (type) {
    if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
      return props.keyword.options.length
    }
    if (type === 'multiselect') {
      return 1 + (modalValues[`${props.name}-0`] ? modalValues[`${props.name}-0`].length / 3 : 0)
    }
    return 1
  }

  function nFieldsWithValues () {
    let ret = 0
    if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
      if (props.value.get('values', List()).size > 0) {
        ret = 1
      } else {
        ret = 0
      }
    } else {
      ret = props.value.get('values', List()).size
    }
    return ret
  }
  function getSchema () {
    let schema = {
      form: {
        name: 'Conditional Input1',
        description: 'allow more complex inputs.',
        jsonschema: {
          layout: [
            {
              type: 'field',
              dimensions: {x: 0, y: 0, h: 1, w: 12},
              config: {
                // name: props.name,
                type: 'header',
                label: `${props.label} condition:`
              }
            },
            {
              type: 'field',
              dimensions: {x: 1, y: 1, h: 1, w: 8},
              config: {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                suppressBlankOption: true,
                clearable: false,
                keyword: {
                  category: 'NONE',
                  options: inputTypeOptionsList()
                }
              }
            }
          ]
        }
      },
      id: 'FDC58F0F0B2099E61BE23AB6110572E1',
      lastUpdateDate: '2018-02-26 10:16:14',
      lastUpdateBy: 'will darden',
      createdDate: '2018-02-26 10:16:14',
      createdBy: 'will darden'
    }
    const maxFieldCount = getMaxFieldCount()
    const minFieldCount = getMinFieldCount()
    let fieldCount = 0
    if (maxFieldCount < 3 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 4, y: 2, h: 1, w: 6},
        config: {
          // name: props.name,
          type: 'header',
          link: undefined,
          style: {label: {lineHeight: '12px', fontSize: '12px'}},
          label: `(${maxFieldCount} value${maxFieldCount === 1 ? '' : 's'} allowed)`
        }
      })
    }
    let extraFieldProps = {...props}
    delete extraFieldProps.onChange
    delete extraFieldProps.handleOnChange
    delete extraFieldProps.name
    delete extraFieldProps.values
    delete extraFieldProps.value
    if (fieldCount < nFieldsWithValues() + 1 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 1, y: 3, h: calculateFieldHeight(props.inputType.toLowerCase()), w: 8},
        config: {
          ...extraFieldProps,
          link: undefined,
          autofocus: true,
          readonly: false,
          name: `${props.name}-0`,
          label: `${props.label}`,
          interactive: true,
          type: DATES.has(props.inputType.toLowerCase()) && NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(),// eslint-disable-line
          handleOnChange: dialogOnChange
        }
      })
      fieldCount++
    }
    if (MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0) {
      while (fieldCount < minFieldCount || (fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1)) {
        let label = CONDITIONS[condition()]
        if (typeof label === 'object') {
          label = label.joinString
        }
        if (!label) {
          label = `     ...or`
        }
        let newField = {
          type: 'field',
          dimensions: {x: 1, y: fieldCount + 3, h: calculateFieldHeight(props.inputType.toLowerCase()), w: 8},
          config: {
            ...extraFieldProps,
            link: undefined,
            readonly: false,
            name: `${props.name}-${fieldCount}`,
            label: label,
            interactive: true,
            type: DATES.has(props.inputType.toLowerCase()) && NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(),// eslint-disable-line
            handleOnChange: dialogOnChange
          }
        }
        if (props.typeahead) {
          newField.config.typeahead = props.typeahead
        }
        schema.form.jsonschema.layout.push(newField)
        fieldCount++
      }
    }
    return schema
  }

  function condition () {
    let oldValue = props.values.get(props.name)
    if (oldValue && oldValue instanceof Map) {
      return props.values.get(props.name, Map()).get('condition', '')
    } else {
      return modalValues.get('condition', 'contains')
    }
  }
  function handleConditionChange (e) {
    const currentCondition = condition()
    setModalValues(modalValues.set(e.target.name, e.target.value))
    let trueType = (props.inputType || 'input').toLowerCase()
    if (trueType === 'typeahead') {
      if (TYPEAHEAD_CONDITIONS.has(currentCondition) && !TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(() => { dialogOnChange({target: {name: `${props.name}-0`, value: ''}}) }, 0)
      } else if (!TYPEAHEAD_CONDITIONS.has(currentCondition) && TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(() => { dialogOnChange({target: {name: `${props.name}-0`, value: List()}}) }, 0)
      }
    }
    let oldValue = props.values.get(props.name)
    if (oldValue && oldValue instanceof Map) {
      let newFieldValue = props.values.get(props.name, Map()).set(e.target.name, e.target.value)
      let maxFieldValues = CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields
      if (newFieldValue.get('values', List()).size >= maxFieldValues) {
        newFieldValue = newFieldValue.set('values', newFieldValue.get('values', List()).slice(0, maxFieldValues))
      }
      props.onChange({target: {name: props.name, value: newFieldValue}})
    }
    if ((!NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) &&
        NUMERICAL_CONDITIONS.has(e.target.value)) ||
      (NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) &&
        !NUMERICAL_CONDITIONS.has(e.target.value))) {
      let newFieldValue = props.values.get(props.name, Map()).set(e.target.name, e.target.value)
      newFieldValue = newFieldValue.set('values', List())
      props.onChange({target: {name: props.name, value: newFieldValue}})
    }
  }

  const dialogOnChange = (e) => {
    if (e.target.name === 'condition') {
      handleConditionChange(e)
      return
    }
    setModalValues(modalValues.set(e.target.name, e.target.value)) // for display in the dialog
    let newFieldValue = props.value || Map({condition: 'contains', values: List()})
    let values = newFieldValue.get('values', List())
    if (STRING_VALUES.has(props.inputType.toLowerCase())) {
      // i have a string. what index?
      let i = e.target.name.split('-')[e.target.name.split('-').length - 1]
      values = values.set(i, e.target.value)
    } else {
      values = values = fromJS(e.target.value)
    }
    newFieldValue = newFieldValue.set('values', values)
    props.onChange({target: {name: props.name, value: newFieldValue}})
  }
  return (
    <Dialog
      size={{width: '800px', height: '450px'}}
      default={{y: ((window.innerHeight / 2) - 250 + window.scrollY), x: ((window.innerWidth / 2) - 260)}}
      center
      style={{
        background: '#fff',
        boxShadow: '0px 0px 15px #444',
        borderRadius: '5px',
        border: '2px solid #36a9e1',
        overflowY: 'visible'
      }}
      enableResizing
      disableDragging
    >
      <div style={{width: '100%'}}>
        <button
          type='button'
          className='close'
          style={{paddingRight: '10px', paddingTop: '5px', display: 'inline-block'}}
          onClick={() => props.handleClose(false)}
        >
          <span>&times;</span>
        </button>
        <div
          style={{
            width: '720px',
            maxHeight: '410px',
            marginTop: '10px',
            scroll: 'auto',
            overflowY: 'auto'
          }}
        >
          <FormBuilder
            formSchema={getSchema()}
            formValues={modalValues}
            conditionalSearch={false}
            handleOnChange={dialogOnChange}
            draggable={false}
            interactive
          />
        </div>
        <button
          type='button'
          className='btn-primary pull-right'
          style={{marginRight: '15px'}}
          onClick={() => props.handleClose(false)}
        >
          Ok
        </button>
      </div>
    </Dialog>
  )
}

export default ConditionalDialog

ConditionalDialog.propTypes = {
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnChange: PropTypes.func,
  name: PropTypes.string,
  inputType: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.object,
  typeahead: PropTypes.object,
  keyword: PropTypes.object
}
