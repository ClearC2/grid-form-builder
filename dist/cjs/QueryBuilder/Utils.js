"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.convertFieldToSearch = exports.convertFormSchemaToSearch = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _immutable = require("immutable");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source), true)).call(_context2, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context3; (0, _forEach.default)(_context3 = ownKeys(Object(source))).call(_context3, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var unconditionalFields = (0, _immutable.Set)(['header', 'conditionalinput', 'checkbox', 'textarea']);

var convertFormSchemaToSearch = function convertFormSchemaToSearch() {
  var formSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

  if (formSchema.jsonschema) {
    var _context;

    formSchema.jsonschema.layout = (0, _map.default)(_context = formSchema.jsonschema.layout).call(_context, function (f) {
      if (f.config.type === 'metadata') {
        if (f.config.conditionalConfig) {
          if (f.config.conditionalConfig.type === 'typeahead') {
            f.config.conditionalConfig.type = 'input';
          }

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
      if (field.config.conditionalConfig) {
        field.config = _objectSpread({}, field.config, {}, field.config.conditionalConfig); // overwrite default config if special report config is provided
      }

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