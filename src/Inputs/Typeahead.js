/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState, useEffect, useCallback, useRef, PureComponent} from 'react'
import PropTypes from 'prop-types'
import Async from 'react-select/async'
import AsyncCreatable from 'react-select/async-creatable'
import {components as ReactSelectBaseComponents} from 'react-select'
import {isMobile} from '../utils'
import GFBConfig from '../config'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const viewPortHeight = document.documentElement.clientHeight

let debounce = null

let labelCopyTimer = null

class TypeaheadPerformanceOptimizer extends PureComponent {
  static propTypes = {
    Typeahead: PropTypes.func,
    setRef: PropTypes.any,
    className: PropTypes.string,
    classNamePrefix: PropTypes.string,
    closeMenuOnScroll: PropTypes.func,
    tabIndex: PropTypes.number,
    autoFocus: PropTypes.bool,
    blurInputOnSelect: PropTypes.bool,
    isClearable: PropTypes.bool,
    createOptionPosition: PropTypes.string,
    formatCreateLabel: PropTypes.func,
    isMulti: PropTypes.bool,
    isDisabled: PropTypes.bool,
    menuPortalTarget: PropTypes.any,
    name: PropTypes.string,
    noOptionsMessage: PropTypes.func,
    placeholder: PropTypes.string,
    inputValue: PropTypes.string,
    menuIsOpen: PropTypes.bool,
    menuPlacement: PropTypes.string,
    onKeyDown: PropTypes.func,
    onMouseDown: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onInputChange: PropTypes.func,
    loadOptions: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.any,
    autoComplete: PropTypes.any,
    components: PropTypes.object,
    defaultOptions: PropTypes.any,
    styles: PropTypes.object,
    inputId: PropTypes.string
  }

  render () {
    const {
      Typeahead,
      setRef,
      className,
      classNamePrefix,
      closeMenuOnScroll,
      tabIndex,
      autoFocus,
      blurInputOnSelect,
      isClearable,
      createOptionPosition,
      formatCreateLabel,
      isMulti,
      isDisabled,
      menuPortalTarget,
      name,
      noOptionsMessage,
      placeholder,
      inputValue,
      menuIsOpen,
      menuPlacement,
      onKeyDown = () => null,
      onMouseDown,
      onFocus,
      onBlur,
      onInputChange,
      loadOptions,
      onChange,
      value,
      autoComplete,
      components,
      defaultOptions,
      styles,
      inputId
    } = this.props
    return (
      <Typeahead
        ref={setRef}
        className={className}
        classNamePrefix={classNamePrefix}
        closeMenuOnScroll={closeMenuOnScroll}
        tabIndex={tabIndex}
        autoFocus={autoFocus}
        blurInputOnSelect={blurInputOnSelect}
        isClearable={isClearable}
        createOptionPosition={createOptionPosition}
        formatCreateLabel={formatCreateLabel}
        isMulti={isMulti}
        isDisabled={isDisabled}
        menuPortalTarget={menuPortalTarget}
        name={name}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        inputValue={inputValue}
        menuIsOpen={menuIsOpen}
        menuPlacement={menuPlacement}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onFocus={onFocus}
        onBlur={onBlur}
        onInputChange={onInputChange}
        loadOptions={loadOptions}
        onChange={onChange}
        value={value}
        autoComplete={autoComplete}
        components={components}
        defaultOptions={defaultOptions}
        styles={styles}
        openMenuOnClick={false}
        inputId={inputId}
      />
    )
  }
}

const defaults = {
  nullFunction: () => null,
  object: {}
}

const Typeahead = props => {
  const {
    name,
    label,
    value = '',
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
    onKeyDown = defaults.nullFunction,
    draggable,
    persist = true,
    typeahead = defaults.object,
    minChars = 1,
    stringify,
    autoComplete,
    interactive = true,
    style = {},
    delimit,
    delimiter,
    isClearable = true,
    createlabel,
    options: typeaheadOptions = defaults.object,
    warning,
    'data-testid': testId = props?.['data-testid'] || props?.name,
    inputId = props?.inputId || `${props?.name}-typeahead`
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {},
    options: optionsStyle = {},
    menuPortal = {}
  } = style

  const {theme} = useTheme()

  const {
    value: valueTheme = {},
    inputInner: inputInnerTheme = {},
    inputControl: inputControlTheme = {},
    valueContainer: valueContainerTheme = {},
    indicators: indicatorsTheme = {},
    options: optionsTheme = {}
  } = theme

  const [input, changeInput] = useState({Typeahead: allowcreate ? AsyncCreatable : Async})
  const [inputValue, updateInputValue] = useState('')
  const [selectValue, updateSelectValue] = useState(multi ? [] : {label: '', value: ''})
  const [isZipCode, updateIsZip] = useState(
    (label === 'papostalcode' || label === 'Zip Code') && inputValue.length <= 2
  )
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState({})
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [isFocused, setIsFocused] = useState(false)
  const [defaultOptions, setDefaultOptions] = useState([])
  const [components, setComponents] = useState({
    Option: (base) => {
      if (base.isDisabled) {
        base.innerProps.style = {
          height: 20,
          fontSize: '10pt',
          paddingBottom: 0,
          paddingLeft: 5,
          paddingTop: 0
        }
      }
      const newProps = {
        ...base,
        innerProps: {
          ...base?.innerProps,
          'data-testid': `${testId}-${base?.data?.label}`
        }
      }
      return <ReactSelectBaseComponents.Option {...newProps} />
    },
    MultiValue: (base) => {
      const {children = ''} = base
      const [label, setLabel] = useState(children) // eslint-disable-line
      const copyValueToClipboard = () => {
        navigator.clipboard.writeText(children)
        clearTimeout(labelCopyTimer)
        setLabel(' -- copied -- ')
        labelCopyTimer = setTimeout(() => {
          setLabel(children)
        }, 750)
      }
      const newProps = {
        ...base,
        innerProps: {
          ...base?.innerProps,
          'data-testid': `${testId}-${base?.data?.value}`
        }
      }
      return (
        <div onClick={copyValueToClipboard}>
          <ReactSelectBaseComponents.MultiValue {...newProps} children={label} />
        </div>
      )
    }
  })
  const [dynamicTypeaheadKey, setDynamicTypeaheadKey] = useState(null)
  const [conditions, setConditions] = useState({})
  const [reactSelectStyles, setReactSelectStyles] = useState({
    container: base => {
      return ({...base, ...inputInner, ...inputInnerTheme})
    },
    control: base => {
      return ({...base, ...inputControl, ...inputControlTheme})
    },
    valueContainer: base => {
      return ({...base, ...valueContainer, ...valueContainerTheme})
    },
    indicatorsContainer: base => {
      return ({...base, ...indicators, ...indicatorsTheme})
    },
    option: base => {
      return ({...base, ...optionsStyle, ...optionsTheme})
    },
    multiValue: base => {
      if (!interactive) {
        base.color = 'green'
        base.backgroundColor = '#a6eca67a'
      } else {
        base.backgroundColor = '#8bb7ff91'
      }
      return ({...base, ...valueStyle, ...valueTheme})
    },
    singleValue: base => {
      if (!interactive) {
        base.color = 'green'
      }
      return ({...base, ...valueStyle, ...valueTheme})
    },
    menuPortal: base => {
      const top = menuPlacement === 'bottom'
        ? base.top - 8 + (menuPortal.bottomTopBias || 0) : base.top + 8 + (menuPortal.topTopBias || 0)
      const zIndex = Number.MAX_SAFE_INTEGER
      return ({...base, top, zIndex, ...menuPortal})
    }
  })

  const inputContainer = useRef(null)
  const reactSelect = useRef(null)

  const isLoadingOptions = useRef(false) // this is a ref and not state because it needs to be looked at in async calls and needs real time updates outside of lifecycles - JRA 02/13/2020

  useEffect(() => {
    const populateConditionObject = (condition = {name: null, comparator: null, values: []}) => {
      if (!condition.hasOwnProperty('values')) condition.values = [] //eslint-disable-line
      const pluggedInValues = []
      condition.values.forEach(value => {
        const formValueForThisValueName = values.get(value, '')
        if (formValueForThisValueName && pluggedInValues.indexOf(formValueForThisValueName) === -1) {
          pluggedInValues.push(formValueForThisValueName)
        } else {
          pluggedInValues.push(value)
        }
      })
      const value = values.get(condition.name, '')
      if (!pluggedInValues.length && pluggedInValues.indexOf(value) === -1) {
        pluggedInValues.push(value)
      }
      condition.values = pluggedInValues
      return condition
    }
    const populateFilterBody = (filter = {}) => {
      // eslint-disable-next-line
      if (filter.hasOwnProperty('name')) {
        populateConditionObject(filter)
        // eslint-disable-next-line
      } else if (filter.hasOwnProperty('conditions') && Array.isArray(filter.conditions)) {
        filter.conditions.map(condition => populateFilterBody(condition))
      }
      return filter
    }
    let {filter = {}} = typeahead
    if (typeof filter === 'function') filter = filter()
    filter = JSON.parse(JSON.stringify(filter)) // deep clone the object as to not mutate the definition
    filter = populateFilterBody(filter)
    if (JSON.stringify(filter) !== JSON.stringify(conditions)) {
      setConditions(filter)
    }
  }, [values, typeahead, conditions])

  useEffect(() => {
    let {key = null, fieldvalue = null} = typeahead
    if (values.get(fieldvalue, '')) key = values.get(fieldvalue, '')
    setDynamicTypeaheadKey(key)
  }, [typeahead, values])

  useEffect(() => {
    setReactSelectStyles({
      container: base => {
        return ({...base, ...inputInner, ...inputInnerTheme})
      },
      control: base => {
        return ({...base, ...inputControl, ...inputControlTheme})
      },
      valueContainer: base => {
        return ({...base, ...valueContainer, ...valueContainerTheme})
      },
      indicatorsContainer: base => {
        return ({...base, ...indicators, ...indicatorsTheme})
      },
      option: base => {
        return ({...base, ...optionsStyle, ...optionsTheme})
      },
      multiValue: base => {
        if (!interactive) {
          base.color = 'green'
          base.backgroundColor = '#a6eca67a'
        } else {
          base.backgroundColor = '#8bb7ff91'
        }
        return ({...base, ...valueStyle, ...valueTheme})
      },
      singleValue: base => {
        if (!interactive) {
          base.color = 'green'
        }
        return ({...base, ...valueStyle, ...valueTheme})
      },
      menuPortal: base => {
        const top = menuPlacement === 'bottom'
          ? base.top - 8 + (menuPortal.bottomTopBias || 0) : base.top + 8 + (menuPortal.topTopBias || 0)
        const zIndex = Number.MAX_SAFE_INTEGER
        return ({...base, top, zIndex, ...menuPortal})
      }
    }) // going to ignore dynamic style changes for the time being - JRA 07/31/2020
  }, [ // eslint-disable-line
    interactive,
    menuPlacement
  ])

  useEffect(() => {
    setComponents((prevComponents) => {
      const {showValidationError} = prevComponents

      // Required field validation
      if (isRequiredFlag && (value + '').trim().length === 0 && !isFocused) {
        if (!showValidationError) {
          return {
            ...prevComponents,
            DropdownIndicator: () => (
              <ValidationErrorIcon message='This Field is Required' />
            ),
            showValidationError: true
          }
        }
        return prevComponents // No change
      }

      // Clear validation error
      if (showValidationError) {
        return {
          ...prevComponents,
          DropdownIndicator: ReactSelectBaseComponents.DropdownIndicator,
          showValidationError: false
        }
      }

      // Warning message
      if (warning) {
        return {
          ...prevComponents,
          DropdownIndicator: () => (
            <ValidationErrorIcon
              message={warning}
              color='#FFCC00'
              type='warning'
            />
          )
        }
      }

      return prevComponents // No change
    })
  }, [isRequiredFlag, value, isFocused, warning])

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
    if (typeof value === 'number' && !isNaN(value)) value = value + ''
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
    if (parsedValue === '') {
      if (multi) parsedValue = []
      else parsedValue = {label: '', value: ''}
    }
    updateInputValue('')
    updateSelectValue(parsedValue)
  }, [value, convertValueStringToValueArrayIfNeeded, multi])

  const loadOptions = useCallback((search, setDefault = false) => {
    const fetchResults = resolve => {
      const {key = null, duplication = false, fieldvalue = null} = typeahead
      const minSearchLength = isZipCode ? 3 : minChars

      if (!key && !fieldvalue) {
        // eslint-disable-next-line
        console.error(`The JSON schema representation for ${name} does not have a typeahead key or a fieldvalue. A typeahead.key is required for this field type to search for results. This can either be specified directly as config.typeahead.key or it can equal the value of another field by specifying config.typeahead.{name of field}`)
        if (setDefault === true) setDefaultOptions([])
        return resolve({options: []})
      }

      if (search.length >= minSearchLength || search === ' ') {
        if (setDefault) reactSelect.current.setState(() => ({isLoading: true}))
        isLoadingOptions.current = true
        const {
          queryRowCount: showQueryCountOption,
          data: showDataArrayOption,
          useProcedure: useStoredProcedureInSQL
        } = typeaheadOptions

        return GFBConfig.ajax.post(
          `/typeahead/name/${encodeURIComponent(dynamicTypeaheadKey)}/search`,
          {
            term: search,
            filter: {conditions},
            queryRowCount: showQueryCountOption, /* Will return queryRowCount as 0 to UI, time saver for API */
            data: showDataArrayOption, /* Returns an empty array in the response, time saver for API */
            useProcedure: useStoredProcedureInSQL /* Uses Stored Procedure in backend for search */
          }
        )
          .then(resp => {
            isLoadingOptions.current = false
            const options = []
            if (Array.isArray(resp.data.contains) && Array.isArray(resp.data.startsWith)) {
              const {contains, startsWith} = resp.data
              options.push({
                label: `${startsWith.length} options start with "${search}" ...`,
                isDisabled: true
              })
              startsWith.forEach(value => {
                if (duplication) {
                  value.duplication = duplication
                }
                options.push(value)
              })
              options.push({
                label: `${contains.length} options contain "${search}" ...`,
                isDisabled: true,
                className: 'gfb-typeahead-flavor-option'
              })
              contains.forEach(value => {
                if (duplication) {
                  value.duplication = duplication
                }
                options.push(value)
              })
            } else {
              resp.data.data.forEach(value => {
                if (duplication) {
                  value.duplication = duplication
                }
                options.push(value)
              })
            }
            if (setDefault === true) setDefaultOptions(options)
            else setDefaultOptions([])
            if (setDefault) reactSelect.current.setState(() => ({isLoading: false}))
            return resolve(options)
          })
          .catch(err => {
            isLoadingOptions.current = false
            console.error('There was an error fetching the options in this typeahead: ', err) // eslint-disable-line
            return resolve([])
          })
      }
      if (setDefault === true) setDefaultOptions([])
      return resolve([])
    }
    return new Promise(resolve => {
      clearTimeout(debounce)
      const delay = (typeof search === 'string' && search.length && search.trim() === '') ? 0 : 500 // if they are sending in white space as the search query, don't debounce it, just do a global generic search - JRA 03/31/2020
      debounce = setTimeout(() => fetchResults(resolve), delay)
      return debounce
    })
  }, [typeahead, isZipCode, minChars, name, dynamicTypeaheadKey, conditions, typeaheadOptions])

  const formatCreateLabel = useCallback(value => {
    if (typeof createlabel === 'string') {
      return `${createlabel} ${value}`
    }
    return `Click or Tab to Create "${value}"`
  }, [createlabel])

  const noOptionsMessage = useCallback(() => {
    if (isZipCode) {
      return '3 Digits Required'
    }
  }, [isZipCode])

  const handleOnMouseDown = useCallback(e => {
    if (draggable) e.stopPropagation()
  }, [draggable])

  const handleInputBlur = useCallback(() => {
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
    setIsFocused(false)
    updateInputValue('')
  }, [menuIsOpen, updateIsMenuOpen, name])

  const openMenu = useCallback(() => {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen({...menuIsOpen, [name]: true})
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen, name])

  const setMenuOpenPosition = useCallback(() => {
    const placement = fieldPosition < (viewPortHeight / 2) ? 'bottom' : 'top'
    updateMenuPlacement(placement)
  }, [fieldPosition, updateMenuPlacement])

  const setInputFieldPosition = useCallback(() => {
    if (inputContainer.current) {
      const position = inputContainer.current.getBoundingClientRect().top
      if (fieldPosition !== position) {
        updateFieldPosition(position)
      } else {
        setMenuOpenPosition()
      }
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
      !menuIsOpen[name] && openMenu()
      updateInputValue(val)
      if (typeof val === 'string' && val.trim() === '') {
        loadOptions(' ', true)
      }
    } else if (e.action === 'menu-close' && !multi) {
      if (value) {
        updateInputValue('')
      }
    }
  }, [multi, menuIsOpen, name, openMenu, loadOptions, value])

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
        field !== 'className' &&
        field !== 'value' &&
        field !== 'label'
      ) {
        onChange(e)
      }
    })
  }, [onChange])

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
      case 'remove-value': {
        if (!newValue) newValue = []
        if (multi && !target.value) target.value = []
      }
    }

    if (Array.isArray(newValue)) {
      let value = ''
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
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false}) // closes menu when new option gets selected
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
    // if the user presses tab before the loaded options come back the default behavior is to tab to the next field and do nothing
    // this will capture that tab event and treat it like a create-option was selected - JRA 02/13/2020
    if (e.keyCode === 9 && allowcreate && inputValue) {
      if (isLoadingOptions.current) {
        handleChange({value: inputValue}, {action: 'create-option'})
      }
    }
    if (e.keyCode === 32) { // if key is spacebar, prevent what react select is trying to do with it and just let them enter a whitespace - JRA 02/05/2020
      e.preventDefault()
      handleOnInputChange(inputValue + ' ', {action: 'input-change'})
    }
    onKeyDown()
  }, [onKeyDown, handleChange, allowcreate, inputValue, handleOnInputChange])

  const closeMenuOnScroll = useCallback(e => {
    let menuOpenState = false
    if (e && e.target && e.target.classList) {
      menuOpenState = (
        (
          e.target.classList.contains('gfb-input__menu-list') ||
          e.target.classList.contains('gfb-input__control')
        ) &&
        menuIsOpen[name]
      )
    }
    updateIsMenuOpen({...menuIsOpen, [name]: menuOpenState})
  }, [menuIsOpen, name, updateIsMenuOpen])

  const {Typeahead} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'

  if (isRequiredFlag && (value + '').trim().length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error'
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}

  return (
    <div
      className={outerClass}
      ref={inputContainer}
      onMouseDown={handleOnFocus}
      style={inputOuter}
      css={inputOuterCSS}
      data-testid={testId}
    >
      <TypeaheadPerformanceOptimizer
        Typeahead={Typeahead}
        ref={reactSelect}
        className={className}
        classNamePrefix='gfb-input'
        closeMenuOnScroll={!isMobile ? closeMenuOnScroll : undefined}
        tabIndex={tabIndex}
        autoFocus={autofocus}
        blurInputOnSelect
        isClearable={isClearable}
        createOptionPosition='first'
        formatCreateLabel={formatCreateLabel}
        isMulti={multi}
        isDisabled={disabled || readonly || !interactive}
        menuPortalTarget={document.body}
        name={name}
        noOptionsMessage={noOptionsMessage}
        placeholder={placeholder}
        inputValue={inputValue}
        menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
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
        defaultOptions={defaultOptions}
        styles={reactSelectStyles}
        inputId={inputId}
      />
    </div>
  )
}

export default Typeahead

Typeahead.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
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
  interactive: PropTypes.bool,
  style: PropTypes.object,
  isClearable: PropTypes.bool,
  createlabel: PropTypes.string,
  options: PropTypes.shape({
    data: PropTypes.bool,
    useProcedure: PropTypes.bool,
    queryRowCount: PropTypes.bool
  }),
  warning: PropTypes.string,
  'data-testid': PropTypes.string,
  inputId: PropTypes.string
}
