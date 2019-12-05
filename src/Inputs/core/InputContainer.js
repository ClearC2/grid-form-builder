import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'

const InputContainer = props => {
  const {children} = props
  return (
    <div className='gfb-input-container'>
      {cloneElement(children)}
    </div>
  )
}

export default InputContainer

InputContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array])
}
