import React, {Component} from 'react'
import PropTypes from 'prop-types'

import moment from 'moment'
import DateWrapper from './DateWrapper'

class DatetimeContainer extends Component {
  static propTypes = {
    // input fields
    calendarHeight: PropTypes.number,
    className: PropTypes.string,
    dateFormat: PropTypes.string,
    disabled: PropTypes.bool,
    displayInput: PropTypes.bool,
    inputClassName: PropTypes.string,
    inputStyle: PropTypes.object,
    name: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    value: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.string
    ]),
    onMouseDown: PropTypes.func,
    onKeyDown: PropTypes.func,
    onBlurCapture: PropTypes.func,
    onBlur: PropTypes.func,
    // datetime field
    auto: PropTypes.bool,
    down: PropTypes.bool,
    handleDateChange: PropTypes.func,
    up: PropTypes.bool
  }

  static defaultProps = {
    auto: true,
    calendarHeight: 314,
    disabled: false,
    displayInput: true,
    down: false,
    modal: false,
    required: false,
    type: 'text',
    up: false
  }

  state = {
    calendarHeight: this.props.calendarHeight,
    displayInput: this.props.displayInput,
    id: '',
    value: ' ',
    visible: false
  }

  componentDidMount () {
    this.setState({id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)})
  }

  componentDidUpdate (prevProps) {
    if (prevProps.displayInput !== this.props.displayInput) {
      this.changeDisplay(this.props.displayInput)
    }
  }

  componentWillUnmount () {
    this.closeMenu()
  }

  openMenu = id => {
    document.getElementById(id).focus()
    document.getElementById(id).addEventListener('input', e => e.stopPropagation(), false)
    document.getElementById(id).addEventListener('change', e => e.stopPropagation(), false)
  }

  closeMenu = id => {
    if (document.getElementById(id)) {
      document.getElementById(id).removeEventListener('input', e => e.stopPropagation(), false)
      document.getElementById(id).removeEventListener('change', e => e.stopPropagation(), false)
    }
  }

  handleDateChange = e => {
    this.setState({value: e.target.value})
  }

  setVisibility = () => {
    this.setState({visible: true})
  }

  onClick = e => {
    this.setState({value: ' '})
    this.props.handleDateChange(moment(e._d))
  }

  changeDisplay = (displayInput = true) => {
    this.setState({displayInput})
  }

  render () {
    const {
      dateFormat,
      inputStyle,
      ...props
    } = this.props

    const {displayInput, id} = this.state

    let value = this.state.value.trim() || moment(this.props.value).format(dateFormat)
    value = displayInput ? value : this.state.value.trim()
    if (typeof value === 'string') {
      value = value.trim() === 'Invalid date' ? '' : value
    }

    return (
      <div>
        <DateWrapper
          autoComplete='off'
          changeDisplay={this.changeDisplay}
          closeMenu={this.closeMenu}
          dateFormat={dateFormat}
          id={id}
          onChange={this.handleDateChange}
          onClick={this.onClick}
          openMenu={this.openMenu}
          visible={this.state.visible}
          {...props}
        />
        <input
          id={id}
          autoComplete='off'
          className={`${this.props.className} ${this.props.inputClassName}`}
          disabled={this.props.disabled}
          name={this.props.name}
          onChange={this.handleDateChange}
          onClick={() => this.setVisibility()}
          required={this.props.required}
          style={{paddingLeft: 5, ...inputStyle}}
          type={this.props.type}
          value={value}
          onMouseDown={this.props.onMouseDown}
          onKeyDown={this.props.onKeyDown}
          onBlurCapture={this.props.onBlurCapture}
          onBlur={this.props.onBlur}
          key={id}
        />
      </div>
    )
  }
}

export default DatetimeContainer
