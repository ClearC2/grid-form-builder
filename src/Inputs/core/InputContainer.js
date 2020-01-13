import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'

const InputContainer = props => {
  const {
    children,
    config,
    values,
    value,
    onChange,
    requiredWarning,
    tabIndex,
    draggable,
    dateFormat,
    dateTimeFormat,
    timeFormat
  } = props
  const {name, ...other} = config
  return (
    <div className='gfb-inner-cell-input'>
      {cloneElement(children, {
        ...other,
        requiredWarning,
        tabIndex,
        draggable,
        name,
        values,
        value,
        onChange,
        dateFormat,
        dateTimeFormat,
        timeFormat
      })}
    </div>
  )
}

export default InputContainer

InputContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  config: PropTypes.object,
  values: PropTypes.instanceOf(Map),
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  requiredWarning: PropTypes.bool,
  tabIndex: PropTypes.number,
  draggable: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string
}
