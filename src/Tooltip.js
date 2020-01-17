import React from 'react'
import PropTypes from 'prop-types'
import Portal from './Portal'
import Tooltip from 'react-tooltip'

const PortalTooltip = props => {
  const {message, id} = props
  return (
    (message && id) ? (
      <Portal>
        <Tooltip id={id}>
          <span>{message}</span>
        </Tooltip>
      </Portal>
    ) : null
  )
}

PortalTooltip.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string
}

export default PortalTooltip
