/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useRef, useState} from 'react'
import PropTypes from 'prop-types'
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave' // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
import 'cleave.js/dist/addons/cleave-phone.us'
import ValidationErrorIcon from '../ValidationErrorIcon'

const Phone = props => {
  const {
    name,
    value = '',
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    autoComplete,
    delimiter = ' ',
    interactive = true,
    requiredWarning,
    style = {},
    required
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style

  const input = useRef()
  const [isFocused, setIsFocused] = useState(false)

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleOnChange = useCallback(e => {
    let {value: newValue} = e.target
    if (input.current) {
      newValue = input.current.getRawValue()
    }
    onChange({
      target: {
        value: newValue,
        name
      }
    })
  }, [onChange, name])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  return (
    <div className={outerClass} style={inputOuter}>
      <div className='gfb-input-inner' style={inputInner}>
        <div className={controlClass} style={inputControl}>
          <div className='gfb-input__value-container' style={valueContainer}>
            <Cleave
              ref={input}
              options={{
                phone: true,
                phoneRegionCode: 'US',
                delimiter
              }}
              className={className}
              name={name}
              value={value}
              onChange={handleOnChange}
              disabled={readonly || disabled || !interactive}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              autoComplete={autoComplete}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={valueStyle}
            />
          </div>
          <div className='gfb-input__indicators' style={indicators}>
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Phone

Phone.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  delimiter: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool
}
