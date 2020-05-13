/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useRef, useState} from 'react'
import PropTypes from 'prop-types'
// import Cleave from 'cleave.js/react'
import Cleave from '../Cleave' // switch this back to cleave.js package as soon they remove the deprecated lifecycles - JRA 01/15/2020
import 'cleave.js/dist/addons/cleave-phone.i18n'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'
import countryCodes from '../countryCodes'
import {List, Map} from 'immutable'
import '../styles/phone.css'

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
    required,
    region = 'US',
    regionselect = false,
    regions,
    values
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

  const selectableRegionCodes = useRef(regions || countryCodes)

  const [isFocused, setIsFocused] = useState(false)

  const [countryCode, setCountryCode] = useState(
    typeof region === 'string' && region.length === 2 ? region : (values.get(region) || 'US')
  )

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
    <div className={outerClass} style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className={controlClass} style={inputControl} css={theme.inputControl}>
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
          <div className='gfb-input__value-container' style={valueContainer} css={theme.valueContainer}>
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
              disabled={readonly || disabled || !interactive}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              autoComplete={autoComplete}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              style={valueStyle}
              css={theme.value}
            />
          </div>
          <div className='gfb-input__indicators' style={indicators} css={theme.indicators}>
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
  values: PropTypes.instanceOf(Map)
}
