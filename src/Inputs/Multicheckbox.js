/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'

const Multicheckbox = props => {
  const {
    name,
    onChange,
    readonly,
    disabled,
    autofocus,
    keyword = {},
    inline,
    autoComplete,
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
    indicators = {},
    options: optionsStyle = {}
  } = style

  const {options = []} = keyword
  const [value, updateValue] = useState([])

  useEffect(() => {
    let val = props.value
    if (typeof val === 'string') val = val.split('¤')
    val = val.filter(val => !!val)
    updateValue(val)
  }, [props.value, props.value.length])

  const handleOnChange = useCallback(e => {
    if (!disabled && !readonly && interactive) {
      const {value: clickedValue} = e.target
      let newvalue = [...value]
      if (newvalue.indexOf(clickedValue) > -1) {
        newvalue = newvalue.filter(val => val !== clickedValue)
      } else {
        newvalue.push(clickedValue)
      }
      onChange({
        target: {
          name,
          value: newvalue
        }
      })
    }
  }, [disabled, readonly, interactive, value, onChange, name])

  let valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container'
  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container'
  }
  let controlClass = 'gfb-input__control gfb-boxless-input'
  let validationError
  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }

  return (
    <div className='gfb-input-outer' style={inputOuter}>
      <div className='gfb-input-inner' style={inputInner}>
        <div className={controlClass} style={inputControl}>
          <div className={valueContainerClassName} style={valueContainer}>
            {options.map((option, i) => {
              const checked = value.indexOf(option.value) > -1 || value.indexOf(option.value + '') > -1 // the option value may be a number but the field have the value as a string
              let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input'
              if (checked) className = className + ' gfb-multi-input-selected'
              if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input'
              if (!interactive) className = className + ' gfb-non-interactive-input'
              return (
                <label key={i} className={'gfb-multi-input-label-wrapper ' + className} style={optionsStyle}>
                  <input
                    className={className}
                    name={name}
                    value={option.value}
                    checked={checked}
                    onChange={handleOnChange}
                    disabled={readonly || disabled || !interactive}
                    autoFocus={autofocus}
                    type='checkbox'
                    autoComplete={autoComplete}
                    style={valueStyle}
                  />
                  {option.label ? option.label : option.value}
                </label>
              )
            })}
          </div>
          <div className='gfb-input__indicators' style={indicators}>
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Multicheckbox

Multicheckbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  keyword: PropTypes.object,
  inline: PropTypes.bool,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool
}
