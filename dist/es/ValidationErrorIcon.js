import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Tooltip from 'react-tooltip';
import { FaExclamationTriangle } from 'react-icons/fa';
import { randomId } from './utils';

var ValidationErrorIcon = function ValidationErrorIcon(props) {
  var message = props.message;
  var id = useRef(randomId());
  return React.createElement("div", {
    className: "gfb-input__indicator gfb-validation-error-indicator"
  }, React.createElement(FaExclamationTriangle, {
    id: id.current,
    "data-tip": true,
    "data-for": id.current,
    color: "red"
  }), message && React.createElement(Portal, {
    id: id.current
  }, React.createElement(Tooltip, {
    id: id.current,
    type: "error"
  }, React.createElement("span", null, message))));
};

ValidationErrorIcon.propTypes = {
  message: PropTypes.string
};
export default ValidationErrorIcon;