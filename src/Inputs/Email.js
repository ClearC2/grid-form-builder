import React, {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import {emailValidator} from '../utils'
import {FaExclamationTriangle} from 'react-icons/fa'
import Tooltip from 'react-tooltip'

const Email = props => {
  const {
    name,
    value,
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    autoComplete,
    interactive = true
  } = props

  const [isFocused, setIsFocused] = useState(false)

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError = false
  if (value && !emailValidator(value) && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'Invalid Email Format'
  }

  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className={controlClass}>
          <div className='gfb-input__value-container'>
            <input
              className={className}
              name={name}
              value={value}
              onChange={onChange}
              disabled={readonly || disabled || !interactive}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              autoComplete={autoComplete === 'off' ? 'ac-off' : autoComplete}
            />
          </div>
          <div className='gfb-input__indicators'>
            {validationError && (
              <div className='gfb-input__indicator gfb-validation-error-indicator'>
                <FaExclamationTriangle data-tip data-for='validation-icon' color='red' />
                <Tooltip id='validation-icon' type='error' multiline={false}>
                  <span>{validationError}</span>
                </Tooltip>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Email

Email.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool
}
