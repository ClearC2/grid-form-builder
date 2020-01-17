import React, {useCallback} from 'react'
import PropTypes from 'prop-types'

const Radio = props => {
  const {
    name,
    onChange,
    readonly,
    disabled,
    autofocus,
    keyword,
    inline,
    value,
    autoComplete,
    interactive = true
  } = props

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
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control gfb-boxless-input'>
          <div className={valueContainerClassName}>
            {options.map((option, i) => {
              const checked = value && (option.value + '').toLowerCase() === (value + '').toLowerCase() // the option value may be a number but the field have the value as a string
              let className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input'
              if (checked) className = className + ' gfb-multi-input-selected'
              if (disabled || readonly || !interactive) className = className + ' gfb-disabled-input'
              if (!interactive) className = className + ' gfb-non-interactive-input'
              return (
                <label key={i} className={'gfb-multi-input-label-wrapper ' + className}>
                  <input
                    className={className}
                    name={name}
                    value={option.value}
                    checked={checked}
                    onClick={handleOnChange} // this makes on change fire twice, which is not ideal, but it lets the user uncheck a radio, is this good? - JRA 01/09/2019
                    onChange={handleOnChange}
                    disabled={readonly || disabled || !interactive}
                    autoFocus={autofocus}
                    type='radio'
                    autoComplete={autoComplete}
                  />
                  {option.label ? option.label : option.value}
                </label>
              )
            })}
          </div>
          <div className='gfb-input__indicators' />
        </div>
      </div>
    </div>
  )
}

export default Radio

Radio.propTypes = {
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
  requiredWarning: PropTypes.bool
}