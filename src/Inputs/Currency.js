/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useRef, useState} from 'react'
import PropTypes from 'prop-types'
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave' // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const Currency = props => {
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
    delimiter = ',',
    prefix = '$',
    numeralDecimalMark = '.',
    interactive = true,
    requiredWarning,
    style = {},
    required,
    maxlength = 524288,
    minimum = Number.MIN_SAFE_INTEGER,
    maximum = Number.MAX_SAFE_INTEGER,
    warning
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style

  const {theme} = useTheme()

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
    if (prefix) newValue = newValue.replace(prefix, '')
    onChange({
      target: {
        value: newValue,
        name
      }
    })
  }, [prefix, onChange, name])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && (value + '').trim().length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let validationWarning
  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationWarning = `Maximum character limit of ${maxlength} reached.`
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }
  if (minimum && (value + '').length && parseFloat(value) < parseFloat(minimum)) {
    validationError = `Minimum value required: $${minimum}`
  }
  if (maximum && (value + '').length && parseFloat(value) > parseFloat(maximum)) {
    validationError = `Maximum value permitted: $${maximum}`
  }
  const isFirefox = navigator.userAgent.search('Firefox') > -1
  const isDisabled = readonly || disabled || !interactive
  return (
    <div className={outerClass} style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className={controlClass} style={inputControl} css={theme.inputControl}>
          <div className='gfb-input__value-container' style={valueContainer} css={theme.valueContainer}>
            <Cleave
              ref={input}
              options={{
                numeral: true,
                prefix,
                numeralDecimalMark,
                delimiter
              }}
              className={className}
              name={name}
              value={value}
              onChange={handleOnChange}
              disabled={isFirefox ? false : isDisabled}
              readOnly={isFirefox && isDisabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              autoComplete={autoComplete}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={valueStyle}
              css={theme.value}
              maxLength={maxlength + Math.ceil(((value + '').length / 3))}
              min={minimum || Number.MIN_SAFE_INTEGER}
              max={maximum || Number.MAX_SAFE_INTEGER}
            />
          </div>
          <div className='gfb-input__indicators' style={indicators}>
            {warning && !validationError && <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />}
            {validationWarning && <ValidationErrorIcon message={validationWarning} color='#FFCC00' type='warning' />}
            {validationWarning && validationError && (
              <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />
            )}
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Currency

Currency.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  delimiter: PropTypes.string,
  prefix: PropTypes.string,
  numeralDecimalMark: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  minimum: PropTypes.number,
  maximum: PropTypes.number,
  warning: PropTypes.string
}
