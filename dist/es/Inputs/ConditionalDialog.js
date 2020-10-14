import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context12; _forEachInstanceProperty(_context12 = ownKeys(Object(source), true)).call(_context12, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context13; _forEachInstanceProperty(_context13 = ownKeys(Object(source))).call(_context13, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'c2-dialog';
import { FormBuilder } from '../index';
import { Map, List, fromJS, Set } from 'immutable';
import { CONDITIONS, TYPEAHEAD_CONDITIONS, NUMERICAL_CONDITIONS, MULTI_FIELD_INPUTS, DATES, SINGLE_FIELD_INPUTS } from './SearchUtils'; // eslint-disable-line

var STRING_VALUES = Set(['input', 'number', 'percentage', 'currency', 'datetime']);

var ConditionalDialog = function ConditionalDialog(props) {
  var propValue = props.value;

  if (!propValue) {
    propValue = Map();
  }

  function convertListToOptions(list) {
    var inputType = props.inputType.toLowerCase();

    if (inputType === 'number' || inputType === 'currency' || inputType === 'decimal') {
      list = _filterInstanceProperty(list).call(list, function (l) {
        return l !== 'is blank' && l !== 'is not blank' && l !== 'contains' && l !== 'does not contain';
      });
    }

    return _mapInstanceProperty(list).call(list, function (opt) {
      return {
        value: opt,
        label: opt
      };
    });
  }

  function inputTypeOptionsList() {
    var _context;

    var options = []; // Object.keys(CONDITIONS).map(c => ({label: c, value: c}))

    _forEachInstanceProperty(_context = _Object$keys(CONDITIONS)).call(_context, function (key) {
      var excludes = Set(CONDITIONS[key].invalidInputTypes);

      if (!excludes.has(props.inputType.toLowerCase())) {
        options.push(key);
      }
    });

    return convertListToOptions(options);
  }

  var _useState = useState(Map({
    condition: inputTypeOptionsList()[0].value
  })),
      _useState2 = _slicedToArray(_useState, 2),
      modalValues = _useState2[0],
      setModalValues = _useState2[1];

  useEffect(function () {
    // const v = props.values[props.name]
    if (props.name) {
      var initCondition = inputTypeOptionsList()[0].value;

      if (_valuesInstanceProperty(props).getIn([props.name, 'condition'])) {
        initCondition = _valuesInstanceProperty(props).getIn([props.name, 'condition'], inputTypeOptionsList()[0].value);
      }

      var initialModalValues = {
        condition: initCondition
      };

      if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues["".concat(props.name, "-0")] = propValue.get('values', List());
      } else {
        if (propValue.get('values', List()).size) {
          var _context2;

          _forEachInstanceProperty(_context2 = propValue.get('values', List())).call(_context2, function (v, i) {
            var _context3;

            initialModalValues[_concatInstanceProperty(_context3 = "".concat(props.name, "-")).call(_context3, i)] = v;
          });
        } else {
          initialModalValues["".concat(props.name, "-0")] = '';
        }
      }

      if (_valuesInstanceProperty(props).getIn([props.name, 'dynamicValues'])) {
        initialModalValues.dynamicValues = _valuesInstanceProperty(props).getIn([props.name, 'dynamicValues']);
      }

      setModalValues(Map(initialModalValues));
    }
  }, [props.name]);

  function getMaxFieldCount() {
    if (CONDITIONS[condition()]) {
      return CONDITIONS[condition()].maxFields;
    } else {
      return 999;
    }
  }

  function getMinFieldCount() {
    if (CONDITIONS[condition()]) {
      return CONDITIONS[condition()].minFields;
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

    if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
      if (propValue.get('values', List()).size > 0) {
        ret = 1;
      } else {
        ret = 0;
      }
    } else {
      ret = propValue.get('values', List()).size;
    }

    return ret;
  }

  function hasDynamicValues() {
    var _context4;

    return props.typeahead && props.typeahead.key && _startsWithInstanceProperty(_context4 = props.typeahead.key.toLowerCase()).call(_context4, 'c3_sec_') && modalValues && (modalValues.get('condition', '') === 'is one of' || modalValues.get('condition', '') === 'is not one of');
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
          label: _concatInstanceProperty(_context5 = "(".concat(maxFieldCount, " value")).call(_context5, maxFieldCount === 1 ? '' : 's', " allowed)")
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
          label: _concatInstanceProperty(_context6 = "(".concat(maxFieldCount, " value")).call(_context6, maxFieldCount === 1 ? '' : 's', " allowed)"),
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
    delete _valuesInstanceProperty(extraFieldProps);
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
          type: DATES.has(props.inputType.toLowerCase()) && NUMERICAL_CONDITIONS.has(_valuesInstanceProperty(props).getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(),
          // eslint-disable-line
          handleOnChange: dialogOnChange
        })
      });
      fieldCount++;
    }

    if (MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1) {
        var _context7;

        var label = CONDITIONS[condition()];

        if (_typeof(label) === 'object') {
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
            name: _concatInstanceProperty(_context7 = "".concat(props.name, "-")).call(_context7, fieldCount),
            label: label,
            interactive: true,
            clearable: true,
            type: DATES.has(props.inputType.toLowerCase()) && NUMERICAL_CONDITIONS.has(_valuesInstanceProperty(props).getIn([props.name, 'condition'], '')) ? 'number' : props.inputType.toLowerCase(),
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
    var oldValue = _valuesInstanceProperty(props).get(props.name);

    if (oldValue && oldValue instanceof Map) {
      return _valuesInstanceProperty(props).get(props.name, Map()).get('condition', '');
    } else {
      return modalValues.get('condition', 'contains');
    }
  }

  function handleConditionChange(e) {
    var currentCondition = condition();
    setModalValues(modalValues.set(e.target.name, e.target.value));
    var trueType = (props.inputType || 'input').toLowerCase();

    if (trueType === 'typeahead') {
      if (TYPEAHEAD_CONDITIONS.has(currentCondition) && !TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        _setTimeout(function () {
          dialogOnChange({
            target: {
              name: "".concat(props.name, "-0"),
              value: ''
            }
          });
        }, 0);
      } else if (!TYPEAHEAD_CONDITIONS.has(currentCondition) && TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        _setTimeout(function () {
          dialogOnChange({
            target: {
              name: "".concat(props.name, "-0"),
              value: List()
            }
          });
        }, 0);
      }
    }

    var oldValue = _valuesInstanceProperty(props).get(props.name);

    if (oldValue && oldValue instanceof Map) {
      var newFieldValue = _valuesInstanceProperty(props).get(props.name, Map()).set(e.target.name, e.target.value);

      var maxFieldValues = CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields;

      if (newFieldValue.get('values', List()).size >= maxFieldValues) {
        var _context8;

        newFieldValue = newFieldValue.set('values', _sliceInstanceProperty(_context8 = newFieldValue.get('values', List())).call(_context8, 0, maxFieldValues));
      }

      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      });
    }

    if (!NUMERICAL_CONDITIONS.has(_valuesInstanceProperty(props).getIn([props.name, 'condition'], '')) && NUMERICAL_CONDITIONS.has(e.target.value) || NUMERICAL_CONDITIONS.has(_valuesInstanceProperty(props).getIn([props.name, 'condition'], '')) && !NUMERICAL_CONDITIONS.has(e.target.value)) {
      var _newFieldValue = _valuesInstanceProperty(props).get(props.name, Map()).set(e.target.name, e.target.value);

      _newFieldValue = _newFieldValue.set('values', List());
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

    for (var x = _parseInt(i); x < values.size - 1; x++) {
      var _context9, _context10;

      var next = x + 1;
      stateChanges = stateChanges.set(_concatInstanceProperty(_context9 = "".concat(props.name, "-")).call(_context9, x), modalValues.get(_concatInstanceProperty(_context10 = "".concat(props.name, "-")).call(_context10, next), ''));
    }

    stateChanges = stateChanges.delete(_concatInstanceProperty(_context11 = "".concat(props.name, "-")).call(_context11, values.size - 1));
    setModalValues(stateChanges);
    return _spliceInstanceProperty(values).call(values, i, 1);
  }

  function isBetweenCondition() {
    return _valuesInstanceProperty(props).getIn([props.name, 'condition']) === 'is between';
  }

  var dialogOnChange = function dialogOnChange(e) {
    if (e.target.name === 'condition') {
      handleConditionChange(e);
      return;
    }

    setModalValues(modalValues.set(e.target.name, e.target.value)); // for display in the dialog

    var newFieldValue = props.value || Map({
      condition: 'contains',
      values: List()
    });
    var values = newFieldValue.get('values', List());

    if (STRING_VALUES.has(props.inputType.toLowerCase())) {
      // i have a string. what index?
      var i = _parseInt(e.target.name.split('-')[e.target.name.split('-').length - 1]);

      if (e.target.value === '') {
        values = deleteIndex(i, values);
      } else {
        values = values.set(i, e.target.value);
      }
    } else {
      if (typeof e.target.value === 'string') {
        var _i = _parseInt(e.target.name.split('-')[e.target.name.split('-').length - 1]);

        if (_i > values.size - 1) {
          values = _concatInstanceProperty(values).call(values, fromJS([e.target.value]));
        } else {
          if (e.target.value === '') {
            values = deleteIndex(_i, values);
          } else {
            values = values.set(_i, e.target.value);
          }
        }
      } else {
        values = fromJS(e.target.value);
      }
    }

    if (e.target.name === 'not') {
      newFieldValue = newFieldValue.set('not', e.target.value);
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
    });
  };

  var headerHeight = 64;
  var footerHeight = 64;
  var fieldHeight = 55 + (hasDynamicValues() ? 50 : 0);
  var extraBodyHeight = 80;
  var maxModalHeight = 550;
  var fieldsHeight = isBetweenCondition() ? fieldHeight * 3 : (nFieldsWithValues() + 2) * fieldHeight;
  var modalHeight = fieldsHeight + headerHeight + footerHeight + extraBodyHeight;
  var maxBodyHeight = maxModalHeight - headerHeight - footerHeight;
  console.log('test');
  return React.createElement(Dialog, {
    size: {
      width: '800px',
      height: "420px"
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
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'row',
      padding: '10px',
      height: '54px'
    }
  }, React.createElement("div", {
    style: {
      width: '90%'
    }
  }, React.createElement("h4", {
    style: {
      height: '100%',
      margin: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, props.label, " condition:")), React.createElement("div", {
    style: {
      width: '10%'
    }
  }, React.createElement("button", {
    type: "button",
    className: "close",
    onClick: function onClick() {
      return props.handleClose(false);
    }
  }, React.createElement("span", null, "\xD7")))), React.createElement("div", {
    style: {
      width: '100%',
      height: 'calc(100% - 54px)',
      padding: '10px',
      scroll: 'auto',
      overflow: 'hidden',
      display: 'flex'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      overflowY: 'auto'
    }
  }, React.createElement(FormBuilder, {
    formSchema: getSchema(),
    formValues: modalValues,
    conditionalSearch: false,
    handleOnChange: dialogOnChange,
    draggable: false,
    interactive: true
  }))), React.createElement("button", {
    type: "button",
    className: "btn btn-primary",
    style: {
      height: 35,
      position: 'absolute',
      bottom: 15,
      right: 30
    },
    onClick: function onClick() {
      return props.handleClose(false);
    }
  }, "Ok")));
};

export default ConditionalDialog;
ConditionalDialog.propTypes = {
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnChange: PropTypes.func,
  name: PropTypes.string,
  inputType: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  autofocus: PropTypes.bool,
  placeholder: PropTypes.string,
  tabIndex: PropTypes.number,
  autoComplete: PropTypes.string,
  interactive: PropTypes.bool,
  requiredWarning: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.object,
  typeahead: PropTypes.object,
  keyword: PropTypes.object
};