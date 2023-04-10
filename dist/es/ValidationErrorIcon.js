import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Portal from './Portal';
import Tooltip from 'react-tooltip';
import { FaExclamationTriangle } from 'react-icons/fa';
import { randomId } from './utils';

var ValidationErrorIcon = function ValidationErrorIcon(props) {
  var message = props.message,
      _props$color = props.color,
      color = _props$color === void 0 ? 'red' : _props$color,
      _props$type = props.type,
      type = _props$type === void 0 ? 'error' : _props$type;
  var id = useRef(randomId());
  return /*#__PURE__*/React.createElement("div", {
    className: "gfb-input__indicator gfb-validation-error-indicator"
  }, /*#__PURE__*/React.createElement(FaExclamationTriangle, {
    id: id.current,
    "data-tip": true,
    "data-for": id.current,
    color: color
  }), message && /*#__PURE__*/React.createElement(Portal, {
    id: id.current
  }, /*#__PURE__*/React.createElement(Tooltip, {
    id: id.current,
    type: type
  }, /*#__PURE__*/React.createElement("span", null, message))));
};

ValidationErrorIcon.propTypes = {
  message: PropTypes.string,
  color: PropTypes.string,
  type: PropTypes.string
};
export default ValidationErrorIcon;