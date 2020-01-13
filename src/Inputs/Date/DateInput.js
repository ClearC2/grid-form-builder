import React, {useCallback, useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'

const DateInput = props => {
  const {
    name,
    value,
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    dateFormat = 'M/D/YYYY hh:mm a',
    timePicker = false,
    showCalendar = true
  } = props
  const [inputValue, changeInputValue] = useState('')
  const elementId = useRef(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15))
  const [showPicker, changeShowPicker] = useState(false)

  useEffect(() => {
    changeInputValue(value)
  }, [value])

  const handleOnInputChange = useCallback(e => {
    const {value: newValue} = e.target
    changeInputValue(newValue)
    if (!showPicker) changeShowPicker(true)
  }, [changeInputValue, showPicker, changeShowPicker])

  const handleOnFocus = useCallback(() => {
    changeShowPicker(true)
  }, [changeShowPicker])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <input
              id={elementId.current}
              className={className}
              name={name}
              value={inputValue}
              onChange={handleOnInputChange}
              disabled={readonly || disabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
              autoComplete='off'
            />
            {showPicker && (
              <DatePicker
                elementId={elementId.current}
                handleOnChange={onChange}
                dateFormat={dateFormat}
                changeShowPicker={changeShowPicker}
                name={name}
                timePicker={timePicker}
                showCalendar={showCalendar}
              />
            )}
          </div>
          <div className='gfb-input-indicators' />
        </div>
      </div>
    </div>
  )
}

export default DateInput

DateInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  dateFormat: PropTypes.string,
  timePicker: PropTypes.bool,
  showCalendar: PropTypes.bool
}
