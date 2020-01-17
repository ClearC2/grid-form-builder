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
    timeFormat,
    handleRTEImageClick,
    autoComplete,
    interactive
  } = props
  const {name, required, style = {}, ...other} = config
  const {innerCell = {}} = style
  return (
    <div className='gfb-inner-cell-input' style={innerCell}>
      {cloneElement(children, {
        requiredWarning,
        tabIndex,
        draggable,
        name,
        values,
        value,
        onChange,
        dateFormat,
        dateTimeFormat,
        timeFormat,
        handleRTEImageClick,
        autoComplete,
        interactive,
        required,
        style,
        ...other
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
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool
}
