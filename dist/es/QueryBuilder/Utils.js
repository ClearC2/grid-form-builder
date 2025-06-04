import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context3, _context4; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context3 = ownKeys(Object(t), !0)).call(_context3, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context4 = ownKeys(Object(t))).call(_context4, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import { Set } from 'immutable';
const unconditionalFields = Set(['header', 'conditionalinput', 'checkbox']);
export const convertFormSchemaToSearch = function () {
  let formSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
  if (formSchema.jsonschema) {
    var _context;
    formSchema.jsonschema.layout = _mapInstanceProperty(_context = formSchema.jsonschema.layout).call(_context, f => {
      if (f.config.type === 'metadata') {
        if (f.config.conditionalConfig) {
          if (f.config.conditionalConfig.type === 'typeahead') {
            f.config.conditionalConfig.type = 'input';
          }
          const conditionalConfig = _Object$assign({}, f.config.conditionalConfig);
          const metaConfig = _Object$assign({}, f.config);
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
export const convertFieldToSearch = function () {
  let field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let forCondTable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (!unconditionalFields.has(field.config.type ? field.config.type.toLowerCase() : 'input')) {
    if (!field.config.forceUnconditional && !field.config.forceunconditional) {
      var _context2;
      if (field.config.conditionalConfig) {
        field.config = _objectSpread(_objectSpread({}, field.config), field.config.conditionalConfig); // overwrite default config if special report config is provided
      }
      if (field.config.type === 'typeahead') {
        field.config.type = 'input';
        // if (field.config.typeahead && !field.config.typeahead.fieldId) {
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
      if (_indexOfInstanceProperty(_context2 = ['date', 'datetime', 'time', 'month']).call(_context2, field.config.type) > -1) {
        field.config.onChangeValidator = null;
      }
      if (field.config.type === 'metadata') {
        if (field.config.conditionalConfig) {
          const conditionalConfig = _Object$assign({}, field.config.conditionalConfig);
          const metaConfig = _Object$assign({}, field.config);
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