'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CONDITIONS = exports.TEXT_INPUTS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _c2Dialog = require('c2-dialog');

var _FormBuilder = require('../FormBuilder');

var _FormBuilder2 = _interopRequireDefault(_FormBuilder);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */
/*
* SINGLE_FIELD_INPUTS
* These inputs will have one input field. They can have more than one value, but it is in one field
*/
var SINGLE_FIELD_INPUTS = (0, _immutable.Set)(['multiselect', 'multicheckbox', 'listselect', 'typeahead']);
/*
* MULTI_FIELD_INPUTS
* These inputs can have more than one input field, with one value per field
*/
var MULTI_FIELD_INPUTS = (0, _immutable.Set)(['input', 'date', 'datetime', 'phone', 'email', 'currency', 'time']);
var ONLY_CATEGORICAL_INPUT = (0, _immutable.Set)(['multicheckbox', 'multiselect', 'listselect']);

var ALL_BUT_DATES = (0, _immutable.Set)(['input', 'phone', 'email', 'currency', 'time', 'multicheckbox', 'multiselect', 'listselect', 'typeahead', 'textarea', 'checkbox', 'radio']);
var DATES = (0, _immutable.Set)(['date', 'datetime']);
/*
* TYPEAHEAD_CONDITIONS
* If a field is a typeahead on the original formSchema, it will only remain a typeahead input if the condition
* is one of the following. Otherwise it will be converted to an input. Typeaheads can have other conditions, but the
* the input type may change
*/
var TYPEAHEAD_CONDITIONS = (0, _immutable.Set)(['is equal to', 'is not equal to', 'is one of', 'is not one of']);
var NUMERICAL_CONDITIONS = (0, _immutable.Set)(['last (x) days', 'last (x) months', 'next (x) days', 'next (x) months']);
var TEXT_INPUTS = exports.TEXT_INPUTS = ['textarea', 'checkbox', 'radio'];
// export const LIST_INPUTS = []
var CONDITIONS = exports.CONDITIONS = {
  'contains': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES))
  },
  'is equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT)),
    joinString: '       and'
  },
  'is greater than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is less than': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is not between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES)),
    joinString: '      and'
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT), _toConsumableArray(DATES))
  },
  'is not equal to': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is not one of': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  },
  'is blank': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: []
  },
  'is not blank': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: []
  },
  'today': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'this month': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'year to date': {
    maxFields: 0,
    minFields: 0,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'last (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'last (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'next (x) days': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  'next (x) months': {
    maxFields: 1,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ALL_BUT_DATES))
  },
  '': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: []
  }
};

var Conditionalinput = function (_Component) {
  _inherits(Conditionalinput, _Component);

  function Conditionalinput(props) {
    _classCallCheck(this, Conditionalinput);

    var _this = _possibleConstructorReturn(this, (Conditionalinput.__proto__ || Object.getPrototypeOf(Conditionalinput)).call(this, props));

    _initialiseProps.call(_this);

    var conditionalFieldValues = (0, _immutable.Map)();
    var i = 0;
    var valueList = _this.getValuesFromFormValues(props.formValues, true);
    valueList.forEach(function (value) {
      conditionalFieldValues = conditionalFieldValues.set(_this.parentFieldName() + '-' + i, value);
      i++;
    });
    // take any form-builder values from props and convert them to contitional table form readable values
    var conds = [];
    if (_this.props.config.conditions) {
      conds = _this.props.config.conditions;
    } else {
      conds = CONDITIONS;
    }
    if (_this.props.config.excludeConditions) {
      var excludes = (0, _immutable.Set)(_this.props.config.excludeConditions);
      var newConds = {};
      Object.keys(conds).forEach(function (key) {
        if (!excludes.has(key)) {
          newConds[key] = conds[key];
        }
      });
      conds = newConds;
    }

    _this.state = {
      modalFormValues: (0, _immutable.Map)(_extends({
        condition: _this.getConditionFromFormValues() || _this.inputTypeOptionsList(_this.inputType())[0]
      }, conditionalFieldValues.toJS())),
      values: (0, _immutable.List)(),
      showDialog: false,
      typeaheadValues: (0, _immutable.List)(),
      conditions: conds
    };

    _this.props.handleOnChange({
      target: {
        name: _this.parentFieldName(),
        value: (0, _immutable.Map)({
          condition: _this.getConditionFromFormValues() || _this.inputTypeOptionsList(_this.inputType())[0],
          values: valueList
        })
      }
    });
    return _this;
  }

  _createClass(Conditionalinput, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.addEventListener('keypress', this.closeDialogOnEnterPress);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.removeEventListener('keypress', this.closeDialogOnEnterPress);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      if (props.formValues.get(this.parentFieldName()) !== this.props.formValues.get(this.parentFieldName())) {
        var conditionalFieldValues = (0, _immutable.Map)();
        var i = 0;
        var valueList = this.getValuesFromFormValues(props.formValues);
        if (!valueList) {
          valueList = (0, _immutable.List)();
        }
        if (typeof valueList === 'string') {
          valueList = (0, _immutable.List)();
        }
        if (SINGLE_FIELD_INPUTS.has(this.inputType())) {
          conditionalFieldValues = conditionalFieldValues.set(this.parentFieldName() + '-0', valueList);
        } else {
          valueList.forEach(function (value) {
            conditionalFieldValues = conditionalFieldValues.set(_this2.parentFieldName() + '-' + i, value);
            i++;
          });
        }

        // take any form-builder values from props and convert them to contitional table form readable values
        this.setState({
          modalFormValues: (0, _immutable.Map)(_extends({
            condition: this.getConditionFromFormValues(props.formValues) || this.inputTypeOptionsList(this.inputType())[0]
          }, conditionalFieldValues.toJS())) });
      }
    }
    /*
    this.props.formValues: {
      key: [values]
    }
    this.state.modalFormValues: {
      key: {
        condition: '',
        values: [''] || [{label: '', values: ''}]
      }
    */


    // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not

  }]);

  return Conditionalinput;
}(_react.Component);

Conditionalinput.propTypes = {
  handleOnChange: _propTypes2.default.func,
  config: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  inline: _propTypes2.default.bool,
  Icon: _propTypes2.default.func
};

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getConditionFromFormValues = function () {
    var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props.formValues;

    var val = formValues.get(_this3.parentFieldName());
    if (val && val instanceof _immutable.Map) {
      return formValues.get(_this3.parentFieldName(), (0, _immutable.Map)()).get('condition', null);
    } else {
      return null;
    }
  };

  this.getValuesFromFormValues = function () {
    var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props.formValues;
    var isConstructor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var val = void 0;
    if (isConstructor && _this3.props.config.metaConfig) {
      val = formValues.get(_this3.props.config.metaConfig.name);
    } else {
      val = formValues.get(_this3.parentFieldName());
    }
    if (val) {
      if (val instanceof _immutable.Map) {
        return val.get('values', (0, _immutable.List)());
      } else if (val instanceof _immutable.List) {
        return val;
      } else {
        // val is typeof string
        return (0, _immutable.List)([val]);
      }
    }
    return (0, _immutable.List)();
  };

  this.closeDialogOnEnterPress = function (event) {
    return _this3.state.showDialog && event.key === 'Enter' && _this3.handleToggleDialog(false);
  };

  this.handleToggleDialog = function () {
    var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this3.state.showDialog;

    _this3.setState({ showDialog: newState });
  };

  this.maxFieldCount = function () {
    if (_this3.state.conditions[_this3.condition()]) {
      return _this3.state.conditions[_this3.condition()].maxFields;
    } else {
      return 999;
    }
  };

  this.minFieldCount = function () {
    if (_this3.state.conditions[_this3.condition()]) {
      return _this3.state.conditions[_this3.condition()].minFields;
    } else {
      return 0;
    }
  };

  this.parentFieldName = function () {
    return _this3.props.config.name;
  };

  this.parentLabel = function () {
    return _this3.props.config.label || _this3.props.config.name;
  };

  this.inputType = function () {
    var inputType = (_this3.props.config.inputType || _this3.props.config.inputtype || 'input').toLowerCase();
    var cond = _this3.condition();
    if (!TYPEAHEAD_CONDITIONS.has(cond) && inputType === 'typeahead') {
      inputType = 'input';
    }
    return inputType;
  };

  this.condition = function () {
    var oldValue = _this3.props.formValues.get(_this3.parentFieldName());
    if (oldValue && oldValue instanceof _immutable.Map) {
      return _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)()).get('condition', '');
    } else {
      if (_this3.state) {
        return _this3.state.modalFormValues.get('condition', '');
      } else {
        return 'contains';
      }
    }
  };

  this.getEventFieldIndex = function (e) {
    var name = e.target.name.split('-');
    return name[name.length - 1];
  };

  this.convertListToOptions = function (list) {
    return list.map(function (opt) {
      return { value: opt, label: opt };
    });
  };

  this.inputTypeOptionsList = function (type) {
    if (_this3.state) {
      var conditions = _this3.state.conditions;

      var options = [];
      Object.keys(conditions).forEach(function (key) {
        if (!(0, _immutable.Set)(conditions[key].invalidInputTypes).has(type)) {
          options.push(key);
        }
      });
      return options;
    } else {
      var _conditions = CONDITIONS;
      var _options = [];
      Object.keys(_conditions).forEach(function (key) {
        if (!(0, _immutable.Set)(_conditions[key].invalidInputTypes).has(type)) {
          _options.push(key);
        }
      });
      return _options;
    }
  };

  this.calculateModalHeight = function () {
    var titleAndConditionHeight = 145;
    var singleFieldHight = _this3.calculateFieldHeight(_this3.inputType()) * 30;
    var nFields = SINGLE_FIELD_INPUTS.has(_this3.inputType()) ? 1 : _this3.nFieldsWithValues() + 1;
    nFields = Math.min(nFields, _this3.maxFieldCount());
    var footerHeight = 50;
    var size = titleAndConditionHeight + singleFieldHight * nFields + footerHeight;
    return size > 500 ? '500' : '' + size;
  };

  this.nFieldsWithValues = function () {
    if (SINGLE_FIELD_INPUTS.has(_this3.inputType())) {
      if (_this3.props.formValues.getIn([_this3.parentFieldName(), 'values'], (0, _immutable.List)()).size > 0) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return _this3.props.formValues.getIn([_this3.parentFieldName(), 'values'], (0, _immutable.List)()).size;
    }
  };

  this.calculateFieldHeight = function (type) {
    if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
      return _this3.props.config.keyword.options.length;
    }
    return 1;
  };

  this.formSchema = function () {
    // for Dialog
    var schema = {
      form: {
        name: 'Conditional Input1',
        description: 'allow more complex inputs.',
        jsonschema: {
          layout: [{
            type: 'field',
            dimensions: { x: 0, y: 0, h: 1, w: 6 },
            config: {
              name: _this3.parentFieldName(),
              type: 'header',
              label: _this3.parentLabel() + ' condition:'
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
                options: _this3.convertListToOptions(_this3.inputTypeOptionsList(_this3.inputType()))
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
    var maxFieldCount = _this3.maxFieldCount();
    var minFieldCount = _this3.minFieldCount();
    var fieldCount = 0;
    if (maxFieldCount < 3 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: { x: 4, y: 2, h: 1, w: 6 },
        config: {
          name: _this3.parentFieldName(),
          type: 'header',
          style: { lineHeight: '12px', fontSize: '12px' },
          label: '(' + maxFieldCount + ' value' + (maxFieldCount === 1 ? '' : 's') + ' allowed)'
        }
      });
    }
    if (fieldCount < _this3.nFieldsWithValues() + 1 && maxFieldCount > 0) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: { x: 1, y: 3, h: _this3.calculateFieldHeight(_this3.inputType()), w: 8 },
        config: _extends({}, _this3.props.config, {
          autofocus: true,
          readonly: false,
          name: _this3.parentFieldName() + '-0',
          label: '' + _this3.parentLabel(),
          type: DATES.has(_this3.inputType()) && NUMERICAL_CONDITIONS.has(_this3.props.formValues.getIn([_this3.parentFieldName(), 'condition'], '')) ? 'number' : _this3.inputType()
        })
      });
      fieldCount++;
    }
    if (MULTI_FIELD_INPUTS.has(_this3.inputType()) && maxFieldCount > 0) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < _this3.nFieldsWithValues() + 1) {
        var label = _this3.state.conditions[_this3.condition()];
        if ((typeof label === 'undefined' ? 'undefined' : _typeof(label)) === 'object') {
          label = label.joinString;
        }
        if (!label) {
          label = '     ...or';
        }
        var newField = {
          type: 'field',
          dimensions: { x: 1, y: fieldCount + 3, h: _this3.calculateFieldHeight(_this3.inputType()), w: 8 },
          config: _extends({}, _this3.props.config, {
            readonly: false,
            name: _this3.parentFieldName() + '-' + fieldCount,
            label: label,
            type: DATES.has(_this3.inputType()) && NUMERICAL_CONDITIONS.has(_this3.props.formValues.getIn([_this3.parentFieldName(), 'condition'], '')) ? 'number' : _this3.inputType()
          })
        };
        if (_this3.props.config.typeahead) {
          newField.config.typeahead = _this3.props.config.typeahead;
        }
        schema.form.jsonschema.layout.push(newField);
        fieldCount++;
      }
    }
    return schema.form;
  };

  this.handleConditionChange = function (e) {
    var currentCondition = _this3.condition();
    _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
    var trueType = (_this3.props.config.inputType || _this3.props.config.inputtype || 'input').toLowerCase();
    if (trueType === 'typeahead') {
      if (TYPEAHEAD_CONDITIONS.has(currentCondition) && !TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(function () {
          _this3.handleOnChange({ target: { name: _this3.parentFieldName() + '-0', value: '' } });
        }, 0);
      } else if (!TYPEAHEAD_CONDITIONS.has(currentCondition) && TYPEAHEAD_CONDITIONS.has(e.target.value)) {
        setTimeout(function () {
          _this3.handleOnChange({ target: { name: _this3.parentFieldName() + '-0', value: (0, _immutable.List)() } });
        }, 0);
      }
    }
    var oldValue = _this3.props.formValues.get(_this3.parentFieldName());
    if (oldValue && oldValue instanceof _immutable.Map) {
      var newFieldValue = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)()).set(e.target.name, e.target.value);
      var maxFieldValues = _this3.state.conditions[newFieldValue.get('condition', 'contains')].maxFields;
      if (newFieldValue.get('values', (0, _immutable.List)()).size >= maxFieldValues) {
        newFieldValue = newFieldValue.set('values', newFieldValue.get('values', (0, _immutable.List)()).slice(0, maxFieldValues));
      }
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: newFieldValue } });
    }
    if (!NUMERICAL_CONDITIONS.has(_this3.props.formValues.getIn([_this3.parentFieldName(), 'condition'], '')) && NUMERICAL_CONDITIONS.has(e.target.value) || NUMERICAL_CONDITIONS.has(_this3.props.formValues.getIn([_this3.parentFieldName(), 'condition'], '')) && !NUMERICAL_CONDITIONS.has(e.target.value)) {
      var _newFieldValue = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)()).set(e.target.name, e.target.value);
      _newFieldValue = _newFieldValue.set('values', (0, _immutable.List)());
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: _newFieldValue } });
    }
  };

  this.squashValues = function (deletedIndex, list, fieldPrefix) {
    var i = typeof deletedIndex === 'string' ? parseInt(deletedIndex) : deletedIndex;
    var copyField = fieldPrefix ? fieldPrefix + (i + 1) : i + 1;
    var pasteField = fieldPrefix ? fieldPrefix + i : i;
    while (i + 1 < _this3.state.values.size) {
      copyField = fieldPrefix ? fieldPrefix + (i + 1) : i + 1;
      pasteField = fieldPrefix ? fieldPrefix + i : i;
      list = list.set(pasteField, list.get(copyField));
      i++;
    }
    list = list.delete(copyField);
    return list;
  };

  this.handleOnChange = function (e) {
    if (e.target.name === 'condition') {
      _this3.handleConditionChange(e);
      return;
    }
    var values = (0, _immutable.List)();
    if (_this3.inputType() === 'typeahead' || e.target.value instanceof _immutable.List) {
      values = e.target.value;
    } else {
      if (typeof e.target.value === 'string') {
        if (e.target.value === '' && _this3.inputType() === 'multiselect') {
          values = (0, _immutable.List)();
        } else {
          values = e.target.value;
        }
      } else {
        values = e.target.value.get('values');
      }
    }
    if (!(values instanceof _immutable.List)) {
      values = (0, _immutable.fromJS)(values);
    }
    if (_this3.maxFieldCount() < values.size) {
      return; // escape if more values than allowed selected
    }
    if (_this3.inputType() === 'typeahead') {
      if (_this3.parentFieldName() !== e.target.name.split('-')[0]) {
        return; // escape if its an extraneous typeahead field)
      }
      if (e.target.value !== undefined || e.target.value !== null) {
        var oldValue = void 0;
        if (typeof e.target.value === 'string') {
          oldValue = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)()).setIn(['values'], (0, _immutable.List)([e.target.value]));
        } else {
          oldValue = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)()).setIn(['values'], (0, _immutable.List)(e.target.value));
        }

        _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: oldValue } });
        _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
      } else {
        _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
      }
    } else if (e.target.value instanceof _immutable.List) {
      var _oldValue = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)());
      _oldValue = _oldValue.setIn(['values'], e.target.value);
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: _oldValue } });
      _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
    } else {
      var _oldValue2 = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)());
      if (MULTI_FIELD_INPUTS.has(_this3.inputType())) {
        _oldValue2 = _oldValue2.setIn(['values', _this3.getEventFieldIndex(e)], typeof e.target.value === 'string' ? e.target.value : e.target.value.get('values'));
      } else {
        if (typeof e.target.value === 'string') {
          if (e.target.value === '' && _this3.inputType() === 'multiselect') {
            _oldValue2 = _oldValue2.setIn(['values'], (0, _immutable.List)());
          } else {
            _oldValue2 = _oldValue2.setIn(['values'], e.target.value);
          }
        } else {
          _oldValue2 = _oldValue2.setIn(['values'], e.target.value.get('values'));
        }
      }
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: _oldValue2 } });
      _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
    }
  };

  this.hideDisplay = function () {
    if (_this3.condition() === 'is blank' || _this3.condition() === 'is not blank') {
      return false;
    } else {
      var tmp = _this3.props.formValues.get(_this3.parentFieldName(), (0, _immutable.Map)());
      if (tmp instanceof _immutable.Map) {
        return tmp.get('values', (0, _immutable.List)()).size === 0;
      } else {
        return true;
      }
    }
  };

  this.render = function () {
    var _props = _this3.props,
        inline = _props.inline,
        _props$formValues = _props.formValues,
        formValues = _props$formValues === undefined ? (0, _immutable.Map)() : _props$formValues,
        _props$config = _props.config,
        config = _props$config === undefined ? {} : _props$config,
        _props$Icon = _props.Icon,
        Icon = _props$Icon === undefined ? null : _props$Icon,
        requiredWarning = _props.requiredWarning;
    var _config$labelStyle = config.labelStyle,
        labelStyle = _config$labelStyle === undefined ? {} : _config$labelStyle,
        _config$style = config.style,
        style = _config$style === undefined ? {} : _config$style,
        _config$name = config.name,
        name = _config$name === undefined ? null : _config$name,
        _config$iconStyle = config.iconStyle,
        iconStyle = _config$iconStyle === undefined ? {} : _config$iconStyle,
        _config$required = config.required,
        required = _config$required === undefined ? false : _config$required;

    if (!name) return null;
    var _config$label = config.label,
        label = _config$label === undefined ? name : _config$label;

    var warn = requiredWarning && formValues.get(name, '').length === 0 && required;
    var styles = {
      container: {
        display: 'flex',
        flex: 1,
        flexDirection: inline ? 'row' : 'column',
        background: 'transparent'
      },
      labelContainer: _extends({
        display: 'flex',
        flexDirection: 'row',
        width: inline ? 150 : '100%',
        minWidth: inline ? 150 : '100%',
        height: 15,
        marginTop: inline ? 4 : 0,
        background: 'transparent'
      }, labelStyle),
      label: _extends({
        display: 'flex',
        justifyContent: 'flex-start',
        lineHeight: inline ? '23px' : '15px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        fontSize: inline ? '10pt' : '8pt',
        color: '#383e4b',
        background: 'transparent'
      }, labelStyle),
      input: _extends({
        display: 'flex',
        flexGrow: inline ? 1 : 0,
        paddingLeft: 5,
        backgroundColor: 'transparent',
        borderBottom: warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderTop: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderLeft: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        borderRight: inline ? 0 : warn ? '1px solid #ec1c24' : '1px solid #a0a0a0',
        minWidth: 177,
        color: '#2b71e2',
        height: inline ? 'auto' : 25
      }, style),
      icon: _extends({
        marginRight: 5,
        width: 15,
        height: 15,
        marginTop: inline ? 4 : -1
      }, iconStyle)
    };
    return _react2.default.createElement(
      'div',
      { style: styles.container },
      _react2.default.createElement(
        'div',
        { style: styles.labelContainer },
        required && _react2.default.createElement(
          'div',
          { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
          '*'
        ),
        Icon && _react2.default.createElement(Icon, { style: styles.icon }),
        _react2.default.createElement(
          'strong',
          { style: styles.label },
          label
        )
      ),
      _react2.default.createElement(
        'div',
        { onClick: function onClick() {
            _this3.handleToggleDialog(true);
          }, id: 'conditionalInput-' + name + '-id', style: styles.input },
        _this3.hideDisplay() ? '' : 'Values...'
      ),
      _this3.state.showDialog && _react2.default.createElement(
        _c2Dialog.Dialog,
        {
          ref: 'conditionalInput-' + name + '-dialog',
          size: {
            width: '800px',
            height: _this3.calculateModalHeight()
          },
          'default': {
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
        },
        _react2.default.createElement(
          'div',
          { style: { width: '100%' } },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'close', style: { paddingRight: '10px', paddingTop: '5px', display: 'inline-block' }, onClick: function onClick() {
                return _this3.handleToggleDialog(false);
              } },
            _react2.default.createElement(
              'span',
              null,
              '\xD7'
            )
          ),
          _react2.default.createElement(
            'div',
            { style: { display: 'flex', flexDirection: 'row' } },
            _react2.default.createElement(
              'div',
              {
                style: {
                  width: '720px',
                  maxHeight: '410px',
                  marginTop: '10px',
                  scroll: parseInt(_this3.calculateModalHeight()) < 500 ? false : 'auto',
                  overflowY: parseInt(_this3.calculateModalHeight()) < 500 ? 'visible' : 'auto'
                }
              },
              _react2.default.createElement(_FormBuilder2.default, {
                inline: true,
                formSchema: _this3.formSchema(),
                formValues: _this3.state.modalFormValues,
                conditionalFieldValues: true,
                handleOnChange: _this3.handleOnChange,
                draggable: false
              })
            )
          ),
          _react2.default.createElement(
            'div',
            {
              style: {
                marginTop: '10px',
                marginRight: '25px',
                display: 'flex',
                flexDirection: 'row-reverse'
              }
            },
            _react2.default.createElement(
              'button',
              {
                type: 'button',
                className: 'btn-primary pull-right',
                onClick: function onClick() {
                  return _this3.handleToggleDialog(false);
                }
              },
              'Ok'
            )
          )
        )
      )
    );
  };
};

exports.default = Conditionalinput;