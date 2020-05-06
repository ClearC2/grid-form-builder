import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import PortalTooltip from './Tooltip'
import LabelContainer from './Inputs/core/LabelContainer'
import InputContainer from './Inputs/core/InputContainer'
import {randomId, uppercaseFirstLetter} from './utils'
import {mapInputType} from './Inputs'
import {fromJS} from 'immutable'

const GFBInput = props => {
  const {
    name,
    label,
    style = {},
    validate,
    required,
    value = '',
    onClick,
    cellTooltip,
    link = {},
    cascade = {},
    onChange,
    tabIndex,
    interactive = true,
    handleRTEImageClick = () => null,
    dateFormat = 'M/D/YYYY',
    dateTimeFormat = 'M/D/YYYY h:mm a',
    timeFormat = 'h:mm a',
    draggable,
    icon,
    tooltips,
    delimiter
  } = props
  let {
    className = '',
    type = 'input',
    autoComplete = false,
    values = {}
  } = props

  if (!values.toJS) values = fromJS(values)

  if (!autoComplete) autoComplete = 'off'

  const cellId = useRef(randomId())

  if (!type) type = 'input'
  if (typeof type === 'string') {
    type = uppercaseFirstLetter(type)
  } else {
    type = 'Input'
  }

  const Type = mapInputType(type)

  const {innerCell = {}} = style

  className = className + ' gfb-inner-cell'
  if (type === 'Checkbox') {
    className = className + ' gfb-inline-cell gfb-checkbox'
  }
  if (type === 'Metadata') {
    className = className + ' gfb-inline-cell'
  }

  const config = {
    ...props,
    required,
    link,
    cascade,
    type,
    icon,
    tooltips,
    label,
    name,
    delimiter
  }

  return (
    <div
      style={innerCell}
      className={className}
      onClick={onClick}
      data-tip
      data-for={cellId.current}
    >
      <PortalTooltip id={cellId.current} message={cellTooltip} />
      <LabelContainer
        config={config}
        handleLinkClick={link.handleLinkClick}
        handleCascadeKeywordClick={cascade.handleCascadeKeywordClick}
        value={value}
      />
      <InputContainer
        config={config}
        value={value}
        values={values}
        onChange={onChange}
        requiredWarning={validate}
        tabIndex={tabIndex}
        draggable={draggable}
        dateFormat={dateFormat}
        dateTimeFormat={dateTimeFormat}
        timeFormat={timeFormat}
        handleRTEImageClick={handleRTEImageClick}
        autoComplete={autoComplete}
        interactive={interactive}
      >
        <Type />
      </InputContainer>
    </div>
  )
}

GFBInput.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  validate: PropTypes.bool,
  required: PropTypes.bool,
  onClick: PropTypes.func,
  cellTooltip: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.object,
  tabIndex: PropTypes.number,
  draggable: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.bool,
  interactive: PropTypes.bool,
  link: PropTypes.object,
  cascade: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  icon: PropTypes.string,
  tooltips: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  delimiter: PropTypes.string
}

export default GFBInput
