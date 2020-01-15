import React, {useEffect, useRef, useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import ReactSelect from 'react-select'
import Creatable from 'react-select/creatable'
import {isMobile} from '../utils'

const viewPortHeight = document.documentElement.clientHeight

const Multiselect = props => {
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
    autoComplete
  } = props

  const [input, changeInput] = useState({Select: allowcreate ? Creatable : ReactSelect})
  const [isRequiredFlag, updateIsRequiredFlag] = useState(required && requiredWarning && !value.length)
  const [menuIsOpen, updateIsMenuOpen] = useState(false)
  const [menuPlacement, updateMenuPlacement] = useState('bottom')
  const [fieldPosition, updateFieldPosition] = useState(0)
  const [selectValue, updateSelectValue] = useState([])
  const [options, updateSelectOptions] = useState([])

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
    }
    setTimeout(openMenu) // this needs to be refactored so it actually updates with react instead of hacking around the problem - JRA 12/18/2019
  }, [openMenu, fieldPosition])

  const handleInputClick = useCallback(() => {
    if (!disabled && !readonly) {
      setInputFieldPosition()
    }
  }, [disabled, readonly, setInputFieldPosition])

  const handleOnFocus = useCallback(() => {
    handleInputClick()
  }, [handleInputClick])

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
    changeInput({Select: allowcreate ? Creatable : ReactSelect})
  }, [allowcreate, changeInput])

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
    if (!menuIsOpen) openMenu()
    onKeyDown()
  }, [onKeyDown, menuIsOpen, openMenu])

  const handleChange = useCallback(e => {
    onChange({
      target: {
        name,
        value: e === null ? [] : e
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
        isMulti
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
        autoComplete={autoComplete}
        styles={{
          menuPortal: base => {
            const top = menuPlacement === 'bottom' ? base.top - 28 : base.top - 12
            return ({...base, top})
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
  autoComplete: PropTypes.string
}
