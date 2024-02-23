/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useState, useCallback, useEffect} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'

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
    required,
    warning
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

  const {theme} = useTheme()

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
      const {value: clickedValue} = e.target.dataset
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

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}

  return (
    <div className='gfb-input-outer' style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          <div
            className='gfb-input__value-container gfb-value-multi-input-container'
            style={valueContainer}
            css={valueContainerCSS}
          >
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
                  data-value={option.value}
                  css={valueCSS}
                >
                  {display}
                </div>
              )
            })}
          </div>
          <div className='gfb-input__indicators' style={indicators} css={indicatorsCSS}>
            {(validationError || warning) &&
              <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />}
            {warning && !validationError && <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  keyword: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  warning: PropTypes.string
}
