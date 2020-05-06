/** @jsx jsx */
import {jsx} from '@emotion/core'
import {Component, cloneElement, useRef} from 'react'
import PropTypes from 'prop-types'
import {Map} from 'immutable'
import PortalTooltip from '../../Tooltip'
import {randomId} from '../../utils'
import useTheme from '../../theme/useTheme'

class InputPerformanceOptimizer extends Component {
  static propTypes = {
    config: PropTypes.object,
    values: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool])
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
    interactive,
    device
  } = props
  const {name, required, style = {}, tooltips = {}, ...other} = config
  const {input: inputTooltip} = tooltips
  const {cellInput = {}} = style
  const inputId = useRef(randomId())
  const {theme} = useTheme()
  return (
    <div className='gfb-inner-cell-input' style={cellInput} data-tip data-for={inputId.current} css={theme.cellInput}>
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
        ...other,
        device
      })}
    </div>
  )
}

export default InputPerformanceOptimizer

InputContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  config: PropTypes.object,
  values: PropTypes.instanceOf(Map),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  onChange: PropTypes.func,
  requiredWarning: PropTypes.bool,
  tabIndex: PropTypes.number,
  draggable: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  device: PropTypes.object
}
