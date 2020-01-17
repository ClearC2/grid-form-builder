import React from 'react'
import PropTypes from 'prop-types'

const Metadata = props => {
  const {
    value = '',
    style
  } = props

  const {
    value: valueStyle = {},
    inputOuter = {},
    inputInner = {},
    inputControl = {},
    valueContainer = {},
    indicators = {}
  } = style

  return (
    <div className='gfb-input-outer' style={inputOuter}>
      <div className='gfb-input-inner' style={inputInner}>
        <div className='gfb-input__control gfb-boxless-input' style={inputControl}>
          <div className='gfb-input__value-container' style={valueContainer}>
            <strong style={valueStyle}>{value}</strong>
          </div>
          <div className='gfb-input__indicators' style={indicators} />
        </div>
      </div>
    </div>
  )
}

export default Metadata

Metadata.propTypes = {
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  style: PropTypes.object
}
