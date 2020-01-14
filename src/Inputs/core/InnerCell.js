import React, {useContext, useCallback, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {FormValueContext} from '../../FormBuilder'
import InputContainer from './InputContainer'
import LabelContainer from './LabelContainer'
import {mapInputType} from '../index'
import {DropTarget} from 'react-dnd'

const InnerCell = props => {
  const {
    field,
    handleAnywhereClick,
    index,
    interactive,
    draggable,
    readonly,
    didDrop,
    isOver,
    connectDropTarget,
    handleDragDropOnInput,
    droppedItem = null,
    handleLinkClick,
    handleCascadeKeywordClick,
    handleOnChange,
    requiredWarning,
    tabIndex,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    handleRTEImageClick
  } = props

  const {config} = field
  const [formValues] = useContext(FormValueContext)

  // we want to make fields readonly if draggable is on but it mutates the schema on the callback so every input is readonly on update
  // we will come up with a way to do this without modifying the schema - JRA 12/10/2019
  if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true
  }

  const Type = mapInputType(config.type, interactive)

  const value = formValues.get(config.name, '')

  useEffect(() => {
    if (didDrop && !previousDrop.current.didDrop && !isOver && previousDrop.current.isOver) {
      // clone these objects before we send them up, we don't want them mutating them and causing unexpected behavior down here - JRA 12/05/2019
      const source = typeof droppedItem === 'object' && typeof droppedItem.widget === 'object'
        ? {...droppedItem.widget} : null
      const target = typeof field === 'object' && typeof field.config === 'object'
        ? {...field.config} : null
      handleDragDropOnInput({source, target})
    }
  }, [didDrop, isOver, handleDragDropOnInput, field, droppedItem])

  const previousDrop = useRef({didDrop: false, isOver: false})
  useEffect(() => {
    previousDrop.current = {
      didDrop,
      isOver
    }
  }, [didDrop, isOver])

  const onGridElementClick = useCallback((e) => {
    const config = typeof field === 'object' && typeof field.config === 'object' ? {...field.config} : {}
    config.index = index
    if (draggable) {
      // if the user clicks into a field that is draggable, the input loses focus
      // do we want to figure out a way to refocus the field here so they can edit the value even though the whole cell is draggable? - JRA 12/06/2019
      // e.stopPropagation()
    }
    handleAnywhereClick(config, e)
  }, [handleAnywhereClick, index, field, draggable])

  const onChange = useCallback(e => {
    if (typeof e !== 'object') e = {}
    if (typeof e.target !== 'object') e.target = {}
    if (!e.target.name) e.target.name = config.name
    if (!e.target.value) e.target.value = ''
    handleOnChange(e)
  }, [handleOnChange, config.name])

  let className = 'gfb-inner-cell'
  if (typeof config.type === 'string') {
    const type = config.type.toLowerCase()
    if (type === 'checkbox') {
      className = className + ' gfb-inline-cell gfb-checkbox'
    }
  }

  return connectDropTarget(
    <div className={className} onClick={onGridElementClick}>
      <LabelContainer
        config={config}
        handleLinkClick={handleLinkClick}
        handleCascadeKeywordClick={handleCascadeKeywordClick}
        value={value}
      />
      <InputContainer
        config={config}
        value={value}
        values={formValues}
        onChange={onChange}
        requiredWarning={requiredWarning}
        tabIndex={tabIndex}
        draggable={draggable}
        dateFormat={dateFormat}
        dateTimeFormat={dateTimeFormat}
        timeFormat={timeFormat}
        handleRTEImageClick={handleRTEImageClick}
      >
        <Type />
      </InputContainer>
    </div>
  )
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  }
}

const boxTarget = {
  drop (props, monitor) {
    return {
      widget: monitor.getItem()
    }
  }
}

export default DropTarget('FormBuilderDraggable', boxTarget, collect)(InnerCell)

InnerCell.propTypes = {
  field: PropTypes.object,
  handleAnywhereClick: PropTypes.func,
  index: PropTypes.number,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  readonly: PropTypes.bool,
  didDrop: PropTypes.bool,
  handleDragDropOnInput: PropTypes.func,
  handleOnChange: PropTypes.func,
  requiredWarning: PropTypes.bool,
  tabIndex: PropTypes.number,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func
}
