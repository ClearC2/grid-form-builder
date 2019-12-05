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
    droppedItem = null
  } = props

  const {config} = field
  const [formValues] = useContext(FormValueContext)

  if (draggable || readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true
  }

  const Type = mapInputType(config.type, interactive)

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

  const onGridElementClick = useCallback((config, e) => {
    config.index = index
    handleAnywhereClick(config, e)
  }, [handleAnywhereClick, index])

  return connectDropTarget(
    <div className='gfb-inner-cell' onClick={onGridElementClick}>
      <LabelContainer config={config} />
      <InputContainer config={config}>
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
  handleDragDropOnInput: PropTypes.func
}
