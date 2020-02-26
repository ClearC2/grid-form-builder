"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _immutable = require("immutable");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Toggle = _interopRequireDefault(require("./Toggle"));

var _index = require("../../../index");

var X_ICON_CLASS = 'icon-close pull-right pointer';

var ConditionalTable =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ConditionalTable, _Component);

  function ConditionalTable(props) {
    var _context8;

    var _this;

    (0, _classCallCheck2.default)(this, ConditionalTable);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ConditionalTable).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildMultiString", function (key, value) {
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
        var cond = _this.getConditionValue(key) || 'contains';

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

        return ' ' + _this.getConditionValue(key) + ' ' + valString;
      } else {
        return '';
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getLabel", function (key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildRequest", function () {
      var _context2;

      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;
      var req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };
      (0, _forEach.default)(_context2 = (0, _immutable.Map)(formValues)).call(_context2, function (value, key) {
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
          newValue = (0, _immutable.List)(value);
        } else {
          if ((0, _typeof2.default)((0, _values.default)(value)[0]) === 'object') {
            var _context3;

            // for typeaheads
            rawValues = (0, _values.default)(value);
            var ids = (0, _map.default)(_context3 = (0, _values.default)(value)).call(_context3, function (obj) {
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

        if (newValue.size > 0 || _this.state.noValueConditions.has(value.condition) || value.dynamicValues) {
          var cond = 'contains';

          if (formValues[key] && formValues[key].condition) {
            cond = formValues[key].condition;
          }

          if (newValue.size > _index.CONDITIONS[cond].maxFields) {
            newValue = (0, _slice.default)(newValue).call(newValue, 0, _index.CONDITIONS[cond].maxFields);
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
      var _context4;

      (0, _map.default)(_context4 = (0, _keys.default)(_this.props.formValues)).call(_context4, function (key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleRemoveConditionClick", function (e, key) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "renderDeleteIcon", function (key) {
      if (_this.props.enableDelete) {
        return _react.default.createElement("i", {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getConditionValue", function (key) {
      if (_this.props.formValues[key] && _this.props.formValues[key].condition) {
        return _this.props.formValues[key].condition;
      } else {
        return 'contains';
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "getFieldType", function (fieldName) {
      var _context5;

      var type = '';
      (0, _forEach.default)(_context5 = _this.props.formSchema.jsonschema.layout).call(_context5, function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });
      return type;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildTableRow", function (key, value) {
      if (value && _this.state.noValueConditions.has(value.condition)) {
        return _react.default.createElement("tr", {
          key: "row-".concat(key)
        }, _react.default.createElement("td", {
          key: "column-".concat(key),
          style: {
            wordWrap: 'break-word'
          }
        }, _react.default.createElement("strong", null, _this.getLabel(key), " "), value.condition, _this.renderDeleteIcon(key)));
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
          _react.default.createElement("tr", {
            key: "row-".concat(key)
          }, _react.default.createElement("td", {
            key: "column-".concat(key),
            style: {
              wordWrap: 'break-word'
            }
          }, _react.default.createElement("strong", null, _this.getLabel(key), " "), "is equal to ", val, _this.renderDeleteIcon(key, value)))
        );
      } else if (typeof value === 'boolean') {
        return _react.default.createElement("tr", {
          key: "row-".concat(key)
        }, _react.default.createElement("td", {
          key: "column-".concat(key)
        }, _react.default.createElement("strong", null, _this.getLabel(key), " "), "is ", value ? 'True' : 'False', _this.renderDeleteIcon(key, value)));
      } else {
        var _context6, _context7;

        if ((0, _values.default)(value) && (0, _values.default)(value).length === 0 && (!value.dynamicValues || value.dynamicValues && value.dynamicValues.length === 0)) {
          return null;
        }

        return _react.default.createElement("tr", {
          key: "row-".concat(key)
        }, _react.default.createElement("td", {
          key: "column-".concat(key)
        }, _react.default.createElement("strong", null, _this.getLabel(key)), _this.buildMultiString(key, (0, _concat.default)(_context6 = (0, _values.default)(value)).call(_context6, value.dynamicValues || [])), _this.renderDeleteIcon(key, (0, _concat.default)(_context7 = (0, _values.default)(value)).call(_context7, value.dynamicValues || []))));
      }
    });
    var noValueConditions = [];
    (0, _forEach.default)(_context8 = (0, _keys.default)(_index.CONDITIONS)).call(_context8, function (k) {
      if (_index.CONDITIONS[k].maxFields === 0) {
        noValueConditions.push(k);
      }
    });
    _this.state = {
      conditionType: 'and',
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

      var tbody = (0, _map.default)(_context9 = (0, _sort.default)(_context10 = (0, _keys.default)(this.props.formValues)).call(_context10, function (a, b) {
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
        value: this.state.conditionType === this.props.toggleValue,
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
        disabled: this.buildRequest().query.conditions.length === 0
      }, "Reset"), this.props.enableNextButton && _react.default.createElement("button", {
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
  onToggleChange: _propTypes.default.func,
  enableDelete: _propTypes.default.bool,
  onQueryChange: _propTypes.default.func,
  getDefaultCondition: _propTypes.default.func,
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