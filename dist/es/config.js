import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";

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
export default config;