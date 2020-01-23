import React, {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'

const Listselect = props => {
  const {
    name,
    onChange,
    keyword = {},
    disabled,
    readonly,
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
      const {innerHTML: clickedValue} = e.target
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

  const handleSelectAll = useCallback(() => {
    if (!readonly && !disabled && interactive) {
      const allvalues = options.map(option => option.value)
      onChange({
        target: {
          name,
          value: allvalues
        }
      })
    }
  }, [readonly, disabled, interactive, options, onChange, name])

  const handleDeselectAll = useCallback(() => {
    if (!readonly && !disabled && interactive) {
      onChange({
        target: {
          name,
          value: []
        }
      })
    }
  }, [readonly, disabled, interactive, onChange, name])

  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && value.length === 0) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }

  return (
    <div className='gfb-input-outer' style={inputOuter}>
      <div className='gfb-input-inner' style={inputInner}>
        <div className={controlClass} style={inputControl}>
          <div className='gfb-input__value-container gfb-value-multi-input-container' style={valueContainer}>
            {options.map((option, i) => {
              const display = option.label ? option.label : option.value
              const selected = value.indexOf(option.value) > -1
              let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input'
              if (selected) className = className + ' gfb-multi-input-selected'
              if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input'
              if (!interactive) className = className + ' gfb-non-interactive-input'
              return (
                <div
                  key={i}
                  className={className}
                  onClick={handleOnChange}
                  style={{...valueStyle, ...optionsStyle}}
                >
                  {display}
                </div>
              )
            })}
          </div>
          <div className='gfb-input__indicators' style={indicators}>
            {validationError && <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />}
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
        </div>
        <div className='gfb-input-control-bottom'>
          <span className='gfb-action-link' onClick={handleSelectAll}>
            Select All
          </span>
          <span className='gfb-action-link' onClick={handleDeselectAll}>
            Deselect All
          </span>
        </div>
      </div>
    </div>
  )
}

export default Listselect

Listselect.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  keyword: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool
}
