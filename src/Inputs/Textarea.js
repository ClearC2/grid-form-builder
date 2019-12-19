import React from 'react'
import PropTypes from 'prop-types'

const Textarea = props => {
  const {name, value, onChange} = props
  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control'>
          <div className='gfb-input__value-container'>
            <textarea
              className='gfb-input__single-value gfb-input__input'
              name={name}
              value={value}
              onChange={onChange}
            />
          </div>
          <div className='gfb-input-indicators' />
        </div>
      </div>
    </div>
  )
}

export default Textarea

Textarea.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object])
}
