"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.convertFieldToSearch = exports.convertFormSchemaToSearch = void 0;

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _immutable = require("immutable");

var unconditionalFields = (0, _immutable.Set)(['header', 'conditionalinput', 'checkbox', 'textarea']);

var convertFormSchemaToSearch = function convertFormSchemaToSearch() {
  var formSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (formSchema.jsonschema) {
    var _context;

    formSchema.jsonschema.layout = (0, _map.default)(_context = formSchema.jsonschema.layout).call(_context, function (f) {
      if (f.config.type === 'metadata') {
        if (f.config.conditionalConfig) {
          var conditionalConfig = (0, _assign.default)({}, f.config.conditionalConfig);
          var metaConfig = (0, _assign.default)({}, f.config);
          delete metaConfig.conditionalConfig;
          f.config = conditionalConfig;
          f.config.metaConfig = metaConfig;
        } else {
          f.config.type = 'input';
        }
      }

      return f;
    });
  }

  return formSchema;
};

exports.convertFormSchemaToSearch = convertFormSchemaToSearch;

var convertFieldToSearch = function convertFieldToSearch() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var forCondTable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (!unconditionalFields.has(field.config.type ? field.config.type.toLowerCase() : 'input')) {
    if (!field.config.forceUnconditional && !field.config.forceunconditional) {
      if (field.config.type === 'typeahead') {
        field.config.type = 'input'; // if (field.config.typeahead && !field.config.typeahead.fieldId) {
        //   field.config.typeahead.fieldId = 'value'
        // }
        // field.config.multi = true
      }

      if (field.config.type === 'radio') {
        // inputs that are normally radios should be multicheckboxes in search
        field.config.type = 'multicheckbox';
      }

      if (field.config.type === 'select') {
        field.config.type = 'multiselect';
      }

      if (field.config.type === 'email') {
        field.config.type = 'input';
      }

      if (field.config.type === 'metadata') {
        if (field.config.conditionalConfig) {
          var conditionalConfig = (0, _assign.default)({}, field.config.conditionalConfig);
          var metaConfig = (0, _assign.default)({}, field.config);
          delete metaConfig.conditionalConfig;
          field.config = conditionalConfig;
          field.config.metaConfig = metaConfig;
        } else {
          field.config.type = 'input';
        }
      }

      field.config.inputType = field.config.type || 'input';

      if (!forCondTable) {
        field.config.type = 'conditionalInput';
      }
    }
  }

  field.config.required = false;
  field.config.readonly = false;
  field.config.disabled = false;
  return field;
};

exports.convertFieldToSearch = convertFieldToSearch;