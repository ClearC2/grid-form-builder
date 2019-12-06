import React from 'react'
import PropTypes from 'prop-types'

const Select = props => {
  const {name, value, onChange, keyword = {}} = props
  const {options = []} = keyword
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
    >
      {options.map((option, i) => (
        <option key={i} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}

export default Select

Select.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  keyword: PropTypes.object
}
