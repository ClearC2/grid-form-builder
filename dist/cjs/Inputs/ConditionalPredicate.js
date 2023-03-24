"use strict";

var _typeof3 = require("@babel/runtime-corejs3/helpers/typeof");

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

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _slice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/slice"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _index = require("../index");

var _immutable = require("immutable");

var _SearchUtils = require("./SearchUtils");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys2(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty2(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context13, _context14; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty2(_context13 = ownKeys(Object(source), !0)).call(_context13, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty2(_context14 = ownKeys(Object(source))).call(_context14, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

// eslint-disable-line
var STRING_VALUES = (0, _immutable.Set)(['input', 'number', 'percentage', 'currency', 'datetime']);

var ConditionalPredicate = function ConditionalPredicate(props) {
  var propValue = props.value;

  if (!propValue) {
    propValue = (0, _immutable.Map)();
  }

  var defaultCreatedInputOpts = [];

  if (props.keyword && props.keyword.options) {
    defaultCreatedInputOpts = (0, _concat.default)(defaultCreatedInputOpts).call(defaultCreatedInputOpts, props.keyword.options);
  }

  var propsVals = props.value.get('values').toJS();

  if (propsVals.length) {
    if ((0, _some.default)(propsVals).call(propsVals, function (val) {
      return val.hasOwnProperty('__isNew__');
    })) {
      (0, _forEach.default)(propsVals).call(propsVals, function (val) {
        if (val.hasOwnProperty('__isNew__')) {
          defaultCreatedInputOpts.push(val);
        }
      });
    }
  }

  var _useState = (0, _react.useState)(defaultCreatedInputOpts),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      createdInputOpts = _useState2[0],
      setCreatedInputOpts = _useState2[1];

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

  var _useState3 = (0, _react.useState)((0, _immutable.Map)({
    condition: inputTypeOptionsList()[0].value
  })),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      modalValues = _useState4[0],
      setModalValues = _useState4[1];

  (0, _react.useEffect)(function () {
    // const v = props.values[props.name]
    if (props.name) {
      var _context2;

      var initCondition = inputTypeOptionsList()[0].value;

      if (props.value.getIn(['condition']) && (0, _some.default)(_context2 = inputTypeOptionsList()).call(_context2, function (c) {
        return c.value === props.value.getIn(['condition']);
      })) {
        initCondition = props.value.getIn(['condition'], inputTypeOptionsList()[0].value);
      }

      var initialModalValues = {
        condition: initCondition
      };

      if (_SearchUtils.SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues["".concat(props.name, "-0")] = propValue.get('values', (0, _immutable.List)());
      } else {
        if (propValue.get('values', (0, _immutable.List)()).size) {
          var _context3;

          (0, _forEach.default)(_context3 = propValue.get('values', (0, _immutable.List)())).call(_context3, function (v, i) {
            var _context4;

            initialModalValues[(0, _concat.default)(_context4 = "".concat(props.name, "-")).call(_context4, i)] = v;
          });
        } else {
          initialModalValues["".concat(props.name, "-0")] = '';
        }
      }

      if (props.value.getIn(['dynamicValues'])) {
        initialModalValues.dynamicValues = props.value.getIn(['dynamicValues']);
      }

      if (props.value.getIn(['relative'])) {
        initialModalValues.relative = props.value.getIn(['relative']);
      }

      dialogOnChange({
        target: {
          name: 'condition',
          value: initCondition
        }
      });
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
    var _context5;

    return props.typeahead && props.typeahead.key && (0, _startsWith.default)(_context5 = props.typeahead.key.toLowerCase()).call(_context5, 'c3_sec_') && modalValues && (modalValues.get('condition', '') === 'is one of' || modalValues.get('condition', '') === 'is not one of');
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
              label: "Condition ".concat(props.index + 1),
              type: 'select',
              suppressBlankOption: true,
              clearable: false,
              keyword: {
                category: 'NONE',
                options: inputTypeOptionsList()
              }
            }
          }, {
            type: 'field',
            dimensions: {
              x: 1,
              y: 1,
              h: 1,
              w: 3
            },
            config: {
              name: 'not',
              label: 'Exclude Condition',
              type: 'checkbox',
              onValue: true,
              offValue: false
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
    var relativeConditions = ['is greater than', 'is less than'];

    if ((0, _includes.default)(relativeConditions).call(relativeConditions, modalValues.get('condition')) && props.inputType === 'date') {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {
          x: 1,
          y: 2,
          h: 1,
          w: 3
        },
        config: {
          name: 'relative',
          label: 'Use Relative Dates',
          type: 'checkbox',
          onValue: 1,
          offValue: 0
        }
      });

      if (modalValues.get('relative')) {
        schema.form.jsonschema.layout.push({
          type: 'field',
          dimensions: {
            x: 1,
            y: 3,
            h: 1,
            w: 8
          },
          config: {
            name: "".concat(props.name, "-0"),
            label: "".concat(props.label),
            type: 'select',
            suppressBlankOption: true,
            clearable: false,
            keyword: {
              category: 'NONE',
              options: [{
                label: 'Yesterday',
                value: 'yesterday'
              }, {
                label: 'Today',
                value: 'today'
              }, {
                label: 'Tomorrow',
                value: 'tomorrow'
              }, {
                label: 'This Month',
                value: 'this month'
              }, {
                label: 'This Year',
                value: 'this year'
              }, {
                label: 'This Quarter',
                value: 'this quarter'
              }]
            }
          }
        });
      }
    }

    var maxFieldCount = getMaxFieldCount();
    var minFieldCount = getMinFieldCount();
    var fieldCount = 0;

    if (maxFieldCount < 3 && maxFieldCount > 0) {
      var _context6;

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
          label: (0, _concat.default)(_context6 = "(".concat(maxFieldCount, " value")).call(_context6, maxFieldCount === 1 ? '' : 's', " allowed)")
        }
      });
    }

    if (hasDynamicValues()) {
      var _context7;

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
          label: (0, _concat.default)(_context7 = "(".concat(maxFieldCount, " value")).call(_context7, maxFieldCount === 1 ? '' : 's', " allowed)"),
          delimit: 'value',
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
    delete extraFieldProps.values;
    delete extraFieldProps.value;

    if (fieldCount < nFieldsWithValues() + 1 && maxFieldCount > 0 && !modalValues.get('relative')) {
      var isContains = props.value.getIn(['condition'], '') === 'contains';
      var isIsOneOf = props.value.getIn(['condition'], '') === 'is one of';
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {
          x: 1,
          y: 2,
          h: calculateFieldHeight(props.inputType.toLowerCase()),
          w: 8
        },
        config: _objectSpread(_objectSpread({}, extraFieldProps), {}, {
          link: undefined,
          autofocus: true,
          readonly: false,
          name: "".concat(props.name, "-0"),
          label: "".concat(props.label),
          interactive: true,
          clearable: true,
          keyword: {
            category: props.keyword && props.keyword.category,
            default: '',
            options: createdInputOpts
          },
          allowcreate: isContains || isIsOneOf,
          searchable: true,
          // I just added this line
          type: _SearchUtils.NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) ? 'number' : props.inputType.toLowerCase(),
          // eslint-disable-line
          handleOnChange: dialogOnChange
        })
      });
      fieldCount++;
    }

    if (_SearchUtils.MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0 && !modalValues.get('relative')) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1) {
        var _context8;

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
          config: _objectSpread(_objectSpread({}, extraFieldProps), {}, {
            link: undefined,
            readonly: false,
            name: (0, _concat.default)(_context8 = "".concat(props.name, "-")).call(_context8, fieldCount),
            label: label,
            interactive: true,
            clearable: true,
            type: _SearchUtils.NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) ? 'number' : props.inputType.toLowerCase(),
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
    var oldValue = props.value;

    if (oldValue && oldValue instanceof _immutable.Map) {
      return props.value.get('condition', '');
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

    var oldValue = props.value;

    if (oldValue && oldValue instanceof _immutable.Map) {
      var newFieldValue = props.value.set(e.target.name, e.target.value);

      var maxFieldValues = _SearchUtils.CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields;

      if (newFieldValue.get('values', (0, _immutable.List)()).size >= maxFieldValues) {
        var _context9;

        newFieldValue = newFieldValue.set('values', (0, _slice.default)(_context9 = newFieldValue.get('values', (0, _immutable.List)())).call(_context9, 0, maxFieldValues));
      }

      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
    }

    if (!_SearchUtils.NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) && _SearchUtils.NUMERICAL_CONDITIONS.has(e.target.value) || _SearchUtils.NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) && !_SearchUtils.NUMERICAL_CONDITIONS.has(e.target.value)) {
      var _newFieldValue = props.value.set(e.target.name, e.target.value);

      _newFieldValue = _newFieldValue.set('values', (0, _immutable.List)());
      props.onChange({
        target: {
          name: props.name,
          value: _newFieldValue
        }
      }, props.index);
    }
  }

  function deleteIndex(i, values) {
    var _context12;

    var stateChanges = modalValues;

    for (var x = (0, _parseInt2.default)(i); x < values.size - 1; x++) {
      var _context10, _context11;

      var next = x + 1;
      stateChanges = stateChanges.set((0, _concat.default)(_context10 = "".concat(props.name, "-")).call(_context10, x), modalValues.get((0, _concat.default)(_context11 = "".concat(props.name, "-")).call(_context11, next), ''));
    }

    stateChanges = stateChanges.delete((0, _concat.default)(_context12 = "".concat(props.name, "-")).call(_context12, values.size - 1));

    if (i === 'relative') {
      stateChanges = stateChanges.delete("".concat(i));
    }

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

    if (newFieldValue.get('relative') && e.target.value === '') {
      newFieldValue = newFieldValue.set(e.target.name, e.target.value);
      newFieldValue = newFieldValue.delete('relative');
      newFieldValue = newFieldValue.set('values', (0, _immutable.List)());
      var m = modalValues;
      m = m.set(e.target.name, '');
      m = m.delete('relative');
      setModalValues(m);
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
      return;
    }

    if (e.target.name === 'monthtest-0' && e.target.value === '') {
      newFieldValue = newFieldValue.set(e.target.name, e.target.value);
      newFieldValue = newFieldValue.delete('relative');
      newFieldValue = newFieldValue.set('values', (0, _immutable.List)());
      var _m = modalValues;
      _m = _m.set('monthtest-0', '');
      _m = _m.delete('relative');
      setModalValues(_m);
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
      return;
    }

    if (e.target.name === 'relative') {
      newFieldValue = newFieldValue.set('relative', e.target.value);
      newFieldValue = newFieldValue.set('values', (0, _immutable.List)());

      var _m2 = modalValues.set(e.target.name, e.target.value);

      _m2 = _m2.delete("".concat(props.name, "-0"));
      setModalValues(_m2);
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
      return;
    }

    if (e.target.name === 'not') {
      newFieldValue = newFieldValue.set('not', e.target.value);
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
      return;
    }

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
            if (_i) {
              values = deleteIndex(_i, values);
            } else {
              values = deleteIndex(e.target.name, values);
            }
          } else {
            if (e.target.name) {
              values = (0, _immutable.fromJS)([e.target.value]);
            } else {
              values = values.set(_i, e.target.value);
            }
          }
        }
      } else {
        values = (0, _immutable.fromJS)(e.target.value);
        var valArr = e.target.value;
        var opts = (0, _toConsumableArray2.default)(createdInputOpts);

        if (valArr.length) {
          (0, _forEach.default)(valArr).call(valArr, function (val) {
            if (val.hasOwnProperty('__isNew__')) {
              opts.push(val);
              setCreatedInputOpts(opts);
            }
          });
        }
      }
    }

    if (e.target.name === 'dynamicValues') {
      // newFieldValue = newFieldValue.set('condition', 'is one of')
      newFieldValue = newFieldValue.set('dynamicValues', e.target.value);
    }

    newFieldValue = newFieldValue.set('values', values);
    props.onChange({
      target: {
        name: props.name,
        value: newFieldValue
      }
    }, props.index);
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_index.FormBuilder, {
    formSchema: getSchema(),
    formValues: modalValues,
    conditionalSearch: false,
    handleOnChange: dialogOnChange,
    draggable: false,
    interactive: true
  }));
};

var _default = ConditionalPredicate;
exports.default = _default;
ConditionalPredicate.propTypes = {
  onChange: _propTypes.default.func,
  handleClose: _propTypes.default.func,
  handleOnChange: _propTypes.default.func,
  name: _propTypes.default.string,
  inputType: _propTypes.default.string,
  index: _propTypes.default.number,
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