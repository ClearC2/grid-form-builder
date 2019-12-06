import React from 'react'
import PropTypes from 'prop-types'

const Input = props => {
  const {name, value, onChange} = props
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input

Input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object])
}
