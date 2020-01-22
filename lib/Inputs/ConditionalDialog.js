'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _c2Dialog = require('c2-dialog');

var _index = require('../index');

var _immutable = require('immutable');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// eslint-disable-line
var STRING_VALUES = (0, _immutable.Set)(['input', 'number', 'percentage', 'currency', 'datetime']);
var ConditionalDialog = function ConditionalDialog(props) {
  function inputTypeOptionsList() {
    return Object.keys(_utils.CONDITIONS).map(function (c) {
      return { label: c, value: c };
    });
  }

  var _useState = (0, _react.useState)((0, _immutable.Map)({ condition: 'contains' })),
      _useState2 = _slicedToArray(_useState, 2),
      modalValues = _useState2[0],
      setModalValues = _useState2[1];

  (0, _react.useEffect)(function () {
    // const v = props.values[props.name]
    if (props.name) {
      var initCondition = 'contains';
      if (props.values.getIn([props.name, 'condition'])) {
        initCondition = props.values.getIn([props.name, 'condition']);
      }
      var initialModalValues = { condition: initCondition };
      if (_utils.SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues[props.name + '-0'] = props.value.get('values', (0, _immutable.List)());
      } else {
        if (props.value.get('values', (0, _immutable.List)()).size) {
          props.value.get('values', (0, _immutable.List)()).forEach(function (v, i) {
            initialModalValues[props.name + '-' + i] = v;
          });
        } else {
          initialModalValues[props.name + '-0'] = '';
        }
      }

      setModalValues((0, _immutable.Map)(initialModalValues));
    }
  }, [props.name]);
  function getMaxFieldCount() {
    if (_utils.CONDITIONS[condition()]) {
      return _utils.CONDITIONS[condition()].maxFields;
    } else {
      return 999;
    }
  }
  function getMinFieldCount() {
    if (_utils.CONDITIONS[condition()]) {
      return _utils.CONDITIONS[condition()].minFields;
    } else {
      return 0;
    }
  }
  function calculateFieldHeight(type) {
    if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
      return props.keyword.options.length;
    }
    if (type === 'multiselect') {
      return 1 + (modalValues[props.name + '-0'] ? modalValues[props.name + '-0'].length / 3 : 0);
    }
    return 1;
  }

  function nFieldsWithValues() {
    var ret = 0;
    if (_utils.SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
      if (props.value.get('values', (0, _immutable.List)()).size > 0) {
        ret = 1;
      } else {
        ret = 0;
      }
    } else {
      ret = props.value.get('values', (0, _immutable.List)()).size;
    }
    return ret;
  }
  function getSchema() {
    var schema = {
      form: {
        name: 'Conditional Input1',
        description: 'allow more complex inputs.',
        jsonschema: {
          layout: [{
            type: 'field',
            dimensions: { x: 0, y: 0, h: 1, w: 12 },
            config: {
              // name: props.name,
              type: 'header',
              label: props.label + ' condition:'
            }
          }, {
            type: 'field',
            dimensions: { x: 1, y: 1, h: 1, w: 8 },
            config: {
              name: 'condition',
              label: 'Condition',
              type: 'select',
              suppressBlankOption: true,
              clearable: false,
              keyword: {
                category: 'NONE',
                options: inputTypeOptionsList()
              }
            }
          }]
        }
      },
      id: 'FDC58F0F0B2099E61BE23AB6110572E1',
      lastUpdateDate: '2018-02-26 10:16:14',
      lastUpdateBy: 'will darden',
      createdDate: '2018-02-26 10:16:14',
      createdBy: 'will darden'
    };
    var maxFieldCount = getMaxFieldCount();
    var minFieldCount = getMinFieldCount();
    var fieldCount = 0;
    if (maxFieldCount < 3 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: { x: 4, y: 2, h: 1, w: 6 },
        config: {
          // name: props.name,
          type: 'header',
          link: undefined,
          style: { label: { lineHeight: '12px', fontSize: '12px' } },
          label: '(' + maxFieldCount + ' value' + (maxFieldCount === 1 ? '' : 's') + ' allowed)'
        }
      });
    }
    var extraFieldProps = _extends({}, props);
    delete extraFieldProps.onChange;
    delete extraFieldProps.handleOnChange;
    delete extraFieldProps.name;
    delete extraFieldProps.values;
    delete extraFieldProps.value;
    if (fieldCount < nFieldsWithValues() + 1 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: { x: 1, y: 3, h: calculateFieldHeight(props.inputType.toLowerCase()), w: 8 },
        config: _extends({}, extraFieldProps, {
          link: undefined,
          autofocus: true,
          readonly: false,
          name: props.name + '-0',
          label: '' + props.label,
          interactive: true,
          type: _utils.DATES.has(props.inputType.toLowerCase()) && _utils.NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(), // eslint-disable-line
          handleOnChange: dialogOnChange
        })
      });
      fieldCount++;
    }
    if (_utils.MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1) {
        var label = _utils.CONDITIONS[condition()];
        if ((typeof label === 'undefined' ? 'undefined' : _typeof(label)) === 'object') {
          label = label.joinString;
        }
        if (!label) {
          label = '     ...or';
        }
        var newField = {
          type: 'field',
          dimensions: { x: 1, y: fieldCount + 3, h: calculateFieldHeight(props.inputType.toLowerCase()), w: 8 },
          config: _extends({}, extraFieldProps, {
            link: undefined,
            readonly: false,
            name: props.name + '-' + fieldCount,
            label: label,
            interactive: true,
            type: _utils.DATES.has(props.inputType.toLowerCase()) && _utils.NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(), // eslint-disable-line
            handleOnChange: dialogOnChange
          })
        };
        if (props.typeahead) {
          newField.config.typeahead = props.typeahead;
        }
        schema.form.jsonschema.layout.push(newField);
        fieldCount++;
      }
    }
    return schema;
  }

  function condition() {
    var oldValue = props.values.get(props.name);
    if (oldValue && oldValue instanceof _immutable.Map) {
      return props.values.get(props.name, (0, _immutable.Map)()).get('condition', '');
    } else {
      return modalValues.get('condition', 'contains');
    }
  }
  function handleConditionChange(e) {
    var currentCondition = condition();
    setModalValues(modalValues.set(e.target.name, e.target.value));
    var trueType = (props.inputType || 'input').toLowerCase();
    if (trueType === 'typeahead') {
      if (_utils.TYPEAHEAD_CONDITIONS.has(currentCondition) && !_utils.TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(function () {
          dialogOnChange({ target: { name: props.name + '-0', value: '' } });
        }, 0);
      } else if (!_utils.TYPEAHEAD_CONDITIONS.has(currentCondition) && _utils.TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(function () {
          dialogOnChange({ target: { name: props.name + '-0', value: (0, _immutable.List)() } });
        }, 0);
      }
    }
    var oldValue = props.values.get(props.name);
    if (oldValue && oldValue instanceof _immutable.Map) {
      var newFieldValue = props.values.get(props.name, (0, _immutable.Map)()).set(e.target.name, e.target.value);
      var maxFieldValues = _utils.CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields;
      if (newFieldValue.get('values', (0, _immutable.List)()).size >= maxFieldValues) {
        newFieldValue = newFieldValue.set('values', newFieldValue.get('values', (0, _immutable.List)()).slice(0, maxFieldValues));
      }
      props.onChange({ target: { name: props.name, value: newFieldValue } });
    }
    if (!_utils.NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) && _utils.NUMERICAL_CONDITIONS.has(e.target.value) || _utils.NUMERICAL_CONDITIONS.has(props.values.getIn([props.name, 'condition'], '')) && !_utils.NUMERICAL_CONDITIONS.has(e.target.value)) {
      var _newFieldValue = props.values.get(props.name, (0, _immutable.Map)()).set(e.target.name, e.target.value);
      _newFieldValue = _newFieldValue.set('values', (0, _immutable.List)());
      props.onChange({ target: { name: props.name, value: _newFieldValue } });
    }
  }

  var dialogOnChange = function dialogOnChange(e) {
    if (e.target.name === 'condition') {
      handleConditionChange(e);
      return;
    }
    setModalValues(modalValues.set(e.target.name, e.target.value)); // for display in the dialog
    var newFieldValue = props.value || (0, _immutable.Map)({ condition: 'contains', values: (0, _immutable.List)() });
    var values = newFieldValue.get('values', (0, _immutable.List)());
    if (STRING_VALUES.has(props.inputType.toLowerCase())) {
      // i have a string. what index?
      var i = e.target.name.split('-')[e.target.name.split('-').length - 1];
      values = values.set(i, e.target.value);
    } else {
      values = values = (0, _immutable.fromJS)(e.target.value);
    }
    newFieldValue = newFieldValue.set('values', values);
    props.onChange({ target: { name: props.name, value: newFieldValue } });
  };
  return _react2.default.createElement(
    _c2Dialog.Dialog,
    {
      size: { width: '800px', height: '450px' },
      'default': { y: window.innerHeight / 2 - 250 + window.scrollY, x: window.innerWidth / 2 - 260 },
      center: true,
      style: {
        background: '#fff',
        boxShadow: '0px 0px 15px #444',
        borderRadius: '5px',
        border: '2px solid #36a9e1',
        overflowY: 'visible'
      },
      enableResizing: true,
      disableDragging: true
    },
    _react2.default.createElement(
      'div',
      { style: { width: '100%' } },
      _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          style: { paddingRight: '10px', paddingTop: '5px', display: 'inline-block' },
          onClick: function onClick() {
            return props.handleClose(false);
          }
        },
        _react2.default.createElement(
          'span',
          null,
          '\xD7'
        )
      ),
      _react2.default.createElement(
        'div',
        {
          style: {
            width: '720px',
            maxHeight: '410px',
            marginTop: '10px',
            scroll: 'auto',
            overflowY: 'auto'
          }
        },
        _react2.default.createElement(_index.FormBuilder, {
          formSchema: getSchema(),
          formValues: modalValues,
          conditionalSearch: false,
          handleOnChange: dialogOnChange,
          draggable: false,
          interactive: true
        })
      ),
      _react2.default.createElement(
        'button',
        {
          type: 'button',
          className: 'btn-primary pull-right',
          style: { marginRight: '15px' },
          onClick: function onClick() {
            return props.handleClose(false);
          }
        },
        'Ok'
      )
    )
  );
};

exports.default = ConditionalDialog;


ConditionalDialog.propTypes = {
  onChange: _propTypes2.default.func,
  handleClose: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  inputType: _propTypes2.default.string,
  label: _propTypes2.default.string,
  values: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  value: _propTypes2.default.object,
  typeahead: _propTypes2.default.object,
  keyword: _propTypes2.default.object
};