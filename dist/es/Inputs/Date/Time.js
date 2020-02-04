import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import React from 'react';
import DateInput from './DateInput';

var Time = function Time(props) {
  return React.createElement(DateInput, _extends({}, props, {
    showCalendar: false,
    timePicker: true
  }));
};

export default Time;