import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import { Set } from 'immutable';
var unconditionalFields = Set(['header', 'conditionalinput', 'checkbox', 'textarea']);
export var convertFormSchemaToSearch = function convertFormSchemaToSearch() {
  var formSchema = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (formSchema.jsonschema) {
    var _context;

    formSchema.jsonschema.layout = _mapInstanceProperty(_context = formSchema.jsonschema.layout).call(_context, function (f) {
      if (f.config.type === 'metadata') {
        if (f.config.conditionalConfig) {
          var conditionalConfig = _Object$assign({}, f.config.conditionalConfig);

          var metaConfig = _Object$assign({}, f.config);

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
export var convertFieldToSearch = function convertFieldToSearch() {
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
          var conditionalConfig = _Object$assign({}, field.config.conditionalConfig);

          var metaConfig = _Object$assign({}, field.config);

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
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(unconditionalFields, "unconditionalFields", "/root/repo/src/QueryBuilder/Utils.js");
  reactHotLoader.register(convertFormSchemaToSearch, "convertFormSchemaToSearch", "/root/repo/src/QueryBuilder/Utils.js");
  reactHotLoader.register(convertFieldToSearch, "convertFieldToSearch", "/root/repo/src/QueryBuilder/Utils.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();