import React from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Tooltip from 'react-tooltip';

var PortalTooltip = function PortalTooltip(props) {
  var message = props.message,
      id = props.id;
  return message && id ? React.createElement(Portal, null, React.createElement(Tooltip, {
    id: id
  }, React.createElement("div", {
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