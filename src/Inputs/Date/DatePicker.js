import {useMemo, useEffect} from 'react'
import PropTypes from 'prop-types'
import 'daterangepicker'
import '../../../styles/daterangepicker.css'
import $ from 'jquery'

const DatePicker = props => {
  const {elementId, handleOnChange, dateFormat, changeShowPicker, name, timePicker} = props

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
    const $input = $(`#${elementId}`)
    return () => $input.daterangepicker(
      {
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        timePicker,
        drops: determinePickerOpenDirection()
      },
      date => {
        if (date && date.isValid && date.isValid()) {
          handleOnChange({
            target: {
              name,
              value: date.format(dateFormat)
            }
          })
        }
        $input.on(
          'hide.daterangepicker',
          () => {
            changeShowPicker(false)
          }
        )
      }
    )
  }, [elementId, timePicker, determinePickerOpenDirection, handleOnChange, name, dateFormat, changeShowPicker])

  useEffect(() => {
    initializePicker()
  }, [initializePicker])

  return null
}

export default DatePicker

DatePicker.propTypes = {
  elementId: PropTypes.string,
  dateFormat: PropTypes.string,
  handleOnChange: PropTypes.func,
  changeShowPicker: PropTypes.func,
  name: PropTypes.string,
  timePicker: PropTypes.bool
}
