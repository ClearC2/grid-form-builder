/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect, useRef, useState, useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import ReactSelect, {components as ReactSelectBaseComponents} from 'react-select'
import AsyncSelect from 'react-select/async'
import Creatable from 'react-select/creatable'
import AsyncCreatable from 'react-select/async-creatable'
import {isMobile, randomId} from '../../utils'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import useTheme from '../../theme/useTheme'
import PortalTooltip from '../../Tooltip'

const viewPortHeight = document.documentElement.clientHeight

// Configuration for large dataset handling
const INITIAL_DISPLAY_LIMIT = 100 // Initial options to show and max search results
const LARGE_DATASET_THRESHOLD = 500 // Switch to async mode when options exceed this

const Select = props => {
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
    isClearable = true,
    warning,
    onBlur,
    showOptionTooltips = false, // this flag is used to show tooltips for each individual option
    createOptionPosition = 'last',
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

  const [fullOptions, setFullOptions] = useState(keyword.options || [])
  const [displayOptions, setDisplayOptions] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [input, changeInput] = useState({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState({})
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState({label: '', value: '', color: ''})
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

        // If we have enough results or have finished, return
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
  }, [readonly, disabled, menuIsOpen, updateIsMenuOpen, name])

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

  const handleOnFocus = useCallback(e => {
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
    const newOptions = keyword.options || []
    setFullOptions(newOptions)

    const initial = newOptions.slice(0, initialDisplayLimit)
    setDisplayOptions(initial)
  }, [keyword.options, initialDisplayLimit])

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
    const keyMap = fullOptions.reduce((acc, cv) => {
      acc[cv.value] = {
        label: cv.label,
        color: cv.color || ''
      }
      return acc
    }, {})
    const selectValue = {
      label: value,
      value,
      color: ''
    }
    if (keyMap[value] && keyMap[value].label) selectValue.label = keyMap[value].label
    if (keyMap[value] && keyMap[value].color) selectValue.color = keyMap[value].color
    updateSelectValue(selectValue)
  }, [value, updateSelectValue, fullOptions])

  const handleOnKeyDown = useCallback(() => {
    if (!menuIsOpen[name]) openMenu()
    onKeyDown()
  }, [onKeyDown, menuIsOpen, openMenu, name])

  const handleChange = useCallback(e => {
    onChange({
      target: {
        name,
        value: e === null ? '' : e.value
      }
    })
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
    setInputValue('') // Clear search after selection
  }, [onChange, name, menuIsOpen])

  const {Select} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'
  const customComponents = {}

  if (warning && !isRequiredFlag) {
    customComponents.DropdownIndicator = () => {
      return <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />
    }
  }

  if (isRequiredFlag && (value + '').trim().length === 0 && !isFocused) {
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
    outerClass = outerClass + ' gfb-has-focus'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}

  const baseSelectProps = {
    className,
    classNamePrefix: 'gfb-input',
    tabIndex,
    autoFocus: autofocus,
    closeMenuOnScroll: !isMobile ? closeMenuOnScroll : undefined,
    isClearable,
    isDisabled: disabled || readonly,
    menuPortalTarget: document.body,
    name,
    onKeyDown: handleOnKeyDown,
    onBlur: handleInputBlur,
    menuPlacement: !isMobile ? menuPlacement : undefined,
    value: selectValue,
    defaultValue: selectValue,
    onChange: handleChange,
    autoComplete,
    createOptionPosition,
    components: {...customComponents, Option},
    onInputChange: handleInputChange,
    inputValue: inputValue,
    styles: {
      container: base => ({...base, ...inputInner, ...inputInnerTheme}),
      control: base => ({...base, ...inputControl, ...inputControlTheme}),
      valueContainer: base => {
        const valueColor = {}
        if (selectValue.color) {
          valueColor.backgroundColor = selectValue.color
        }
        return ({...base, ...valueContainer, ...valueContainerTheme, ...valueColor})
      },
      indicatorsContainer: base => ({...base, ...indicators, ...indicatorsTheme}),
      option: base => ({...base, ...optionsStyle, ...optionsTheme}),
      singleValue: base => {
        if (!interactive) {
          base.color = 'green'
        }
        return ({...base, ...valueStyle, ...valueTheme})
      },
      menuPortal: base => {
        const top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8
        const zIndex = 9999
        return ({...base, top, zIndex})
      }
    }
  }

  return (
    <div
      className={outerClass}
      ref={inputContainer}
      onMouseDown={setInputFieldPosition}
      style={inputOuter}
      css={inputOuterCSS}
    >
      {isLargeDataset ? (
        <Select
          {...baseSelectProps}
          loadOptions={loadOptions}
          defaultOptions
          cacheOptions
          placeholder={`${searchPlaceholder} (${fullOptions.length} options)`}
        />
      ) : (
        <Select
          {...baseSelectProps}
          options={displayOptions}
          placeholder={placeholder}
          filterOption={null}
        />
      )}
    </div>
  )
}

export default Select

Select.propTypes = {
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
  isClearable: PropTypes.bool,
  warning: PropTypes.string,
  onBlur: PropTypes.func,
  showOptionTooltips: PropTypes.bool,
  data: PropTypes.object,
  createOptionPosition: PropTypes.string,
  initialDisplayLimit: PropTypes.number,
  searchPlaceholder: PropTypes.string
}
