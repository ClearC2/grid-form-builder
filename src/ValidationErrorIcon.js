import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import Portal from './Portal'
import {Tooltip} from 'react-tooltip'
import {FaExclamationTriangle} from 'react-icons/fa'
import {randomId} from './utils'

const ValidationErrorIcon = props => {
  const {message, color = 'red', type = 'error'} = props
  const id = useRef(randomId())
  return (
    <div className='gfb-input__indicator gfb-validation-error-indicator'>
      <FaExclamationTriangle id={id.current} data-tip data-for={id.current} color={color} />
      {message && (
        <Portal id={id.current}>
          <Tooltip id={id.current} type={type}>
            <span>{message}</span>
          </Tooltip>
        </Portal>
      )}
    </div>
  )
}

ValidationErrorIcon.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string
}

export default ValidationErrorIcon
