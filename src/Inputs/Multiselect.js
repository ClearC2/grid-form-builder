/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect, useRef, useState, useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import ReactSelect, {components as ReactSelectBaseComponents} from 'react-select'
import AsyncSelect from 'react-select/async'
import Creatable from 'react-select/creatable'
import AsyncCreatable from 'react-select/async-creatable'
import {
  isMobile,
  convertDelimitedValueIntoLabelValueArray,
  convertLabelValueArrayIntoDelimitedValue,
  randomId
} from '../utils'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'
import PortalTooltip from '../Tooltip'

const viewPortHeight = document.documentElement.clientHeight

// Configuration for large dataset handling
const INITIAL_DISPLAY_LIMIT = 100 // Initial options to show and max search results
const LARGE_DATASET_THRESHOLD = 500 // Switch to async mode when options exceed this

let labelCopyTimer = null

const Multiselect = props => {
  const {
    allowcreate,
    value = '',
    tabIndex,
    autofocus,
    disabled,
    readonly,
    name,
    keyword = {},
    placeholder,
    requiredWarning,
    required,
    onKeyDown = () => null, // sometimes provided in the config object
    onChange,
    autoComplete,
    interactive = true,
    style = {},
    delimit,
    delimiter = '¤',
    stringify,
    isClearable = true,
    searchable = false,
    closeMenuOnSelect = true,
    warning,
    showValidOptions,
    onBlur,
    showOptionTooltips = false, // this flag is used to show tooltips for each individual option
    initialDisplayLimit = INITIAL_DISPLAY_LIMIT,
    searchPlaceholder = 'Type to search...'
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {},
    options: optionsStyle = {}
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

  const [fullOptions, setFullOptions] = useState([])
  const [displayOptions, setDisplayOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [input, changeInput] = useState({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState({})
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState([])
  const [options, updateSelectOptions] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  const inputContainer = useRef(null)

  // AsyncSelect implementation for large datasets
  const loadOptions = useCallback((inputValue) => {
    return new Promise((resolve) => {
      const searchTerm = inputValue || ''
      const lowercaseSearch = searchTerm.toLowerCase()

      // If no search term, return first 100 options
      if (!searchTerm) {
        resolve(fullOptions.slice(0, initialDisplayLimit))
        return
      }

      const filtered = []
      let index = 0
      const chunkSize = 2000 // Process 2000 items per chunk

      const processChunk = () => {
        const endIndex = Math.min(index + chunkSize, fullOptions.length)

        // Process this chunk
        for (let i = index; i < endIndex; i++) {
          if (filtered.length >= initialDisplayLimit) break

          const option = fullOptions[i]
          if (!option) continue

          const label = option.label || ''
          const value = option.value || ''

          if (label.toLowerCase().includes(lowercaseSearch) ||
            value.toString().toLowerCase().includes(lowercaseSearch)) {
            filtered.push(option)
          }
        }

        index = endIndex

        // If we have enough results or finished, return
        if (filtered.length >= initialDisplayLimit || index >= fullOptions.length) {
          resolve(filtered)
        } else {
          // Continue with next chunk asynchronously
          setTimeout(processChunk, 0)
        }
      }

      processChunk()
    })
  }, [fullOptions, initialDisplayLimit])

  // Determine which Select component to use
  const isLargeDataset = fullOptions.length > LARGE_DATASET_THRESHOLD

  const SelectComponent = useMemo(() => {
    if (!interactive) {
      return allowcreate ? Creatable : ReactSelect
    }

    if (allowcreate) {
      return isLargeDataset ? AsyncCreatable : Creatable
    }

    return isLargeDataset ? AsyncSelect : ReactSelect
  }, [interactive, allowcreate, isLargeDataset])

  // For small datasets, handle search normally
  const handleInputChange = useCallback((newValue, actionMeta) => {
    if (actionMeta.action === 'input-change') {
      setInputValue(newValue)

      // Only filter for small datasets - let AsyncSelect handle large ones
      if (!isLargeDataset) {
        const lowercaseSearch = newValue.toLowerCase()
        const filtered = fullOptions.filter(option =>
          option.label?.toLowerCase().includes(lowercaseSearch) ||
          option.value?.toString().toLowerCase().includes(lowercaseSearch)
        ).slice(0, initialDisplayLimit)
        setDisplayOptions(filtered)
      }
    }
    return newValue
  }, [fullOptions, isLargeDataset, initialDisplayLimit])

  const openMenu = useCallback(() => {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen({...menuIsOpen, [name]: true})
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen, name])

  const setMenuOpenPosition = useCallback(() => {
    const placement = fieldPosition < (viewPortHeight / 2) ? 'bottom' : 'top'
    updateMenuPlacement(placement)
  }, [fieldPosition, updateMenuPlacement])

  const handleInputBlur = useCallback((e) => {
    if (typeof onBlur === 'function') {
      onBlur(e)
    }
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
    setIsFocused(false)
    setInputValue('') // Clear search on blur
  }, [menuIsOpen, updateIsMenuOpen, name, onBlur])

  const setInputFieldPosition = useCallback(() => {
    if (inputContainer.current) {
      const position = inputContainer.current.getBoundingClientRect().top
      if (fieldPosition !== position) {
        updateFieldPosition(position)
      }
    }
    setTimeout(openMenu) // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019
  }, [openMenu, fieldPosition])

  const handleInputClick = useCallback(() => {
    if (!disabled && !readonly && interactive) {
      setInputFieldPosition()
    }
  }, [disabled, interactive, readonly, setInputFieldPosition])

  const handleOnFocus = useCallback(() => {
    handleInputClick()
    setIsFocused(true)
  }, [handleInputClick])

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

  useEffect(() => {
    let formattedOptions = keyword.options || []
    if (!formattedOptions) formattedOptions = []
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter)
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS()

    const duplicate = {}
    // get rid of duplicates
    formattedOptions = formattedOptions.filter(option => {
      if (!option) return false
      if (typeof option === 'string') return true
      if (typeof option === 'object' && !option.value) option.value = option.label
      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true
        return true
      }
    })

    // format into an array of {label, value} objects
    formattedOptions = formattedOptions.map(option => {
      if (typeof option === 'string') option = {label: option, value: option}
      if (!option.value) option.value = option.label
      return option
    })

    // Store full options and show initial set
    setFullOptions(formattedOptions)
    updateSelectOptions(formattedOptions)

    const initial = formattedOptions.slice(0, initialDisplayLimit)
    setDisplayOptions(initial)
  }, [delimiter, keyword.options, initialDisplayLimit])

  useEffect(() => {
    setMenuOpenPosition()
  }, [fieldPosition, setMenuOpenPosition])

  useEffect(() => {
    changeInput({Select: SelectComponent})
  }, [SelectComponent])

  useEffect(() => {
    updateIsRequiredFlag(required && requiredWarning && !value.length)
  }, [updateIsRequiredFlag, required, requiredWarning, value])

  useEffect(() => {
    updateSelectValue(convertDelimitedValueIntoLabelValueArray({value, delimit, delimiter, options, showValidOptions}))
  }, [value, updateSelectValue, name, delimit, delimiter, stringify, options, showValidOptions])

  const handleChange = useCallback(val => {
    onChange({
      target: {
        name,
        value: convertLabelValueArrayIntoDelimitedValue({value: val, delimiter, delimit, stringify})
      }
    })
    if (closeMenuOnSelect) {
      menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
    }
    setInputValue('') // Clear search after selection
  }, [closeMenuOnSelect, onChange, name, delimiter, delimit, stringify, menuIsOpen])

  const handleOnKeyDown = useCallback(() => {
    if (!menuIsOpen[name]) openMenu()
    onKeyDown()
  }, [onKeyDown, menuIsOpen, openMenu, name])

  const {Select} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'
  const customComponents = {}
  customComponents.MultiValue = (p) => {
    const {children = ''} = p
    const [label, setLabel] = useState(children) // eslint-disable-line
    const copyValueToClipboard = () => {
      navigator.clipboard.writeText(children)
      clearTimeout(labelCopyTimer)
      setLabel(' -- copied -- ')
      labelCopyTimer = setTimeout(() => {
        setLabel(children)
      }, 750)
    }
    return (
      <div onClick={copyValueToClipboard}>
        <ReactSelectBaseComponents.MultiValue {...p} children={label} />
      </div>
    )
  }
  if (warning && !isRequiredFlag) {
    customComponents.DropdownIndicator = () => {
      return <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />
    }
  }
  if (isRequiredFlag && (value.length === 0 || value.size === 0) && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error'
    customComponents.DropdownIndicator = () => {
      return <ValidationErrorIcon message='This Field is Required' />
    }
  }

  const Option = (props) => {
    if (!showOptionTooltips) {
      return <ReactSelectBaseComponents.Option {...props} />
    } else {
      const optionId = randomId()
      return (
        <div data-tip data-for={optionId}>
          <PortalTooltip id={optionId} message={props.data?.tooltip} />
          <ReactSelectBaseComponents.Option {...props} />
        </div>
      )
    }
  }

  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus multiselect-focus'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}

  const baseSelectProps = {
    autoComplete,
    autoFocus: autofocus,
    className,
    classNamePrefix: 'gfb-input',
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
    closeMenuOnSelect,
    components: {...customComponents, Option},
    defaultValue: selectValue,
    inputValue,
    isClearable,
    isDisabled: disabled || readonly || !interactive,
    isMulti: true,
    isSearchable: searchable,
    // menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
    menuPlacement: !isMobile ? menuPlacement : undefined,
    menuPortalTarget: document.body,
    name,
    onBlur: handleInputBlur,
    onChange: handleChange,
    // onFocus={handleOnFocus}
    onInputChange: handleInputChange,
    onKeyDown: handleOnKeyDown,
    styles: {
      container: base => ({...base, ...inputInner, ...inputInnerTheme}),
      control: base => ({...base, ...inputControl, ...inputControlTheme}),
      valueContainer: base => ({...base, ...valueContainer, ...valueContainerTheme}),
      indicatorsContainer: base => ({...base, ...indicators, ...indicatorsTheme}),
      option: base => ({...base, ...optionsStyle, ...optionsTheme}),
      multiValue: (base, parent) => {
        if (!interactive) {
          base.color = 'green'
          base.backgroundColor = '#a6eca67a'
        } else {
          base.backgroundColor = '#8bb7ff91'
        }
        if (parent?.data?.color) {
          base.backgroundColor = parent.data.color
        }
        if (window.CSS.supports('color', parent.data.value)) {
          base.backgroundColor = parent.data.value
        }
        return ({...base, ...valueStyle, ...valueTheme})
      },
      menuPortal: base => {
        const top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8
        const zIndex = 9999 // this keeps the select menu below the option tooltip portal
        return ({...base, top, zIndex})
      }
    },
    tabIndex,
    value: selectValue
  }

  return (
    <div
      className={outerClass}
      css={inputOuterCSS}
      onMouseDown={setInputFieldPosition}
      ref={inputContainer}
      style={inputOuter}
    >
      {isLargeDataset ? (
        <Select
          {...baseSelectProps}
          cacheOptions
          defaultOptions
          loadOptions={loadOptions}
          placeholder={`${searchPlaceholder} (${fullOptions.length} options)`}
        />
      ) : (
        <Select
          {...baseSelectProps}
          filterOption={null}
          options={displayOptions}
          placeholder={placeholder}
        />
      )}
    </div>
  )
}

export default Multiselect

Multiselect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  keyword: PropTypes.object,
  tabIndex: PropTypes.number,
  allowcreate: PropTypes.bool,
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  placeholder: PropTypes.string,
  requiredWarning: PropTypes.bool,
  required: PropTypes.bool,
  values: PropTypes.object,
  persist: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  style: PropTypes.object,
  stringify: PropTypes.bool,
  delimiter: PropTypes.string,
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  isClearable: PropTypes.bool,
  searchable: PropTypes.bool,
  closeMenuOnSelect: PropTypes.bool,
  warning: PropTypes.string,
  showValidOptions: PropTypes.bool,
  onBlur: PropTypes.func,
  showOptionTooltips: PropTypes.bool,
  data: PropTypes.object,
  initialDisplayLimit: PropTypes.number,
  searchPlaceholder: PropTypes.string
}
