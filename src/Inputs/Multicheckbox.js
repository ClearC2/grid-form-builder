/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'
import {convertDelimitedValueIntoLabelValueArray, convertLabelValueArrayIntoDelimitedValue, randomId} from '../utils'
import PortalTooltip from '../Tooltip'

const Multicheckbox = (props) => {
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
    required,
    delimit,
    delimiter = '¤',
    stringify,
    warning,
    showOptionTooltips = false, // this flag is used to show tooltips for each individual option
    'data-testid': testId = props?.name
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

  const [options, updateSelectOptions] = useState([])
  const [value, updateValue] = useState([])

  useEffect(() => {
    let formattedOptions = keyword.options || []
    if (!formattedOptions) formattedOptions = []
    if (typeof formattedOptions === 'string') formattedOptions = formattedOptions.split(delimiter)
    if (formattedOptions.toJS) formattedOptions = formattedOptions.toJS()

    const duplicate = {}
    // get rid of duplicates
    formattedOptions = formattedOptions.filter(option => {
      if (!option) return false
      if (typeof option === 'string') return true
      if (typeof option === 'object' && !option.value) option.value = option.label
      if (option.value && !duplicate[option.value]) {
        duplicate[option.value] = true
        return true
      }
    })

    // format into an array of {label, value} objects
    formattedOptions = formattedOptions.map(option => {
      if (typeof option === 'string') option = {label: option, value: option}
      if (!option.value) option.value = option.label
      return option
    })

    updateSelectOptions(formattedOptions)
  }, [delimiter, keyword.options])

  useEffect(() => {
    const formattedValue = convertDelimitedValueIntoLabelValueArray({value: props.value, delimit, delimiter, options})
    updateValue(formattedValue)
  }, [props.value, updateValue, name, delimit, delimiter, stringify, options])

  const handleOnChange = useCallback(e => {
    if (!disabled && !readonly && interactive) {
      const {value: clickedValue} = e.target
      const clickedOption = options.find(option => {
        return (option.value === clickedValue || option.value === +clickedValue)
      })
      let found = false
      let newValue = value.filter(val => {
        if (val.value === clickedOption.value) {
          found = true
          return false
        }
        return true
      })
      if (!found) {
        newValue.push(clickedOption)
      }
      newValue = convertLabelValueArrayIntoDelimitedValue({value: newValue, delimiter, delimit, stringify})
      onChange({
        target: {
          name,
          value: newValue
        }
      })
    }
  }, [disabled, readonly, interactive, value, delimiter, delimit, stringify, onChange, name, options])

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
          <div className={valueContainerClassName} style={valueContainer} css={valueContainerCSS}>
            {options.map((option, i) => {
              const checked = value.some(val => {
                return (val.value === option.value)
              })
              let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input'
              if (checked) className = className + ' gfb-multi-input-selected'
              if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input'
              if (!interactive) className = className + ' gfb-non-interactive-input'
              const optionId = randomId()
              return (
                <label
                  key={i}
                  className={'gfb-multi-input-label-wrapper ' + className}
                  style={optionsStyle}
                  css={theme.options}
                  data-tip
                  data-for={optionId}
                >
                  <input
                    data-testid={`${testId}-${option.value}`}
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
                    css={valueCSS}
                  />
                  {option.label ? option.label : option.value}
                  {showOptionTooltips ? <PortalTooltip id={optionId} message={option?.tooltip} /> : null}
                </label>
              )
            })}
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

export default Multicheckbox

Multicheckbox.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  keyword: PropTypes.object,
  inline: PropTypes.bool,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  stringify: PropTypes.bool,
  delimiter: PropTypes.string,
  delimit: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  warning: PropTypes.string,
  showOptionTooltips: PropTypes.bool,
  'data-testid': PropTypes.string
}
