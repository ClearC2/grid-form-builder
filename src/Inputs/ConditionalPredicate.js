import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {FormBuilder} from '../index'
import {Map, List, fromJS, Set} from 'immutable'
import {CONDITIONS, TYPEAHEAD_CONDITIONS, NUMERICAL_CONDITIONS, MULTI_FIELD_INPUTS, DATES, SINGLE_FIELD_INPUTS} from './SearchUtils'// eslint-disable-line
const STRING_VALUES = Set(['input', 'number', 'percentage', 'currency', 'datetime'])
const ConditionalPredicate = props => {
  let propValue = props.value
  if (!propValue) {
    propValue = Map()
  }
  function convertListToOptions (list) {
    const inputType = props.inputType.toLowerCase()
    if (inputType === 'number' || inputType === 'currency' || inputType === 'decimal') {
      list = list.filter(l => {
        return (l !== 'is blank' &&
          l !== 'is not blank' &&
          l !== 'contains' &&
          l !== 'does not contain'
        )
      })
    }
    return list.map(opt => {
      return {value: opt, label: opt}
    })
  }
  function inputTypeOptionsList () {
    const options = [] // Object.keys(CONDITIONS).map(c => ({label: c, value: c}))
    Object.keys(CONDITIONS).forEach((key) => {
      const excludes = Set(CONDITIONS[key].invalidInputTypes)
      if (!excludes.has(props.inputType.toLowerCase())) {
        options.push(key)
      }
    })
    return convertListToOptions(options)
  }
  const [modalValues, setModalValues] = useState(Map({condition: inputTypeOptionsList()[0].value}))
  useEffect(() => {
    // const v = props.values[props.name]
    if (props.name) {
      let initCondition = inputTypeOptionsList()[0].value
      if (props.value.getIn(['condition']) && inputTypeOptionsList()
        .some(c => c.value === props.value.getIn(['condition']))) {
        initCondition = props.value.getIn(['condition'], inputTypeOptionsList()[0].value)
      }
      const initialModalValues = {condition: initCondition}
      if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues[`${props.name}-0`] = propValue.get('values', List())
      } else {
        if (propValue.get('values', List()).size) {
          propValue.get('values', List()).forEach((v, i) => {
            initialModalValues[`${props.name}-${i}`] = v
          })
        } else {
          initialModalValues[`${props.name}-0`] = ''
        }
      }
      if (props.value.getIn(['dynamicValues'])) {
        initialModalValues.dynamicValues = props.value.getIn(['dynamicValues'])
      }
      if (props.value.getIn(['relative'])) {
        initialModalValues.relative = props.value.getIn(['relative'])
      }
      dialogOnChange({target: {name: 'condition', value: initCondition}})
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
    if (!propValue) {
      return 0
    }
    if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
      if (propValue.get('values', List()).size > 0) {
        ret = 1
      } else {
        ret = 0
      }
    } else {
      ret = propValue.get('values', List()).size
    }
    return ret
  }
  function hasDynamicValues () {
    return props.typeahead &&
      props.typeahead.key &&
      props.typeahead.key.toLowerCase().startsWith('c3_sec_') &&
      modalValues &&
      (modalValues.get('condition', '') === 'is one of' || modalValues.get('condition', '') === 'is not one of')
  }
  function getSchema () {
    const schema = {
      form: {
        name: 'Conditional Input1',
        description: 'allow more complex inputs.',
        jsonschema: {
          layout: [
            {
              type: 'field',
              dimensions: {x: 1, y: 0, h: 1, w: 8},
              config: {
                name: 'condition',
                label: `Condition ${props.index + 1}`,
                type: 'select',
                suppressBlankOption: true,
                clearable: false,
                keyword: {
                  category: 'NONE',
                  options: inputTypeOptionsList()
                }
              }
            },
            {
              type: 'field',
              dimensions: {x: 1, y: 1, h: 1, w: 3},
              config: {
                name: 'not',
                label: 'Exclude Condition',
                type: 'checkbox',
                onValue: true,
                offValue: false
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

    const relativeConditions = ['is greater than', 'is less than']
    if (relativeConditions.includes(modalValues.get('condition')) && props.inputType === 'date') {
      schema.form.jsonschema.layout.push(
        {
          type: 'field',
          dimensions: {x: 1, y: 2, h: 1, w: 3},
          config: {
            name: 'relative',
            label: 'Use Relative Dates',
            type: 'checkbox',
            onValue: 1,
            offValue: 0
          }
        }
      )
      if (modalValues.get('relative')) {
        schema.form.jsonschema.layout.push(
          {
            type: 'field',
            dimensions: {x: 1, y: 3, h: 1, w: 8},
            config: {
              name: `${props.name}-0`,
              label: `${props.label}`,
              type: 'select',
              suppressBlankOption: true,
              clearable: false,
              keyword: {
                category: 'NONE',
                options: [
                  {label: 'Yesterday', value: 'yesterday'},
                  {label: 'Today', value: 'today'},
                  {label: 'Tomorrow', value: 'tomorrow'},
                  {label: 'This Month', value: 'this month'},
                  {label: 'This Year', value: 'this year'},
                  {label: 'This Quarter', value: 'this quarter'}
                ]
              }
            }
          }
        )
      }
    }

    const maxFieldCount = getMaxFieldCount()
    const minFieldCount = getMinFieldCount()
    let fieldCount = 0
    if (maxFieldCount < 3 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 4, y: 1, h: 1, w: 6},
        config: {
          // name: props.name,
          type: 'header',
          link: undefined,
          style: {label: {lineHeight: '12px', fontSize: '12px'}},
          label: `(${maxFieldCount} value${maxFieldCount === 1 ? '' : 's'} allowed)`
        }
      })
    }

    if (hasDynamicValues()) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 3, y: 1, h: 2, w: 6},
        config: {
          name: 'dynamicValues',
          type: 'multicheckbox',
          link: undefined,
          style: {label: {lineHeight: '12px', fontSize: '12px'}},
          label: `(${maxFieldCount} value${maxFieldCount === 1 ? '' : 's'} allowed)`,
          delimit: 'value',
          keyword: {
            category: 'NONE',
            options: [
              {label: '{Logged on User}', value: '{Logged on User}'},
              {label: '{Reports to Logged on User}', value: '{Reports to Logged on User}'}
            ]
          }
        }
      })
    }
    const extraFieldProps = {...props}
    delete extraFieldProps.onChange
    delete extraFieldProps.handleOnChange
    delete extraFieldProps.name
    delete extraFieldProps.values
    delete extraFieldProps.value
    if (fieldCount < nFieldsWithValues() + 1 && maxFieldCount > 0 && !modalValues.get('relative')) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {x: 1, y: 2, h: calculateFieldHeight(props.inputType.toLowerCase()), w: 8},
        config: {
          ...extraFieldProps,
          link: undefined,
          autofocus: true,
          readonly: false,
          name: `${props.name}-0`,
          label: `${props.label}`,
          interactive: true,
          clearable: true,
          searchable: true, // I just added this line
          type: NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) ? 'number' : props.inputType.toLowerCase(),// eslint-disable-line
          handleOnChange: dialogOnChange
        }
      })
      fieldCount++
    }
    if (MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0 && !modalValues.get('relative')) {
      while (fieldCount < minFieldCount || (fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1)) {
        let label = CONDITIONS[condition()]
        if (typeof label === 'object') {
          label = label.joinString
        }
        if (!label) {
          label = `     ...or`
        }
        const newField = {
          type: 'field',
          dimensions: {x: 1, y: fieldCount + 2, h: calculateFieldHeight(props.inputType.toLowerCase()), w: 8},
          config: {
            ...extraFieldProps,
            link: undefined,
            readonly: false,
            name: `${props.name}-${fieldCount}`,
            label: label,
            interactive: true,
            clearable: true,
            type: NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) ? 'number' : props.inputType.toLowerCase(),// eslint-disable-line
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
    const oldValue = props.value
    if (oldValue && oldValue instanceof Map) {
      return props.value.get('condition', '')
    } else {
      return modalValues.get('condition', 'contains')
    }
  }
  function handleConditionChange (e) {
    const currentCondition = condition()
    setModalValues(modalValues.set(e.target.name, e.target.value))
    const trueType = (props.inputType || 'input').toLowerCase()
    if (trueType === 'typeahead') {
      if (TYPEAHEAD_CONDITIONS.has(currentCondition) && !TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(() => { dialogOnChange({target: {name: `${props.name}-0`, value: ''}}) }, 0)
      } else if (!TYPEAHEAD_CONDITIONS.has(currentCondition) && TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(() => { dialogOnChange({target: {name: `${props.name}-0`, value: List()}}) }, 0)
      }
    }
    const oldValue = props.value
    if (oldValue && oldValue instanceof Map) {
      let newFieldValue = props.value.set(e.target.name, e.target.value)
      const maxFieldValues = CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields
      if (newFieldValue.get('values', List()).size >= maxFieldValues) {
        newFieldValue = newFieldValue.set('values', newFieldValue.get('values', List()).slice(0, maxFieldValues))
      }
      props.onChange({target: {name: props.name, value: newFieldValue}}, props.index)
    }
    if ((!NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) &&
        NUMERICAL_CONDITIONS.has(e.target.value)) ||
      (NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) &&
        !NUMERICAL_CONDITIONS.has(e.target.value))) {
      let newFieldValue = props.value.set(e.target.name, e.target.value)
      newFieldValue = newFieldValue.set('values', List())
      props.onChange({target: {name: props.name, value: newFieldValue}}, props.index)
    }
  }

  function deleteIndex (i, values) {
    let stateChanges = modalValues
    for (let x = parseInt(i); x < values.size - 1; x++) {
      const next = x + 1
      stateChanges = stateChanges.set(`${props.name}-${x}`, modalValues.get(`${props.name}-${next}`, ''))
    }
    stateChanges = stateChanges.delete(`${props.name}-${values.size - 1}`)
    if (i === 'relative') {
      stateChanges = stateChanges.delete(`${i}`)
    }
    setModalValues(stateChanges)
    return values.splice(i, 1)
  }

  const dialogOnChange = (e) => {
    if (e.target.name === 'condition') {
      handleConditionChange(e)
      return
    }
    setModalValues(modalValues.set(e.target.name, e.target.value)) // for display in the dialog
    let newFieldValue = props.value || Map({condition: 'contains', values: List()})
    let values = newFieldValue.get('values', List())
    if (newFieldValue.get('relative') && e.target.value === '') {
      newFieldValue = newFieldValue.set(e.target.name, e.target.value)
      newFieldValue = newFieldValue.delete('relative')
      newFieldValue = newFieldValue.set('values', List())
      var m = modalValues
      m = m.set(e.target.name, '')
      m = m.delete('relative')
      setModalValues(m)
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index)
      return
    }
    if (e.target.name === 'monthtest-0' && e.target.value === '') {
      newFieldValue = newFieldValue.set(e.target.name, e.target.value)
      newFieldValue = newFieldValue.delete('relative')
      newFieldValue = newFieldValue.set('values', List())
      let m = modalValues
      m = m.set('monthtest-0', '')
      m = m.delete('relative')
      setModalValues(m)
      props.onChange({target: {name: props.name, value: newFieldValue}}, props.index)
      return
    }
    if (e.target.name === 'relative') {
      newFieldValue = newFieldValue.set('relative', e.target.value)
      newFieldValue = newFieldValue.set('values', List())
      let m = modalValues.set(e.target.name, e.target.value)
      m = m.delete(`${props.name}-0`)
      setModalValues(m)
      props.onChange({target: {name: props.name, value: newFieldValue}}, props.index)
      return
    }
    if (e.target.name === 'not') {
      newFieldValue = newFieldValue.set('not', e.target.value)
      props.onChange({target: {name: props.name, value: newFieldValue}}, props.index)
      return
    }
    if (STRING_VALUES.has(props.inputType.toLowerCase())) {
      // i have a string. what index?
      const i = parseInt(e.target.name.split('-')[e.target.name.split('-').length - 1])
      if (e.target.value === '') {
        values = deleteIndex(i, values)
      } else {
        values = values.set(i, e.target.value)
      }
    } else {
      if (typeof e.target.value === 'string') {
        const i = parseInt(e.target.name.split('-')[e.target.name.split('-').length - 1])
        if (i > values.size - 1) {
          values = values.concat(fromJS([e.target.value]))
        } else {
          if (e.target.value === '') {
            if (i) {
              values = deleteIndex(i, values)
            } else {
              values = deleteIndex(e.target.name, values)
            }
          } else {
            if (e.target.name) {
              values = fromJS([e.target.value])
            } else {
              values = values.set(i, e.target.value)
            }
          }
        }
      } else {
        values = fromJS(e.target.value)
      }
    }
    if (e.target.name === 'dynamicValues') {
      // newFieldValue = newFieldValue.set('condition', 'is one of')
      newFieldValue = newFieldValue.set('dynamicValues', e.target.value)
    }
    newFieldValue = newFieldValue.set('values', values)
    props.onChange({target: {name: props.name, value: newFieldValue}}, props.index)
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      <FormBuilder
        formSchema={getSchema()}
        formValues={modalValues}
        conditionalSearch={false}
        handleOnChange={dialogOnChange}
        draggable={false}
        interactive
      />
    </div>
  )
}

export default ConditionalPredicate

ConditionalPredicate.propTypes = {
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnChange: PropTypes.func,
  name: PropTypes.string,
  inputType: PropTypes.string,
  index: PropTypes.number,
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
