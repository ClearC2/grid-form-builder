/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback} from 'react'
import PropTypes from 'prop-types'
import ValidationErrorIcon from '../ValidationErrorIcon'
import useTheme from '../theme/useTheme'
import PortalTooltip from '../Tooltip'
import {randomId} from '../utils'
const Radio = (props) => {
  const {
    name,
    onChange,
    readonly,
    disabled,
    autofocus,
    keyword = {},
    inline,
    value = '',
    autoComplete,
    interactive = true,
    requiredWarning,
    style = {},
    required,
    warning,
    tabIndex,
    showOptionTooltips = false, // this flag is used to show tooltips for each individual option
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

  const {options = []} = keyword

  const handleOnChange = useCallback(e => {
    if (!disabled && !readonly && interactive) {
      const {value: clickedValue} = e.target
      const newvalue = clickedValue === value ? '' : clickedValue // if clicked value is already active, blank out the value to turn off the radio
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
              const checked = value && (option.value + '').toLowerCase() === (value + '').toLowerCase() // the option value may be a number but the field have the value as a string
              let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input'
              if (checked) className = className + ' gfb-multi-input-selected'
              if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input'
              if (!interactive) className = className + ' gfb-non-interactive-input'
              const optionId = randomId()
              return (
                <label
                  key={i}
                  className={'gfb-multi-input-label-wrapper ' + className}
                  style={valueStyle}
                  css={theme.options}
                  data-tip
                  data-for={optionId}
                >
                  <input
                    tabIndex={tabIndex}
                    className={className}
                    name={name}
                    value={option.value}
                    checked={checked}
                    onClick={handleOnChange} // this makes on change fire twice, which is not ideal, but it lets the user uncheck a radio, is this good? - JRA 01/09/2019
                    onChange={handleOnChange}
                    disabled={readonly || disabled || !interactive}
                    autoFocus={autofocus}
                    // onFocus={handleOnFocus}
                    // onBlur={handleOnBlur}
                    type='radio'
                    autoComplete={autoComplete}
                    css={valueCSS}
                    data-testid={testId}
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

export default Radio

Radio.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  keyword: PropTypes.object,
  inline: PropTypes.bool,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool,
  warning: PropTypes.string,
  showOptionTooltips: PropTypes.bool,
  'data-testid': PropTypes.string
}
