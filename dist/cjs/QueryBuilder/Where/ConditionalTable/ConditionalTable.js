"use strict";

var _typeof3 = require("@babel/runtime-corejs3/helpers/typeof");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$keys2 = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _immutable = require("immutable");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Toggle = _interopRequireDefault(require("./Toggle"));

var _index = require("../../../index");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys2(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context22, _context23; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty2(_context22 = ownKeys(Object(source), !0)).call(_context22, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty2(_context23 = ownKeys(Object(source))).call(_context23, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var X_ICON_CLASS = 'icon-close pull-right pointer';

var ConditionalTable = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ConditionalTable, _Component);

  var _super = _createSuper(ConditionalTable);

  function ConditionalTable(props) {
    var _context19;

    var _this;

    (0, _classCallCheck2.default)(this, ConditionalTable);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildMultiString", function (key, value) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getLabel", function (key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getFormat", function (key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getNewValue", function (value, key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildRequest", function () {
      var _context3, _context4;

      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      var req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };
      (0, _forEach.default)(_context3 = (0, _filter.default)(_context4 = (0, _immutable.Map)(formValues)).call(_context4, function (val) {
        return !!val;
      })).call(_context3, function (value, key) {
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
              fieldSchema: _this.props.getFieldSchema(key),
              name: key,
              values: [newValue.get('0', '')],
              comparator: 'is greater than',
              mergeDate: true
            });
            req.query.conditions.push({
              fieldSchema: _this.props.getFieldSchema(key),
              name: key,
              values: [newValue.get('1', '')],
              comparator: 'is less than',
              mergeDate: true
            });
          } else {
            var query = {
              fieldSchema: _this.props.getFieldSchema(key),
              name: key,
              label: _this.getLabel(key),
              comparator: cond,
              values: newValue,
              dynamicValues: value.dynamicValues,
              rawValues: rawValues,
              not: value.not || false,
              format: _this.getFormat(key)
            };

            if (value.isfield) {
              query.isfield = value.isfield;
            }

            req.query.conditions.push(query);
          }
        } else if (value.type) {
          var _context5;

          var newValues = [];
          (0, _forEach.default)(_context5 = value.conditions).call(_context5, function (v) {
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
                  fieldSchema: _this.props.getFieldSchema(key),
                  name: key,
                  values: [newValue.get('0', '')],
                  comparator: 'is greater than',
                  mergeDate: true
                });
                newValues.push({
                  fieldSchema: _this.props.getFieldSchema(key),
                  name: key,
                  values: [newValue.get('1', '')],
                  comparator: 'is less than',
                  mergeDate: true
                });
              } else {
                newValues.push({
                  fieldSchema: _this.props.getFieldSchema(key),
                  name: key,
                  label: _this.getLabel(key),
                  comparator: _cond,
                  values: newValue,
                  dynamicValues: v.dynamicValues || value.dynamicValues,
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onNextClick", function () {
      var req = _this.buildRequest();

      if (_this.props.onNextClick) {
        _this.props.onNextClick(req);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleToggleClick", function (e) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "resetForm", function () {
      var _context6;

      var formValues = _this.prop.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      (0, _map.default)(_context6 = (0, _keys.default)(formValues)).call(_context6, function (key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleRemoveConditionClick", function (e, key, predicateIndex) {
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
          var _context7;

          var predicate = _this.props.formValues[key];
          var newConditions = [];
          (0, _forEach.default)(_context7 = predicate.conditions).call(_context7, function (c, i) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderDeleteIcon", function (key, value, predicateIndex) {
      if (_this.props.enableDelete) {
        return /*#__PURE__*/_react.default.createElement("i", {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getConditionValue", function (rawValue) {
      if (rawValue && rawValue.condition) {
        return rawValue.condition;
      } else {
        return 'contains';
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getFieldType", function (fieldName) {
      var _context8;

      var _this$props$formSchem3 = _this.props.formSchema,
          formSchema = _this$props$formSchem3 === void 0 ? {} : _this$props$formSchem3;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      var type = '';
      (0, _forEach.default)(_context8 = formSchema.jsonschema.layout).call(_context8, function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });
      return type;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildTableRow", function (key, value) {
      var predicateIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      var extraCondRowStyles = {};
      var rowClick;

      if (_this.props.conditionRowOnClick) {
        extraCondRowStyles = _objectSpread(_objectSpread({}, extraCondRowStyles), {}, {
          cursor: 'pointer'
        });

        rowClick = function rowClick(e) {
          if (e.target.id !== 'deleteIcon') {
            _this.props.conditionRowOnClick(key, value);
          }
        };
      }

      if (value && _this.state.noValueConditions.has(value.condition)) {
        var _context9, _context10;

        return /*#__PURE__*/_react.default.createElement("div", {
          key: (0, _concat.default)(_context9 = "row-".concat(key, "-")).call(_context9, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/_react.default.createElement("div", {
          key: (0, _concat.default)(_context10 = "column-".concat(key, "-")).call(_context10, predicateIndex),
          style: {
            wordWrap: 'break-word'
          }
        }, /*#__PURE__*/_react.default.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', value.condition, _this.renderDeleteIcon(key, value, predicateIndex)));
      }

      if (value && typeof value === 'string') {
        var _context11, _context12;

        // raw inputs
        var val = value;

        if (_this.getFieldType(key) === 'checkbox') {
          if (val === '0' || val === 0) {
            val = 'false';
          } else {
            val = 'true';
          }
        }

        return (
          /*#__PURE__*/
          // for basic input
          _react.default.createElement("div", {
            key: (0, _concat.default)(_context11 = "row-".concat(key, "-")).call(_context11, predicateIndex),
            style: _objectSpread({}, extraCondRowStyles),
            onClick: rowClick
          }, /*#__PURE__*/_react.default.createElement("div", {
            key: (0, _concat.default)(_context12 = "column-".concat(key, "-")).call(_context12, predicateIndex),
            style: {
              wordWrap: 'break-word'
            }
          }, /*#__PURE__*/_react.default.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', "contains ", val, _this.renderDeleteIcon(key, value, predicateIndex)))
        );
      } else if (typeof value === 'boolean') {
        var _context13, _context14;

        return /*#__PURE__*/_react.default.createElement("div", {
          key: (0, _concat.default)(_context13 = "row-".concat(key, "-")).call(_context13, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/_react.default.createElement("div", {
          key: (0, _concat.default)(_context14 = "column-".concat(key, "-")).call(_context14, predicateIndex)
        }, /*#__PURE__*/_react.default.createElement("strong", null, _this.getLabel(key), " "), "is ", value ? 'True' : 'False', _this.renderDeleteIcon(key, value, predicateIndex)));
      } else {
        var _context15, _context16, _context17, _context18;

        if ((0, _values.default)(value) && (0, _values.default)(value).length === 0 && (!value.dynamicValues || value.dynamicValues && value.dynamicValues.length === 0)) {
          return null;
        }

        return /*#__PURE__*/_react.default.createElement("div", {
          key: (0, _concat.default)(_context15 = "row-".concat(key, "-")).call(_context15, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/_react.default.createElement("div", {
          key: (0, _concat.default)(_context16 = "column-".concat(key, "-")).call(_context16, predicateIndex)
        }, /*#__PURE__*/_react.default.createElement("strong", null, _this.getLabel(key)), _this.buildMultiString(key, (0, _concat.default)(_context17 = (0, _values.default)(value)).call(_context17, value.dynamicValues || []), value.not, value), _this.renderDeleteIcon(key, (0, _concat.default)(_context18 = (0, _values.default)(value)).call(_context18, value.dynamicValues || []), predicateIndex)));
      }
    });
    var noValueConditions = [];
    (0, _forEach.default)(_context19 = (0, _keys.default)(_index.CONDITIONS)).call(_context19, function (k) {
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
      var _context20,
          _this2 = this;

      var _this$props$formValue = this.props.formValues,
          formValues = _this$props$formValue === void 0 ? {} : _this$props$formValue;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      var singleRows = (0, _sort.default)(_context20 = (0, _keys.default)(formValues)).call(_context20, function (a, b) {
        if (_this2.getLabel(a) === undefined || _this2.getLabel(b) === undefined) {
          return 0;
        }

        return _this2.getLabel(a).localeCompare(_this2.getLabel(b));
      });
      var tbody = [];
      (0, _forEach.default)(singleRows).call(singleRows, function (key) {
        if (_this2.props.formValues[key]) {
          if (_this2.props.formValues[key].type) {
            var _context21;

            (0, _forEach.default)(_context21 = _this2.props.formValues[key].conditions).call(_context21, function (v, predicateIndex) {
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
      return /*#__PURE__*/_react.default.createElement("div", {
        className: "report-condition-table-container"
      }, /*#__PURE__*/_react.default.createElement("div", {
        className: "report-condition-table-header"
      }, /*#__PURE__*/_react.default.createElement("span", null, this.props.title), /*#__PURE__*/_react.default.createElement("span", {
        className: "pull-right"
      }, /*#__PURE__*/_react.default.createElement(_Toggle.default, {
        ref: "row-toggle",
        value: this.props.toggleValue === 'and',
        onToggle: this.handleToggleClick,
        activeLabel: "and",
        inactiveLabel: "or"
      }))), tbody.length && listOpen ? /*#__PURE__*/_react.default.createElement("div", {
        className: "report-condition-table-rows-container"
      }, tbody) : null, this.props.enableListToggle ? /*#__PURE__*/_react.default.createElement("div", {
        style: {
          transform: "scale(1, ".concat(listOpen ? '' : '-', "1)")
        },
        className: "cursor-hand report-condition-list-toggle",
        onClick: function onClick() {
          return _this2.setState(function () {
            return {
              listOpen: !listOpen
            };
          });
        }
      }, "^") : null, this.props.enableResetButton || this.props.enableNextButton ? /*#__PURE__*/_react.default.createElement("div", {
        className: "report-condition-table-footer"
      }, this.props.enableResetButton ? /*#__PURE__*/_react.default.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.resetForm,
        disabled: isDisabled
      }, "Reset") : null, this.props.enableNextButton ? /*#__PURE__*/_react.default.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.onNextClick,
        disabled: isDisabled
      }, "Next") : null, extraFooters) : null);
    }
  }]);
  return ConditionalTable;
}(_react.Component);

exports.default = ConditionalTable;
(0, _defineProperty2.default)(ConditionalTable, "propTypes", {
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
(0, _defineProperty2.default)(ConditionalTable, "defaultProps", {
  formValues: {},
  enableToggle: true,
  enableDelete: true,
  toggleValue: 'and',
  enableListToggle: false
});