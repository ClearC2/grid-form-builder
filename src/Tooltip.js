import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import Portal from './Portal'
import {Tooltip} from 'react-tooltip'
import {trackActiveTooltip} from './tooltipController'

const PortalTooltip = props => {
  const {message, id} = props
  const tooltipRef = useRef(null)

  return (
    (message && id) ? (
      <Portal>
        <Tooltip id={id} ref={tooltipRef} onShow={() => {
          if (tooltipRef.current) {
            trackActiveTooltip(tooltipRef.current)
          }
        }}>
          <div dangerouslySetInnerHTML={{__html: message}} />
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
