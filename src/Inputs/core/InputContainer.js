import React, {Component, cloneElement, useRef} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import PortalTooltip from '../../Tooltip'
import {randomId} from '../../utils'

class InputPerformanceOptimizer extends Component {
  static propTypes = {
    config: PropTypes.object,
    values: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number])
  }

  shouldComponentUpdate (p) {
    const {config, values, value} = this.props
    const type = (typeof config.type === 'string' && config.type.toLowerCase()) || 'input'
    if (type !== 'typeahead') {
      if (!values.equals(p.values) && value === p.value) {
        // if this is not a typeahead and its own value hasn't changed, don't rerender due to form values changing - JRA 01/24/2020
        return false
      }
    }
    return true
  }

  render () {
    return <InputContainer {...this.props} />
  }
}

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
  const {name, required, style = {}, tooltips = {}, ...other} = config
  const {input: inputTooltip} = tooltips
  const {innerCell = {}} = style
  const inputId = useRef(randomId())
  return (
    <div className='gfb-inner-cell-input' style={innerCell} data-tip data-for={inputId.current}>
      <PortalTooltip id={inputId.current} message={inputTooltip} />
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

export default InputPerformanceOptimizer

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
