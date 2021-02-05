"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.convertQueryToFormValues = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

var _immutable = require("immutable");

var _ConditionalTable = _interopRequireDefault(require("./ConditionalTable"));

var _index = require("../../../index");

var _Utils = require("../../Utils");

var getDefaultCondition = function getDefaultCondition(inputType) {
  var i = 0;
  var max = _index.CONDITIONS.length;

  while (i < max) {
    if (!(0, _immutable.Set)(_index.CONDITIONS[i].invalidInputTypes).has(inputType)) {
      return (0, _keys.default)(_index.CONDITIONS)[i];
    }

    i++;
  }

  return ''; // no conditions are valid for this input type ??? you shouldnt get here.
};

var getDefaultFormat = function getDefaultFormat(inputType) {
  var i = 0;
  var max = _index.DATES.length;

  while (i < max) {
    if (!(0, _immutable.Set)(_index.DATES[i].invalidInputTypes).has(inputType)) {
      return (0, _keys.default)(_index.DATES)[i];
    }

    i++;
  }

  return ''; // type should not be a date
};

var getFieldSchema = function getFieldSchema(key, formSchema) {
  if (formSchema && typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

  if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
    var _context;

    formSchema = (0, _Utils.convertFormSchemaToSearch)(formSchema);
    return (0, _find.default)(_context = (0, _immutable.List)(formSchema.jsonschema.layout)).call(_context, function (row) {
      return row.config.name === key;
    });
  } else {
    return undefined;
  }
};

var getBetweenDatesValues = function getBetweenDatesValues(query) {
  var _context2;

  return (0, _filter.default)(_context2 = (0, _map.default)(query).call(query, function (q) {
    if ((0, _values.default)(q) && (0, _values.default)(q).length) {
      return (0, _values.default)(q)[0];
    }
  })).call(_context2, Boolean);
};

var convertSingleField = function convertSingleField(c, formSchema, inBetweenDateValues) {
  var newFormValue;
  var schema = getFieldSchema(c.get('name'), formSchema);
  var mergeDate = c.get('mergeDate', false);

  if (schema) {
    if ((0, _immutable.Set)(_index.TEXT_INPUTS).has(schema.config.type.toLowerCase())) {
      var val = c.get('values') instanceof _immutable.List ? c.getIn(['values', 0], ['']) : c.get('values', '');
      newFormValue = val;
    } else {
      if (c.get('rawValues') !== undefined && !mergeDate) {
        newFormValue = (0, _immutable.Map)({
          condition: c.get('comparator'),
          values: c.get('rawValues', (0, _immutable.List)()),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          format: c.get('format', '')
        }); // https://github.com/ClearC2/bleu/issues/4734
      } else if (mergeDate) {
        newFormValue = (0, _immutable.Map)({
          condition: 'is between',
          values: (0, _immutable.List)(inBetweenDateValues),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          format: c.get('format', '')
        });
      } else {
        newFormValue = (0, _immutable.Map)({
          condition: c.get('comparator'),
          values: c.get('values', (0, _immutable.List)()),
          dynamicValues: c.get('dynamicValues'),
          not: c.get('not', false),
          format: c.get('format', '')
        });
      }
    }
  }

  return newFormValue;
};

var convertQueryToFormValues = function convertQueryToFormValues(query) {
  var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fValues = arguments.length > 2 ? arguments[2] : undefined;
  var formSchema = arguments.length > 3 ? arguments[3] : undefined;
  var formValues = (0, _immutable.fromJS)(fValues);
  if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      (0, _forEach.default)(formValues).call(formValues, function (v, k) {
        if (v instanceof _immutable.Map) {
          var schema = getFieldSchema(k, formSchema);
          formValues = formValues.set(k, (0, _immutable.Map)({
            condition: schema ? getDefaultCondition(schema.config.type) : v.get('condition'),
            values: (0, _immutable.List)(),
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
      var _context3;

      var inBetweenDateValues = getBetweenDatesValues(query.conditions);
      (0, _forEach.default)(_context3 = (0, _immutable.fromJS)(query.conditions)).call(_context3, function (c) {
        if (c.get('conditions')) {
          var _context4;

          var conditions = (0, _immutable.List)();
          (0, _forEach.default)(_context4 = c.get('conditions')).call(_context4, function (pred) {
            var newField = convertSingleField(pred, formSchema, inBetweenDateValues);
            newField = newField.set('name', pred);
            conditions = conditions.push(newField);
          });
          formValues = formValues.set(c.getIn(['conditions', 1, 'name']), (0, _immutable.fromJS)({
            conditions: conditions,
            type: c.get('type')
          }));
        } else {
          var newValue = convertSingleField(c, formSchema, inBetweenDateValues);
          formValues = formValues.set(c.get('name'), newValue);
        }
      });
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('Empty Query object received');
  }

  return formValues;
};

exports.convertQueryToFormValues = convertQueryToFormValues;

var _ConditionalTableContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(_ConditionalTableContainer, _Component);

  function _ConditionalTableContainer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, _ConditionalTableContainer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(_ConditionalTableContainer).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "convertQueryToFormValues", function (query) {
      var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var formValues = _this.props.formValues;
      var formSchema = _this.state.formSchema;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      return convertQueryToFormValues(query, clearExistingValues, formValues, formSchema);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getDefaultCondition", function (inputType) {
      var i = 0;
      var max = _index.CONDITIONS.length;

      while (i < max) {
        if (!(0, _immutable.Set)(_index.CONDITIONS[i].invalidInputTypes).has(inputType)) {
          return (0, _keys.default)(_index.CONDITIONS)[i];
        }

        i++;
      }

      return ''; // no conditions are valid for this input type ??? you shouldnt get here.
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getFieldSchema", function (key) {
      var formSchema = _this.state.formSchema;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        var _context5;

        return (0, _find.default)(_context5 = (0, _immutable.List)(formSchema.jsonschema.layout)).call(_context5, function (row) {
          return row.config.name === key;
        });
      } else {
        return undefined;
      }
    });
    var _formSchema = props.formSchema;
    if (typeof _formSchema.toJS === 'function') _formSchema = _formSchema.toJS();
    _this.state = {
      formSchema: (0, _Utils.convertFormSchemaToSearch)(_formSchema)
    };
    return _this;
  }

  (0, _createClass2.default)(_ConditionalTableContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      var formSchema = props.formSchema;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      var _this$state$formSchem = this.state.formSchema,
          stateSchema = _this$state$formSchem === void 0 ? [] : _this$state$formSchem;
      if (typeof stateSchema.toJS === 'function') stateSchema = stateSchema.toJS();

      if ((0, _keys.default)(formSchema).length !== (0, _keys.default)(stateSchema).length) {
        this.setState({
          formSchema: (0, _Utils.convertFormSchemaToSearch)(formSchema)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_ConditionalTable.default, (0, _extends2.default)({}, this.props, {
        formSchema: this.state.formSchema,
        formValues: (0, _immutable.fromJS)(this.props.formValues).toJS(),
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
}(_react.Component);

(0, _defineProperty2.default)(_ConditionalTableContainer, "propTypes", {
  formSchema: _propTypes.default.object.isRequired,
  formValues: _propTypes.default.object.isRequired,
  handleFormValueChange: _propTypes.default.func.isRequired,
  primaryButtonClass: _propTypes.default.string,
  enableResetButton: _propTypes.default.bool,
  onNextClick: _propTypes.default.func,
  enableNextButton: _propTypes.default.bool,
  onQueryChange: _propTypes.default.func,
  title: _propTypes.default.string,
  enableToggle: _propTypes.default.bool,
  enableDelete: _propTypes.default.bool,
  onToggleChange: _propTypes.default.func,
  enableListToggle: _propTypes.default.bool
});
(0, _defineProperty2.default)(_ConditionalTableContainer, "defaultProps", {
  enableResetButton: false,
  enableNextButton: false,
  enableToggle: true,
  enableDelete: true
});

var _default = (0, _reactRedux.connect)(null, null, null, {
  forwardRef: true
})(_ConditionalTableContainer);

exports.default = _default;