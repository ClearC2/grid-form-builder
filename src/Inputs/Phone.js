/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave' // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
import 'cleave.js/dist/addons/cleave-phone.i18n'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'
import countryCodes from '../countryCodes'
import {List, Map} from 'immutable'
import '../styles/phone.css'

const Phone = (props) => {
  const {
    name,
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
    required,
    region = 'US',
    regionselect = false,
    regions,
    values,
    maxlength = 524288,
    warning,
    'data-testid': testId = props?.name
  } = props

  let {value = ''} = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style

  const regionPropValue = typeof region === 'string' && region.length === 2 ? region : (values.get(region) || 'US')

  const {theme} = useTheme()

  const input = useRef()

  const selectableRegionCodes = useRef(regions || countryCodes)

  const [isFocused, setIsFocused] = useState(false)

  const [countryCode, setCountryCode] = useState(regionPropValue)

  const handleOnRegionChange = useCallback(e => {
    const {value: newValue} = e.target
    if (typeof region === 'string' && region.length > 2) { // if a hard coded region wasn't provided, assume it's read from a field
      onChange({
        target: {
          value: newValue,
          name: region
        }
      })
    }
    setCountryCode(newValue)
  }, [region, onChange])

  useEffect(() => {
    setCountryCode(regionPropValue)
  }, [regionPropValue])

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

  const isDisabled = readonly || disabled || !interactive

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

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}

  value = countryCode && countryCode !== 'US' && !value.startsWith('+') ? `+${value}` : value

  return (
    <div className={outerClass} style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          {regionselect && (
            <div className='phone-region-select-container'>
              <select value={countryCode} onChange={handleOnRegionChange}>
                {selectableRegionCodes.current.sort().map((country, i) => {
                  return (
                    <option key={i} value={country}>
                      {country}
                    </option>
                  )
                })}
              </select>
            </div>
          )}
          <div className='gfb-input__value-container' style={valueContainer} css={valueContainerCSS}>
            <Cleave
              key={countryCode}
              ref={input}
              options={{
                phone: true,
                phoneRegionCode: countryCode,
                delimiter
              }}
              className={className}
              name={name}
              value={value}
              onChange={handleOnChange}
              readOnly={isDisabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              autoComplete={autoComplete}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={valueStyle}
              css={valueCSS}
              maxLength={maxlength + Math.floor((value + '').length / 4)}
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

export default Phone

Phone.propTypes = {
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
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  region: PropTypes.string,
  regionselect: PropTypes.bool,
  regions: PropTypes.oneOfType([PropTypes.array, PropTypes.instanceOf(List)]),
  values: PropTypes.instanceOf(Map),
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  warning: PropTypes.string,
  'data-testid': PropTypes.string
}
