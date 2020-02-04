import React, {useCallback, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import ConditionalDialog from './ConditionalDialog'
import {Map, List, fromJS} from 'immutable'
const ConditionalInput = props => {
  const {style = {}} = props

  const {value: valueStyle = {}, inputOuter = {}, inputInner = {}, inputControl = {}, valueContainer = {}, indicators = {}} = style// eslint-disable-line

  const [showDialog, setShowDialog] = useState(false)

  const handleClose = useCallback((newFieldVal) => {
    setShowDialog(false)
  }, [])

  useEffect(() => {
    // const v = props.values[props.name]
    if (props.name) {
      let defaults = Map({condition: 'contains', values: List()})
      if (typeof props.value === 'string') {
        if (props.value !== '') {
          defaults = defaults.set('values', List([props.value]))
        } else {
          defaults = defaults.set('values', List())
        }
      } else if (props.value instanceof List || Array.isArray(props.value)) {
        defaults = defaults.set('values', fromJS(props.value))
      }
      props.onChange({target: {name: props.name, value: defaults}})
    }
  }, [props.name])

  return (
    <div className='gfb-input-outer' style={inputOuter}>
      <div className='gfb-input-inner' style={inputInner}>
        <div className={'gfb-input__control'} style={inputControl}>
          <div className='gfb-input__value-container' onClick={() => setShowDialog(true)} style={valueContainer}>
            {props.values.getIn([props.name, 'values'], List()).size > 0 ? 'Values...' : ''}
          </div>
          {showDialog && <ConditionalDialog handleClose={handleClose} {...props} />}
        </div>
      </div>
    </div>
  )
}

export default ConditionalInput

ConditionalInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  values: PropTypes.object,
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object
}