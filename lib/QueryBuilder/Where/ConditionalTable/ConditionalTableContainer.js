'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertQueryToFormValues = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _immutable = require('immutable');

var _ConditionalTable = require('./ConditionalTable');

var _ConditionalTable2 = _interopRequireDefault(_ConditionalTable);

var _index = require('../../../index');

var _Utils = require('../../Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var getDefaultCondition = function getDefaultCondition(inputType) {
  var i = 0;
  var max = _index.CONDITIONS.length;
  while (i < max) {
    if (!(0, _immutable.Set)(_index.CONDITIONS[i].invalidInputTypes).has(inputType)) {
      return Object.keys(_index.CONDITIONS)[i];
    }
    i++;
  }
  return ''; // no conditions are valid for this input type ??? you shouldnt get here.
};
var getFieldSchema = function getFieldSchema(key, formSchema) {
  if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
    formSchema = (0, _Utils.convertFormSchemaToSearch)(formSchema);
    return (0, _immutable.List)(formSchema.jsonschema.layout).find(function (row) {
      return row.config.name === key;
    });
  } else {
    return undefined;
  }
};
var convertQueryToFormValues = exports.convertQueryToFormValues = function convertQueryToFormValues(query) {
  var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var fValues = arguments[2];
  var formSchema = arguments[3];

  var formValues = (0, _immutable.fromJS)(fValues);
  if (query) {
    // clear previous formValues
    if (clearExistingValues) {
      formValues.forEach(function (v, k) {
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
    }
    // put query into form values
    if (query.query) {
      query = query.query;
    }
    if (query.conditions) {
      (0, _immutable.fromJS)(query.conditions).forEach(function (c) {
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

var _ConditionalTableContainer = function (_Component) {
  _inherits(_ConditionalTableContainer, _Component);

  function _ConditionalTableContainer(props) {
    _classCallCheck(this, _ConditionalTableContainer);

    var _this = _possibleConstructorReturn(this, (_ConditionalTableContainer.__proto__ || Object.getPrototypeOf(_ConditionalTableContainer)).call(this, props));

    _this.convertQueryToFormValues = function (query) {
      var clearExistingValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      return convertQueryToFormValues(query, clearExistingValues, _this.props.formValues, _this.state.formSchema);
    };

    _this.getDefaultCondition = function (inputType) {
      var i = 0;
      var max = _index.CONDITIONS.length;
      while (i < max) {
        if (!(0, _immutable.Set)(_index.CONDITIONS[i].invalidInputTypes).has(inputType)) {
          return Object.keys(_index.CONDITIONS)[i];
        }
        i++;
      }
      return ''; // no conditions are valid for this input type ??? you shouldnt get here.
    };

    _this.getFieldSchema = function (key) {
      var formSchema = _this.state.formSchema;
      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        return (0, _immutable.List)(formSchema.jsonschema.layout).find(function (row) {
          return row.config.name === key;
        });
      } else {
        return undefined;
      }
    };

    _this.state = {
      formSchema: (0, _Utils.convertFormSchemaToSearch)(props.formSchema)
    };
    return _this;
  }

  _createClass(_ConditionalTableContainer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(props) {
      if (Object.keys(props.formSchema).length !== Object.keys(this.state.formSchema).length) {
        this.setState({ formSchema: (0, _Utils.convertFormSchemaToSearch)(props.formSchema) });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_ConditionalTable2.default, _extends({
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

_ConditionalTableContainer.propTypes = {
  formSchema: _propTypes2.default.object.isRequired,
  formValues: _propTypes2.default.object.isRequired,
  handleFormValueChange: _propTypes2.default.func.isRequired,
  primaryButtonClass: _propTypes2.default.string,
  enableResetButton: _propTypes2.default.bool,
  onNextClick: _propTypes2.default.func,
  enableNextButton: _propTypes2.default.bool,
  onQueryChange: _propTypes2.default.func,
  title: _propTypes2.default.string,
  enableToggle: _propTypes2.default.bool,
  enableDelete: _propTypes2.default.bool,
  onToggleChange: _propTypes2.default.func,
  enableListToggle: _propTypes2.default.bool
};
_ConditionalTableContainer.defaultProps = {
  enableResetButton: false,
  enableNextButton: false,
  enableToggle: true,
  enableDelete: true
};
exports.default = (0, _reactRedux.connect)(null, null, null, { withRef: true })(_ConditionalTableContainer);