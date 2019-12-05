import React, {useContext, useCallback} from 'react'
import PropTypes from 'prop-types'
import {FormValueContext} from '../../FormBuilder'
import InputContainer from './InputContainer'
import LabelContainer from './LabelContainer'
import {mapInputType} from '../index'

const InnerCell = props => {
  const {field, handleAnywhereClick, index, interactive, draggable, readonly} = props
  const {config} = field
  const [formValues] = useContext(FormValueContext)

  if (draggable || readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true
  }

  const onGridElementClick = useCallback((config, e) => {
    config.index = index
    handleAnywhereClick(config, e)
  }, [handleAnywhereClick, index])

  const Type = mapInputType(config.type, interactive)

  return (
    <div className='gfb-inner-cell' onClick={onGridElementClick}>
      <LabelContainer config={config} />
      <InputContainer config={config}>
        <Type />
      </InputContainer>
    </div>
  )
}

export default InnerCell

InnerCell.propTypes = {
  field: PropTypes.object,
  handleAnywhereClick: PropTypes.func,
  index: PropTypes.number,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  readonly: PropTypes.bool
}
