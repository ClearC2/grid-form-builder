"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.initFormBuilderAjax = void 0;

var _promise = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/promise"));

var ajaxConfigErrorMessage = function ajaxConfigErrorMessage(url) {
  console.error('The ajax client was not initialized for Grid Form Builder. Attempted to reach:', url);
  return _promise.default.resolve({
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

var initFormBuilderAjax = function initFormBuilderAjax(func) {
  return func(config);
};

exports.initFormBuilderAjax = initFormBuilderAjax;
var _default = config;
exports.default = _default;