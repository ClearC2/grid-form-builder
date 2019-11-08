import {cloneElement, useContext} from 'react'
import {FormValueContext} from './FormBuilder'

const InputContainer = props => {
  const {children, config, ...rest} = props
  const {draggable, readonly} = props
  const [formValues] = useContext(FormValueContext)
  if (draggable || readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true
  }
  return (
    cloneElement(children, {...rest, config, formValues})
  )
}

export default InputContainer
