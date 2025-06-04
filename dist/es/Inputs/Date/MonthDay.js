import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import React from 'react';
import PropTypes from 'prop-types';
import DateInput from './DateInput';
const Monthday = props => {
  const {
    format = 'MM/DD/YYYY'
  } = props;
  return /*#__PURE__*/React.createElement(DateInput, _extends({}, props, {
    canPickYear: false,
    format: format
  }));
};
Monthday.propTypes = {
  format: PropTypes.string
};
export default Monthday;