/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useState} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const Input = props => {
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
    interactive = true,
    requiredWarning,
    style = {},
    required,
    format = 'text',
    maxlength = 524288
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

  const [isFocused, setIsFocused] = useState(false)

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  const handleOnChange = useCallback(e => {
    onChange(e)
  }, [onChange])

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

  return (
    <div className={outerClass} style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className={controlClass} style={inputControl} css={theme.inputControl}>
          <div className='gfb-input__value-container' style={valueContainer} css={theme.valueContainer}>
            <input
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
              css={theme.value}
              type={format}
              maxLength={maxlength}
            />
          </div>
          <div className='gfb-input__indicators' style={indicators} css={theme.indicators}>
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

export default Input

Input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  format: PropTypes.string,
  maxlength: PropTypes.number
}
