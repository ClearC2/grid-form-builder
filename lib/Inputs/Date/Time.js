import _extends from "@babel/runtime-corejs3/helpers/esm/extends";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React from 'react';
import DateInput from './DateInput';

var Time = function Time(props) {
  return React.createElement(DateInput, _extends({}, props, {
    showCalendar: false,
    timePicker: true
  }));
};

var _default = Time;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(Time, "Time", "/root/repo/src/Inputs/Date/Time.js");
  reactHotLoader.register(_default, "default", "/root/repo/src/Inputs/Date/Time.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();