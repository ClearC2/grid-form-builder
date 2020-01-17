import React, {useEffect, useRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import {isMobile} from '../utils'
import ValidationErrorIcon from '../ValidationErrorIcon'

const viewPortHeight = document.documentElement.clientHeight

const Select = props => {
  const {
    allowcreate,
    value,
    tabIndex,
    autofocus,
    disabled,
    readonly,
    name,
    keyword,
    placeholder,
    requiredWarning,
    required,
    onKeyDown = () => null, // sometimes provided in the config object
    onChange,
    autoComplete,
    interactive = true
  } = props

  const {options} = keyword

  const [input, changeInput] = useState({Select: !interactive ? Creatable : allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState(false)
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState({label: '', value: ''})
  const [isFocused, setIsFocused] = useState(false)

  const inputContainer = useRef(null)

  const openMenu = useCallback(() => {
    if (!readonly && !disabled && !menuIsOpen) {
      updateIsMenuOpen(true)
    }
  }, [readonly, disabled, updateIsMenuOpen, menuIsOpen])

  const setMenuOpenPosition = useCallback(() => {
    const placement = fieldPosition < (viewPortHeight / 2) ? 'bottom' : 'top'
    updateMenuPlacement(placement)
  }, [fieldPosition, updateMenuPlacement])

  const handleInputBlur = useCallback(() => {
    menuIsOpen && updateIsMenuOpen(false)
    setIsFocused(false)
  }, [menuIsOpen, updateIsMenuOpen])

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
    if (!menuIsOpen) openMenu()
    onKeyDown()
  }, [onKeyDown, menuIsOpen, openMenu])

  const handleChange = useCallback(e => {
    onChange({
      target: {
        name,
        value: e === null ? '' : e.value
      }
    })
    menuIsOpen && updateIsMenuOpen(false)
  }, [onChange, name, menuIsOpen])

  const {Select} = input

  let className = 'gfb-input-inner'
  if (!interactive) className = className + ' gfb-non-interactive-input'

  let outerClass = 'gfb-input-outer'
  const components = {}

  if (isRequiredFlag && value.length === 0 && !isFocused) {
    outerClass = outerClass + ' gfb-validation-error'
    components.DropdownIndicator = () => {
      return <ValidationErrorIcon message='This field is required' />
    }
  }

  return (
    <div className={outerClass} ref={inputContainer} onMouseDown={handleOnFocus}>
      <Select
        className={className}
        classNamePrefix='gfb-input'
        tabIndex={tabIndex}
        autofocus={autofocus}
        isClearable
        isDisabled={disabled || readonly}
        menuPortalTarget={document.body}
        menuShouldBlockScroll
        name={name}
        options={options}
        placeholder={placeholder}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onBlur={handleInputBlur}
        menuIsOpen={!isMobile ? menuIsOpen : undefined}
        menuPlacement={!isMobile ? menuPlacement : undefined}
        value={selectValue}
        defaultValue={selectValue}
        onChange={handleChange}
        autoComplete={autoComplete}
        components={components}
        styles={{
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

export default Select

Select.propTypes = {
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
  interactive: PropTypes.bool
}
