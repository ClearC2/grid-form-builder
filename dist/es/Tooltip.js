import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Tooltip from 'react-tooltip';

var PortalTooltip = function PortalTooltip(props) {
  var message = props.message,
      id = props.id;
  return message && id ? /*#__PURE__*/React.createElement(Portal, null, /*#__PURE__*/React.createElement(Tooltip, {
    id: id
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