import {cloneElement, useContext, useCallback} from 'react'
import {FormValueContext} from './FormBuilder'

const InputContainer = props => {
  const {children, config, handleAnywhereClick, index, ...rest} = props
  const {draggable, readonly} = props
  const [formValues] = useContext(FormValueContext)
  const onGridElementClick = useCallback((config, e) => {
    config.index = index
    handleAnywhereClick(config, e)
  }, [handleAnywhereClick, index])
  if (draggable || readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true
  }
  return (
    cloneElement(children, {...rest, config, formValues, handleAnywhereClick: onGridElementClick})
  )
}

export default InputContainer
