/** @jsx jsx */
import {jsx} from '@emotion/core'
import {useCallback, useEffect, useState, useRef, useMemo} from 'react'
import PropTypes from 'prop-types'
import DatePicker from './DatePicker'
import MonthPicker from './MonthPicker'
import moment from 'moment'
import {randomId} from '../../utils'
import ValidationErrorIcon from '../../ValidationErrorIcon'
import useTheme from '../../theme/useTheme'

const defaults = {
  trueFunction: () => true
}

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
    required,
    maxlength = 524288,
    canPickDay = true,
    canPickYear = true,
    pastYears = 12,
    futureYears = 12,
    minDate,
    maxDate,
    onChangeValidator = defaults.trueFunction,
    warning,
    autoApply = false,
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

  let {type = 'date'} = props
  type = type.toLowerCase()
  const [inputValue, changeInputValue] = useState('')
  const elementId = useRef(randomId())
  const portalRef = useRef()
  const inputRef = useRef()
  const [showPicker, changeShowPicker] = useState(false)
  const [inputFormat, setInputFormat] = useState()
  const [isFocused, setIsFocused] = useState(false)
  const allowCalendarChangeEvent = useRef(true)
  const [manualBlurCheck, setManualBlurCheck] = useState(false)
  const [showMonthFormatted, setShowMonthFormatted] = useState(true)
  const [isBlank, setIsBlank] = useState(false)

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
    let blank = false
    if (typeof val === 'string') {
      val = convertDateToMomentFormat(val)
    }
    if (val && val._isAMomentObject) {
      if (val.format('MM-DD-YYYY') === '01-01-1900') { // this is the default SQL date, we can ignore this value and assume it is blank
        val = ''
        blank = true
      } else {
        val = val.format(inputFormat)
      }
    }
    if (!val && value && !blank) val = value
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
    allowCalendarChangeEvent.current = false
    const {value: newValue} = e.target
    if (newValue === '') {
      // if the input was just blanked out, send up a blank value as the new value for this field - JRA 02/07/2020
      // also suppress the calendar's change event so it does not send up what is selected when the calendar closes
      setIsBlank(true)
    }
    changeInputValue(newValue)
    if (!showPicker && type !== 'month') changeShowPicker(true)
    if (type === 'datetime') setManualBlurCheck(true)
  }, [showPicker, type])

  // Check if the input value is blank and if we should send an OnChange trigger,
  // added isBlank state to ensure there is no queue between onChanges causing onChange to overwrite one another
  useEffect(() => {
    if (name && inputValue === '' && isBlank) {
      onChange({
        target: {
          name,
          value: ''
        }
      })
      setIsBlank(false)
    }
  }, [name, inputValue, isBlank, onChange])

  const handleOnFocus = useCallback(() => {
    changeShowPicker(true)
    setIsFocused(true)
    setManualBlurCheck((type !== 'month' && type !== 'datetime'))
  }, [changeShowPicker, type])

  const handleOnBlur = useCallback(e => {
    if ((type === 'month' || type === 'monthday') && manualBlurCheck) {
      const formatted = inputValue
        ? moment(inputValue, type === 'month' ? 'MM/YYYY' : 'MM/DD').format(inputFormat)
        : ''
      setShowMonthFormatted(true)
      onChange({
        target: {name, value: formatted}
      })
    } else if (type !== 'time' && manualBlurCheck && typeof onChangeValidator === 'function') { // this is to circumvent an issue where the daterangepicker change handler isn't firing when you tab out of the input - JRA 03/26/2021
      const formatted = inputValue ? moment(inputValue).format(type === 'datetime' ? dateTimeFormat : dateFormat) : ''
      const validate = onChangeValidator({raw: inputValue, formatted})
      if (typeof validate === 'string') {
        changeInputValue(validate)
        onChange({
          target: {name, value: validate}
        })
      } else if (!validate) {
        changeInputValue('')
        onChange({
          target: {name, value: ''}
        })
      } else {
        onChange({
          target: {name, value: formatted}
        })
      }
    }
    setManualBlurCheck(true)
    setIsFocused(false)
  }, [type, manualBlurCheck, inputValue, dateFormat, onChangeValidator, onChange, name, dateTimeFormat]) // eslint-disable-line

  const handleOnCalendarChange = useCallback(e => {
    if (allowCalendarChangeEvent.current) {
      setManualBlurCheck(false)
      const validate = typeof onChangeValidator === 'function'
        ? onChangeValidator({raw: inputValue, formatted: e.target.value})
        : true
      if (typeof validate === 'string') {
        changeInputValue(validate)
        onChange({
          target: {name, value: validate}
        })
      } else if (!validate) {
        changeInputValue('')
        onChange({
          target: {name, value: ''}
        })
      } else {
        onChange(e)
      }
    } else {
      allowCalendarChangeEvent.current = true
    }
  }, [onChangeValidator, inputValue, onChange, name])

  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled || !interactive) className = className + ' gfb-disabled-input'
  if (!interactive) className = className + ' gfb-non-interactive-input'
  let controlClass = 'gfb-input__control'
  let validationError
  if (required && requiredWarning && (value + '').trim().length === 0 && !isFocused) {
    controlClass = controlClass + ' gfb-validation-error'
    validationError = 'This Field is Required'
  }
  let validationWarning
  if (maxlength && (value + '').length && (value + '').length >= maxlength) {
    validationWarning = `Maximum character limit of ${maxlength} reached.`
  }
  if (Math.abs(moment(inputValue).diff(moment(), 'years')) > 100) {
    validationWarning = 'This date is either invalid or is more than 100 years away.'
  }
  let outerClass = 'gfb-input-outer'
  if (isFocused) {
    outerClass = outerClass + ' gfb-has-focus'
  }

  const startDate = convertDateToMomentFormat(inputValue)
  const isDisabled = readonly || disabled || !interactive

  let valueOverride = inputValue
  if (type === 'month' && showMonthFormatted && startDate) { // if this is a special input that only shows months, manually overwrite what the display value is - JRA 12/08/2020
    valueOverride = startDate.format('MM/YYYY')
  } else if (type === 'monthday' && showMonthFormatted && startDate) {
    valueOverride = startDate.format('MM/DD')
  }

  const inputOuterCSS = {...theme.inputOuter, ...inputOuter}
  const inputInnerCSS = {...theme.inputInner, ...inputInner}
  const inputControlCSS = {...theme.inputControl, ...inputControl}
  const valueContainerCSS = {...theme.valueContainer, ...valueContainer}
  const valueCSS = {...theme.value, ...valueStyle}
  const indicatorsCSS = {...theme.indicators, ...indicators}

  return (
    <div className={outerClass} style={inputOuter} css={inputOuterCSS}>
      <div className='gfb-input-inner' style={inputInner} css={inputInnerCSS}>
        <div className={controlClass} style={inputControl} css={inputControlCSS}>
          <div className='gfb-input__value-container' style={valueContainer} css={valueContainerCSS}>
            <input
              id={elementId.current}
              ref={inputRef}
              className={className}
              name={name}
              value={valueOverride}
              onChange={handleOnInputChange}
              readOnly={isDisabled}
              autoFocus={autofocus}
              placeholder={placeholder}
              tabIndex={tabIndex}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              autoComplete={autoComplete}
              style={valueStyle}
              css={valueCSS}
              data-testid={testId}
              maxLength={maxlength}
              onKeyDown={
                e => {
                  if (type === 'month' || type === 'monthday') {
                    if (showPicker) changeInputValue(e.target.value)
                    setManualBlurCheck(true)
                    changeShowPicker(false)
                    setShowMonthFormatted(false)
                  }
                }
              }
            />
            {showPicker && canPickDay && !isDisabled && (
              <DatePicker
                elementId={elementId.current}
                handleOnChange={handleOnCalendarChange}
                changeShowPicker={changeShowPicker}
                name={name}
                timePicker={timePicker}
                showCalendar={showCalendar}
                startDate={startDate}
                format={inputFormat}
                minDate={minDate}
                maxDate={maxDate}
                canPickYear={canPickYear}
                autoApply={autoApply}
              />
            )}
            {showPicker && !canPickDay && !isDisabled && (
              <MonthPicker
                elementId={elementId.current}
                ref={portalRef}
                inputRef={inputRef}
                onChange={onChange}
                changeShowPicker={changeShowPicker}
                startDate={startDate}
                format={inputFormat}
                pastYears={pastYears}
                futureYears={futureYears}
                showPicker={showPicker}
                name={name}
                setManualBlurCheck={setManualBlurCheck}
              />
            )}
          </div>
          <div
            className='gfb-input__indicators'
            style={indicators}
            css={indicatorsCSS}
            data-testid={`${testId}-errors`}
          >
            {warning && <ValidationErrorIcon message={warning} color='#FFCC00' type='warning' />}
            {validationWarning && <ValidationErrorIcon message={validationWarning} color='#FFCC00' type='warning' />}
            {validationWarning && validationError && (
              <span className='gfb-input__indicator-separator css-1okebmr-indicatorSeparator' />
            )}
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
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
  required: PropTypes.bool,
  maxlength: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  canPickDay: PropTypes.bool,
  canPickYear: PropTypes.bool,
  pastYears: PropTypes.number,
  futureYears: PropTypes.number,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  onChangeValidator: PropTypes.func,
  warning: PropTypes.string,
  autoApply: PropTypes.bool,
  'data-testid': PropTypes.string
}
