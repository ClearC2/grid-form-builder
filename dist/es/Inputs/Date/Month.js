import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import React from 'react';
import DateInput from './DateInput';

var Month = function Month(props) {
  return React.createElement(DateInput, _extends({}, props, {
    canPickDay: false
  }));
};

export default Month;