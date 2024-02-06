import React from 'react'
import PropTypes from 'prop-types'
import DateInput from './DateInput'

const Monthday = props => {
  const {format = 'MM/DD/YYYY'} = props
  return <DateInput {...props} canPickYear={false} format={format} />
}

Monthday.propTypes = {
  format: PropTypes.string
}

export default Monthday
