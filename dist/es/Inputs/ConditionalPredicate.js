import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context7, _context8; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(t), !0)).call(_context7, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context8 = ownKeys(Object(t))).call(_context8, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _startsWithInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/starts-with";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _parseInt from "@babel/runtime-corejs3/core-js-stable/parse-int";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FormBuilder } from '../index';
import { Map, List, fromJS, Set } from 'immutable';
import { CONDITIONS, TYPEAHEAD_CONDITIONS, NUMERICAL_CONDITIONS, MULTI_FIELD_INPUTS, DATES, SINGLE_FIELD_INPUTS } from './SearchUtils'; // eslint-disable-line
const STRING_VALUES = Set(['input', 'number', 'percentage', 'currency', 'datetime', 'textarea']);
const ConditionalPredicate = props => {
  let propValue = props.value;
  if (!propValue) {
    propValue = Map();
  }
  let defaultCreatedInputOpts = [];
  if (props.keyword && props.keyword.options) {
    defaultCreatedInputOpts = _concatInstanceProperty(defaultCreatedInputOpts).call(defaultCreatedInputOpts, props.keyword.options);
  }
  const propsVals = props.value.get('values').toJS();
  if (propsVals.length) {
    if (_someInstanceProperty(propsVals).call(propsVals, val => val.hasOwnProperty('__isNew__'))) {
      _forEachInstanceProperty(propsVals).call(propsVals, val => {
        if (val.hasOwnProperty('__isNew__')) {
          defaultCreatedInputOpts.push(val);
        }
      });
    }
  }
  const [createdInputOpts, setCreatedInputOpts] = useState(defaultCreatedInputOpts);
  function convertListToOptions(list) {
    const inputType = props.inputType.toLowerCase();
    if (inputType === 'number' || inputType === 'currency' || inputType === 'decimal') {
      list = _filterInstanceProperty(list).call(list, l => {
        return l !== 'is blank' && l !== 'is not blank' && l !== 'contains' && l !== 'does not contain';
      });
    }
    return _mapInstanceProperty(list).call(list, opt => {
      return {
        value: opt,
        label: opt
      };
    });
  }
  function inputTypeOptionsList() {
    var _context;
    const options = []; // Object.keys(CONDITIONS).map(c => ({label: c, value: c}))
    _forEachInstanceProperty(_context = _Object$keys(CONDITIONS)).call(_context, key => {
      const excludes = Set(CONDITIONS[key].invalidInputTypes);
      if (!excludes.has(props.inputType.toLowerCase())) {
        options.push(key);
      }
    });
    return convertListToOptions(options);
  }
  const [modalValues, setModalValues] = useState(Map({
    condition: inputTypeOptionsList()[0].value
  }));
  useEffect(() => {
    // const v = props.values[props.name]
    if (props.name) {
      var _context2;
      let initCondition = inputTypeOptionsList()[0].value;
      if (props.value.getIn(['condition']) && _someInstanceProperty(_context2 = inputTypeOptionsList()).call(_context2, c => c.value === props.value.getIn(['condition']))) {
        initCondition = props.value.getIn(['condition'], inputTypeOptionsList()[0].value);
      }
      const initialModalValues = {
        condition: initCondition
      };
      if (SINGLE_FIELD_INPUTS.has(props.inputType.toLowerCase())) {
        initialModalValues[`${props.name}-0`] = propValue.get('values', List());
      } else {
        if (propValue.get('values', List()).size) {
          var _context3;
          _forEachInstanceProperty(_context3 = propValue.get('values', List())).call(_context3, (v, i) => {
            initialModalValues[`${props.name}-${i}`] = v;
          });
        } else {
          initialModalValues[`${props.name}-0`] = '';
        }
      }
      if (props.value.getIn(['dynamicValues'])) {
        initialModalValues.dynamicValues = props.value.getIn(['dynamicValues']);
      }
      if (props.value.getIn(['relative'])) {
        initialModalValues.relative = props.value.getIn(['relative']);
      }
      if (props.value.get('not')) {
        initialModalValues.not = props.value.get('not');
      }
      if (props.value.get('isfield')) {
        initialModalValues.isfield = props.value.get('isfield');
      }
      dialogOnChange({
        target: {
          name: 'condition',
          value: initCondition
        }
      });
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
      return 1 + (modalValues[`${props.name}-0`] ? modalValues[`${props.name}-0`].length / 3 : 0);
    }
    return 1;
  }
  function nFieldsWithValues() {
    let ret = 0;
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
    const schema = {
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
              label: `Condition ${props.index + 1}`,
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
          }, {
            type: 'field',
            dimensions: {
              x: 4,
              y: 1,
              h: 1,
              w: 6
            },
            config: {
              name: 'isfield',
              label: 'Compare Against Another Field',
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
    if (props.value.get('isfield')) {
      var _context5;
      // the user comparing this field against another field on the record - JRA 10/29/2024
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: {
          x: 1,
          y: 2,
          h: 1,
          w: 8
        },
        config: {
          name: `${props.name}-0`,
          label: props.label,
          type: 'select',
          keyword: {
            options: _mapInstanceProperty(_context5 = props.classFields).call(_context5, field => ({
              label: field.get('label'),
              value: field.get('name')
            })).toList()
          }
        }
      });
      return schema;
    }
    const relativeConditions = ['is greater than', 'is less than'];
    if (_includesInstanceProperty(relativeConditions).call(relativeConditions, modalValues.get('condition')) && props.inputType === 'date') {
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
            name: `${props.name}-0`,
            label: `${props.label}`,
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
    const maxFieldCount = getMaxFieldCount();
    const minFieldCount = getMinFieldCount();
    let fieldCount = 0;
    if (maxFieldCount < 3 && maxFieldCount > 0) {
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
          label: `(${maxFieldCount} value${maxFieldCount === 1 ? '' : 's'} allowed)`
        }
      });
    }
    if (hasDynamicValues()) {
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
          label: `(${maxFieldCount} value${maxFieldCount === 1 ? '' : 's'} allowed)`,
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
    const extraFieldProps = _objectSpread({}, props);
    delete extraFieldProps.onChange;
    delete extraFieldProps.handleOnChange;
    delete extraFieldProps.name;
    delete extraFieldProps.values;
    delete extraFieldProps.value;
    if (fieldCount < nFieldsWithValues() + 1 && maxFieldCount > 0 && !modalValues.get('relative')) {
      const isContains = props.value.getIn(['condition'], '') === 'contains';
      const isIsOneOf = props.value.getIn(['condition'], '') === 'is one of';
      const isNotContains = props.value.getIn(['condition'], '') === 'does not contain';
      const isNotOneOf = props.value.getIn(['condition'], '') === 'is not one of';
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
          name: `${props.name}-0`,
          label: `${props.label}`,
          interactive: true,
          clearable: true,
          keyword: {
            category: props.keyword && props.keyword.category,
            default: '',
            options: createdInputOpts
          },
          allowcreate: isContains || isIsOneOf || isNotContains || isNotOneOf,
          searchable: true,
          // I just added this line
          type: NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) ? 'number' : props.inputType.toLowerCase(),
          // eslint-disable-line
          handleOnChange: dialogOnChange
        })
      });
      fieldCount++;
    }
    if (MULTI_FIELD_INPUTS.has(props.inputType.toLowerCase()) && maxFieldCount > 0 && !modalValues.get('relative')) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < nFieldsWithValues() + 1) {
        let label = CONDITIONS[condition()];
        if (typeof label === 'object') {
          label = label.joinString;
        }
        if (!label) {
          label = `     ...or`;
        }
        const newField = {
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
            name: `${props.name}-${fieldCount}`,
            label: label,
            interactive: true,
            clearable: true,
            type: NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) ? 'number' : props.inputType.toLowerCase(),
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
    const oldValue = props.value;
    if (oldValue && oldValue instanceof Map) {
      return props.value.get('condition', '');
    } else {
      return modalValues.get('condition', 'contains');
    }
  }
  function handleConditionChange(e) {
    const currentCondition = condition();
    setModalValues(modalValues.set(e.target.name, e.target.value));
    const trueType = (props.inputType || 'input').toLowerCase();
    if (trueType === 'typeahead') {
      if (TYPEAHEAD_CONDITIONS.has(currentCondition) && !TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        _setTimeout(() => {
          dialogOnChange({
            target: {
              name: `${props.name}-0`,
              value: ''
            }
          });
        }, 0);
      } else if (!TYPEAHEAD_CONDITIONS.has(currentCondition) && TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        _setTimeout(() => {
          dialogOnChange({
            target: {
              name: `${props.name}-0`,
              value: List()
            }
          });
        }, 0);
      }
    }
    const oldValue = props.value;
    if (oldValue && oldValue instanceof Map) {
      let newFieldValue = props.value.set(e.target.name, e.target.value);
      const maxFieldValues = CONDITIONS[newFieldValue.get('condition', 'contains')].maxFields;
      if (newFieldValue.get('values', List()).size >= maxFieldValues) {
        var _context6;
        newFieldValue = newFieldValue.set('values', _sliceInstanceProperty(_context6 = newFieldValue.get('values', List())).call(_context6, 0, maxFieldValues));
      }
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
    }
    if (!NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) && NUMERICAL_CONDITIONS.has(e.target.value) || NUMERICAL_CONDITIONS.has(props.value.getIn(['condition'], '')) && !NUMERICAL_CONDITIONS.has(e.target.value)) {
      let newFieldValue = props.value.set(e.target.name, e.target.value);
      newFieldValue = newFieldValue.set('values', List());
      props.onChange({
        target: {
          name: props.name,
          value: newFieldValue
        }
      }, props.index);
    }
  }
  function deleteIndex(i, values) {
    let stateChanges = modalValues;
    for (let x = _parseInt(i); x < values.size - 1; x++) {
      const next = x + 1;
      stateChanges = stateChanges.set(`${props.name}-${x}`, modalValues.get(`${props.name}-${next}`, ''));
    }
    stateChanges = stateChanges.delete(`${props.name}-${values.size - 1}`);
    if (i === 'relative') {
      stateChanges = stateChanges.delete(`${i}`);
    }
    setModalValues(stateChanges);
    return _spliceInstanceProperty(values).call(values, i, 1);
  }
  const dialogOnChange = e => {
    if (e.target.name === 'condition') {
      handleConditionChange(e);
      return;
    }
    setModalValues(modalValues.set(e.target.name, e.target.value)); // for display in the dialog
    let newFieldValue = props.value || Map({
      condition: 'contains',
      values: List()
    });
    let values = newFieldValue.get('values', List());
    if (newFieldValue.get('relative') && e.target.value === '') {
      newFieldValue = newFieldValue.set(e.target.name, e.target.value);
      newFieldValue = newFieldValue.delete('relative');
      newFieldValue = newFieldValue.set('values', List());
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
      newFieldValue = newFieldValue.set('values', List());
      let m = modalValues;
      m = m.set('monthtest-0', '');
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
    if (e.target.name === 'relative') {
      newFieldValue = newFieldValue.set('relative', e.target.value);
      newFieldValue = newFieldValue.set('values', List());
      let m = modalValues.set(e.target.name, e.target.value);
      m = m.delete(`${props.name}-0`);
      setModalValues(m);
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
    if (e.target.name === 'isfield') {
      // if they are toggling this, blank out the values and make them start over - JRA 10/30/2024
      newFieldValue = newFieldValue.set('isfield', e.target.value); // set the value in bleu
      newFieldValue = newFieldValue.set('values', List()); // blank the values out in bleu
      const displayValues = modalValues.merge({
        [`${props.name}-0`]: '',
        isfield: e.target.value
      });
      setModalValues(displayValues); // set the temp values displayed in the UI
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
      const i = _parseInt(e.target.name.split('-')[e.target.name.split('-').length - 1]);
      if (e.target.value === '') {
        values = deleteIndex(i, values);
      } else {
        values = values.set(i, e.target.value);
      }
    } else {
      if (typeof e.target.value === 'string') {
        const i = _parseInt(e.target.name.split('-')[e.target.name.split('-').length - 1]);
        if (i > values.size - 1) {
          values = _concatInstanceProperty(values).call(values, fromJS([e.target.value]));
        } else {
          if (e.target.value === '') {
            if (i) {
              values = deleteIndex(i, values);
            } else {
              values = deleteIndex(e.target.name, values);
            }
          } else {
            values = values.set(i, e.target.value);
          }
          // Leaving this commented out for now. Not sure what the purpose of the e.target.name check is AHP 5/20/24
          // Will remove comment after code review
          // else {
          //   if (e.target.name) {
          //     values = fromJS([e.target.value])
          //   } else {
          //     values = values.set(i, e.target.value)
          //   }
          // }
        }
      } else {
        values = fromJS(e.target.value);
        const valArr = e.target.value;
        const opts = [...createdInputOpts];
        if (valArr.length) {
          _forEachInstanceProperty(valArr).call(valArr, val => {
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement(FormBuilder, {
    formSchema: getSchema(),
    formValues: modalValues,
    conditionalSearch: false,
    handleOnChange: dialogOnChange,
    draggable: false,
    interactive: true
  }));
};
export default ConditionalPredicate;
ConditionalPredicate.propTypes = {
  onChange: PropTypes.func,
  handleClose: PropTypes.func,
  handleOnChange: PropTypes.func,
  name: PropTypes.string,
  inputType: PropTypes.string,
  index: PropTypes.number,
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
  keyword: PropTypes.object,
  classFields: PropTypes.instanceOf(Map)
};