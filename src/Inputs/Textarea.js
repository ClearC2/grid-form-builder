import React from 'react'
import PropTypes from 'prop-types'

const Textarea = props => {
  const {name, value, onChange} = props
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
    />
  )
}

export default Textarea

Textarea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object])
}
