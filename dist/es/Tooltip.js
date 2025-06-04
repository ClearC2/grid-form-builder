import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import { Tooltip } from 'react-tooltip';
import { trackActiveTooltip } from './tooltipController';
const PortalTooltip = props => {
  const {
    message,
    id
  } = props;
  const tooltipRef = useRef(null);
  // eslint-disable-next-line no-console
  console.log({
    tooltipRef
  });
  return message && id ? /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(Tooltip, {
    id: id,
    ref: tooltipRef,
    onShow: () => {
      // eslint-disable-next-line no-console
      console.log('on show?');
      if (tooltipRef.current) {
        trackActiveTooltip(tooltipRef.current);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    dangerouslySetInnerHTML: {
      __html: message
    }
  }))) : null;
};
PortalTooltip.propTypes = {
  message: PropTypes.string,
  id: PropTypes.string
};
export default PortalTooltip;