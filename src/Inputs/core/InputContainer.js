import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

const InputContainer = props => {
  const {children, config, values, value, onChange} = props
  const {name, ...other} = config
  return (
    <div className='gfb-input-container'>
      {cloneElement(children, {...other, name, values, value, onChange})}
    </div>
  )
}

export default InputContainer

InputContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  config: PropTypes.object,
  values: PropTypes.instanceOf(Map),
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}
