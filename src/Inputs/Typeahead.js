import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import Async from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'
import {isMobile} from '../utils'
import GFBConfig from '../config'

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
    persist,
    typeahead = {},
    minChars = 1,
    stringify,
    delimiter = '¤'
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

  const typeaheadRef = useRef(null)
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
  }, [typeahead, populateFilterBody, name, values, minChars])

  const handleChange = useCallback((newValue, {action}) => {

  }, [])

  const formatCreateLabel = useCallback(value => {
    return `Click or Tab to Create "${value}"`
  }, [])

  const noOptionsMessage = useCallback(() => {
    if (isZipCode) {
      return '3 Digits Required'
    }
  }, [isZipCode])

  const handleOnKeyDown = useCallback(e => {
    // This fixes the issue where users type and tab too quickly on create fields and the value does not register in the system
    if (e.keyCode === 9 && allowcreate && inputValue) {
      handleChange({value: inputValue}, {action: 'create-option'})
    }
    onKeyDown()
  }, [onKeyDown, handleChange, allowcreate, inputValue])

  const handleOnMouseDown = useCallback(e => {
    if (draggable) e.stopPropagation()
  }, [draggable])

  const handleInputBlur = useCallback(() => {
    menuIsOpen && updateIsMenuOpen(false)
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
    if (!disabled && !readonly) {
      setInputFieldPosition()
    }
  }, [disabled, readonly, setInputFieldPosition])

  const handleOnFocus = useCallback(() => {
    let simpleValue = typeof value.toJS === 'function' ? value.toJS() : value
    simpleValue = typeof simpleValue === 'object' ? simpleValue.value || simpleValue.label || '' : simpleValue
    if (persist && !multi) {
      // this is done to place cursor at the end of the input field
      updateInputValue('')
      setTimeout(() => updateInputValue(simpleValue), 5)
    }
    handleInputClick()
  }, [value, persist, multi, updateInputValue, handleInputClick])

  const handleOnInputChange = useCallback((val, e) => {
    if (e.action === 'input-change') {
      !menuIsOpen && openMenu()
      updateInputValue(val)
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue(value)
      }
    }
  }, [menuIsOpen, openMenu, updateInputValue, multi, value])

  const {Typeahead} = input

  console.log(props)

  return (
    <div ref={inputContainer} onMouseDown={handleOnFocus}>
      <Typeahead
        ref={typeaheadRef}
        tabIndex={tabIndex}
        autofocus={autofocus}
        blurInputOnSelect
        cacheOptions
        isClearable
        createOptionPosition='first'
        formatCreateLabel={formatCreateLabel}
        multi={multi}
        isDisabled={disabled || readonly}
        menuPortalTarget={document.body}
        menuShouldBlockScroll
        name={name}
        noOptionsMessage={noOptionsMessage}
        placeholder={isRequiredFlag ? '* This Field Is Required' : placeholder}
        inputValue={inputValue}
        menuIsOpen={!isMobile ? menuIsOpen : undefined}
        menuPlacement={!isMobile ? menuPlacement : undefined}
        onKeyDown={handleOnKeyDown}
        onMouseDown={handleOnMouseDown}
        onFocus={handleOnFocus}
        onBlur={handleInputBlur}
        onInputChange={handleOnInputChange}
        loadOptions={loadOptions}
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
  delimiter: PropTypes.string
}
