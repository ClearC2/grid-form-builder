import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import React, { Component } from 'react';
import { Map, List, Set } from 'immutable';
import PropTypes from 'prop-types';
import Toggle from './Toggle';
import { CONDITIONS } from '../../../index';
var X_ICON_CLASS = 'icon-close pull-right pointer';

var ConditionalTable =
/*#__PURE__*/
function (_Component) {
  _inherits(ConditionalTable, _Component);

  function ConditionalTable(props) {
    var _context8;

    var _this;

    _classCallCheck(this, ConditionalTable);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConditionalTable).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "buildMultiString", function (key, value) {
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
        var cond = _this.getConditionValue(key) || 'contains';

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

        return ' ' + _this.getConditionValue(key) + ' ' + valString;
      } else {
        return '';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getLabel", function (key) {
      if (_this.props.formSchema && _this.props.formSchema.jsonschema && _this.props.formSchema.jsonschema.layout) {
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

    _defineProperty(_assertThisInitialized(_this), "buildRequest", function () {
      var _context2;

      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;
      var req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };

      _forEachInstanceProperty(_context2 = Map(formValues)).call(_context2, function (value, key) {
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
          newValue = List(value);
        } else {
          if (_typeof(_valuesInstanceProperty(value)[0]) === 'object') {
            var _context3;

            // for typeaheads
            rawValues = _valuesInstanceProperty(value);

            var ids = _mapInstanceProperty(_context3 = _valuesInstanceProperty(value)).call(_context3, function (obj) {
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

        if (newValue.size > 0 || _this.state.noValueConditions.has(value.condition) || value.dynamicValues) {
          var cond = 'contains';

          if (formValues[key] && formValues[key].condition) {
            cond = formValues[key].condition;
          }

          if (newValue.size > CONDITIONS[cond].maxFields) {
            newValue = _sliceInstanceProperty(newValue).call(newValue, 0, CONDITIONS[cond].maxFields);
          }

          req.query.conditions.push({
            name: key,
            label: _this.getLabel(key),
            comparator: cond,
            values: newValue,
            dynamicValues: value.dynamicValues,
            rawValues: rawValues
          });
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
      var _context4;

      _mapInstanceProperty(_context4 = _Object$keys(_this.props.formValues)).call(_context4, function (key) {
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

    _defineProperty(_assertThisInitialized(_this), "handleRemoveConditionClick", function (e, key) {
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

    _defineProperty(_assertThisInitialized(_this), "renderDeleteIcon", function (key) {
      if (_this.props.enableDelete) {
        return React.createElement("i", {
          className: X_ICON_CLASS,
          style: {
            color: '#8c0000',
            marginTop: '3px'
          },
          onClick: function onClick(e) {
            _this.handleRemoveConditionClick(e, key);
          }
        });
      } else {
        return null;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getConditionValue", function (key) {
      if (_this.props.formValues[key] && _this.props.formValues[key].condition) {
        return _this.props.formValues[key].condition;
      } else {
        return 'contains';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldType", function (fieldName) {
      var _context5;

      var type = '';

      _forEachInstanceProperty(_context5 = _this.props.formSchema.jsonschema.layout).call(_context5, function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });

      return type;
    });

    _defineProperty(_assertThisInitialized(_this), "buildTableRow", function (key, value) {
      if (value && _this.state.noValueConditions.has(value.condition)) {
        return React.createElement("tr", {
          key: "row-".concat(key)
        }, React.createElement("td", {
          key: "column-".concat(key),
          style: {
            wordWrap: 'break-word'
          }
        }, React.createElement("strong", null, _this.getLabel(key), " "), value.condition, _this.renderDeleteIcon(key)));
      }

      if (value && typeof value === 'string') {
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
          React.createElement("tr", {
            key: "row-".concat(key)
          }, React.createElement("td", {
            key: "column-".concat(key),
            style: {
              wordWrap: 'break-word'
            }
          }, React.createElement("strong", null, _this.getLabel(key), " "), "contains ", val, _this.renderDeleteIcon(key, value)))
        );
      } else if (typeof value === 'boolean') {
        return React.createElement("tr", {
          key: "row-".concat(key)
        }, React.createElement("td", {
          key: "column-".concat(key)
        }, React.createElement("strong", null, _this.getLabel(key), " "), "is ", value ? 'True' : 'False', _this.renderDeleteIcon(key, value)));
      } else {
        var _context6, _context7;

        if (_valuesInstanceProperty(value) && _valuesInstanceProperty(value).length === 0 && (!value.dynamicValues || value.dynamicValues && value.dynamicValues.length === 0)) {
          return null;
        }

        return React.createElement("tr", {
          key: "row-".concat(key)
        }, React.createElement("td", {
          key: "column-".concat(key)
        }, React.createElement("strong", null, _this.getLabel(key)), _this.buildMultiString(key, _concatInstanceProperty(_context6 = _valuesInstanceProperty(value)).call(_context6, value.dynamicValues || [])), _this.renderDeleteIcon(key, _concatInstanceProperty(_context7 = _valuesInstanceProperty(value)).call(_context7, value.dynamicValues || []))));
      }
    });

    var noValueConditions = [];

    _forEachInstanceProperty(_context8 = _Object$keys(CONDITIONS)).call(_context8, function (k) {
      if (CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k);
      }
    });

    _this.state = {
      conditionType: 'and',
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
          this.props.onQueryChange(this.buildRequest(this.props.formValues));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _context9,
          _context10,
          _this2 = this;

      var tbody = _mapInstanceProperty(_context9 = _sortInstanceProperty(_context10 = _Object$keys(this.props.formValues)).call(_context10, function (a, b) {
        if (_this2.getLabel(a) === undefined || _this2.getLabel(b) === undefined) {
          return 0;
        }

        return _this2.getLabel(a).localeCompare(_this2.getLabel(b));
      })).call(_context9, function (key) {
        if (_this2.props.formValues[key]) {
          return _this2.buildTableRow(key, _this2.props.formValues[key]);
        } else {
          return null;
        }
      });

      var listOpen = this.state.listOpen;
      var extraFooters = this.props.extraFooters ? this.props.extraFooters : [];
      return React.createElement("div", {
        className: "table-responsive",
        style: {
          width: '100%',
          maxHeight: '620px'
        }
      }, React.createElement("div", {
        style: {
          width: '100%',
          maxHeight: '550px',
          overflowY: 'auto'
        }
      }, React.createElement("table", {
        className: "table table-bordered table-striped",
        style: {
          width: '100%'
        }
      }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", {
        className: "col-lg-".concat(6, " col-md-", 6, " col-sm-", 6),
        style: {
          display: 'inlineBlock'
        }
      }, React.createElement("span", null, this.props.title), React.createElement("span", {
        className: "pull-right"
      }, React.createElement(Toggle, {
        ref: "row-toggle",
        value: this.state.conditionType === this.props.toggleValue,
        onToggle: this.handleToggleClick,
        activeLabel: "and",
        inactiveLabel: "or"
      }))))), tbody.length && listOpen ? React.createElement("tbody", null, tbody) : null, this.props.enableListToggle && React.createElement("div", {
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
      }, "^"), React.createElement("tfoot", null, React.createElement("tr", null, React.createElement("td", null, this.props.enableResetButton || this.props.enableNextButton ? React.createElement("div", {
        style: {
          marginRight: '10px',
          marginBottom: '10px',
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'row-reverse',
          width: '100%'
        }
      }, this.props.enableResetButton && React.createElement("button", {
        className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
        style: {
          marginRight: '10px',
          marginBottom: '10px'
        },
        onClick: this.resetForm,
        disabled: this.buildRequest().query.conditions.length === 0
      }, "Reset"), this.props.enableNextButton && React.createElement("button", {
        className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
        style: {
          marginRight: '10px',
          marginBottom: '10px'
        },
        onClick: this.onNextClick,
        disabled: this.buildRequest().query.conditions.length === 0
      }, "Next"), extraFooters) : null))))));
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
  onToggleChange: PropTypes.func,
  enableDelete: PropTypes.bool,
  onQueryChange: PropTypes.func,
  getDefaultCondition: PropTypes.func,
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