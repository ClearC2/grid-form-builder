/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useRef} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

const Checkbox = props => {
  const {
    name,
    value = '',
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    onValue,
    offValue,
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    warning,
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

  const truthy = useRef([
    true,
    1,
    '1',
    't',
    'T',
    'true',
    'True',
    'TRUE',
    'y',
    'Y',
    'Yes',
    'YES',
    'yes',
    'on',
    'On',
    'ON',
    onValue || name
  ])

  const falsey = useRef([ // eslint-disable-line
    false,
    0,
    '0',
    'f',
    'F',
    'false',
    'False',
    'FALSE',
    'n',
    'N',
    'No',
    'NO',
    'no',
    'off',
    'Off',
    'OFF',
    offValue || ''
  ])

  const handleOnChange = useCallback(e => {
    let oppositeOfCurrentValue = null
    if (typeof offValue !== 'undefined' && typeof onValue !== 'undefined') {
      if (value === offValue) oppositeOfCurrentValue = onValue
      else if (value === onValue) oppositeOfCurrentValue = offValue
      else oppositeOfCurrentValue = onValue // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
    } else if (onValue) {
      if (falsey.current.indexOf(value) > -1) oppositeOfCurrentValue = onValue
      else oppositeOfCurrentValue = '' // put this weird check in to default off value to blank if only an onValue was provided
    } else if (offValue) {
      if (truthy.current.indexOf(value) > -1) oppositeOfCurrentValue = offValue
      else oppositeOfCurrentValue = '1'// put this weird check in to default on value to 1 if only an offValue was provided
    } else {
      switch (value) {
        case true: oppositeOfCurrentValue = false; break
        case false: oppositeOfCurrentValue = true; break
        case 0: oppositeOfCurrentValue = 1; break
        case 1: oppositeOfCurrentValue = 0; break
        case '0': oppositeOfCurrentValue = '1'; break
        case '1': oppositeOfCurrentValue = '0'; break
        case 'true': oppositeOfCurrentValue = 'false'; break
        case 'false': oppositeOfCurrentValue = 'true'; break
        case 'True': oppositeOfCurrentValue = 'False'; break
        case 'False': oppositeOfCurrentValue = 'True'; break
        case 'TRUE': oppositeOfCurrentValue = 'FALSE'; break
        case 'FALSE': oppositeOfCurrentValue = 'TRUE'; break
        case 't': oppositeOfCurrentValue = 'f'; break
        case 'f': oppositeOfCurrentValue = 't'; break
        case 'T': oppositeOfCurrentValue = 'F'; break
        case 'F': oppositeOfCurrentValue = 'T'; break
        case 'y': oppositeOfCurrentValue = 'n'; break
        case 'n': oppositeOfCurrentValue = 'y'; break
        case 'Y': oppositeOfCurrentValue = 'N'; break
        case 'N': oppositeOfCurrentValue = 'Y'; break
        case 'Yes': oppositeOfCurrentValue = 'No'; break
        case 'No': oppositeOfCurrentValue = 'Yes'; break
        case 'YES': oppositeOfCurrentValue = 'NO'; break
        case 'NO': oppositeOfCurrentValue = 'YES'; break
        case 'yes': oppositeOfCurrentValue = 'no'; break
        case 'no': oppositeOfCurrentValue = 'yes'; break
        case 'On': oppositeOfCurrentValue = 'Off'; break
        case 'Off': oppositeOfCurrentValue = 'On'; break
        case 'ON': oppositeOfCurrentValue = 'OFF'; break
        case 'OFF': oppositeOfCurrentValue = 'ON'; break
        case 'on': oppositeOfCurrentValue = 'off'; break
        case 'off': oppositeOfCurrentValue = 'on'; break
        case '': oppositeOfCurrentValue = '1'; break // default the opposite of blank as '1'
        default: oppositeOfCurrentValue = !!e.target.value
      }
    }
    onChange({target: {name: e.target.name, value: oppositeOfCurrentValue}})
  }, [offValue, onChange, onValue, value])

  let checked = false
  if (truthy.current.indexOf(value) > -1) checked = true

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control gfb-boxless-input'
  let validationError
  if (required && requiredWarning && (value + '').trim().length === 0) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}

  return (
    <div
      className='gfb-input-outer'
      style={{...inputOuter, marginRight: warning ? '0px' : '10px'}}
      css={inputOuterCSS}
    >
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          <div className='gfb-input__value-container' style={valueContainer} css={valueContainerCSS}>
            <input
              data-testid={testId}
              className={className}
              name={name}
              value={value}
              checked={checked}
              onChange={handleOnChange}
              disabled={readonly || disabled || !interactive}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              type='checkbox'
              autoComplete={autoComplete}
              style={valueStyle}
              css={valueCSS}
            />
          </div>
          <div className='gfb-input__indicators' style={indicators} css={indicatorsCSS}>
            {warning && !validationError && <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />}
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkbox

Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  onValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  offValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  warning: PropTypes.string,
  'data-testid': PropTypes.string
}
