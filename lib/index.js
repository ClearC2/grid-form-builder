'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('./redux');

Object.defineProperty(exports, 'reducer', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_redux).default;
  }
});

var _config = require('./config');

Object.defineProperty(exports, 'initFormBuilderAjax', {
  enumerable: true,
  get: function get() {
    return _config.initFormBuilderAjax;
  }
});

var _Input = require('./FieldDefinitions/Input');

Object.defineProperty(exports, 'Input', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Input).default;
  }
});

var _FormBuilder = require('./FormBuilder');

Object.defineProperty(exports, 'FormBuilder', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FormBuilder).default;
  }
});

var _Icons = require('./Icons');

Object.defineProperty(exports, 'initComponentIconLibrary', {
  enumerable: true,
  get: function get() {
    return _Icons.initComponentIconLibrary;
  }
});

var _FieldDefinitions = require('./FieldDefinitions');

Object.defineProperty(exports, 'initCustomFormComponents', {
  enumerable: true,
  get: function get() {
    return _FieldDefinitions.initCustomFormComponents;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var updateFormValues = function updateFormValues() {
  return console.error('updateFormValues is depricated and has been removed. You must handle your own form values.');
}; //eslint-disable-line

exports.updateFormValues = updateFormValues;