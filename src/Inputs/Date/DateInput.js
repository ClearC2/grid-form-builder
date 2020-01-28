/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'
import moment from 'moment'
import {randomId} from '../../utils'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import useTheme from '../../theme/useTheme'

const DateInput = props => {
  const {
    name,
    value = '',
    onChange,
    readonly,
    disabled,
    autofocus,
    placeholder,
    tabIndex,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    timePicker = false,
    showCalendar = true,
    format,
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
    indicators = {}
  } = style

  const {theme} = useTheme()

  let {type = 'date'} = props
  type = type.toLowerCase()
  const [inputValue, changeInputValue] = useState('')
  const elementId = useRef(randomId())
  const [showPicker, changeShowPicker] = useState(false)
  const [inputFormat, setInputFormat] = useState()
  const [isFocused, setIsFocused] = useState(false)

  const convertDateToMomentFormat = useMemo(() => {
    return value => {
      let time
      if (value) {
        let date = moment(value, inputFormat)
        if (date.isValid()) {
          time = date
        } else {
          // this is a fallback, if we can't get the date valid by trying, see if moment can figure it out one last time by itself - JRA 01/23/2020
          // using moment in this way is deprecated and will throw a warning
          date = moment(value)
          if (date.isValid()) {
            time = date
          }
        }
      }
      return time
    }
  }, [inputFormat])

  useEffect(() => {
    let val = value
    if (typeof val === 'string') {
      val = convertDateToMomentFormat(val)
    }
    if (val && val._isAMomentObject) {
      val = val.format(inputFormat)
    }
    if (!val) val = ''
    changeInputValue(val)
  }, [inputFormat, value, convertDateToMomentFormat])

  useEffect(() => {
    let inputFormat
    if (type === 'time' || (!showCalendar && timePicker)) inputFormat = format || timeFormat
    else if (type === 'date') inputFormat = format || dateFormat
    else inputFormat = format || dateTimeFormat
    setInputFormat(inputFormat)
  }, [dateFormat, dateTimeFormat, format, showCalendar, timeFormat, timePicker, type])

  const handleOnInputChange = useCallback(e => {
    const {value: newValue} = e.target
    changeInputValue(newValue)
    if (!showPicker) changeShowPicker(true)
  }, [changeInputValue, showPicker, changeShowPicker])

  const handleOnFocus = useCallback(() => {
    changeShowPicker(true)
    setIsFocused(true)
  }, [changeShowPicker])

  const handleOnBlur = useCallback(() => {
    setIsFocused(false)
  }, [])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && (value + '').length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  let startDate = convertDateToMomentFormat(inputValue)

  return (
    <div className={outerClass} style={inputOuter} css={theme.inputOuter}>
      <div className='gfb-input-inner' style={inputInner} css={theme.inputInner}>
        <div className={controlClass} style={inputControl} css={theme.inputControl}>
          <div className='gfb-input__value-container' style={valueContainer} css={theme.valueContainer}>
            <input
              id={elementId.current}
              className={className}
              name={name}
              value={inputValue}
              onChange={handleOnInputChange}
              disabled={readonly || disabled || !interactive}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              autoComplete={autoComplete}
              style={valueStyle}
              css={theme.value}
            />
            {showPicker && (
              <DatePicker
                elementId={elementId.current}
                handleOnChange={onChange}
                changeShowPicker={changeShowPicker}
                name={name}
                timePicker={timePicker}
                showCalendar={showCalendar}
                startDate={startDate}
                format={inputFormat}
              />
            )}
          </div>
          <div className='gfb-input__indicators' style={indicators} css={theme.indicators}>
            {validationError && <ValidationErrorIcon message={validationError} />}
          </div>
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
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  timePicker: PropTypes.bool,
  showCalendar: PropTypes.bool,
  type: PropTypes.string,
  format: PropTypes.string,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  required: PropTypes.bool
}
