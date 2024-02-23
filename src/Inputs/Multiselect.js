/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect, useRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import ReactSelect, {components as ReactSelectBaseComponents} from 'react-select'
import Creatable from 'react-select/creatable'
import {isMobile, convertDelimitedValueIntoLabelValueArray, convertLabelValueArrayIntoDelimitedValue} from '../utils'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const viewPortHeight = document.documentElement.clientHeight

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
    onBlur
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

  const [input, changeInput] = useState({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState({})
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState([])
  const [options, updateSelectOptions] = useState([])
  const [isFocused, setIsFocused] = useState(false)

  const inputContainer = useRef(null)

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

    updateSelectOptions(formattedOptions)
  }, [delimiter, keyword.options])

  useEffect(() => {
    setMenuOpenPosition()
  }, [fieldPosition, setMenuOpenPosition])

  useEffect(() => {
    changeInput({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  }, [allowcreate, changeInput, interactive])

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
  }, [closeMenuOnSelect, onChange, name, delimiter, delimit, stringify, menuIsOpen])

  const handleOnKeyDown = useCallback(() => {
    if (!menuIsOpen[name]) openMenu()
    onKeyDown()
  }, [onKeyDown, menuIsOpen, openMenu, name])

  const {Select} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'
  const components = {}
  components.MultiValue = (p) => {
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
    components.DropdownIndicator = () => {
      return <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />
    }
  }
  if (isRequiredFlag && (value.length === 0 || value.size === 0) && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error'
    components.DropdownIndicator = () => {
      return <ValidationErrorIcon message='This Field is Required' />
    }
  }
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus multiselect-focus'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}

  return (
    <div
      className={outerClass}
      ref={inputContainer}
      onMouseDown={handleOnFocus}
      style={inputOuter}
      css={inputOuterCSS}
    >
      <Select
        isSearchable={searchable}
        className={className}
        classNamePrefix='gfb-input'
        tabIndex={tabIndex}
        autoFocus={autofocus}
        closeMenuOnScroll={!isMobile ? closeMenuOnScroll : undefined}
        closeMenuOnSelect={closeMenuOnSelect}
        isClearable={isClearable}
        isDisabled={disabled || readonly || !interactive}
        menuPortalTarget={document.body}
        isMulti
        name={name}
        options={options}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onBlur={handleInputBlur}
        menuIsOpen={!isMobile ? menuIsOpen[name] : undefined}
        menuPlacement={!isMobile ? menuPlacement : undefined}
        value={selectValue}
        defaultValue={selectValue}
        onChange={handleChange}
        autoComplete={autoComplete}
        components={components}
        styles={{
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
          multiValue: (base, parent) => {
            if (!interactive) {
              base.color = 'green'
              base.backgroundColor = '#a6eca67a'
            } else {
              base.backgroundColor = '#8bb7ff91'
            }
            if (window.CSS.supports('color', parent.data.value)) {
              base.backgroundColor = parent.data.value
            }
            return ({...base, ...valueStyle, ...valueTheme})
          },
          menuPortal: base => {
            const top = menuPlacement === 'bottom' ? base.top - 8 : base.top + 8
            const zIndex = Number.MAX_SAFE_INTEGER
            return ({...base, top, zIndex})
          }
        }}
      />
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
  onBlur: PropTypes.func
}
