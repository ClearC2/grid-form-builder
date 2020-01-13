import React from 'react'
import DateInput from './DateInput'

const Time = props => <DateInput {...props} dateFormat='h:mm a' showCalendar={false} timePicker />

export default Time
