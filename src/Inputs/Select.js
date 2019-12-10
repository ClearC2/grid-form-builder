import React, {useEffect, useRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import {isMobile} from '../utils'

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
    onChange
  } = props

  const {options} = keyword

  const [input, changeInput] = useState({Select: allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState(false)
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState({label: '', value: ''})

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
  }, [menuIsOpen, updateIsMenuOpen])

  const setInputFieldPosition = useCallback(() => {
    const position = inputContainer.current.getBoundingClientRect().top
    if (fieldPosition !== position) {
      updateFieldPosition(position)
      setMenuOpenPosition()
    }
    openMenu()
  }, [openMenu, setMenuOpenPosition, fieldPosition])

  const handleInputClick = useCallback(() => {
    if (!disabled && !readonly) {
      setInputFieldPosition()
    }
  }, [disabled, readonly, setInputFieldPosition])

  const handleOnFocus = useCallback(() => {
    handleInputClick()
  }, [handleInputClick])

  useEffect(() => {
    changeInput({Select: allowcreate ? Creatable : ReactSelect})
  }, [allowcreate, changeInput])

  useEffect(() => {
    updateIsRequiredFlag(required && requiredWarning && !value.length)
  }, [updateIsRequiredFlag, required, requiredWarning, value])

  useEffect(() => {
    const keyMap = options.reduce((acc, cv) => {
      acc[cv.value] = cv.label
      return acc
    }, {})
    updateSelectValue({label: keyMap[value], value})
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
  return (
    <div className='gfb-input-outer' ref={inputContainer} onMouseDown={handleOnFocus}>
      <Select
        className='gfb-input-inner'
        classNamePrefix='gfb-input'
        tabIndex={tabIndex}
        autofocus={autofocus}
        isClearable
        isDisabled={disabled || readonly}
        menuPortalTarget={document.body}
        menuShouldBlockScroll
        name={name}
        options={options}
        placeholder={isRequiredFlag ? '* This Field Is Required' : placeholder}
        onFocus={handleOnFocus}
        onKeyDown={handleOnKeyDown}
        onBlur={handleInputBlur}
        menuIsOpen={!isMobile ? menuIsOpen : undefined}
        menuPlacement={!isMobile ? menuPlacement : undefined}
        value={selectValue}
        defaultValue={selectValue}
        onChange={handleChange}
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
  onKeyDown: PropTypes.func
}
