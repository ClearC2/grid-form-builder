import React, {useCallback, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import ConditionalDialog from './ConditionalDialog'
import {Map, List, fromJS} from 'immutable'

const defaults = {
  object: {},
  map: Map(),
  nullFunction: () => null
}

const ConditionalInput = props => {
  const {
    style = defaults.object,
    name = '',
    value = defaults.map,
    values = defaults.map,
    onChange = defaults.nullFunction
  } = props

  const {value: valueStyle = {}, inputOuter = {}, inputInner = {}, inputControl = {}, valueContainer = {}, indicators = {}} = style// eslint-disable-line

  const [showDialog, setShowDialog] = useState(false)

  const handleClose = useCallback((newFieldVal) => {
    setShowDialog(false)
  }, [])

  useEffect(() => {
    let setDefaults = true
    if (value instanceof Map) {
      if (value.has('condition') && value.has('values')) setDefaults = false
      if (value.has('conditions') && value.has('type')) setDefaults = false
    }
    if (name && setDefaults) {
      let defaults = Map({condition: 'contains', values: List()})
      if (typeof value === 'string') {
        if (value !== '') {
          defaults = defaults.set('values', List([value]))
        } else {
          defaults = defaults.set('values', List())
        }
      } else if (value instanceof List || Array.isArray(value)) {
        defaults = defaults.set('values', fromJS(value))
      }
      onChange({target: {name: name, value: defaults}})
    }
  }, [name, onChange, value])

  const cond = values.getIn([name, 'condition'], '')
  const vals = values.getIn([name, 'values'], List())
  const hasValue = vals.size > 0 || cond.includes('blank') ||
    /* eslint-disable-next-line max-len */
    cond === 'today' || cond === 'this month' || cond === 'year to date' || cond === 'fiscal year to date' || cond === 'fiscal year' ||
    cond === 'this quarter' || cond === 'quarter to date' || cond === 'this week' ||
    cond === 'last year' || cond === 'this year' || cond === 'last fiscal year' ||
    (values.getIn([name, 'dynamicValues']) && values.getIn([name, 'dynamicValues']).size) ||
    (values.getIn([name, 'conditions'], List()).size > 0)
  return (
    <div className='gfb-input-outer' style={inputOuter}>
      <div className='gfb-input-inner' style={inputInner}>
        <div className={'gfb-input__control'} style={inputControl}>
          <div
            className='gfb-input__value-container'
            onClick={() => setShowDialog(true)}
            style={{...valueContainer, color: '#36a9e1'}}
          >
            {hasValue ? 'Values...' : ''}
          </div>
          {showDialog && (
            <ConditionalDialog
              handleClose={handleClose}
              {...props}
              style={style}
              name={name}
              value={value}
              values={values}
              onChange={onChange}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ConditionalInput

ConditionalInput.propTypes = {
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
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
