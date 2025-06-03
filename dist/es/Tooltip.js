import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import { Tooltip } from 'react-tooltip';
import { trackActiveTooltip } from './tooltipController';

var PortalTooltip = function PortalTooltip(props) {
  var message = props.message,
      id = props.id;
  var tooltipRef = useRef(null);
  console.log({
    tooltipRef: tooltipRef
  });
  return message && id ? /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(Tooltip, {
    id: id,
    ref: tooltipRef,
    onShow: function onShow() {
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