/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const Percentage = (props) => {
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
    decimals = 0,
    maxlength = 524288,
    warning,
    maximum = 100,
    minimum = 0,
    'data-testid': testId = props?.name
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

  const formatValue = (val) => {
    const num = parseFloat(val)
    if (isNaN(num)) return ''
    return num.toFixed(decimals)
  }

  const [isFocused, setIsFocused] = useState(false)
  const [formattedValue, setFormattedValue] = useState(formatValue(value))

  useEffect(() => {
    if (!isFocused) {
      setFormattedValue(formatValue(value))
    }
  }, [value, decimals, isFocused]) //eslint-disable-line

  const handleOnFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)

    const num = parseFloat(formattedValue)
    if (!isNaN(num)) {
      const formatted = num.toFixed(decimals)
      setFormattedValue(formatted)
      onChange({target: {value: formatted, name}})
    }
  }, [formattedValue, decimals, name, onChange])

  const handleOnChange = useCallback(
    (e) => {
      const newValue = e.target.value.replace('%', '').trim()
      const parts = newValue.split('.')
      const decimalPart = parts[1] || ''

      if (decimals && decimalPart.length > decimals) return

      const num = parseFloat(newValue)
      if (newValue === '' || newValue === '.' || isNaN(num)) {
        setFormattedValue(newValue)
        onChange({target: {value: '', name}})
        return
      }

      if (num < minimum || num > maximum) {
        return
      }
      setFormattedValue(newValue)
      onChange({target: {value: newValue, name}})
    },
    [decimals, name, onChange, minimum, maximum]
  )

  const isDisabled = readonly || disabled || !interactive

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && (formattedValue + '').trim().length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let validationWarning
  if (maxlength && (formattedValue + '').length && (formattedValue + '').length >= maxlength) {
    validationWarning = `Maximum character limit of ${maxlength} reached.`
  }
  if (maximum && parseFloat(formattedValue) && parseFloat(formattedValue) > maximum) {
    validationError = `Maximum value of ${maximum} reached.`
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}
  return (
    <div className={outerClass} style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          <div className='gfb-input__value-container' style={valueContainer} css={valueContainerCSS}>
            <input
              className={className}
              name={name}
              value={!isFocused && (formattedValue + '').length ? formattedValue + '%' : formattedValue}
              onChange={handleOnChange}
              readOnly={isDisabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              autoComplete={autoComplete}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              type='text'
              style={valueStyle}
              css={valueCSS}
              maxLength={maxlength}
              data-testid={testId}
            />
          </div>
          <div
            className='gfb-input__indicators'
            style={indicators}
            css={indicatorsCSS}
            data-testid={`${testId}-errors`}
          >
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

export default Percentage

Percentage.propTypes = {
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
  decimals: PropTypes.number,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.number,
  maximum: PropTypes.number,
  minimum: PropTypes.number,
  'data-testid': PropTypes.string
}
