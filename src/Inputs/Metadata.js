import React from 'react'
import PropTypes from 'prop-types'

const Metadata = props => {
  const {value = ''} = props

  return (
    <div className='gfb-input-outer'>
      <div className='gfb-input-inner'>
        <div className='gfb-input__control gfb-boxless-input'>
          <div className='gfb-input__value-container'>
            <strong>{value}</strong>
          </div>
          <div className='gfb-input__indicators' />
        </div>
      </div>
    </div>
  )
}

export default Metadata

Metadata.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object])
}
