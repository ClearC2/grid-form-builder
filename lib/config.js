import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

var ajaxConfigErrorMessage = function ajaxConfigErrorMessage(url) {
  console.error('The ajax client was not initialized for Grid Form Builder. Attempted to reach:', url);
  return _Promise.resolve({
    errors: [{
      code: 428,
      detail: 'The ajax client was not initialized for Grid Form Builder.'
    }]
  });
};

var config = {
  ajax: {
    get: ajaxConfigErrorMessage,
    post: ajaxConfigErrorMessage,
    put: ajaxConfigErrorMessage
  }
};
export var initFormBuilderAjax = function initFormBuilderAjax(func) {
  return func(config);
};
var _default = config;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ajaxConfigErrorMessage, "ajaxConfigErrorMessage", "/Users/davidadams/code/grid-form-builder/src/config.js");
  reactHotLoader.register(config, "config", "/Users/davidadams/code/grid-form-builder/src/config.js");
  reactHotLoader.register(initFormBuilderAjax, "initFormBuilderAjax", "/Users/davidadams/code/grid-form-builder/src/config.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/config.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();