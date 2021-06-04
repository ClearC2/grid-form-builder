"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _immutable = require("immutable");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Toggle = _interopRequireDefault(require("./Toggle"));

var _index = require("../../../index");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context21; (0, _forEach.default)(_context21 = ownKeys(Object(source), true)).call(_context21, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context22; (0, _forEach.default)(_context22 = ownKeys(Object(source))).call(_context22, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var X_ICON_CLASS = 'icon-close pull-right pointer';

var ConditionalTable =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConditionalTable, _Component);

  function ConditionalTable(props) {
    var _context18;

    var _this;

    (0, _classCallCheck2.default)(this, ConditionalTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConditionalTable).call(this, props));
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "buildMultiString", function (key, value) {
      var exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var rawValue = arguments.length > 3 ? arguments[3] : undefined;
      var valString = '';

      if (value) {
        if (typeof value === 'string') {
          var splitVal = value.split('¤');

          if (splitVal.length > 1) {
            value = splitVal;
          } else {
            value = [value];
          }
        } else if ((0, _typeof2.default)(value) === 'object') {
          if (typeof value[0] === 'string' && value[0].split('¤').length > 1) {
            value = value[0].split('¤');
          } else {
            value = (0, _map.default)(value).call(value, function (v) {
              return v ? v.label || v : '';
            });
          }
        }

        var i = value.length;
        var cond = _this.getConditionValue(rawValue) || 'contains';

        if (i > _index.CONDITIONS[cond].maxFields) {
          var _context;

          value = (0, _slice.default)(_context = (0, _immutable.List)(value)).call(_context, 0, _index.CONDITIONS[cond].maxFields).toJS();
        }

        i = value.length;

        if (value && (0, _forEach.default)(value)) {
          (0, _forEach.default)(value).call(value, function (val) {
            if ((0, _typeof2.default)(val) === 'object') {
              if ((0, _values.default)(val)) {
                val = (0, _values.default)(val);
              } else {
                val = val.label || val;
              }
            }

            valString = valString + val + (i > 1 ? ', ' : '');
            i--;
          });
        }

        return "".concat(exclude ? ' (exclude) ' : '') + ' ' + _this.getConditionValue(rawValue) + ' ' + valString;
      } else {
        return '';
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "getLabel", function (key) {
      var _this$props$formSchem = _this.props.formSchema,
          formSchema = _this$props$formSchem === void 0 ? {} : _this$props$formSchem;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        var fieldSchema = _this.props.getFieldSchema(key);

        var name = '';

        if (fieldSchema) {
          name = fieldSchema.config.label || fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.label;
        }

        return name || '';
      } else {
        return 'No Key in schema';
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "getFormat", function (key) {
      var _this$props$formSchem2 = _this.props.formSchema,
          formSchema = _this$props$formSchem2 === void 0 ? {} : _this$props$formSchem2;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();

      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        var fieldSchema = _this.props.getFieldSchema(key);

        var format = '';
        var type = '';

        if (fieldSchema) {
          format = fieldSchema.config.format || fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.format;
          type = fieldSchema.config.type || fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.type;

          if (!format && (type === 'date' || type === 'datetime')) {
            format = type;
          }
        }

        return format || '';
      }

      return '';
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "getNewValue", function (value, key) {
      var rawValues;
      var newValue = (0, _immutable.List)();

      if (typeof value === 'string') {
        if (value !== '') {
          var splitVal = value.split('¤');

          if (splitVal.length > 1) {
            newValue = (0, _immutable.List)(splitVal);
          } else {
            newValue = (0, _immutable.List)([value]);
          }
        }
      } else if ((0, _typeof2.default)(value) === 'object' && value.condition === undefined) {
        if (!value.type && !(0, _values.default)(value)) {
          newValue = (0, _immutable.List)(value);
        } else {
          newValue = (0, _immutable.List)((0, _values.default)(value));
        }
      } else {
        if ((0, _typeof2.default)((0, _values.default)(value)[0]) === 'object') {
          var _context2;

          // for typeaheads
          rawValues = (0, _values.default)(value);
          var ids = (0, _map.default)(_context2 = (0, _values.default)(value)).call(_context2, function (obj) {
            return obj.value;
          });
          newValue = (0, _immutable.List)(ids);
        } else if (typeof (0, _values.default)(value)[0] === 'string') {
          // inputs
          if (typeof (0, _values.default)(value) === 'string') {
            var _splitVal = (0, _values.default)(value).split('¤');

            if (_splitVal.length > 1) {
              newValue = (0, _immutable.List)(_splitVal);
            } else {
              newValue = (0, _immutable.List)((0, _values.default)(value));
            }
          } else {
            newValue = (0, _immutable.List)((0, _values.default)(value));
          }
        }
      }

      return {
        newValue: newValue,
        rawValues: rawValues
      };
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "buildRequest", function () {
      var _context3;

      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      var req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };
      (0, _forEach.default)(_context3 = (0, _immutable.Map)(formValues)).call(_context3, function (value, key) {
        var newValue;
        var rawValues;

        if (!value.type) {
          var resp = _this.getNewValue(value, key);

          newValue = resp.newValue;
          rawValues = resp.rawValues;
        }

        if (newValue && (newValue.size > 0 || _this.state.noValueConditions.has(value.condition) || value.dynamicValues)) {
          var cond = 'contains';

          if (formValues[key] && formValues[key].condition) {
            cond = formValues[key].condition;
          }

          if (newValue.size > _index.CONDITIONS[cond].maxFields) {
            newValue = (0, _slice.default)(newValue).call(newValue, 0, _index.CONDITIONS[cond].maxFields);
          } // https://github.com/ClearC2/bleu/issues/4734


          if (cond === 'is between') {
            req.query.conditions.push({
              name: key,
              values: [newValue.get('0', '')],
              comparator: 'is greater than',
              mergeDate: true
            });
            req.query.conditions.push({
              name: key,
              values: [newValue.get('1', '')],
              comparator: 'is less than',
              mergeDate: true
            });
          } else {
            req.query.conditions.push({
              name: key,
              label: _this.getLabel(key),
              comparator: cond,
              values: newValue,
              dynamicValues: value.dynamicValues,
              rawValues: rawValues,
              not: value.not || false,
              format: _this.getFormat(key)
            });
          }
        } else if (value.type) {
          var _context4;

          var newValues = [];
          (0, _forEach.default)(_context4 = value.conditions).call(_context4, function (v) {
            var _this$getNewValue = _this.getNewValue(v, key),
                newValue = _this$getNewValue.newValue,
                rawValues = _this$getNewValue.rawValues;

            if (newValue.size > 0 || _this.state.noValueConditions.has(v.condition) || v.dynamicValues || _this.state.noValueConditions.has(v.comparator)) {
              var _cond = 'contains';

              if (v && v.condition) {
                _cond = v.condition;
              }

              if (v && v.comparator) {
                _cond = v.comparator;
              }

              if (newValue.size > _index.CONDITIONS[_cond].maxFields) {
                newValue = (0, _slice.default)(newValue).call(newValue, 0, _index.CONDITIONS[_cond].maxFields);
              } // https://github.com/ClearC2/bleu/issues/4734


              if (_cond === 'is between') {
                newValues.push({
                  name: key,
                  values: [newValue.get('0', '')],
                  comparator: 'is greater than',
                  mergeDate: true
                });
                newValues.push({
                  name: key,
                  values: [newValue.get('1', '')],
                  comparator: 'is less than',
                  mergeDate: true
                });
              } else {
                newValues.push({
                  name: key,
                  label: _this.getLabel(key),
                  comparator: _cond,
                  values: newValue,
                  dynamicValues: value.dynamicValues,
                  rawValues: rawValues,
                  not: v.not || false,
                  format: _this.getFormat(key)
                });
              }
            }
          });
          value.conditions = newValues;
          req.query.conditions.push(value);
        }
      });
      return req;
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "onNextClick", function () {
      var req = _this.buildRequest();

      if (_this.props.onNextClick) {
        _this.props.onNextClick(req);
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "handleToggleClick", function (e) {
      if (_this.props.enableToggle) {
        if (e) {
          _this.setState({
            conditionType: 'or'
          });

          if (_this.props.onToggleChange) {
            _this.props.onToggleChange('or');
          }
        } else {
          _this.setState({
            conditionType: 'and'
          });

          if (_this.props.onToggleChange) {
            _this.props.onToggleChange('and');
          }
        }
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "resetForm", function () {
      var _context5;

      var formValues = _this.prop.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      (0, _map.default)(_context5 = (0, _keys.default)(formValues)).call(_context5, function (key) {
        var schema = _this.props.getFieldSchema(key);

        if (schema && schema.config && (schema.config.type === 'textarea' || schema.config.type === 'checkbox' || schema.config.type === 'radio')) {
          _this.props.handleOnChange({
            target: {
              name: key,
              value: ''
            }
          });
        } else {
          _this.props.handleOnChange({
            target: {
              name: key,
              value: (0, _immutable.Map)({
                condition: _this.props.getDefaultCondition(schema.config.type),
                values: (0, _immutable.List)()
              })
            }
          });
        }
      });
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "handleRemoveConditionClick", function (e, key, predicateIndex) {
      var schema = _this.props.getFieldSchema(key);

      if (schema && schema.config && (schema.config.type === 'textarea' || schema.config.type === 'checkbox' || schema.config.type === 'radio')) {
        _this.props.handleOnChange({
          target: {
            name: key,
            value: ''
          }
        });
      } else {
        if (predicateIndex >= 0) {
          var _context6;

          var predicate = _this.props.formValues[key];
          var newConditions = [];
          (0, _forEach.default)(_context6 = predicate.conditions).call(_context6, function (c, i) {
            if (i !== predicateIndex) {
              newConditions.push(c);
            }
          });

          if (newConditions.length === 0) {
            _this.props.handleOnChange({
              target: {
                name: key,
                value: (0, _immutable.Map)({
                  condition: _this.props.getDefaultCondition(schema.config.type),
                  values: (0, _immutable.List)()
                })
              }
            });
          } else if (newConditions.length === 1) {
            _this.props.handleOnChange({
              target: {
                name: key,
                value: predicate.conditions[0]
              }
            });
          } else {
            predicate.conditions = newConditions;

            _this.props.handleOnChange({
              target: {
                name: key,
                value: predicate
              }
            });
          }
        } else {
          _this.props.handleOnChange({
            target: {
              name: key,
              value: (0, _immutable.Map)({
                condition: _this.props.getDefaultCondition(schema.config.type),
                values: (0, _immutable.List)()
              })
            }
          });
        }
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "renderDeleteIcon", function (key, value, predicateIndex) {
      if (_this.props.enableDelete) {
        return _react.default.createElement("i", {
          id: 'deleteIcon',
          className: X_ICON_CLASS,
          style: {
            color: '#8c0000',
            marginTop: '3px'
          },
          onClick: function onClick(e) {
            _this.handleRemoveConditionClick(e, key, predicateIndex);

            e.preventDefault();
          }
        });
      } else {
        return null;
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "getConditionValue", function (rawValue) {
      if (rawValue && rawValue.condition) {
        return rawValue.condition;
      } else {
        return 'contains';
      }
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "getFieldType", function (fieldName) {
      var _context7;

      var _this$props$formSchem3 = _this.props.formSchema,
          formSchema = _this$props$formSchem3 === void 0 ? {} : _this$props$formSchem3;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      var type = '';
      (0, _forEach.default)(_context7 = formSchema.jsonschema.layout).call(_context7, function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });
      return type;
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "buildTableRow", function (key, value) {
      var predicateIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var extraCondRowStyles = {};
      var rowClick;

      if (_this.props.conditionRowOnClick) {
        extraCondRowStyles = _objectSpread({}, extraCondRowStyles, {
          cursor: 'pointer'
        });

        rowClick = function rowClick(e) {
          if (e.target.id !== 'deleteIcon') {
            _this.props.conditionRowOnClick(key, value);
          }
        };
      }

      if (value && _this.state.noValueConditions.has(value.condition)) {
        var _context8, _context9;

        return _react.default.createElement("tr", {
          key: (0, _concat.default)(_context8 = "row-".concat(key, "-")).call(_context8, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, _react.default.createElement("td", {
          key: (0, _concat.default)(_context9 = "column-".concat(key, "-")).call(_context9, predicateIndex),
          style: {
            wordWrap: 'break-word'
          }
        }, _react.default.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', value.condition, _this.renderDeleteIcon(key, value, predicateIndex)));
      }

      if (value && typeof value === 'string') {
        var _context10, _context11;

        // raw inputs
        var val = value;

        if (_this.getFieldType(key) === 'checkbox') {
          if (val === '0' || val === 0) {
            val = 'false';
          } else {
            val = 'true';
          }
        }

        return (// for basic input
          _react.default.createElement("tr", {
            key: (0, _concat.default)(_context10 = "row-".concat(key, "-")).call(_context10, predicateIndex),
            style: _objectSpread({}, extraCondRowStyles),
            onClick: rowClick
          }, _react.default.createElement("td", {
            key: (0, _concat.default)(_context11 = "column-".concat(key, "-")).call(_context11, predicateIndex),
            style: {
              wordWrap: 'break-word'
            }
          }, _react.default.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', "contains ", val, _this.renderDeleteIcon(key, value, predicateIndex)))
        );
      } else if (typeof value === 'boolean') {
        var _context12, _context13;

        return _react.default.createElement("tr", {
          key: (0, _concat.default)(_context12 = "row-".concat(key, "-")).call(_context12, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, _react.default.createElement("td", {
          key: (0, _concat.default)(_context13 = "column-".concat(key, "-")).call(_context13, predicateIndex)
        }, _react.default.createElement("strong", null, _this.getLabel(key), " "), "is ", value ? 'True' : 'False', _this.renderDeleteIcon(key, value, predicateIndex)));
      } else {
        var _context14, _context15, _context16, _context17;

        if ((0, _values.default)(value) && (0, _values.default)(value).length === 0 && (!value.dynamicValues || value.dynamicValues && value.dynamicValues.length === 0)) {
          return null;
        }

        return _react.default.createElement("tr", {
          key: (0, _concat.default)(_context14 = "row-".concat(key, "-")).call(_context14, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, _react.default.createElement("td", {
          key: (0, _concat.default)(_context15 = "column-".concat(key, "-")).call(_context15, predicateIndex)
        }, _react.default.createElement("strong", null, _this.getLabel(key)), _this.buildMultiString(key, (0, _concat.default)(_context16 = (0, _values.default)(value)).call(_context16, value.dynamicValues || []), value.not, value), _this.renderDeleteIcon(key, (0, _concat.default)(_context17 = (0, _values.default)(value)).call(_context17, value.dynamicValues || []), predicateIndex)));
      }
    });
    var noValueConditions = [];
    (0, _forEach.default)(_context18 = (0, _keys.default)(_index.CONDITIONS)).call(_context18, function (k) {
      if (_index.CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k);
      }
    });
    _this.state = {
      conditionType: props.initToggleValue || 'and',
      noValueConditions: (0, _immutable.Set)(noValueConditions),
      showEditReportFieldsModal: false,
      listOpen: true
    };
    return _this;
  }

  (0, _createClass2.default)(ConditionalTable, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(props) {
      // eslint-disable-line
      if (this.props.formValues !== props.formValues) {
        if (this.props.onQueryChange) {
          var query = this.buildRequest(this.props.formValues);
          this.props.onQueryChange(query);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _context19,
          _this2 = this;

      var _this$props$formValue = this.props.formValues,
          formValues = _this$props$formValue === void 0 ? {} : _this$props$formValue;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      var singleRows = (0, _sort.default)(_context19 = (0, _keys.default)(formValues)).call(_context19, function (a, b) {
        if (_this2.getLabel(a) === undefined || _this2.getLabel(b) === undefined) {
          return 0;
        }

        return _this2.getLabel(a).localeCompare(_this2.getLabel(b));
      });
      var tbody = [];
      (0, _forEach.default)(singleRows).call(singleRows, function (key) {
        if (_this2.props.formValues[key]) {
          if (_this2.props.formValues[key].type) {
            var _context20;

            (0, _forEach.default)(_context20 = _this2.props.formValues[key].conditions).call(_context20, function (v, predicateIndex) {
              tbody.push(_this2.buildTableRow(key, v, predicateIndex));
            });
          } else {
            tbody.push(_this2.buildTableRow(key, _this2.props.formValues[key]));
          }
        }
      });
      var isDisabled = this.buildRequest(this.props.formValues).query.conditions.length === 0;
      var listOpen = this.state.listOpen;
      var extraFooters = this.props.extraFooters ? this.props.extraFooters : [];
      return _react.default.createElement("div", {
        className: "table-responsive",
        style: {
          width: '100%',
          maxHeight: '620px'
        }
      }, _react.default.createElement("div", {
        style: {
          width: '100%',
          maxHeight: '550px',
          overflowY: 'auto'
        }
      }, _react.default.createElement("table", {
        className: "table table-bordered table-striped",
        style: {
          width: '100%'
        }
      }, _react.default.createElement("thead", null, _react.default.createElement("tr", null, _react.default.createElement("th", {
        className: "col-lg-".concat(6, " col-md-", 6, " col-sm-", 6),
        style: {
          display: 'inlineBlock'
        }
      }, _react.default.createElement("span", null, this.props.title), _react.default.createElement("span", {
        className: "pull-right"
      }, _react.default.createElement(_Toggle.default, {
        ref: "row-toggle",
        value: this.props.toggleValue === 'and',
        onToggle: this.handleToggleClick,
        activeLabel: "and",
        inactiveLabel: "or"
      }))))), tbody.length && listOpen ? _react.default.createElement("tbody", null, tbody) : null, this.props.enableListToggle && _react.default.createElement("div", {
        style: {
          width: '100%',
          textAlign: 'center',
          transform: "scale(1, ".concat(listOpen ? '' : '-', "1)"),
          userSelect: 'none'
        },
        className: "cursor-hand",
        onClick: function onClick() {
          return _this2.setState(function () {
            return {
              listOpen: !listOpen
            };
          });
        }
      }, "^"), _react.default.createElement("tfoot", null, _react.default.createElement("tr", null, _react.default.createElement("td", null, this.props.enableResetButton || this.props.enableNextButton ? _react.default.createElement("div", {
        style: {
          marginRight: '10px',
          marginBottom: '10px',
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'row-reverse',
          width: '100%'
        }
      }, this.props.enableResetButton && _react.default.createElement("button", {
        className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
        style: {
          marginRight: '10px',
          marginBottom: '10px'
        },
        onClick: this.resetForm,
        disabled: isDisabled
      }, "Reset"), this.props.enableNextButton && _react.default.createElement("button", {
        className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
        style: {
          marginRight: '10px',
          marginBottom: '10px'
        },
        onClick: this.onNextClick,
        disabled: isDisabled
      }, "Next"), extraFooters) : null))))));
    }
  }]);
  return ConditionalTable;
}(_react.Component);

exports.default = ConditionalTable;
(0, _defineProperty3.default)(ConditionalTable, "propTypes", {
  formValues: _propTypes.default.object.isRequired,
  onNextClick: _propTypes.default.func.isRequired,
  formSchema: _propTypes.default.object,
  extraFooters: _propTypes.default.array,
  handleOnChange: _propTypes.default.func,
  title: _propTypes.default.string,
  primaryButtonClass: _propTypes.default.string,
  enableResetButton: _propTypes.default.bool,
  enableNextButton: _propTypes.default.bool,
  enableToggle: _propTypes.default.bool,
  toggleValue: _propTypes.default.string,
  initToggleValue: _propTypes.default.string,
  onToggleChange: _propTypes.default.func,
  enableDelete: _propTypes.default.bool,
  onQueryChange: _propTypes.default.func,
  getDefaultCondition: _propTypes.default.func,
  conditionRowOnClick: _propTypes.default.func,
  getFieldSchema: _propTypes.default.func,
  enableListToggle: _propTypes.default.bool
});
(0, _defineProperty3.default)(ConditionalTable, "defaultProps", {
  formValues: {},
  enableToggle: true,
  enableDelete: true,
  toggleValue: 'and',
  enableListToggle: false
});