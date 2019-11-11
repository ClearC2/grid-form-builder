'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

var _index = require('../../../index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var X_ICON_CLASS = 'icon-close pull-right pointer';

var ConditionalTable = function (_Component) {
  _inherits(ConditionalTable, _Component);

  function ConditionalTable(props) {
    _classCallCheck(this, ConditionalTable);

    var _this = _possibleConstructorReturn(this, (ConditionalTable.__proto__ || Object.getPrototypeOf(ConditionalTable)).call(this, props));

    _this.buildMultiString = function (key, value) {
      var valString = '';
      if (value) {
        if (typeof value === 'string') {
          var splitVal = value.split('¤');
          if (splitVal.length > 1) {
            value = splitVal;
          } else {
            value = [value];
          }
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
          if (typeof value[0] === 'string' && value[0].split('¤').length > 1) {
            value = value[0].split('¤');
          } else {
            value = value.map(function (v) {
              return v.label || v;
            });
          }
        }
        var i = value.length;
        var cond = _this.getConditionValue(key) || 'contains';
        if (i > _index.CONDITIONS[cond].maxFields) {
          value = (0, _immutable.List)(value).slice(0, _index.CONDITIONS[cond].maxFields).toJS();
        }
        i = value.length;
        if (value && value.forEach) {
          value.forEach(function (val) {
            if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
              if (val.values) {
                val = val.values;
              } else {
                val = val.label;
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
    };

    _this.getLabel = function (key) {
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
    };

    _this.buildRequest = function () {
      var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.props.formValues;

      var req = {
        query: {
          type: _this.state.conditionType,
          conditions: []
        }
      };
      (0, _immutable.Map)(formValues).forEach(function (value, key) {
        var rawValues = void 0;
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
        } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.condition === undefined) {
          newValue = (0, _immutable.List)(value || []);
        } else {
          if (_typeof(value.values[0]) === 'object') {
            // for typeaheads
            rawValues = value.values;
            var ids = value.values.map(function (obj) {
              return obj.value;
            });
            newValue = (0, _immutable.List)(ids);
          } else if (typeof value.values[0] === 'string') {
            // inputs
            if (typeof value.values === 'string') {
              var _splitVal = value.values.split('¤');
              if (_splitVal.length > 1) {
                newValue = (0, _immutable.List)(_splitVal);
              } else {
                newValue = (0, _immutable.List)(value.values);
              }
            } else {
              newValue = (0, _immutable.List)(value.values);
            }
          }
        }
        if (newValue.size > 0 || _this.state.noValueConditions.has(value.condition)) {
          var cond = 'contains';
          if (formValues[key] && formValues[key].condition) {
            cond = formValues[key].condition;
          }
          if (newValue.size > _index.CONDITIONS[cond].maxFields) {
            newValue = newValue.slice(0, _index.CONDITIONS[cond].maxFields);
          }
          req.query.conditions.push({
            name: key,
            label: _this.getLabel(key),
            comparator: cond,
            values: newValue,
            rawValues: rawValues
          });
        }
      });
      return req;
    };

    _this.onNextClick = function () {
      var req = _this.buildRequest();
      if (_this.props.onNextClick) {
        _this.props.onNextClick(req);
      }
    };

    _this.handleToggleClick = function (e) {
      if (_this.props.enableToggle) {
        if (e) {
          _this.setState({ conditionType: 'or' });
          if (_this.props.onToggleChange) {
            _this.props.onToggleChange('or');
          }
        } else {
          _this.setState({ conditionType: 'and' });
          if (_this.props.onToggleChange) {
            _this.props.onToggleChange('and');
          }
        }
      }
    };

    _this.resetForm = function () {
      Object.keys(_this.props.formValues).map(function (key) {
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
    };

    _this.handleRemoveConditionClick = function (e, key) {
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
    };

    _this.renderDeleteIcon = function (key) {
      if (_this.props.enableDelete) {
        return _react2.default.createElement('i', {
          className: X_ICON_CLASS,
          style: { color: '#8c0000', marginTop: '3px' },
          onClick: function onClick(e) {
            _this.handleRemoveConditionClick(e, key);
          }
        });
      } else {
        return null;
      }
    };

    _this.getConditionValue = function (key) {
      if (_this.props.formValues[key] && _this.props.formValues[key].condition) {
        return _this.props.formValues[key].condition;
      } else {
        return 'contains';
      }
    };

    _this.getFieldType = function (fieldName) {
      var type = '';
      _this.props.formSchema.jsonschema.layout.forEach(function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });
      return type;
    };

    _this.getFieldType = function (fieldName) {
      var type = '';
      _this.props.formSchema.jsonschema.layout.forEach(function (field) {
        if (field.config.name === fieldName) {
          type = field.config.type;
          return true;
        }
      });
      return type;
    };

    _this.buildTableRow = function (key, value) {
      if (value && _this.state.noValueConditions.has(value.condition)) {
        return _react2.default.createElement(
          'tr',
          { key: 'row-' + key },
          _react2.default.createElement(
            'td',
            { key: 'column-' + key, style: { wordWrap: 'break-word' } },
            _react2.default.createElement(
              'strong',
              null,
              _this.getLabel(key),
              ' '
            ),
            value.condition,
            _this.renderDeleteIcon(key)
          )
        );
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
          _react2.default.createElement(
            'tr',
            { key: 'row-' + key },
            _react2.default.createElement(
              'td',
              { key: 'column-' + key, style: { wordWrap: 'break-word' } },
              _react2.default.createElement(
                'strong',
                null,
                _this.getLabel(key),
                ' '
              ),
              'is equal to ',
              val,
              _this.renderDeleteIcon(key, value)
            )
          )
        );
      } else if (typeof value === 'boolean') {
        return _react2.default.createElement(
          'tr',
          { key: 'row-' + key },
          _react2.default.createElement(
            'td',
            { key: 'column-' + key },
            _react2.default.createElement(
              'strong',
              null,
              _this.getLabel(key),
              ' '
            ),
            'is ',
            value ? 'True' : 'False',
            _this.renderDeleteIcon(key, value)
          )
        );
      } else {
        if (value.values && value.values.length === 0) {
          return null;
        }
        return _react2.default.createElement(
          'tr',
          { key: 'row-' + key },
          _react2.default.createElement(
            'td',
            { key: 'column-' + key },
            _react2.default.createElement(
              'strong',
              null,
              _this.getLabel(key)
            ),
            _this.buildMultiString(key, value.values),
            _this.renderDeleteIcon(key, value.values)
          )
        );
      }
    };

    var noValueConditions = [];
    Object.keys(_index.CONDITIONS).forEach(function (k) {
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

  _createClass(ConditionalTable, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (this.props.formValues !== props.formValues) {
        if (this.props.onQueryChange) {
          this.props.onQueryChange(this.buildRequest(props.formValues));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var tbody = Object.keys(this.props.formValues).sort(function (a, b) {
        if (_this2.getLabel(a) === undefined || _this2.getLabel(b) === undefined) {
          return 0;
        }
        return _this2.getLabel(a).localeCompare(_this2.getLabel(b));
      }).map(function (key) {
        if (_this2.props.formValues[key]) {
          return _this2.buildTableRow(key, _this2.props.formValues[key]);
        } else {
          return null;
        }
      });
      var listOpen = this.state.listOpen;


      return _react2.default.createElement(
        'div',
        { className: 'table-responsive', style: { width: '100%', maxHeight: '620px' } },
        _react2.default.createElement(
          'div',
          { style: { width: '100%', maxHeight: '550px', overflowY: 'auto' } },
          _react2.default.createElement(
            'table',
            { className: 'table table-bordered table-striped', style: { width: '100%' } },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'th',
                  { className: 'col-lg-' + 6 + ' col-md-' + 6 + ' col-sm-' + 6, style: { display: 'inlineBlock' } },
                  _react2.default.createElement(
                    'span',
                    null,
                    this.props.title
                  ),
                  _react2.default.createElement(
                    'span',
                    { className: 'pull-right' },
                    _react2.default.createElement(_Toggle2.default, {
                      ref: 'row-toggle',
                      value: this.state.conditionType === this.props.toggleValue,
                      onToggle: this.handleToggleClick,
                      activeLabel: 'and',
                      inactiveLabel: 'or'
                    })
                  )
                )
              )
            ),
            tbody.length && listOpen ? _react2.default.createElement(
              'tbody',
              null,
              tbody
            ) : null,
            this.props.enableListToggle && _react2.default.createElement(
              'div',
              {
                style: {
                  width: '100%',
                  textAlign: 'center',
                  transform: 'scale(1, ' + (listOpen ? '' : '-') + '1)',
                  userSelect: 'none'
                },
                className: 'cursor-hand',
                onClick: function onClick() {
                  return _this2.setState(function () {
                    return { listOpen: !listOpen };
                  });
                }
              },
              '^'
            ),
            _react2.default.createElement(
              'tfoot',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  this.props.enableResetButton || this.props.enableNextButton ? _react2.default.createElement(
                    'div',
                    {
                      style: {
                        marginRight: '10px',
                        marginBottom: '10px',
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        width: '100%'
                      }
                    },
                    this.props.enableResetButton && _react2.default.createElement(
                      'button',
                      {
                        className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
                        style: { marginRight: '10px', marginBottom: '10px' },
                        onClick: this.resetForm,
                        disabled: this.buildRequest().query.conditions.length === 0
                      },
                      'Reset'
                    ),
                    this.props.enableNextButton && _react2.default.createElement(
                      'button',
                      {
                        className: this.props.primaryButtonClass || 'btn btn-primary pull-right',
                        style: { marginRight: '10px', marginBottom: '10px' },
                        onClick: this.onNextClick,
                        disabled: this.buildRequest().query.conditions.length === 0
                      },
                      'Next'
                    )
                  ) : null
                )
              )
            )
          )
        )
      );
    }
  }]);

  return ConditionalTable;
}(_react.Component);

ConditionalTable.propTypes = {
  formValues: _propTypes2.default.object.isRequired,
  onNextClick: _propTypes2.default.func.isRequired,
  formSchema: _propTypes2.default.object,
  handleOnChange: _propTypes2.default.func,
  title: _propTypes2.default.string,
  primaryButtonClass: _propTypes2.default.string,
  enableResetButton: _propTypes2.default.bool,
  enableNextButton: _propTypes2.default.bool,
  enableToggle: _propTypes2.default.bool,
  toggleValue: _propTypes2.default.string,
  onToggleChange: _propTypes2.default.func,
  enableDelete: _propTypes2.default.bool,
  onQueryChange: _propTypes2.default.func,
  getDefaultCondition: _propTypes2.default.func,
  getFieldSchema: _propTypes2.default.func,
  enableListToggle: _propTypes2.default.bool
};
ConditionalTable.defaultProps = {
  formValues: {},
  enableToggle: true,
  enableDelete: true,
  toggleValue: 'and',
  enableListToggle: false
};
exports.default = ConditionalTable;