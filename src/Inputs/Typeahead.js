import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import Async from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'
import {isMobile} from '../utils'
import GFBConfig from '../config'
import ValidationErrorIcon from '../ValidationErrorIcon'

const viewPortHeight = document.documentElement.clientHeight

const Typeahead = props => {
  const {
    name,
    label,
    value,
    values,
    onChange,
    allowcreate,
    autofocus,
    multi,
    disabled,
    readonly,
    placeholder,
    requiredWarning,
    required,
    tabIndex,
    onKeyDown = () => null, // sometimes provided in the config object
    draggable,
    persist = true,
    typeahead = {},
    minChars = 1,
    stringify,
    autoComplete,
    interactive = true
  } = props

  let {
    delimit,
    delimiter
  } = props

  const [input, changeInput] = useState({Typeahead: allowcreate ? AsyncCreatable : Async})
  const [inputValue, updateInputValue] = useState('')
  const [selectValue, updateSelectValue] = useState({label: '', value: ''})
  const [isZipCode, updateIsZip] = useState(
    (label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2
  )
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState(false)
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [isFocused, setIsFocused] = useState(false)

  const inputContainer = useRef(null)

  useEffect(() => {
    changeInput({Typeahead: allowcreate ? AsyncCreatable : Async})
  }, [allowcreate, changeInput])

  useEffect(() => {
    updateIsZip((label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2)
  }, [label, inputValue, updateIsZip])

  useEffect(() => {
    updateIsRequiredFlag(required && requiredWarning && !value.length)
  }, [updateIsRequiredFlag, required, requiredWarning, value])

  const convertValueStringToValueArrayIfNeeded = useCallback(value => {
    const attemptConvertStringObjectToObject = string => {
      try {
        return JSON.parse(string)
      } catch (e) {
        return string
      }
    }
    if (multi && stringify && value && typeof value === 'string') {
      if (delimiter) {
        value = value.split(delimiter)
        value = value.map(option => attemptConvertStringObjectToObject(option))
      } else {
        try {
          value = JSON.parse(value)
        } catch (e) {
          // eslint-disable-next-line
          console.error('The typeahead field >>', name, '<< attempted to JSON parse >>', value, '<< into an array but the string is not proper JSON. This is a no-op which will cause this typeahead to start with no values.')
          value = []
        }
      }
    }
    return value
  }, [name, multi, stringify, delimiter])

  useEffect(() => {
    let parsedValue = (value && typeof value.toJS === 'function') ? value.toJS() : value
    parsedValue = convertValueStringToValueArrayIfNeeded(parsedValue)
    if (Array.isArray(parsedValue) && parsedValue.length > 0) {
      parsedValue = parsedValue.map(v => {
        if (typeof v === 'object') return v
        if (typeof v === 'string' || typeof v === 'number') return {value: v, label: v}
      })
    }
    if ((typeof parsedValue === 'string' || typeof parsedValue === 'number') && parsedValue.length > 0) {
      parsedValue = {value: parsedValue, label: parsedValue}
    }
    if (parsedValue === '') parsedValue = {label: '', value: ''}
    updateInputValue('')
    updateSelectValue(parsedValue)
  }, [value, convertValueStringToValueArrayIfNeeded])

  const populateConditionObject = useCallback((condition = {name: null, comparator: null, values: []}) => {
    if (!condition.hasOwnProperty('values')) condition.values = []
    const value = values.get(condition.name, '')
    condition.values.push(value)
    return condition
  }, [values])

  const populateFilterBody = useCallback((filter = {}) => {
    // eslint-disable-next-line
    if (filter.hasOwnProperty('name')) {
      populateConditionObject(filter)
      // eslint-disable-next-line
    } else if (filter.hasOwnProperty('conditions') && Array.isArray(filter.conditions)) {
      filter.conditions.map(condition => populateFilterBody(condition))
    }
    return filter
  }, [populateConditionObject])

  const loadOptions = useCallback(search => {
    let {key = null, duplication = false, fieldvalue = null, filter = {}} = typeahead
    if (typeof filter === 'function') filter = filter()
    const minSearchLength = isZipCode ? 3 : minChars

    if (!key && !fieldvalue) {
      // eslint-disable-next-line
      console.error(`The JSON schema representation for ${name} does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}`)
      return Promise.resolve({options: []})
    }

    filter = JSON.parse(JSON.stringify(filter)) // deep clone the object as to not mutate the definition
    populateFilterBody(filter)

    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '')

    if (search.length >= minSearchLength || search === ' ') {
      if (typeof search === 'string' && search.trim() !== '') search = `/${search}`
      return GFBConfig.ajax.post(`/typeahead/name/${key}/search${search}`, {filter})
        .then(resp => {
          return resp.data.data.map(value => {
            if (duplication) {
              value.duplication = duplication
            }
            return value
          })
        })
    }

    return Promise.resolve({options: []})
  }, [typeahead, populateFilterBody, name, values, minChars, isZipCode])

  const formatCreateLabel = useCallback(value => {
    return `Click or Tab to Create "${value}"`
  }, [])

  const noOptionsMessage = useCallback(() => {
    if (isZipCode) {
      return '3 Digits Required'
    }
  }, [isZipCode])

  const handleOnMouseDown = useCallback(e => {
    if (draggable) e.stopPropagation()
  }, [draggable])

  const handleInputBlur = useCallback(() => {
    menuIsOpen && updateIsMenuOpen(false)
    setIsFocused(false)
  }, [menuIsOpen, updateIsMenuOpen])

  const openMenu = useCallback(() => {
    if (!readonly && !disabled && !menuIsOpen) {
      updateIsMenuOpen(true)
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen])

  const setMenuOpenPosition = useCallback(() => {
    const placement = fieldPosition < (viewPortHeight / 2) ? 'bottom' : 'top'
    updateMenuPlacement(placement)
  }, [fieldPosition, updateMenuPlacement])

  const setInputFieldPosition = useCallback(() => {
    const position = inputContainer.current.getBoundingClientRect().top
    if (fieldPosition !== position) {
      updateFieldPosition(position)
    } else {
      setMenuOpenPosition()
    }
  }, [setMenuOpenPosition, fieldPosition])

  const handleInputClick = useCallback(() => {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition()
    }
  }, [disabled, interactive, readonly, setInputFieldPosition])

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
    let simpleValue = typeof value.toJS === 'function' ? value.toJS() : value
    simpleValue = typeof simpleValue === 'object' ? simpleValue.value || simpleValue.label || '' : simpleValue
    if (persist && !multi) {
      // this sets the input value equal to the current value so the user can keep editing it instead of creating a new value, MP HATES the default react-select behavior - JRA 12/09/2019
      updateInputValue(simpleValue)
    }
    handleInputClick()
  }, [value, persist, multi, updateInputValue, handleInputClick])

  useEffect(() => {
    setMenuOpenPosition()
  }, [fieldPosition, setMenuOpenPosition])

  const handleOnInputChange = useCallback((val, e) => {
    if (e.action === 'input-change') {
      !menuIsOpen && openMenu()
      updateInputValue(val)
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue('')
      }
    }
  }, [menuIsOpen, openMenu, updateInputValue, multi, value])

  const emptyFields = useCallback((fields, changeHandler) => {
    fields.forEach(field => {
      const e = {
        target: {
          name: field,
          value: ''
        }
      }
      changeHandler(e)
    })
  }, [])

  const handleSingleValueChange = useCallback(newValue => {
    Object.keys(newValue).forEach(field => {
      let newVal = newValue[field]
      if (field === 'duplication') newVal = newValue.value
      const id = null
      const e = {
        target: {
          name: field,
          value: newVal,
          id
        }
      }
      if (
        values.get(field) !== newVal &&
        field !== 'className' &&
        field !== 'value' &&
        field !== 'label'
      ) {
        onChange(e)
      }
    })
  }, [values, onChange])

  const handleChange = useCallback((newValue, {action}) => {
    let _delimit = delimit
    if (typeof _delimit === 'string') _delimit = [_delimit]
    const {fields = []} = typeahead

    const target = {
      name: name,
      value: (action === 'create-option' && !multi) ? newValue.value : newValue
    }

    switch (action) {
      case 'select-option': {
        updateInputValue('')
        break
      }
      case 'create-option':
        emptyFields(fields, onChange)
        onChange({target})
        return
      case 'clear': {
        emptyFields(fields, onChange)
        onChange({target: {name, value: ''}})
        return
      }
    }

    let value = ''
    if (Array.isArray(newValue)) {
      // it is way too complicated to try to figure out what you want to do with a multiselect typeahead
      // so I'll give it back to the developer raw and let them figure it out -- JRA 7/5/2018
      if (stringify) {
        if (delimiter) {
          if (_delimit && Array.isArray(_delimit)) {
            // if we were provided field(s) to delimit by, build up a special string with just those values
            target.value.forEach(option => {
              _delimit.forEach(field => {
                if (value.indexOf(option[field]) === -1) {
                  value = value + option[field] + delimiter
                }
              })
            })
            value = value.slice(0, -1)
            target.value = value
          } else {
            // if we are supposed to delimit these options but we don't know which field to delimit, we are going to shove the whole object in
            target.value.forEach(option => {
              value = value + JSON.stringify(option) + delimiter
            })
            value = value.slice(0, -1)
            target.value = value
          }
        } else if (_delimit && !delimiter) {
          // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as a stringified array
          value = []
          target.value.forEach(option => {
            _delimit.forEach(field => {
              if (value.indexOf(option[field]) === -1) {
                value.push(option[field])
              }
            })
          })
          value = JSON.stringify(value)
          target.value = value
        } else {
          // if all we want to do is stringify the value, send it back up unmodified but stringified
          target.value = JSON.stringify(target.value)
        }
      } else if (_delimit && !delimiter) {
        // special case where they decided to delimit by some field but don't have a delimiter, we are going to build it up as an array
        value = []
        target.value.forEach(option => {
          _delimit.forEach(field => {
            if (value.indexOf(option[field]) === -1) {
              value.push(option[field])
            }
          })
        })
        target.value = value
      }
      onChange({target})
    } else {
      handleSingleValueChange(newValue)
    }
    menuIsOpen && updateIsMenuOpen(false) // closes menu when new option gets selected
    updateInputValue('')
  }, [
    delimit,
    delimiter,
    emptyFields,
    handleSingleValueChange,
    multi,
    name,
    onChange,
    stringify,
    typeahead,
    menuIsOpen
  ])

  const handleOnKeyDown = useCallback(e => {
    // This fixes the issue where users type and tab too quickly on create fields and the value does not register in the system
    if (e.keyCode === 9 && allowcreate && inputValue) {
      handleChange({value: inputValue}, {action: 'create-option'})
    }
    onKeyDown()
  }, [onKeyDown, handleChange, allowcreate, inputValue])

  const {Typeahead} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'
  const components = {}

  if (isRequiredFlag && (value + '').length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error'
    components.DropdownIndicator = () => {
      return <ValidationErrorIcon message='This Field is Required' />
    }
  }

  return (
    <div className={outerClass} ref={inputContainer} onMouseDown={handleOnFocus}>
      <Typeahead
        className={className}
        classNamePrefix='gfb-input'
        tabIndex={tabIndex}
        autofocus={autofocus}
        blurInputOnSelect
        cacheOptions
        isClearable
        createOptionPosition='first'
        formatCreateLabel={formatCreateLabel}
        multi={multi}
        isDisabled={disabled || readonly || !interactive}
        menuPortalTarget={document.body}
        menuShouldBlockScroll
        name={name}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        inputValue={inputValue}
        menuIsOpen={!isMobile ? menuIsOpen : undefined}
        menuPlacement={!isMobile ? menuPlacement : undefined}
        onKeyDown={handleOnKeyDown}
        onMouseDown={handleOnMouseDown}
        onFocus={handleOnFocus}
        onBlur={handleInputBlur}
        onInputChange={handleOnInputChange}
        loadOptions={loadOptions}
        onChange={handleChange}
        value={selectValue}
        autoComplete={autoComplete}
        components={components}
        styles={{
          multiValue: base => {
            if (!interactive) {
              base.color = 'green'
              base.backgroundColor = '#a6eca67a'
            } else {
              base.backgroundColor = '#8bb7ff91'
            }
            return ({...base})
          },
          singleValue: base => {
            if (!interactive) {
              base.color = 'green'
            }
            return ({...base})
          },
          menuPortal: base => {
            const top = menuPlacement === 'bottom' ? base.top - 28 : base.top - 12
            return ({...base, top})
          }
        }}
      />
    </div>
  )
}

export default Typeahead

Typeahead.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  multi: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  tabIndex: PropTypes.number,
  onKeyDown: PropTypes.func,
  draggable: PropTypes.bool,
  persist: PropTypes.bool,
  typeahead: PropTypes.object,
  minChars: PropTypes.number,
  values: PropTypes.object,
  stringify: PropTypes.bool,
  delimiter: PropTypes.string,
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool
}
