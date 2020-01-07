import React from 'react'
import PropTypes from 'prop-types'

const Input = props => {
  const {name, value, onChange, readonly, disabled} = props
  let className = 'gfb-input__single-value gfb-input__input'
  if (readonly || disabled) className = className + ' gfb-disabled-input'
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <input
              className={className}
              name={name}
              value={value}
              onChange={onChange}
              disabled={readonly || disabled}
            />
          </div>
          <div className='gfb-input-indicators' />
        </div>
      </div>
    </div>
  )
}

export default Input

Input.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool
}
