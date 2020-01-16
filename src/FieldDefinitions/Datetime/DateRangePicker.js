/*eslint-disable*/
import {Component} from 'react'
import PropTypes from 'prop-types'

import $ from 'jquery'
import moment from 'moment'
import '../../../styles/daterangepicker.css'
import daterangepicker from 'daterangepicker' // sets up global variable for this file

function setDirection (props) {
  const {auto, down, id, modal, up} = props
  const fieldId = modal ? `${id}modal` : id
  let element = document.getElementById(fieldId)
  if (element) {
    element = element.getBoundingClientRect()
    let direction = 'down'

    if (auto && !down && !up) {
      if (element.bottom + props.calendarHeight > window.innerHeight) {
        direction = 'up'
      } else {
        direction = 'down'
      }
    } else {
      direction = up ? 'up' : 'down'
    }

    return direction
  }
}

class RenderDateRangePicker extends Component {
  static propTypes = {
    id: PropTypes.string,
    changeDisplay: PropTypes.func,
    dateFormat: PropTypes.string,
    seconds: PropTypes.bool,
    timeFormat: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ])
  }

  static defaultProps = {
    timeFormat: true
  }

  state = {
    direction: setDirection(this.props)
  }

  componentDidMount () {
    this.DateRangePicker()
    $(`#${this.props.id}`).click()
    this.setState({mount: true})
  }

  componentDidUpdate (prevProps, prevState) {
    const element = document.getElementById(`datepicker-${this.props.id}`)
    if (element) {
      element.parentElement.removeChild(element)
    }
    this.DateRangePicker(prevState.direction !== this.state.direction)
  }

  shouldComponentUpdate (nextProps, nextState, nextContext) {
    const old = this.props.value
    const next = nextProps.value

    if (old && next && old._d && next._d) {
      return !!old.diff(next)
    }
    return (this.state.direction !== nextState.direction || (this.props.value !== nextProps.value))
  }

  componentWillUnmount () {
    const element = document.getElementById(`datepicker-${this.props.id}`)
    if (element) {
      element.parentElement.removeChild(element)
    }
  }

  DateRangePicker = (click = false) => {
    const {id, ...obj} = this.props

    $('#' + id).daterangepicker({
      singleDatePicker: true,
      showDropdowns: true,
      minYear: 2000,
      maxYear: 2030,
      timePicker: this.props.timeFormat,
      timePickerSeconds: this.props.seconds,
      alwaysShowCalendars: true,
      autoUpdateInput: false,
      startDate: this.props.value || moment(),
      drops: this.state.direction,
      locale: {
        format: this.props.dateFormat
      }
    }, (time) => {
      if (moment(time).isValid() && time._i.length > 1) {
        obj.onClick(time)
      }
      obj.closeMenu(id)
    })

    $('#' + id).on('show.daterangepicker', (ev, picker) => {
      this.setState({direction: setDirection(this.props)})
      obj.openMenu(id)
    })

    $('#' + id).on('hide.daterangepicker', (ev, picker) => {
      obj.closeMenu(id)
    })

    $('#' + id).on('apply.daterangepicker', (ev, picker) => {
      $(`#${id}`).val(picker.startDate.format(this.props.dateFormat))
      this.props.changeDisplay(true)
      obj.onClick(picker.startDate)
    })

    let elements = document.getElementsByClassName('daterangepicker')
    elements = elements[elements.length - 1]
    !!elements && elements.setAttribute('id', `datepicker-${this.props.id}`)

    if (click) {
      $(`#${id}`).click()
    }
  }

  render () {
    return null
  }
}

export default RenderDateRangePicker