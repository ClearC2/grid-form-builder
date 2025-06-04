import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context12, _context13; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context12 = ownKeys(Object(t), !0)).call(_context12, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context13 = ownKeys(Object(t))).call(_context13, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
import React, { Component } from 'react';
import { Map, List, Set } from 'immutable';
import PropTypes from 'prop-types';
import Toggle from './Toggle';
import { CONDITIONS } from '../../../index';
const X_ICON_CLASS = 'icon-close pull-right pointer';
export default class ConditionalTable extends Component {
  constructor(props) {
    var _this, _context1;
    super(props);
    _this = this;
    _defineProperty(this, "buildMultiString", function (key, value) {
      let exclude = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      let rawValue = arguments.length > 3 ? arguments[3] : undefined;
      let valString = '';
      if (value) {
        if (typeof value === 'string') {
          const splitVal = value.split('¤');
          if (splitVal.length > 1) {
            value = splitVal;
          } else {
            value = [value];
          }
        } else if (typeof value === 'object') {
          if (typeof value[0] === 'string' && value[0].split('¤').length > 1) {
            value = value[0].split('¤');
          } else {
            value = _mapInstanceProperty(value).call(value, v => v ? v.label || v : '');
          }
        }
        let i = value.length;
        const cond = _this.getConditionValue(rawValue) || 'contains';
        if (i > CONDITIONS[cond].maxFields) {
          var _context;
          value = _sliceInstanceProperty(_context = List(value)).call(_context, 0, CONDITIONS[cond].maxFields).toJS();
        }
        i = value.length;
        if (value && _forEachInstanceProperty(value)) {
          _forEachInstanceProperty(value).call(value, val => {
            if (typeof val === 'object') {
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
        return `${exclude ? ' (exclude) ' : ''}` + ' ' + _this.getConditionValue(rawValue) + ' ' + valString;
      } else {
        return '';
      }
    });
    _defineProperty(this, "getLabel", key => {
      let {
        formSchema = {}
      } = this.props;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        const fieldSchema = this.props.getFieldSchema(key);
        let name = '';
        if (fieldSchema) {
          name = fieldSchema.config.label || fieldSchema.config.metaConfig && fieldSchema.config.metaConfig.label;
        }
        return name || '';
      } else {
        return 'No Key in schema';
      }
    });
    _defineProperty(this, "getFormat", key => {
      let {
        formSchema = {}
      } = this.props;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      if (formSchema && formSchema.jsonschema && formSchema.jsonschema.layout) {
        const fieldSchema = this.props.getFieldSchema(key);
        let format = '';
        let type = '';
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
    _defineProperty(this, "getNewValue", (value, key) => {
      let rawValues;
      let newValue = List();
      if (typeof value === 'string') {
        if (value !== '') {
          const splitVal = value.split('¤');
          if (splitVal.length > 1) {
            newValue = List(splitVal);
          } else {
            newValue = List([value]);
          }
        }
      } else if (typeof value === 'object' && value.condition === undefined) {
        if (!value.type && !_valuesInstanceProperty(value)) {
          newValue = List(value);
        } else {
          newValue = List(_valuesInstanceProperty(value));
        }
      } else {
        if (typeof _valuesInstanceProperty(value)[0] === 'object') {
          var _context2;
          // for typeaheads
          rawValues = _valuesInstanceProperty(value);
          const ids = _mapInstanceProperty(_context2 = _valuesInstanceProperty(value)).call(_context2, obj => obj.value);
          newValue = List(ids);
        } else if (typeof _valuesInstanceProperty(value)[0] === 'string') {
          // inputs
          if (typeof _valuesInstanceProperty(value) === 'string') {
            const splitVal = _valuesInstanceProperty(value).split('¤');
            if (splitVal.length > 1) {
              newValue = List(splitVal);
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
    _defineProperty(this, "buildRequest", function () {
      var _context3, _context4;
      let formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      const req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };
      _forEachInstanceProperty(_context3 = _filterInstanceProperty(_context4 = Map(formValues)).call(_context4, val => !!val)).call(_context3, (value, key) => {
        let newValue;
        let rawValues;
        if (!value.type) {
          const resp = _this.getNewValue(value, key);
          newValue = resp.newValue;
          rawValues = resp.rawValues;
        }
        if (newValue && (newValue.size > 0 || _this.state.noValueConditions.has(value.condition) || value.dynamicValues)) {
          let cond = 'contains';
          if (formValues[key] && formValues[key].condition) {
            cond = formValues[key].condition;
          }
          if (newValue.size > CONDITIONS[cond].maxFields) {
            newValue = _sliceInstanceProperty(newValue).call(newValue, 0, CONDITIONS[cond].maxFields);
          }
          // https://github.com/ClearC2/bleu/issues/4734
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
            const query = {
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
          const newValues = [];
          _forEachInstanceProperty(_context5 = value.conditions).call(_context5, v => {
            let {
              newValue,
              rawValues
            } = _this.getNewValue(v, key);
            if (newValue.size > 0 || _this.state.noValueConditions.has(v.condition) || v.dynamicValues || _this.state.noValueConditions.has(v.comparator)) {
              let cond = 'contains';
              if (v && v.condition) {
                cond = v.condition;
              }
              if (v && v.comparator) {
                cond = v.comparator;
              }
              if (newValue.size > CONDITIONS[cond].maxFields) {
                newValue = _sliceInstanceProperty(newValue).call(newValue, 0, CONDITIONS[cond].maxFields);
              }
              // https://github.com/ClearC2/bleu/issues/4734
              if (cond === 'is between') {
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
                  comparator: cond,
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
    _defineProperty(this, "onNextClick", () => {
      const req = this.buildRequest();
      if (this.props.onNextClick) {
        this.props.onNextClick(req);
      }
    });
    _defineProperty(this, "handleToggleClick", e => {
      if (this.props.enableToggle) {
        if (e) {
          this.setState({
            conditionType: 'or'
          });
          if (this.props.onToggleChange) {
            this.props.onToggleChange('or');
          }
        } else {
          this.setState({
            conditionType: 'and'
          });
          if (this.props.onToggleChange) {
            this.props.onToggleChange('and');
          }
        }
      }
    });
    _defineProperty(this, "resetForm", () => {
      var _context6;
      let {
        formValues
      } = this.prop;
      if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
      _mapInstanceProperty(_context6 = _Object$keys(formValues)).call(_context6, key => {
        const schema = this.props.getFieldSchema(key);
        if (schema && schema.config && (schema.config.type === 'textarea' || schema.config.type === 'checkbox' || schema.config.type === 'radio')) {
          this.props.handleOnChange({
            target: {
              name: key,
              value: ''
            }
          });
        } else {
          this.props.handleOnChange({
            target: {
              name: key,
              value: Map({
                condition: this.props.getDefaultCondition(schema.config.type),
                values: List()
              })
            }
          });
        }
      });
    });
    _defineProperty(this, "handleRemoveConditionClick", (e, key, predicateIndex) => {
      const schema = this.props.getFieldSchema(key);
      if (schema && schema.config && (schema.config.type === 'textarea' || schema.config.type === 'checkbox' || schema.config.type === 'radio')) {
        this.props.handleOnChange({
          target: {
            name: key,
            value: ''
          }
        });
      } else {
        if (predicateIndex >= 0) {
          var _context7;
          const predicate = this.props.formValues[key];
          const newConditions = [];
          _forEachInstanceProperty(_context7 = predicate.conditions).call(_context7, (c, i) => {
            if (i !== predicateIndex) {
              newConditions.push(c);
            }
          });
          if (newConditions.length === 0) {
            this.props.handleOnChange({
              target: {
                name: key,
                value: Map({
                  condition: this.props.getDefaultCondition(schema.config.type),
                  values: List()
                })
              }
            });
          } else if (newConditions.length === 1) {
            this.props.handleOnChange({
              target: {
                name: key,
                value: predicate.conditions[0]
              }
            });
          } else {
            predicate.conditions = newConditions;
            this.props.handleOnChange({
              target: {
                name: key,
                value: predicate
              }
            });
          }
        } else {
          this.props.handleOnChange({
            target: {
              name: key,
              value: Map({
                condition: this.props.getDefaultCondition(schema.config.type),
                values: List()
              })
            }
          });
        }
      }
    });
    _defineProperty(this, "renderDeleteIcon", (key, value, predicateIndex) => {
      if (this.props.enableDelete) {
        return /*#__PURE__*/React.createElement("i", {
          id: 'deleteIcon',
          className: X_ICON_CLASS,
          style: {
            color: '#8c0000',
            marginTop: '3px'
          },
          onClick: e => {
            this.handleRemoveConditionClick(e, key, predicateIndex);
            e.preventDefault();
          }
        });
      } else {
        return null;
      }
    });
    _defineProperty(this, "getConditionValue", rawValue => {
      if (rawValue && rawValue.condition) {
        return rawValue.condition;
      } else {
        return 'contains';
      }
    });
    _defineProperty(this, "getFieldType", fieldName => {
      var _context8;
      let {
        formSchema = {}
      } = this.props;
      if (typeof formSchema.toJS === 'function') formSchema = formSchema.toJS();
      let type = '';
      _forEachInstanceProperty(_context8 = formSchema.jsonschema.layout).call(_context8, field => {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });
      return type;
    });
    _defineProperty(this, "buildTableRow", function (key, value) {
      let predicateIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
      let extraCondRowStyles = {};
      let rowClick;
      if (_this.props.conditionRowOnClick) {
        extraCondRowStyles = _objectSpread(_objectSpread({}, extraCondRowStyles), {}, {
          cursor: 'pointer'
        });
        rowClick = e => {
          if (e.target.id !== 'deleteIcon') {
            _this.props.conditionRowOnClick(key, value);
          }
        };
      }
      if (value && _this.state.noValueConditions.has(value.condition)) {
        return /*#__PURE__*/React.createElement("tr", {
          key: `row-${key}-${predicateIndex}`,
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/React.createElement("td", {
          key: `column-${key}-${predicateIndex}`,
          style: {
            wordWrap: 'break-word'
          }
        }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', value.condition, _this.renderDeleteIcon(key, value, predicateIndex)));
      }
      if (value && typeof value === 'string') {
        // raw inputs
        let val = value;
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
          React.createElement("tr", {
            key: `row-${key}-${predicateIndex}`,
            style: _objectSpread({}, extraCondRowStyles),
            onClick: rowClick
          }, /*#__PURE__*/React.createElement("td", {
            key: `column-${key}-${predicateIndex}`,
            style: {
              wordWrap: 'break-word'
            }
          }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key), " "), value.not && '(exclude) ', "contains ", val, _this.renderDeleteIcon(key, value, predicateIndex)))
        );
      } else if (typeof value === 'boolean') {
        return /*#__PURE__*/React.createElement("tr", {
          key: `row-${key}-${predicateIndex}`,
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/React.createElement("td", {
          key: `column-${key}-${predicateIndex}`
        }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key), " "), "is ", value ? 'True' : 'False', _this.renderDeleteIcon(key, value, predicateIndex)));
      } else {
        var _context9, _context0;
        if (_valuesInstanceProperty(value) && _valuesInstanceProperty(value).length === 0 && (!value.dynamicValues || value.dynamicValues && value.dynamicValues.length === 0)) {
          return null;
        }
        return /*#__PURE__*/React.createElement("tr", {
          key: `row-${key}-${predicateIndex}`,
          style: _objectSpread({}, extraCondRowStyles),
          onClick: rowClick
        }, /*#__PURE__*/React.createElement("td", {
          key: `column-${key}-${predicateIndex}`
        }, /*#__PURE__*/React.createElement("strong", null, _this.getLabel(key)), _this.buildMultiString(key, _concatInstanceProperty(_context9 = _valuesInstanceProperty(value)).call(_context9, value.dynamicValues || []), value.not, value), _this.renderDeleteIcon(key, _concatInstanceProperty(_context0 = _valuesInstanceProperty(value)).call(_context0, value.dynamicValues || []), predicateIndex)));
      }
    });
    const noValueConditions = [];
    _forEachInstanceProperty(_context1 = _Object$keys(CONDITIONS)).call(_context1, k => {
      if (CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k);
      }
    });
    this.state = {
      conditionType: props.initToggleValue || 'and',
      noValueConditions: Set(noValueConditions),
      showEditReportFieldsModal: false,
      listOpen: true
    };
  }
  componentDidUpdate(props) {
    // eslint-disable-line
    if (this.props.formValues !== props.formValues) {
      if (this.props.onQueryChange) {
        const query = this.buildRequest(this.props.formValues);
        this.props.onQueryChange(query);
      }
    }
  }
  render() {
    var _context10;
    let {
      formValues = {}
    } = this.props;
    if (typeof formValues.toJS === 'function') formValues = formValues.toJS();
    const singleRows = _sortInstanceProperty(_context10 = _Object$keys(formValues)).call(_context10, (a, b) => {
      if (this.getLabel(a) === undefined || this.getLabel(b) === undefined) {
        return 0;
      }
      return this.getLabel(a).localeCompare(this.getLabel(b));
    });
    const tbody = [];
    _forEachInstanceProperty(singleRows).call(singleRows, key => {
      if (this.props.formValues[key]) {
        if (this.props.formValues[key].type) {
          var _context11;
          _forEachInstanceProperty(_context11 = this.props.formValues[key].conditions).call(_context11, (v, predicateIndex) => {
            tbody.push(this.buildTableRow(key, v, predicateIndex));
          });
        } else {
          tbody.push(this.buildTableRow(key, this.props.formValues[key]));
        }
      }
    });
    const isDisabled = this.buildRequest(this.props.formValues).query.conditions.length === 0;
    const {
      listOpen
    } = this.state;
    const extraFooters = this.props.extraFooters ? this.props.extraFooters : [];
    return /*#__PURE__*/React.createElement("div", {
      className: "table-responsive",
      style: {
        width: '100%',
        maxHeight: '620px'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        maxHeight: '550px',
        overflowY: 'auto'
      }
    }, /*#__PURE__*/React.createElement("table", {
      className: "table table-bordered table-striped",
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
      className: `col-lg-${6} col-md-${6} col-sm-${6}`,
      style: {
        display: 'inlineBlock'
      }
    }, /*#__PURE__*/React.createElement("span", null, this.props.title), /*#__PURE__*/React.createElement("span", {
      className: "pull-right"
    }, /*#__PURE__*/React.createElement(Toggle, {
      ref: "row-toggle",
      value: this.props.toggleValue === 'and',
      onToggle: this.handleToggleClick,
      activeLabel: "and",
      inactiveLabel: "or"
    }))))), tbody.length && listOpen ? /*#__PURE__*/React.createElement("tbody", null, tbody) : null, this.props.enableListToggle && /*#__PURE__*/React.createElement("div", {
      style: {
        width: '100%',
        textAlign: 'center',
        transform: `scale(1, ${listOpen ? '' : '-'}1)`,
        userSelect: 'none'
      },
      className: "cursor-hand",
      onClick: () => this.setState(() => ({
        listOpen: !listOpen
      }))
    }, "^"), /*#__PURE__*/React.createElement("tfoot", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, this.props.enableResetButton || this.props.enableNextButton ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginRight: '10px',
        marginBottom: '10px',
        marginTop: '10px',
        display: 'flex',
        flexDirection: 'row-reverse',
        width: '100%'
      }
    }, this.props.enableResetButton && /*#__PURE__*/React.createElement("button", {
      className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
      style: {
        marginRight: '10px',
        marginBottom: '10px'
      },
      onClick: this.resetForm,
      disabled: isDisabled
    }, "Reset"), this.props.enableNextButton && /*#__PURE__*/React.createElement("button", {
      className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
      style: {
        marginRight: '10px',
        marginBottom: '10px'
      },
      onClick: this.onNextClick,
      disabled: isDisabled
    }, "Next"), extraFooters) : null))))));
  }
}
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