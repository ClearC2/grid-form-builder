import React from 'react'
import PropTypes from 'prop-types'
import {FaCopy} from 'react-icons/fa'

const CopyValueIcon = props => {
  const {
    tooltipId,
    onClick = () => null
  } = props

  return (
    <div
      className='gfb-input__indicator'
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className='btn'
        style={{
          border: '1px solid #555555',
          padding: 2
        }}
        data-tip='Copy Value'
        data-for={tooltipId}
        onClick={onClick}
      >
        <FaCopy color='#555555' />
      </div>
    </div>
  )
}

CopyValueIcon.propTypes = {
  tooltipId: PropTypes.string,
  onClick: PropTypes.func
}

export default CopyValueIcon
