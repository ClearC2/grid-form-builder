import React, {useCallback, useRef} from 'react'
import PropTypes from 'prop-types'

const Checkbox = props => {
  const {name, value, onChange, readonly, disabled, autofocus, placeholder, tabIndex, onValue, offValue} = props

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
    if (offValue && onValue) {
      if (value === offValue) oppositeOfCurrentValue = onValue
      else if (value === onValue) oppositeOfCurrentValue = offValue
      else oppositeOfCurrentValue = onValue // could be dangerous, this says if you provided an on and off value but the current value isn't either one of them, make the action set this to the true value
    } else if (onValue) {
      if (this.falsey.indexOf(value) > -1) oppositeOfCurrentValue = onValue
      else oppositeOfCurrentValue = '' // put this weird check in to default off value to blank if only an onValue was provided
    } else if (offValue) {
      if (this.truthy.indexOf(value) > -1) oppositeOfCurrentValue = offValue
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
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control gfb-boxless-input'>
          <div className='gfb-input__value-container'>
            <input
              className={className}
              name={name}
              value={value}
              checked={checked}
              onChange={handleOnChange}
              disabled={readonly || disabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              type='checkbox'
            />
          </div>
          <div className='gfb-input__indicators' />
        </div>
      </div>
    </div>
  )
}

export default Checkbox

Checkbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  onValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  offValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
}
