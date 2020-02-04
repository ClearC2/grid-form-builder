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

var DateTime = function DateTime(props) {
  return React.createElement(DateInput, _extends({}, props, {
    timePicker: true
  }));
};

var _default = DateTime;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(DateTime, "DateTime", "/Users/davidadams/code/grid-form-builder/src/Inputs/Date/Datetime.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/Inputs/Date/Datetime.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();