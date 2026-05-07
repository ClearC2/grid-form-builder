import React from 'react';
import PropTypes from 'prop-types';
import { FaCopy } from 'react-icons/fa';

var CopyValueIcon = function CopyValueIcon(props) {
  var tooltipId = props.tooltipId,
      _props$onClick = props.onClick,
      onClick = _props$onClick === void 0 ? function () {
    return null;
  } : _props$onClick;
  return /*#__PURE__*/React.createElement("div", {
    className: "copy-input-value-btn gfb-input__indicator",
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "copy-input-value-btn btn",
    style: {
      border: '1px solid #555555',
      padding: 2
    },
    "data-tip": "Copy Value",
    "data-for": tooltipId,
    onClick: onClick
  }, /*#__PURE__*/React.createElement(FaCopy, {
    color: "#555555"
  })));
};

CopyValueIcon.propTypes = {
  tooltipId: PropTypes.string,
  onClick: PropTypes.func
};
export default CopyValueIcon;