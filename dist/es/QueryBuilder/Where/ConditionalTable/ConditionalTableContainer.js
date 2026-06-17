import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context10, _context11; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context10 = ownKeys(Object(source), !0)).call(_context10, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context11 = ownKeys(Object(source))).call(_context11, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fromJS, Map, List, Set } from 'immutable';
import ConditionalTable from './ConditionalTable';
import { CONDITIONS, TEXT_INPUTS, DATES } from '../../../index';
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

var getDefaultFormat = function getDefaultFormat(inputType) {
  var i = 0;
  var max = DATES.length;

  while (i < max) {
    if (!Set(DATES[i].invalidInputTypes).has(inputType)) {
      return _Object$keys(DATES)[i];
    }

    i++;
  }

  return ''; // type should not be a date
};

var getFieldSchema = function getFieldSchema(key, formSchema) {
  if (formSchema && typeof formSchema.toJS === 'function') {
    formSchema = formSchema.toJS();
  }

  if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
    var _context;

    formSchema = convertFormSchemaToSearch(formSchema);

    var fieldSchema = _findInstanceProperty(_context = List(formSchema.jsonschema.layout)).call(_context, function (row) {
      return row.config.name === key;
    });

    if (fieldSchema) return fieldSchema; // this field isn't in the form schema, default it to a string - JRA 05/15/2026

    return {
      config: {
        label: key,
        name: key,
        type: 'input'
      },
      dimensions: {},
      type: 'input'
    };
  } else {
    // we have no form schema, default this field to a string - JRA 05/15/2026
    return {
      config: {
        label: key,
        name: key,
        type: 'input'
      },
      dimensions: {},
      type: 'input'
    };
  }
};

var getBetweenDatesValues = function getBetweenDatesValues(query) {
  var _context2, _context3;

  return _filterInstanceProperty(_context2 = _mapInstanceProperty(_context3 = _filterInstanceProperty(query).call(query, function (q) {
    var _context4;

    return _includesInstanceProperty(_context4 = String(q.name)).call(_context4, 'date');
  })).call(_context3, function (q) {
    if (_valuesInstanceProperty(q) && _valuesInstanceProperty(q).length) {
      return {
        field: q.name,
        value: _valuesInstanceProperty(q)[0]
      };
    }
  })).call(_context2, Boolean);
};

var formatDayLabel = function formatDayLabel(day) {
  if (!day || typeof day !== 'string') return '';
  return day.charAt(0).toUpperCase() + _sliceInstanceProperty(day).call(day, 1);
};

var getExcludedDaysFields = function getExcludedDaysFields(c) {
  var days = c.get('days_to_exclude', List());

  if (!days || !days.size) {
    return {};
  }

  return {
    excludeDays: true,
    excludedDays: _mapInstanceProperty(days).call(days, function (day) {
      return {
        label: formatDayLabel(day),
        value: day
      };
    })
  };
};

var convertSingleField = function convertSingleField(c, formSchema, inBetweenDateValues) {
  var newFormValue;
  var schema = getFieldSchema(c.get('name'), formSchema);
  var type = schema.config && typeof schema.config.type === 'string' ? schema.config.type.toLowerCase() : 'input';
  var mergeDate = c.get('mergeDate', false);
  var excludedDaysFields = getExcludedDaysFields(c);

  if (schema) {
    if (Set(TEXT_INPUTS).has(type) && c.get('comparator') !== 'is blank' && c.get('comparator') !== 'is not blank') {
      var val = c.get('values') instanceof List ? c.getIn(['values', 0], ['']) : c.get('values', '');
      newFormValue = Map({
        condition: c.get('comparator'),
        values: List([val])
      });
    } else {
      if (c.get('rawValues') !== undefined && !mergeDate) {
        newFormValue = Map(_objectSpread({
          condition: c.get('comparator'),
          values: c.get('rawValues', List()),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          isfield: c.get('isfield', false),
          format: c.get('format', '')
        }, excludedDaysFields)); // https://github.com/ClearC2/bleu/issues/4734
      } else if (mergeDate) {
        var _context5;

        var values = _mapInstanceProperty(_context5 = _filterInstanceProperty(inBetweenDateValues).call(inBetweenDateValues, function (v) {
          return v.field === c.get('name');
        })).call(_context5, function (v) {
          return v.value;
        });

        newFormValue = Map(_objectSpread({
          condition: 'is between',
          values: List(values),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          isfield: c.get('isfield', false),
          format: c.get('format', '')
        }, excludedDaysFields));
      } else {
        newFormValue = Map(_objectSpread({
          condition: c.get('comparator'),
          values: c.get('values', List()),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          isfield: c.get('isfield', false),
          format: c.get('format', '')
        }, excludedDaysFields));
      }
    }
  }

  return newFormValue;
};

export var convertQueryToFormValues = function convertQueryToFormValues(query) {
  var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fValues = arguments.length > 2 ? arguments[2] : undefined;
  var formSchema = arguments.length > 3 ? arguments[3] : undefined;
  var formValues = fromJS(fValues);
  if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      _forEachInstanceProperty(formValues).call(formValues, function (v, k) {
        if (v instanceof Map) {
          var schema = getFieldSchema(k, formSchema);
          formValues = formValues.set(k, Map({
            condition: schema ? getDefaultCondition(schema.config.type) : v.get('condition'),
            values: List(),
            dynamicValues: v.get('dynamicValues'),
            not: v.get('not', false),
            format: schema ? getDefaultFormat(schema.config.format) : v.get('format', '')
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
      var _context6;

      var inBetweenDateValues = getBetweenDatesValues(query.conditions);

      _forEachInstanceProperty(_context6 = fromJS(query.conditions)).call(_context6, function (c) {
        if (c.get('conditions')) {
          var _context7;

          var conditions = List();

          _forEachInstanceProperty(_context7 = c.get('conditions')).call(_context7, function (pred) {
            var newField = convertSingleField(pred, formSchema, inBetweenDateValues);
            newField = newField.set('name', pred);
            conditions = conditions.push(newField);
          });

          formValues = formValues.set(c.getIn(['conditions', 0, 'name']), fromJS({
            conditions: conditions,
            type: c.get('type')
          }));
        } else {
          var newValue = convertSingleField(c, formSchema, inBetweenDateValues);
          var name = c.get('name');

          if (_includesInstanceProperty(name).call(name, '.') && c.get('label')) {
            // https://github.com/ClearC2/bleu/issues/11762
            name = c.get('label');
          }

          formValues = formValues.set(name, newValue);
        }
      });
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('Empty Query object received');
  }

  return formValues;
};

var _ConditionalTableContainer = /*#__PURE__*/function (_Component) {
  _inherits(_ConditionalTableContainer, _Component);

  var _super = _createSuper(_ConditionalTableContainer);

  function _ConditionalTableContainer(props) {
    var _this;

    _classCallCheck(this, _ConditionalTableContainer);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "convertQueryToFormValues", function (query) {
      var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var formValues = _this.props.formValues;
      var formSchema = _this.state.formSchema;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      return convertQueryToFormValues(query, clearExistingValues, formValues, formSchema);
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
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        var _context8;

        var input = _findInstanceProperty(_context8 = List(formSchema.jsonschema.layout)).call(_context8, function (row) {
          return row.config.name === key;
        });

        if (!input) {
          var _context9;

          input = _findInstanceProperty(_context9 = List(formSchema.jsonschema.layout)).call(_context9, function (row) {
            return row.config.label === key;
          });
        }

        return input;
      } else {
        return undefined;
      }
    });

    var _formSchema = props.formSchema;
    if (typeof _formSchema.toJS === 'function') _formSchema = _formSchema.toJS();
    _this.state = {
      formSchema: convertFormSchemaToSearch(_formSchema)
    };
    return _this;
  }

  _createClass(_ConditionalTableContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var formSchema = props.formSchema;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      var _this$state$formSchem = this.state.formSchema,
          stateSchema = _this$state$formSchem === void 0 ? [] : _this$state$formSchem;
      if (typeof stateSchema.toJS === 'function') stateSchema = stateSchema.toJS();

      if (_Object$keys(formSchema).length !== _Object$keys(stateSchema).length) {
        this.setState({
          formSchema: convertFormSchemaToSearch(formSchema)
        });
      } else if (stateSchema && stateSchema.jsonschema && stateSchema.jsonschema.layout && formSchema && formSchema.jsonschema && formSchema.jsonschema.layout && stateSchema.jsonschema.layout.length !== formSchema.jsonschema.layout.length) {
        this.setState({
          formSchema: convertFormSchemaToSearch(formSchema)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/React.createElement(ConditionalTable, _extends({}, this.props, {
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
      }));
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

export default connect(null, null, null, {
  forwardRef: true
})(_ConditionalTableContainer);