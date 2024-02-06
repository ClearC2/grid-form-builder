import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './DateInput';

var Monthday = function Monthday(props) {
  var _props$format = props.format,
      format = _props$format === void 0 ? 'MM/DD/YYYY' : _props$format;
  return /*#__PURE__*/React.createElement(DateInput, _extends({}, props, {
    canPickYear: false,
    format: format
  }));
};

Monthday.propTypes = {
  format: PropTypes.string
};
export default Monthday;