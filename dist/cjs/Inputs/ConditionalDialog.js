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

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _values = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/values"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _c2Dialog = require("c2-dialog");

var _index = require("../index");

var _immutable = require("immutable");

var _SearchUtils = require("./SearchUtils");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context12; (0, _forEach.default)(_context12 = ownKeys(Object(source), true)).call(_context12, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context13; (0, _forEach.default)(_context13 = ownKeys(Object(source))).call(_context13, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

// eslint-disable-line
var STRING_VALUES = (0, _immutable.Set)(['input', 'number', 'percentage', 'currency', 'datetime']);

var ConditionalDialog = function ConditionalDialog(props) {
  var propValue = props.value;

  if (!propValue) {
    propValue = (0, _immutable.Map)();
  }

  function convertListToOptions(list) {
    var inputType = props.inputType.toLowerCase();

    if (inputType === 'number' || inputType === 'currency' || inputType === 'decimal') {
      list = (0, _filter.default)(list).call(list, function (l) {
        return l !== 'is blank' && l !== 'is not blank' && l !== 'contains' && l !== 'does not contain';
      });
    }

    return (0, _map.default)(list).call(list, function (opt) {
      return {
        value: opt,
        label: opt
      };
    });
  }

  function inputTypeOptionsList() {
    var _context;

    var options = []; // Object.keys(CONDITIONS).map(c => ({label: c, value: c}))

    (0, _forEach.default)(_context = (0, _keys.default)(_SearchUtils.CONDITIONS)).call(_context, function (key) {
      var excludes = (0, _immutable.Set)(_SearchUtils.CONDITIONS[key].invalidInputTypes);

      if (!excludes.has(props.inputType.toLowerCase())) {
        options.push(key);
      }
    });
    return convertListToOptions(options);
  }

  var _useState = (0, _react.useState)((0, _immutable.Map)({
    condition: inputTypeOptionsList()[0].value
  })),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      modalValues = _useState2[0],
      setModalValues = _useState2[1];

  (0, _react.useEffect)(function () {
    // const v = props.values[props.name]
    if (props.name) {
      var initCondition = inputTypeOptionsList()[0].value;

      if ((0, _values.default)(props).getIn([props.name, 'condition'])) {
        initCondition = (0, _values.default)(props).getIn([props.name, 'condition'], inputTypeOptionsList()[0].value);
      }

      var initialModalValues = {
        condition: initCondition
      };

      if (_SearchUtils.SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues["".concat(props.name, "-0")] = propValue.get('values', (0, _immutable.List)());
      } else {
        if (propValue.get('values', (0, _immutable.List)()).size) {
          var _context2;

          (0, _forEach.default)(_context2 = propValue.get('values', (0, _immutable.List)())).call(_context2, function (v, i) {
            var _context3;

            initialModalValues[(0, _concat.default)(_context3 = "".concat(props.name, "-")).call(_context3, i)] = v;
          });
        } else {
          initialModalValues["".concat(props.name, "-0")] = '';
        }
      }

      if ((0, _values.default)(props).getIn([props.name, 'dynamicValues'])) {
        initialModalValues.dynamicValues = (0, _values.default)(props).getIn([props.name, 'dynamicValues']);
      }

      setModalValues((0, _immutable.Map)(initialModalValues));
    }
  }, [props.name]);

  function getMaxFieldCount() {
    if (_SearchUtils.CONDITIONS[condition()]) {
      return _SearchUtils.CONDITIONS[condition()].maxFields;
    } else {
      return 999;
    }
  }

  function getMinFieldCount() {
    if (_SearchUtils.CONDITIONS[condition()]) {
      return _SearchUtils.CONDITIONS[condition()].minFields;
    } else {
      return 0;
    }
  }

  function calculateFieldHeight(type) {
    if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
      return props.keyword.options.length;
    }

    if (type === 'multiselect') {
      return 1 + (modalValues["".concat(props.name, "-0")] ? modalValues["".concat(props.name, "-0")].length / 3 : 0);
    }

    return 1;
  }

  function nFieldsWithValues() {
    var ret = 0;

    if (!propValue) {
      return 0;
    }

    if (_SearchUtils.SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
      if (propValue.get('values', (0, _immutable.List)()).size > 0) {
        ret = 1;
      } else {
        ret = 0;
      }
    } else {
      ret = propValue.get('values', (0, _immutable.List)()).size;
    }

    return ret;
  }

  function hasDynamicValues() {
    var _context4;

    return props.typeahead && props.typeahead.key && (0, _startsWith.default)(_context4 = props.typeahead.key.toLowerCase()).call(_context4, 'c3_sec_') && modalValues && modalValues.get('condition', '') === 'is one of';
  }

  function getSchema() {
    var schema = {
      form: {
        name: 'Conditional Input1',
        description: 'allow more complex inputs.',
        jsonschema: {
          layout: [{
            type: 'field',
            dimensions: {
              x: 1,
              y: 0,
              h: 1,
              w: 8
            },
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
      var _context5;

      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {
          x: 4,
          y: 1,
          h: 1,
          w: 6
        },
        config: {
          // name: props.name,
          type: 'header',
          link: undefined,
          style: {
            label: {
              lineHeight: '12px',
              fontSize: '12px'
            }
          },
          label: (0, _concat.default)(_context5 = "(".concat(maxFieldCount, " value")).call(_context5, maxFieldCount === 1 ? '' : 's', " allowed)")
        }
      });
    }

    if (hasDynamicValues()) {
      var _context6;

      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {
          x: 3,
          y: 1,
          h: 2,
          w: 6
        },
        config: {
          name: 'dynamicValues',
          type: 'multicheckbox',
          link: undefined,
          style: {
            label: {
              lineHeight: '12px',
              fontSize: '12px'
            }
          },
          label: (0, _concat.default)(_context6 = "(".concat(maxFieldCount, " value")).call(_context6, maxFieldCount === 1 ? '' : 's', " allowed)"),
          keyword: {
            category: 'NONE',
            options: [{
              label: '{Logged on User}',
              value: '{Logged on User}'
            }, {
              label: '{Reports to Logged on User}',
              value: '{Reports to Logged on User}'
            }]
          }
        }
      });
    }

    var extraFieldProps = _objectSpread({}, props);

    delete extraFieldProps.onChange;
    delete extraFieldProps.handleOnChange;
    delete extraFieldProps.name;
    delete (0, _values.default)(extraFieldProps);
    delete extraFieldProps.value;

    if (fieldCount < nFieldsWithValues() + 1 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {
          x: 1,
          y: 2,
          h: calculateFieldHeight(props.inputType.toLowerCase()),
          w: 8
        },
        config: _objectSpread({}, extraFieldProps, {
          link: undefined,
          autofocus: true,
          readonly: false,
          name: "".concat(props.name, "-0"),
          label: "".concat(props.label),
          interactive: true,
          clearable: true,
          type: _SearchUtils.DATES.has(props.inputType.toLowerCase()) && _SearchUtils.NUMERICAL_CONDITIONS.has((0, _values.default)(props).getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(),
          // eslint-disable-line
          handleOnChange: dialogOnChange
        })
      });
      fieldCount++;
    }

    if (_SearchUtils.MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1) {
        var _context7;

        var label = _SearchUtils.CONDITIONS[condition()];

        if ((0, _typeof2.default)(label) === 'object') {
          label = label.joinString;
        }

        if (!label) {
          label = "     ...or";
        }

        var newField = {
          type: 'field',
          dimensions: {
            x: 1,
            y: fieldCount + 2,
            h: calculateFieldHeight(props.inputType.toLowerCase()),
            w: 8
          },
          config: _objectSpread({}, extraFieldProps, {
            link: undefined,
            readonly: false,
            name: (0, _concat.default)(_context7 = "".concat(props.name, "-")).call(_context7, fieldCount),
            label: label,
            interactive: true,
            clearable: true,
            type: _SearchUtils.DATES.has(props.inputType.toLowerCase()) && _SearchUtils.NUMERICAL_CONDITIONS.has((0, _values.default)(props).getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(),
            // eslint-disable-line
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
    var oldValue = (0, _values.default)(props).get(props.name);

    if (oldValue && oldValue instanceof _immutable.Map) {
      return (0, _values.default)(props).get(props.name, (0, _immutable.Map)()).get('condition', '');
    } else {
      return modalValues.get('condition', 'contains');
    }
  }

  function handleConditionChange(e) {
    var currentCondition = condition();
    setModalValues(modalValues.set(e.target.name, e.target.value));
    var trueType = (props.inputType || 'input').toLowerCase();

    if (trueType === 'typeahead') {
      if (_SearchUtils.TYPEAHEAD_CONDITIONS.has(currentCondition) && !_SearchUtils.TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        (0, _setTimeout2.default)(function () {
          dialogOnChange({
            target: {
              name: "".concat(props.name, "-0"),
              value: ''
            }
          });
        }, 0);
      } else if (!_SearchUtils.TYPEAHEAD_CONDITIONS.has(currentCondition) && _SearchUtils.TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        (0, _setTimeout2.default)(function () {
          dialogOnChange({
            target: {
              name: "".concat(props.name, "-0"),
              value: (0, _immutable.List)()
            }
          });
        }, 0);
      }
    }

    var oldValue = (0, _values.default)(props).get(props.name);

    if (oldValue && oldValue instanceof _immutable.Map) {
      var newFieldValue = (0, _values.default)(props).get(props.name, (0, _immutable.Map)()).set(e.target.name, e.target.value);

      var maxFieldValues = _SearchUtils.CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields;

      if (newFieldValue.get('values', (0, _immutable.List)()).size >= maxFieldValues) {
        var _context8;

        newFieldValue = newFieldValue.set('values', (0, _slice.default)(_context8 = newFieldValue.get('values', (0, _immutable.List)())).call(_context8, 0, maxFieldValues));
      }

      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      });
    }

    if (!_SearchUtils.NUMERICAL_CONDITIONS.has((0, _values.default)(props).getIn([props.name, 'condition'], '')) && _SearchUtils.NUMERICAL_CONDITIONS.has(e.target.value) || _SearchUtils.NUMERICAL_CONDITIONS.has((0, _values.default)(props).getIn([props.name, 'condition'], '')) && !_SearchUtils.NUMERICAL_CONDITIONS.has(e.target.value)) {
      var _newFieldValue = (0, _values.default)(props).get(props.name, (0, _immutable.Map)()).set(e.target.name, e.target.value);

      _newFieldValue = _newFieldValue.set('values', (0, _immutable.List)());
      props.onChange({
        target: {
          name: props.name,
          value: _newFieldValue
        }
      });
    }
  }

  function deleteIndex(i, values) {
    var _context11;

    var stateChanges = modalValues;

    for (var x = (0, _parseInt2.default)(i); x < values.size - 1; x++) {
      var _context9, _context10;

      var next = x + 1;
      stateChanges = stateChanges.set((0, _concat.default)(_context9 = "".concat(props.name, "-")).call(_context9, x), modalValues.get((0, _concat.default)(_context10 = "".concat(props.name, "-")).call(_context10, next), ''));
    }

    stateChanges = stateChanges.delete((0, _concat.default)(_context11 = "".concat(props.name, "-")).call(_context11, values.size - 1));
    setModalValues(stateChanges);
    return (0, _splice.default)(values).call(values, i, 1);
  }

  var dialogOnChange = function dialogOnChange(e) {
    if (e.target.name === 'condition') {
      handleConditionChange(e);
      return;
    }

    setModalValues(modalValues.set(e.target.name, e.target.value)); // for display in the dialog

    var newFieldValue = props.value || (0, _immutable.Map)({
      condition: 'contains',
      values: (0, _immutable.List)()
    });
    var values = newFieldValue.get('values', (0, _immutable.List)());

    if (STRING_VALUES.has(props.inputType.toLowerCase())) {
      // i have a string. what index?
      var i = (0, _parseInt2.default)(e.target.name.split('-')[e.target.name.split('-').length - 1]);

      if (e.target.value === '') {
        values = deleteIndex(i, values);
      } else {
        values = values.set(i, e.target.value);
      }
    } else {
      if (typeof e.target.value === 'string') {
        var _i = (0, _parseInt2.default)(e.target.name.split('-')[e.target.name.split('-').length - 1]);

        if (_i > values.size - 1) {
          values = (0, _concat.default)(values).call(values, (0, _immutable.fromJS)([e.target.value]));
        } else {
          if (e.target.value === '') {
            values = deleteIndex(_i, values);
          } else {
            values = values.set(_i, e.target.value);
          }
        }
      } else {
        values = (0, _immutable.fromJS)(e.target.value);
      }
    }

    if (e.target.name === 'dynamicValues') {
      newFieldValue = newFieldValue.set('condition', 'is one of');
      newFieldValue = newFieldValue.set('dynamicValues', e.target.value);
    }

    newFieldValue = newFieldValue.set('values', values);
    props.onChange({
      target: {
        name: props.name,
        value: newFieldValue
      }
    });
  };

  var headerHeight = 64;
  var footerHeight = 64;
  var fieldHeight = 55 + (hasDynamicValues() ? 50 : 0);
  var extraBodyHeight = 80;
  var maxModalHeight = 550;
  var modalHeight = (nFieldsWithValues() + 2) * fieldHeight + headerHeight + footerHeight + extraBodyHeight;
  var maxBodyHeight = maxModalHeight - headerHeight - footerHeight;
  return _react.default.createElement(_c2Dialog.Dialog, {
    size: {
      width: '800px',
      height: "".concat(Math.min(modalHeight, maxModalHeight), "px")
    },
    default: {
      y: window.innerHeight / 2 - 250 + window.scrollY,
      x: window.innerWidth / 2 - 260
    },
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
  }, _react.default.createElement("div", {
    style: {
      width: '100%'
    }
  }, _react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      height: '54px'
    }
  }, _react.default.createElement("div", {
    style: {
      width: '90%'
    }
  }, _react.default.createElement("h4", null, props.label, " condition:")), _react.default.createElement("div", {
    style: {
      width: '10%'
    }
  }, _react.default.createElement("button", {
    type: "button",
    className: "close",
    onClick: function onClick() {
      return props.handleClose(false);
    }
  }, _react.default.createElement("span", null, "\xD7")))), _react.default.createElement("div", {
    style: {
      width: '720px',
      maxHeight: "".concat(maxBodyHeight, "px"),
      padding: '10px',
      scroll: 'auto',
      overflowY: 'auto'
    }
  }, _react.default.createElement(_index.FormBuilder, {
    formSchema: getSchema(),
    formValues: modalValues,
    conditionalSearch: false,
    handleOnChange: dialogOnChange,
    draggable: false,
    interactive: true
  })), _react.default.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row-reverse',
      padding: '10px',
      height: '54px'
    }
  }, _react.default.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    style: {
      marginRight: '15px'
    },
    onClick: function onClick() {
      return props.handleClose(false);
    }
  }, "Ok"))));
};

var _default = ConditionalDialog;
exports.default = _default;
ConditionalDialog.propTypes = {
  onChange: _propTypes.default.func,
  handleClose: _propTypes.default.func,
  handleOnChange: _propTypes.default.func,
  name: _propTypes.default.string,
  inputType: _propTypes.default.string,
  label: _propTypes.default.string,
  values: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object]),
  disabled: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  autofocus: _propTypes.default.bool,
  placeholder: _propTypes.default.string,
  tabIndex: _propTypes.default.number,
  autoComplete: _propTypes.default.string,
  interactive: _propTypes.default.bool,
  requiredWarning: _propTypes.default.bool,
  style: _propTypes.default.object,
  value: _propTypes.default.object,
  typeahead: _propTypes.default.object,
  keyword: _propTypes.default.object
};