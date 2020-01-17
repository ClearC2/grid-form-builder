import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import Portal from './Portal'
import Tooltip from 'react-tooltip'
import {FaExclamationTriangle} from 'react-icons/fa'
import {randomId} from './utils'

const ValidationErrorIcon = props => {
  const {message} = props
  const id = useRef(randomId())
  return (
    <div className='gfb-input__indicator gfb-validation-error-indicator'>
      <FaExclamationTriangle id={id.current} data-tip data-for={id.current} color='red' />
      {message && (
        <Portal id={id.current}>
          <Tooltip id={id.current} type='error'>
            <span>{message}</span>
          </Tooltip>
        </Portal>
      )}
    </div>
  )
}

ValidationErrorIcon.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string
}

export default ValidationErrorIcon
