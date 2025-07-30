/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useRef, useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import ColorPicker from './ColorPicker'
import {randomId} from '../../utils'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import useTheme from '../../theme/useTheme'

const ColorInput = props => {
  const {
    name,
    value = '',
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    onChange,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    maxlength = 524288,
    'data-testid': testId = props?.['data-testid'] || props?.name
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

  const [showPicker, setShowPicker] = useState(false)
  const inputId = useRef(randomId())
  const portalRef = useRef()
  const [isFocused, setIsFocused] = useState(false)

  const windowClickListener = useMemo(() => {
    return e => {
      const pathHandler = (e.path || e.composedPath())
      const insideClick = pathHandler.some(path => {
        return (
          path.id === inputId.current ||
          path.id === portalRef.current.state.id
        )
      })
      if (!insideClick) {
        setShowPicker(false)
      }
    }
  }, [])

  useEffect(() => {
    if (showPicker) window.addEventListener('mousedown', windowClickListener)
    else window.removeEventListener('mousedown', windowClickListener)
    return () => {
      window.removeEventListener('mousedown', windowClickListener)
    }
  }, [showPicker, windowClickListener])

  const handleOnInputChange = useCallback(e => {
    let {value: newValue} = e.target
    if (typeof newValue === 'string') newValue = newValue.toUpperCase()
    onChange({
      target: {
        name,
        value: newValue
      }
    })
    if (!showPicker) setShowPicker(true)
  }, [showPicker, setShowPicker, name, onChange])

  const handleOnFocus = useCallback(() => {
    if (!readonly && !disabled && interactive) {
      setShowPicker(true)
      setIsFocused(true)
    }
  }, [readonly, disabled, interactive])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

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
  const isDisabled = readonly || disabled || !interactive
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
              id={inputId.current}
              className={className}
              name={name}
              value={value}
              onChange={handleOnInputChange}
              readOnly={isDisabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              autoComplete={autoComplete}
              style={valueStyle}
              css={valueCSS}
              maxLength={maxlength}
              data-testid={testId}
            />
            {showPicker && (
              <ColorPicker
                ref={portalRef}
                inputId={inputId.current}
                value={value}
                onChange={handleOnInputChange}
                name={name}
                data-testid={`${testId}-color-picker`}
              />
            )}
          </div>
          <div className='gfb-input__indicators' style={indicators} css={indicatorsCSS}>
            {validationWarning && <ValidationErrorIcon message={validationWarning} color='#FFCC00' type='warning' />}
            {validationWarning && validationError && (
              <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />
            )}
            {validationError && <ValidationErrorIcon message={validationError} />}
            {(validationError || validationWarning) && (
              <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />
            )}
            <div
              className='gfb-color-input-indicator'
              style={{backgroundColor: value}}
              onClick={handleOnFocus}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColorInput

ColorInput.propTypes = {
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
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  'data-testid': PropTypes.string
}
