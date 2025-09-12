import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context22, _context23; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context22 = ownKeys(Object(source), !0)).call(_context22, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context23 = ownKeys(Object(source))).call(_context23, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

import React, { Component } from 'react';
import { Map, List, Set } from 'immutable';
import PropTypes from 'prop-types';
import Toggle from './Toggle';
import { CONDITIONS } from '../../../index';
var X_ICON_CLASS = 'icon-close pull-right pointer';

var ConditionalTable = /*#__PURE__*/function (_Component) {
  _inherits(ConditionalTable, _Component);

  var _super = _createSuper(ConditionalTable);

  function ConditionalTable(props) {
    var _context19;

    var _this;

    _classCallCheck(this, ConditionalTable);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "buildMultiString", function (key, value) {
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
        } else if (_typeof(value) === 'object') {
          if (typeof value[0] === 'string' && value[0].split('¤').length > 1) {
            value = value[0].split('¤');
          } else {
            value = _mapInstanceProperty(value).call(value, function (v) {
              return v ? v.label || v : '';
            });
          }
        }

        var i = value.length;
        var cond = _this.getConditionValue(rawValue) || 'contains';

        if (i > CONDITIONS[cond].maxFields) {
          var _context;

          value = _sliceInstanceProperty(_context = List(value)).call(_context, 0, CONDITIONS[cond].maxFields).toJS();
        }

        i = value.length;

        if (value && _forEachInstanceProperty(value)) {
          _forEachInstanceProperty(value).call(value, function (val) {
            if (_typeof(val) === 'object') {
              if (_valuesInstanceProperty(val)) {
                val = _valuesInstanceProperty(val);
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

    _defineProperty(_assertThisInitialized(_this), "getLabel", function (key) {
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

    _defineProperty(_assertThisInitialized(_this), "getFormat", function (key) {
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

    _defineProperty(_assertThisInitialized(_this), "getNewValue", function (value, key) {
      var rawValues;
      var newValue = List();

      if (typeof value === 'string') {
        if (value !== '') {
          var splitVal = value.split('¤');

          if (splitVal.length > 1) {
            newValue = List(splitVal);
          } else {
            newValue = List([value]);
          }
        }
      } else if (_typeof(value) === 'object' && value.condition === undefined) {
        if (!value.type && !_valuesInstanceProperty(value)) {
          newValue = List(value);
        } else {
          newValue = List(_valuesInstanceProperty(value));
        }
      } else {
        if (_typeof(_valuesInstanceProperty(value)[0]) === 'object') {
          var _context2;

          // for typeaheads
          rawValues = _valuesInstanceProperty(value);

          var ids = _mapInstanceProperty(_context2 = _valuesInstanceProperty(value)).call(_context2, function (obj) {
            return obj.value;
          });

          newValue = List(ids);
        } else if (typeof _valuesInstanceProperty(value)[0] === 'string') {
          // inputs
          if (typeof _valuesInstanceProperty(value) === 'string') {
            var _splitVal = _valuesInstanceProperty(value).split('¤');

            if (_splitVal.length > 1) {
              newValue = List(_splitVal);
            } else {
              newValue = List(_valuesInstanceProperty(value));
            }
          } else {
            newValue = List(_valuesInstanceProperty(value));
          }
        }
      }

      return {
        newValue: newValue,
        rawValues: rawValues
      };
    });

    _defineProperty(_assertThisInitialized(_this), "buildRequest", function () {
      var _context3, _context4;

      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      var req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };

      _forEachInstanceProperty(_context3 = _filterInstanceProperty(_context4 = Map(formValues)).call(_context4, function (val) {
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

          if (newValue.size > CONDITIONS[cond].maxFields) {
            newValue = _sliceInstanceProperty(newValue).call(newValue, 0, CONDITIONS[cond].maxFields);
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

          _forEachInstanceProperty(_context5 = value.conditions).call(_context5, function (v) {
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

              if (newValue.size > CONDITIONS[_cond].maxFields) {
                newValue = _sliceInstanceProperty(newValue).call(newValue, 0, CONDITIONS[_cond].maxFields);
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

    _defineProperty(_assertThisInitialized(_this), "onNextClick", function () {
      var req = _this.buildRequest();

      if (_this.props.onNextClick) {
        _this.props.onNextClick(req);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleToggleClick", function (e) {
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

    _defineProperty(_assertThisInitialized(_this), "resetForm", function () {
      var _context6;

      var formValues = _this.prop.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();

      _mapInstanceProperty(_context6 = _Object$keys(formValues)).call(_context6, function (key) {
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
              value: Map({
                condition: _this.props.getDefaultCondition(schema.config.type),
                values: List()
              })
            }
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemoveConditionClick", function (e, key, predicateIndex) {
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

          _forEachInstanceProperty(_context7 = predicate.conditions).call(_context7, function (c, i) {
            if (i !== predicateIndex) {
              newConditions.push(c);
            }
          });

          if (newConditions.length === 0) {
            _this.props.handleOnChange({
              target: {
                name: key,
                value: Map({
                  condition: _this.props.getDefaultCondition(schema.config.type),
                  values: List()
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
              value: Map({
                condition: _this.props.getDefaultCondition(schema.config.type),
                values: List()
              })
            }
          });
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "renderDeleteIcon", function (key, value, predicateIndex) {
      if (_this.props.enableDelete) {
        return /*#__PURE__*/React.createElement("i", {
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

    _defineProperty(_assertThisInitialized(_this), "getConditionValue", function (rawValue) {
      if (rawValue && rawValue.condition) {
        return rawValue.condition;
      } else {
        return 'contains';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldType", function (fieldName) {
      var _context8;

      var _this$props$formSchem3 = _this.props.formSchema,
          formSchema = _this$props$formSchem3 === void 0 ? {} : _this$props$formSchem3;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      var type = '';

      _forEachInstanceProperty(_context8 = formSchema.jsonschema.layout).call(_context8, function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });

      return type;
    });

    _defineProperty(_assertThisInitialized(_this), "buildTableRow", function (key, value) {
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

        return /*#__PURE__*/React.createElement("div", {
          key: _concatInstanceProperty(_context9 = "row-".concat(key, "-")).call(_context9, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/React.createElement("div", {
          key: _concatInstanceProperty(_context10 = "column-".concat(key, "-")).call(_context10, predicateIndex),
          style: {
            wordWrap: 'break-word'
          }
        }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', value.condition, _this.renderDeleteIcon(key, value, predicateIndex)));
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
          React.createElement("div", {
            key: _concatInstanceProperty(_context11 = "row-".concat(key, "-")).call(_context11, predicateIndex),
            style: _objectSpread({}, extraCondRowStyles),
            onClick: rowClick
          }, /*#__PURE__*/React.createElement("div", {
            key: _concatInstanceProperty(_context12 = "column-".concat(key, "-")).call(_context12, predicateIndex),
            style: {
              wordWrap: 'break-word'
            }
          }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', "contains ", val, _this.renderDeleteIcon(key, value, predicateIndex)))
        );
      } else if (typeof value === 'boolean') {
        var _context13, _context14;

        return /*#__PURE__*/React.createElement("div", {
          key: _concatInstanceProperty(_context13 = "row-".concat(key, "-")).call(_context13, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/React.createElement("div", {
          key: _concatInstanceProperty(_context14 = "column-".concat(key, "-")).call(_context14, predicateIndex)
        }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key), " "), "is ", value ? 'True' : 'False', _this.renderDeleteIcon(key, value, predicateIndex)));
      } else {
        var _context15, _context16, _context17, _context18;

        if (_valuesInstanceProperty(value) && _valuesInstanceProperty(value).length === 0 && (!value.dynamicValues || value.dynamicValues && value.dynamicValues.length === 0)) {
          return null;
        }

        return /*#__PURE__*/React.createElement("div", {
          key: _concatInstanceProperty(_context15 = "row-".concat(key, "-")).call(_context15, predicateIndex),
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/React.createElement("div", {
          key: _concatInstanceProperty(_context16 = "column-".concat(key, "-")).call(_context16, predicateIndex)
        }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key)), _this.buildMultiString(key, _concatInstanceProperty(_context17 = _valuesInstanceProperty(value)).call(_context17, value.dynamicValues || []), value.not, value), _this.renderDeleteIcon(key, _concatInstanceProperty(_context18 = _valuesInstanceProperty(value)).call(_context18, value.dynamicValues || []), predicateIndex)));
      }
    });

    var noValueConditions = [];

    _forEachInstanceProperty(_context19 = _Object$keys(CONDITIONS)).call(_context19, function (k) {
      if (CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k);
      }
    });

    _this.state = {
      conditionType: props.initToggleValue || 'and',
      noValueConditions: Set(noValueConditions),
      showEditReportFieldsModal: false,
      listOpen: true
    };
    return _this;
  }

  _createClass(ConditionalTable, [{
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

      var singleRows = _sortInstanceProperty(_context20 = _Object$keys(formValues)).call(_context20, function (a, b) {
        if (_this2.getLabel(a) === undefined || _this2.getLabel(b) === undefined) {
          return 0;
        }

        return _this2.getLabel(a).localeCompare(_this2.getLabel(b));
      });

      var tbody = [];

      _forEachInstanceProperty(singleRows).call(singleRows, function (key) {
        if (_this2.props.formValues[key]) {
          if (_this2.props.formValues[key].type) {
            var _context21;

            _forEachInstanceProperty(_context21 = _this2.props.formValues[key].conditions).call(_context21, function (v, predicateIndex) {
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
      return /*#__PURE__*/React.createElement("div", {
        className: "report-condition-table-container"
      }, /*#__PURE__*/React.createElement("div", {
        className: "report-condition-table-header"
      }, /*#__PURE__*/React.createElement("span", null, this.props.title), /*#__PURE__*/React.createElement("span", {
        className: "pull-right"
      }, /*#__PURE__*/React.createElement(Toggle, {
        ref: "row-toggle",
        value: this.props.toggleValue === 'and',
        onToggle: this.handleToggleClick,
        activeLabel: "and",
        inactiveLabel: "or"
      }))), tbody.length && listOpen ? /*#__PURE__*/React.createElement("div", {
        className: "report-condition-table-rows-container"
      }, tbody) : null, this.props.enableListToggle ? /*#__PURE__*/React.createElement("div", {
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
      }, "^") : null, this.props.enableResetButton || this.props.enableNextButton ? /*#__PURE__*/React.createElement("div", {
        className: "report-condition-table-footer"
      }, this.props.enableResetButton ? /*#__PURE__*/React.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.resetForm,
        disabled: isDisabled
      }, "Reset") : null, this.props.enableNextButton ? /*#__PURE__*/React.createElement("button", {
        className: "btn btn-primary pull-right",
        onClick: this.onNextClick,
        disabled: isDisabled
      }, "Next") : null, extraFooters) : null);
    }
  }]);

  return ConditionalTable;
}(Component);

_defineProperty(ConditionalTable, "propTypes", {
  formValues: PropTypes.object.isRequired,
  onNextClick: PropTypes.func.isRequired,
  formSchema: PropTypes.object,
  extraFooters: PropTypes.array,
  handleOnChange: PropTypes.func,
  title: PropTypes.string,
  primaryButtonClass: PropTypes.string,
  enableResetButton: PropTypes.bool,
  enableNextButton: PropTypes.bool,
  enableToggle: PropTypes.bool,
  toggleValue: PropTypes.string,
  initToggleValue: PropTypes.string,
  onToggleChange: PropTypes.func,
  enableDelete: PropTypes.bool,
  onQueryChange: PropTypes.func,
  getDefaultCondition: PropTypes.func,
  conditionRowOnClick: PropTypes.func,
  getFieldSchema: PropTypes.func,
  enableListToggle: PropTypes.bool
});

_defineProperty(ConditionalTable, "defaultProps", {
  formValues: {},
  enableToggle: true,
  enableDelete: true,
  toggleValue: 'and',
  enableListToggle: false
});

export { ConditionalTable as default };