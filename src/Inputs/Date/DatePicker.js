import {useMemo, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import 'daterangepicker'
import '../../styles/daterangepicker.css'
import $ from 'jquery'
import moment from 'moment'

const DatePicker = props => {
  const {
    elementId,
    handleOnChange,
    changeShowPicker,
    name,
    timePicker,
    showCalendar,
    startDate,
    format,
    minDate,
    maxDate,
    canPickYear,
    autoApply = false
  } = props

  const valueDidChange = useRef(false) // JRA 02/07/2020 - selecting the date that is already selected closes the calendar without a change event
  // this is undesirable as the fallback date is today's date, and if the user opens a blank date field and picks today, a change event is not fired
  // in order to get around this issue, this component will check on the calendar hide event if a change had been made or not, and if not, send back the current startDate as a change event

  const determinePickerOpenDirection = useMemo(() => {
    const $input = $(`#${elementId}`)[0]
    const viewportHeight = window.innerHeight
    let direction = 'down'
    if (
      $input &&
      $input.getBoundingClientRect &&
      viewportHeight &&
      $input.getBoundingClientRect().y > (viewportHeight / 2)
    ) {
      direction = 'up'
    }
    return () => direction
  }, [elementId])

  const initializePicker = useMemo(() => {
    return () => {
      const $input = $(`#${elementId}`)
      const calculateDate = (dateVal) => {
        if (dateVal === 'today') {
          return moment()
        }
        if (typeof dateVal === 'string' && dateVal.startsWith('today +')) {
          const daysToAdd = parseInt(dateVal.split('+')[1].trim(), 10)
          return moment().add(daysToAdd, 'days')
        }
        if (dateVal === 'this month') {
          return moment().endOf('month')
        }
        return dateVal
      }

      const calculatedMinDate = calculateDate(minDate)
      const calculatedMaxDate = calculateDate(maxDate)

      $input.daterangepicker(
        {
          singleDatePicker: true,
          showDropdowns: true,
          autoUpdateInput: false,
          timePicker,
          drops: determinePickerOpenDirection(),
          startDate,
          minDate: calculatedMinDate,
          maxDate: calculatedMaxDate,
          autoApply
        },
        date => {
          if (date && date.isValid && date.isValid()) {
            valueDidChange.current = true
            handleOnChange({
              target: {
                name,
                value: date.format(format)
              }
            })
          }
        }
      )

      $input.on(
        'show.daterangepicker',
        () => {
          const $portal = $('.daterangepicker')
          if ($portal) {
            if (!canPickYear) {
              $portal.addClass('year-picker-hidden')
            }
            if (!showCalendar) {
              const $calendar = $portal.find('.calendar-table')
              if ($calendar) {
                $calendar.hide()
                $portal.addClass('calendar-hidden')
                const direction = determinePickerOpenDirection()
                if (direction === 'up') {
                  const top = +$portal.css('top').replace('px', '') || 0
                  $portal.css('top', top + 277)
                }
              }
            }
          }
        }
      )

      $input.on(
        'hide.daterangepicker',
        (e, calendar) => {
          if (!valueDidChange.current) {
            handleOnChange({
              target: {
                name,
                value: calendar.startDate.format(format)
              }
            })
          }
          changeShowPicker(false)
        }
      )
    }
  }, [
    elementId,
    timePicker,
    determinePickerOpenDirection,
    handleOnChange,
    name,
    format,
    changeShowPicker,
    showCalendar,
    canPickYear,
    minDate,
    maxDate,
    autoApply
  ])

  useEffect(() => {
    initializePicker()
    return () => {
      const $portal = $('.daterangepicker')
      if ($portal) $portal.remove()
      const $input = $(`#${elementId}`)
      if ($input) $input.off()
    }
  }, [elementId, initializePicker])

  return null
}

export default DatePicker

DatePicker.propTypes = {
  elementId: PropTypes.string,
  handleOnChange: PropTypes.func,
  changeShowPicker: PropTypes.func,
  name: PropTypes.string,
  timePicker: PropTypes.bool,
  startDate: PropTypes.instanceOf(moment),
  format: PropTypes.string,
  canPickYear: PropTypes.bool,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  showCalendar: PropTypes.bool,
  autoApply: PropTypes.bool
}
