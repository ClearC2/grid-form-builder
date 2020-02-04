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

var getFieldSchema = function getFieldSchema(key, formSchema) {
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

var convertQueryToFormValues = function convertQueryToFormValues(query) {
  var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fValues = arguments.length > 2 ? arguments[2] : undefined;
  var formSchema = arguments.length > 3 ? arguments[3] : undefined;
  var formValues = (0, _immutable.fromJS)(fValues);

  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      (0, _forEach.default)(formValues).call(formValues, function (v, k) {
        if (v instanceof _immutable.Map) {
          var schema = getFieldSchema(k, formSchema);
          formValues = formValues.set(k, (0, _immutable.Map)({
            condition: schema ? getDefaultCondition(schema.config.type) : v.get('condition'),
            values: (0, _immutable.List)()
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

      (0, _forEach.default)(_context2 = (0, _immutable.fromJS)(query.conditions)).call(_context2, function (c) {
        var schema = getFieldSchema(c.get('name'), formSchema);

        if (schema) {
          if ((0, _immutable.Set)(_index.TEXT_INPUTS).has(schema.config.type.toLowerCase())) {
            var val = c.get('values') instanceof _immutable.List ? c.getIn(['values', 0], ['']) : c.get('values', '');
            formValues = formValues.set(c.get('name'), val);
          } else {
            if (c.get('rawValues') !== undefined) {
              formValues = formValues.set(c.get('name'), (0, _immutable.Map)({
                condition: c.get('comparator'),
                values: c.get('rawValues', (0, _immutable.List)())
              }));
            } else {
              formValues = formValues.set(c.get('name'), (0, _immutable.Map)({
                condition: c.get('comparator'),
                values: c.get('values', (0, _immutable.List)())
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
      return convertQueryToFormValues(query, clearExistingValues, _this.props.formValues, _this.state.formSchema);
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

      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        var _context3;

        return (0, _find.default)(_context3 = (0, _immutable.List)(formSchema.jsonschema.layout)).call(_context3, function (row) {
          return row.config.name === key;
        });
      } else {
        return undefined;
      }
    });
    _this.state = {
      formSchema: (0, _Utils.convertFormSchemaToSearch)(props.formSchema)
    };
    return _this;
  }

  (0, _createClass2.default)(_ConditionalTableContainer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      if ((0, _keys.default)(props.formSchema).length !== (0, _keys.default)(this.state.formSchema).length) {
        this.setState({
          formSchema: (0, _Utils.convertFormSchemaToSearch)(props.formSchema)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_ConditionalTable.default, (0, _extends2.default)({
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
      }, this.props));
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