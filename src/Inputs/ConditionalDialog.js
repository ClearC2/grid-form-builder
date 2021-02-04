import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {Dialog} from 'c2-dialog'
import {Map, List} from 'immutable'
import ConditionalPredicate from './ConditionalPredicate'
import Toggle from '../QueryBuilder/Where/ConditionalTable/Toggle'
const ConditionalDialog = props => {
  const {value} = props
  const [conditions, setConditions] = useState(1)
  // const [value, setValue] = useState(props.value)
  useEffect(() => {
    if (value.get('type')) {
      setConditions(value.get('conditions').size)
    } else {
      setConditions(1)
    }
  }, [value])

  const onChange = (e, i) => {
    if (conditions > 1) {
      if (!value.get('type')) {
        let filter = Map({
          type: 'and',
          conditions: List([value])
        })
        e.target.value = e.target.value.set('name', e.target.name)
        let newValues = filter.get('conditions', List())
        if (!filter.getIn(['conditions', i])) {
          newValues = newValues.push(e.target.value)
        } else {
          newValues = newValues.set(i, e.target.value)
        }
        filter = filter.set('conditions', newValues)
        props.onChange({target: {name: e.target.name, value: filter}})
      } else {
        let filter = value
        let newValues = filter.get('conditions', List())
        if (!filter.getIn(['conditions', i])) {
          newValues = newValues.push(e.target.value)
        } else {
          newValues = newValues.set(i, e.target.value)
        }
        filter = filter.set('conditions', newValues)
        props.onChange({target: {name: e.target.name, value: filter}})
      }
    } else {
      props.onChange(e)
    }
  }
  const renderConditions = () => {
    const conditionElements = []
    for (let i = 0; i < conditions; i++) {
      let indexedValue = value
      if (value.get('type')) {
        indexedValue = value.getIn(['conditions', i], Map({condition: 'contains', values: List()}))
      } else if (conditions > 1) {
        indexedValue = Map({condition: 'contains', values: List()})
      }
      conditionElements.push(
        <div style={{borderTop: '1px solid lightgray'}}>
          <ConditionalPredicate {...props} value={indexedValue} onChange={onChange} index={i} />
        </div>
      )
    }
    return conditionElements
  }
  const handleToggleClick = (e) => {
    if (e) {
      // switch to or
      let filter = value
      filter = filter.set('type', 'or')
      props.onChange({target: {name: props.name, value: filter}})
    } else {
      // switch to and
      let filter = value
      filter = filter.set('type', 'and')
      props.onChange({target: {name: props.name, value: filter}})
    }
  }
  const closeModal = () => props.handleClose(false)
  const addCondition = () => setConditions(conditions + 1)
  return (
    <Dialog
      size={{width: '800px', height: `420px`}}
      default={{y: ((window.innerHeight / 2) - 250 + window.scrollY), x: ((window.innerWidth / 2) - 260)}}
      center
      style={{
        background: '#fff',
        boxShadow: '0px 0px 15px #444',
        borderRadius: '5px',
        border: '2px solid #36a9e1',
        overflowY: 'visible'
      }}
      enableResizing
      disableDragging
    >
      <div style={{width: '100%', height: '100%'}}>

        <div style={{display: 'flex', flexDirection: 'row', padding: '10px', height: '54px'}}>
          <div style={{width: '90%'}}>
            <h4 style={{height: '100%', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
              {props.label} condition:
            </h4>
            {conditions > 1 && value.get('type') &&
            <span className='pull-right' style={{marginTop: '-32px'}}>
              <Toggle
                value={value.get('type') === 'and'}
                onToggle={handleToggleClick}
                activeLabel='and'
                inactiveLabel='or'
              /></span>}
          </div>
          <div style={{width: '10%'}}>
            <button
              type='button'
              className='close'
              onClick={closeModal}
            >
              <span>&times;</span>
            </button>
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: 'calc(100% - 54px)',
            padding: '10px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {renderConditions()}
        </div>
        <button
          type='button'
          className='btn btn-primary'
          style={{height: 35, position: 'absolute', bottom: 15, right: 90}}
          onClick={addCondition}
        >
          Add Condition
        </button>
        <button
          type='button'
          className='btn btn-primary'
          style={{height: 35, position: 'absolute', bottom: 15, right: 30}}
          onClick={closeModal}
        >
          Ok
        </button>
      </div>
    </Dialog>
  )
}

export default ConditionalDialog

ConditionalDialog.propTypes = {
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnChange: PropTypes.func,
  name: PropTypes.string,
  inputType: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.object,
  typeahead: PropTypes.object,
  keyword: PropTypes.object
}
