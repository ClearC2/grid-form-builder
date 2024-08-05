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
    if (!values.equals(p.values) && value === p.value) {
      // if the values object is the thing changing but it isn't the value for this field
      if (
        ([
          'checkbox',
          'colorpicker',
          'currency',
          'date',
          'datetime',
          'email',
          'header',
          'icon',
          'input',
          'listselect',
          'metadata',
          'month',
          'multicheckbox',
          'multiselect',
          'number',
          'percentage',
          'radio',
          'richtextarea',
          'select',
          'textarea',
          'time',
          'conditionalinput'
        ].indexOf(type) > -1) || // let typeaheads update and any custom components update if the entire form values object changes, don't update the components if they are in this list and all that changes is the form values
        (config.typeahead && !config.typeahead.filter && !config.typeahead.fieldvalue) // if it is a typeahead but doesn't have filters or use a fieldvalue as a key, it doesn't care either
      ) {
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
