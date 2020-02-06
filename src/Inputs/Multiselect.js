/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect, useRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import {isMobile} from '../utils'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const viewPortHeight = document.documentElement.clientHeight

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
    style = {}
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

  const handleInputBlur = useCallback(() => {
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
    setIsFocused(false)
  }, [menuIsOpen, updateIsMenuOpen, name])

  const setInputFieldPosition = useCallback(() => {
    const position = inputContainer.current.getBoundingClientRect().top
    if (fieldPosition !== position) {
      updateFieldPosition(position)
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
    const menuOpenState = e.target.classList.contains('gfb-input__menu-list') && menuIsOpen[name]
    updateIsMenuOpen({...menuIsOpen, [name]: menuOpenState})
  }, [menuIsOpen, name, updateIsMenuOpen])

  useEffect(() => {
    let formattedOptions = keyword.options || []
    if (!formattedOptions) formattedOptions = []
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split('¤')
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
  }, [keyword.options])

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
    let formattedValue = value
    // first lets try to get this value normalized to what react-select wants, which is an array of values
    if (!formattedValue) formattedValue = []
    if (formattedValue.toJS) formattedValue = formattedValue.toJS()
    if (typeof formattedValue === 'string') formattedValue = formattedValue.split('¤')
    if (!Array.isArray(formattedValue) && typeof formattedValue === 'object') {
      formattedValue = Object.values(formattedValue)
    }
    if (!Array.isArray(formattedValue)) {
      console.warn('The field', name, 'is a multiselect but its value was not a valid multi value. Multivalues should be a delimited string or an array of values, but instead got', value) //eslint-disable-line
      formattedValue = []
    }

    const duplicate = {}
    // lets filter out any blanks they may have snuck in
    formattedValue.filter(value => {
      if (typeof value === 'object') value = value.value // if value is an object but does not have a value key, we are going to drop the value as well - JRA 12/19/2019
      if (!value) return false
      if (!duplicate[value]) {
        duplicate[value] = true
        return true
      }
    })

    // now lets make sure each value in the array is a {label, value} object
    formattedValue = formattedValue.map(value => {
      if (typeof value === 'string') {
        value = {label: value, value}
      }
      if (typeof value === 'object' && !value.label) {
        value.label = value.value
      }
      return value
    })

    updateSelectValue(formattedValue)
  }, [value, updateSelectValue, name])

  const handleOnKeyDown = useCallback(() => {
    if (!menuIsOpen[name]) openMenu()
    onKeyDown()
  }, [onKeyDown, menuIsOpen, openMenu, name])

  const handleChange = useCallback(e => {
    onChange({
      target: {
        name,
        value: e === null ? [] : e
      }
    })
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
  }, [onChange, name, menuIsOpen])

  const {Select} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'
  const components = {}
  if (isRequiredFlag && value.length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error'
    components.DropdownIndicator = () => {
      return <ValidationErrorIcon message='This Field is Required' />
    }
  }
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  return (
    <div
      className={outerClass}
      ref={inputContainer}
      onMouseDown={handleOnFocus}
      style={inputOuter}
      css={theme.inputOuter}
    >
      <Select
        className={className}
        classNamePrefix='gfb-input'
        tabIndex={tabIndex}
        autofocus={autofocus}
        closeMenuOnScroll={!isMobile ? closeMenuOnScroll : undefined}
        isClearable
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
          multiValue: base => {
            if (!interactive) {
              base.color = 'green'
              base.backgroundColor = '#a6eca67a'
            } else {
              base.backgroundColor = '#8bb7ff91'
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
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
  style: PropTypes.object
}
