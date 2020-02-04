import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import React from 'react';
import DateInput from './DateInput';

var DateTime = function DateTime(props) {
  return React.createElement(DateInput, _extends({}, props, {
    timePicker: true
  }));
};

export default DateTime;