import _Promise from "@babel/runtime-corejs3/core-js-stable/promise";
const ajaxConfigErrorMessage = url => {
  console.error('The ajax client was not initialized for Grid Form Builder. Attempted to reach:', url);
  return _Promise.resolve({
    errors: [{
      code: 428,
      detail: 'The ajax client was not initialized for Grid Form Builder.'
    }]
  });
};
const config = {
  ajax: {
    get: ajaxConfigErrorMessage,
    post: ajaxConfigErrorMessage,
    put: ajaxConfigErrorMessage
  }
};
export const initFormBuilderAjax = func => func(config);
export default config;