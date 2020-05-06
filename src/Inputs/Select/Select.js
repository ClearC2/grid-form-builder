/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useEffect, useRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import {isMobile} from '../../utils'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import useTheme from '../../theme/useTheme'

const viewPortHeight = document.documentElement.clientHeight

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
    isClearable = true
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

  const [options, setOptions] = useState(keyword.options || [])
  const [input, changeInput] = useState({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState({})
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState({label: '', value: ''})
  const [isFocused, setIsFocused] = useState(false)

  const inputContainer = useRef(null)

  const openMenu = useCallback(() => {
    if (!readonly && !disabled && !menuIsOpen[name]) {
      updateIsMenuOpen({...menuIsOpen, [name]: true})
    }
  }, [readonly, disabled, menuIsOpen, updateIsMenuOpen, name])

  const setMenuOpenPosition = useCallback(() => {
    const placement = fieldPosition < (viewPortHeight / 2) ? 'bottom' : 'top'
    updateMenuPlacement(placement)
  }, [fieldPosition, updateMenuPlacement])

  const handleInputBlur = useCallback(() => {
    menuIsOpen[name] && updateIsMenuOpen({...menuIsOpen, [name]: false})
    setIsFocused(false)
  }, [menuIsOpen, updateIsMenuOpen, name])

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
      menuOpenState = e.target.classList.contains('gfb-input__menu-list') && menuIsOpen[name]
    }
    updateIsMenuOpen({...menuIsOpen, [name]: menuOpenState})
  }, [menuIsOpen, name, updateIsMenuOpen])

  useEffect(() => {
    setOptions(keyword.options)
  }, [keyword.options, keyword.options.length])

  useEffect(() => {
    setMenuOpenPosition()
  }, [fieldPosition, setMenuOpenPosition])

  useEffect(() => {
    changeInput({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  }, [interactive, allowcreate, changeInput])

  useEffect(() => {
    updateIsRequiredFlag(required && requiredWarning && !value.length)
  }, [updateIsRequiredFlag, required, requiredWarning, value])

  useEffect(() => {
    const keyMap = options.reduce((acc, cv) => {
      acc[cv.value] = cv.label
      return acc
    }, {})
    updateSelectValue({label: keyMap[value] || value, value})
  }, [value, updateSelectValue, options])

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
  }, [onChange, name, menuIsOpen])

  const {Select} = input

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
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  return (
    <div className={outerClass} ref={inputContainer} onMouseDown={handleOnFocus} style={inputOuter}>
      <Select
        className={className}
        classNamePrefix='gfb-input'
        tabIndex={tabIndex}
        autoFocus={autofocus}
        closeMenuOnScroll={!isMobile ? closeMenuOnScroll : undefined}
        isClearable={isClearable}
        isDisabled={disabled || readonly}
        menuPortalTarget={document.body}
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
          singleValue: base => {
            if (!interactive) {
              base.color = 'green'
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
  isClearable: PropTypes.bool
}
