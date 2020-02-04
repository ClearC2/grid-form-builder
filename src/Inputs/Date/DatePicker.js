import {useMemo, useEffect} from 'react'
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
    format
  } = props

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

      $input.daterangepicker(
        {
          singleDatePicker: true,
          showDropdowns: true,
          autoUpdateInput: false,
          timePicker,
          drops: determinePickerOpenDirection(),
          startDate
        },
        date => {
          if (date && date.isValid && date.isValid()) {
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
          if (!showCalendar) {
            const $portal = $('.daterangepicker')
            if ($portal) {
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
        () => {
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
    showCalendar
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
  format: PropTypes.string
}
