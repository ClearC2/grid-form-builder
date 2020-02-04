import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromJS, Map, List, Set } from 'immutable';
import ConditionalTable from './ConditionalTable';
import { CONDITIONS, TEXT_INPUTS } from '../../../index';
import { convertFormSchemaToSearch } from '../../Utils';

var getDefaultCondition = function getDefaultCondition(inputType) {
  var i = 0;
  var max = CONDITIONS.length;

  while (i < max) {
    if (!Set(CONDITIONS[i].invalidInputTypes).has(inputType)) {
      return _Object$keys(CONDITIONS)[i];
    }

    i++;
  }

  return ''; // no conditions are valid for this input type ??? you shouldnt get here.
};

var getFieldSchema = function getFieldSchema(key, formSchema) {
  if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
    var _context;

    formSchema = convertFormSchemaToSearch(formSchema);
    return _findInstanceProperty(_context = List(formSchema.jsonschema.layout)).call(_context, function (row) {
      return row.config.name === key;
    });
  } else {
    return undefined;
  }
};

export var convertQueryToFormValues = function convertQueryToFormValues(query) {
  var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fValues = arguments.length > 2 ? arguments[2] : undefined;
  var formSchema = arguments.length > 3 ? arguments[3] : undefined;
  var formValues = fromJS(fValues);

  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      _forEachInstanceProperty(formValues).call(formValues, function (v, k) {
        if (v instanceof Map) {
          var schema = getFieldSchema(k, formSchema);
          formValues = formValues.set(k, Map({
            condition: schema ? getDefaultCondition(schema.config.type) : v.get('condition'),
            values: List()
          }));
        } else if (typeof v === 'string') {
          formValues = formValues.set(k, '');
        }
      });
    } // put query into form values


    if (query.query) {
      query = query.query;
    }

    if (query.conditions) {
      var _context2;

      _forEachInstanceProperty(_context2 = fromJS(query.conditions)).call(_context2, function (c) {
        var schema = getFieldSchema(c.get('name'), formSchema);

        if (schema) {
          if (Set(TEXT_INPUTS).has(schema.config.type.toLowerCase())) {
            var val = c.get('values') instanceof List ? c.getIn(['values', 0], ['']) : c.get('values', '');
            formValues = formValues.set(c.get('name'), val);
          } else {
            if (c.get('rawValues') !== undefined) {
              formValues = formValues.set(c.get('name'), Map({
                condition: c.get('comparator'),
                values: c.get('rawValues', List())
              }));
            } else {
              formValues = formValues.set(c.get('name'), Map({
                condition: c.get('comparator'),
                values: c.get('values', List())
              }));
            }
          }
        }
      });
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('Empty Query object received');
  }

  return formValues;
};

var _ConditionalTableContainer =
/*#__PURE__*/
function (_Component) {
  _inherits(_ConditionalTableContainer, _Component);

  function _ConditionalTableContainer(props) {
    var _this;

    _classCallCheck(this, _ConditionalTableContainer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(_ConditionalTableContainer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "convertQueryToFormValues", function (query) {
      var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      return convertQueryToFormValues(query, clearExistingValues, _this.props.formValues, _this.state.formSchema);
    });

    _defineProperty(_assertThisInitialized(_this), "getDefaultCondition", function (inputType) {
      var i = 0;
      var max = CONDITIONS.length;

      while (i < max) {
        if (!Set(CONDITIONS[i].invalidInputTypes).has(inputType)) {
          return _Object$keys(CONDITIONS)[i];
        }

        i++;
      }

      return ''; // no conditions are valid for this input type ??? you shouldnt get here.
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldSchema", function (key) {
      var formSchema = _this.state.formSchema;

      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        var _context3;

        return _findInstanceProperty(_context3 = List(formSchema.jsonschema.layout)).call(_context3, function (row) {
          return row.config.name === key;
        });
      } else {
        return undefined;
      }
    });

    _this.state = {
      formSchema: convertFormSchemaToSearch(props.formSchema)
    };
    return _this;
  }

  _createClass(_ConditionalTableContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      if (_Object$keys(props.formSchema).length !== _Object$keys(this.state.formSchema).length) {
        this.setState({
          formSchema: convertFormSchemaToSearch(props.formSchema)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(ConditionalTable, _extends({
        formSchema: this.state.formSchema,
        formValues: fromJS(this.props.formValues).toJS(),
        title: this.props.title || 'Query:',
        handleOnChange: this.props.handleFormValueChange,
        onNextClick: this.props.onNextClick,
        primaryButtonClass: this.props.primaryButtonClass,
        enableResetButton: this.props.enableResetButton,
        enableNextButton: this.props.enableNextButton,
        onQueryChange: this.props.onQueryChange,
        getDefaultCondition: this.getDefaultCondition,
        getFieldSchema: this.getFieldSchema,
        enableDelete: this.props.enableDelete,
        enableToggle: this.props.enableToggle,
        onToggleChange: this.props.onToggleChange,
        enableListToggle: this.props.enableListToggle
      }, this.props));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return _ConditionalTableContainer;
}(Component);

_defineProperty(_ConditionalTableContainer, "propTypes", {
  formSchema: PropTypes.object.isRequired,
  formValues: PropTypes.object.isRequired,
  handleFormValueChange: PropTypes.func.isRequired,
  primaryButtonClass: PropTypes.string,
  enableResetButton: PropTypes.bool,
  onNextClick: PropTypes.func,
  enableNextButton: PropTypes.bool,
  onQueryChange: PropTypes.func,
  title: PropTypes.string,
  enableToggle: PropTypes.bool,
  enableDelete: PropTypes.bool,
  onToggleChange: PropTypes.func,
  enableListToggle: PropTypes.bool
});

_defineProperty(_ConditionalTableContainer, "defaultProps", {
  enableResetButton: false,
  enableNextButton: false,
  enableToggle: true,
  enableDelete: true
});

var _default = connect(null, null, null, {
  forwardRef: true
})(_ConditionalTableContainer);

export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(getDefaultCondition, "getDefaultCondition", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/Where/ConditionalTable/ConditionalTableContainer.js");
  reactHotLoader.register(getFieldSchema, "getFieldSchema", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/Where/ConditionalTable/ConditionalTableContainer.js");
  reactHotLoader.register(convertQueryToFormValues, "convertQueryToFormValues", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/Where/ConditionalTable/ConditionalTableContainer.js");
  reactHotLoader.register(_ConditionalTableContainer, "_ConditionalTableContainer", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/Where/ConditionalTable/ConditionalTableContainer.js");
  reactHotLoader.register(_default, "default", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/Where/ConditionalTable/ConditionalTableContainer.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();