var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import React, { Component } from 'react';
import { Map, Set, List } from 'immutable';
import { Dialog } from 'c2-dialog';
import FormBuilder from '../GridFormBuilder';

/*
  Select Fields are converted to multiselects
  radio buttons are converted to multicheckboxes
  checkboxes are converted to multicheckboxes
 */

var SINGLE_FIELD_INPUTS = Set(['multiselect', 'multicheckbox', 'listselect']);
var MULTI_FIELD_INPUTS = Set(['input', 'date', 'datetime', 'phone', 'typeahead']);
var ONLY_CATEGORICAL_INPUT = Set(['multicheckbox', 'multiselect', 'listselect']);

export var CONDITIONS = {
  'contains': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is between': {
    maxFields: 2,
    minFields: 2,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT)),
    joinString: '       and'
  },
  'is equal to': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
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
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT)),
    joinString: '      and'
  },
  'does not contain': {
    maxFields: 999,
    minFields: 1,
    invalidInputTypes: [].concat(_toConsumableArray(ONLY_CATEGORICAL_INPUT))
  },
  'is not equal to': {
    maxFields: 999,
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

    var conditionalFieldValues = Map();
    var i = 0;
    var valueList = _this.getValuesFromFormValues();
    valueList.forEach(function (value) {
      conditionalFieldValues = conditionalFieldValues.set(_this.parentFieldName() + '-' + i, value);
      i++;
    });
    // take any form-builder values from props and convert them to contitional table form readable values
    _this.state = {
      modalFormValues: Map(_extends({
        condition: _this.getConditionFromFormValues() || _this.inputTypeOptionsList(_this.inputType())[0]
      }, conditionalFieldValues.toJS())),
      values: List(),
      showDialog: false,
      typeaheadValues: List()
      // convert this.props.formValues to conditional form values
    };_this.props.handleOnChange({
      target: {
        name: _this.parentFieldName(),
        value: Map({
          condition: _this.state.modalFormValues.get('condition'),
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
        var conditionalFieldValues = Map();
        var i = 0;
        var valueList = this.getValuesFromFormValues(props.formValues);
        if (!valueList) {
          valueList = List();
        }
        if (typeof valueList === 'string') {
          valueList = List();
        }
        valueList.forEach(function (value) {
          conditionalFieldValues = conditionalFieldValues.set(_this2.parentFieldName() + '-' + i, value);
          i++;
        });
        // take any form-builder values from props and convert them to contitional table form readable values
        this.setState({
          modalFormValues: Map(_extends({
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
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.getConditionFromFormValues = function () {
    var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props.formValues;

    var val = formValues.get(_this3.parentFieldName());
    if (val && val instanceof Map) {
      return formValues.get(_this3.parentFieldName(), Map()).get('condition', null);
    } else {
      return null;
    }
  };

  this.getValuesFromFormValues = function () {
    var formValues = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this3.props.formValues;

    var val = formValues.get(_this3.parentFieldName());
    if (val) {
      if (val instanceof Map) {
        return val.get('values', List());
      } else if (val instanceof List) {
        return val;
      } else {
        // val is typeof string
        return List([val]);
      }
    }
    return List();
  };

  this.closeDialogOnEnterPress = function (event) {
    return _this3.state.showDialog && event.key === 'Enter' && _this3.handleToggleDialog(false);
  };

  this.handleToggleDialog = function () {
    var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this3.state.showDialog;

    _this3.setState({ showDialog: newState });
  };

  this.maxFieldCount = function () {
    return CONDITIONS[_this3.condition()].maxFields;
  };

  this.minFieldCount = function () {
    return CONDITIONS[_this3.condition()].minFields;
  };

  this.parentFieldName = function () {
    return _this3.props.config.name;
  };

  this.parentLabel = function () {
    return _this3.props.config.label || _this3.props.config.name;
  };

  this.inputType = function () {
    return (_this3.props.config.inputType || _this3.props.config.inputtype || 'input').toLowerCase();
  };

  this.condition = function () {
    var oldValue = _this3.props.formValues.get(_this3.parentFieldName());
    if (oldValue && oldValue instanceof Map) {
      return _this3.props.formValues.get(_this3.parentFieldName(), Map()).get('condition', '');
    } else {
      return _this3.state.modalFormValues.get('condition', '');
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
    var options = [];
    Object.keys(CONDITIONS).forEach(function (key) {
      if (!Set(CONDITIONS[key].invalidInputTypes).has(type)) {
        options.push(key);
      }
    });
    return options;
  };

  this.calculateModalHeight = function () {
    var titleAndConditionHeight = 145;
    var singleFieldHight = _this3.calculateFieldHeight(_this3.inputType()) * 32;
    var nFields = SINGLE_FIELD_INPUTS.has(_this3.inputType()) ? 1 : _this3.nFieldsWithValues() + 1;
    nFields = Math.min(nFields, _this3.maxFieldCount());
    var footerHeight = 50;
    var size = titleAndConditionHeight + singleFieldHight * nFields + footerHeight;
    return size > 500 ? '500' : '' + size;
  };

  this.nFieldsWithValues = function () {
    if (SINGLE_FIELD_INPUTS.has(_this3.inputType())) {
      if (_this3.props.formValues.getIn([_this3.parentFieldName(), 'values'], List()).size > 0) {
        return 1;
      } else {
        return 0;
      }
    } else {
      return _this3.props.formValues.getIn([_this3.parentFieldName(), 'values'], List()).size;
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
            dimensions: { x: 1, y: 1, h: 1, w: 6 },
            config: {
              name: 'condition',
              label: 'Condition',
              type: 'select',
              suppressBlankOption: true,
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
    if (fieldCount < _this3.maxFieldCount()) {
      schema.form.jsonschema.layout.push({
        type: 'field',
        dimensions: { x: 1, y: 2, h: _this3.calculateFieldHeight(_this3.inputType()), w: 8 },
        config: _extends({}, _this3.props.config, {
          readonly: false,
          name: _this3.parentFieldName() + '-0',
          label: '' + _this3.parentLabel(),
          type: _this3.inputType()
        })
      });
      fieldCount++;
    }
    if (MULTI_FIELD_INPUTS.has(_this3.inputType())) {
      while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < _this3.nFieldsWithValues() + 1) {
        var newField = {
          type: 'field',
          dimensions: { x: 1, y: fieldCount + 2, h: _this3.calculateFieldHeight(_this3.inputType()), w: 8 },
          config: {
            readonly: false,
            name: _this3.parentFieldName() + '-' + fieldCount,
            label: CONDITIONS[_this3.condition()].joinString || '     ...or',
            type: _this3.inputType()
          }
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
    _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
    var oldValue = _this3.props.formValues.get(_this3.parentFieldName());
    if (oldValue && oldValue instanceof Map) {
      var newFieldValue = _this3.props.formValues.get(_this3.parentFieldName(), Map()).set(e.target.name, e.target.value);
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: newFieldValue } });
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
    if (_this3.inputType() === 'typeahead') {
      if (_this3.parentFieldName() !== e.target.name.split('-')[0]) {
        return; // escape if its an extraneous typeahead field)
      }
      _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });

      if (e.target.id !== undefined) {
        if (e.target.id === null) {
          var oldValue = _this3.props.formValues.get(_this3.parentFieldName(), Map());
          oldValue = oldValue.setIn(['values', _this3.getEventFieldIndex(e)], { label: e.target.value, value: e.target.value });
          _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: oldValue } });
          return;
        } else {
          var _oldValue = _this3.props.formValues.get(_this3.parentFieldName(), Map());
          _oldValue = _oldValue.setIn(['values', _this3.getEventFieldIndex(e)], { label: e.target.value, value: e.target.id });
          _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: _oldValue } });
          return;
        }
      } else {
        console.error('No Id found for selected ', e.target.name, ' typeahead field value');
      }
    }
    // give modal form its expected simple values
    _this3.setState({ modalFormValues: _this3.state.modalFormValues.set(e.target.name, e.target.value) });
    // send conditional values back to parent
    if (e.target.value instanceof List) {
      var _oldValue2 = _this3.props.formValues.get(_this3.parentFieldName(), Map());
      _oldValue2 = _oldValue2.setIn(['values'], e.target.value);
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: _oldValue2 } });
    } else {
      var _oldValue3 = _this3.props.formValues.get(_this3.parentFieldName(), Map());
      if (MULTI_FIELD_INPUTS.has(_this3.inputType())) {
        _oldValue3 = _oldValue3.setIn(['values', _this3.getEventFieldIndex(e)], typeof e.target.value === 'string' ? e.target.value : e.target.value.get('values'));
      } else {
        _oldValue3 = _oldValue3.setIn(['values'], typeof e.target.value === 'string' ? e.target.value : e.target.value.get('values'));
      }
      _this3.props.handleOnChange({ target: { name: _this3.parentFieldName(), value: _oldValue3 } });
    }
  };

  this.hideDisplay = function () {
    if (_this3.condition() === 'is blank' || _this3.condition() === 'is not blank') {
      return false;
    } else {
      var tmp = _this3.props.formValues.get(_this3.parentFieldName(), Map());
      if (tmp instanceof Map) {
        return tmp.get('values', List()).size === 0;
      } else {
        return true;
      }
    }
  };

  this.render = function () {
    var _props = _this3.props,
        inline = _props.inline,
        _props$formValues = _props.formValues,
        formValues = _props$formValues === undefined ? Map() : _props$formValues,
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
    return React.createElement(
      'div',
      { style: styles.container },
      React.createElement(
        'div',
        { style: styles.labelContainer },
        required && React.createElement(
          'div',
          { style: { color: '#ec1c24', fontWeight: 'bold', fontSize: '15pt', lineHeight: '10pt' } },
          '*'
        ),
        Icon && React.createElement(Icon, { style: styles.icon }),
        React.createElement(
          'strong',
          { style: styles.label },
          label
        )
      ),
      React.createElement(
        'div',
        { onClick: function onClick() {
            _this3.handleToggleDialog(true);
          }, id: 'conditionalInput-' + name + '-id', style: styles.input },
        _this3.hideDisplay() ? '' : 'Values...'
      ),
      _this3.state.showDialog && React.createElement(
        Dialog,
        {
          ref: 'conditionalInput-' + name + '-dialog',
          size: {
            width: '40%',
            height: _this3.calculateModalHeight()
          },
          center: true,
          style: {
            background: '#fff',
            boxShadow: '0px 0px 15px #444',
            borderRadius: '5px',
            border: '2px solid #36a9e1',
            position: 'fixed',
            top: '30%', // `${this.state.fieldPos.top - 180 > 0 ? this.state.fieldPos.top - 180 : 30}px`,
            left: '30%', // `${this.state.fieldPos.left + 100}px`,
            overflowY: 'visible'
          },
          enableResizing: true,
          disableDragging: true
        },
        React.createElement(
          'button',
          { type: 'button', className: 'close', style: { paddingRight: '10px', paddingTop: '5px', display: 'inline-block' }, onClick: function onClick() {
              return _this3.handleToggleDialog(false);
            } },
          React.createElement(
            'span',
            null,
            '\xD7'
          )
        ),
        React.createElement(
          'div',
          { style: { display: 'flex', flexDirection: 'column', flex: 1, width: '100%', height: '100%', marginBottom: '-80px' } },
          React.createElement(FormBuilder, { inline: true, formName: 'conditionalInput-' + name, formSchema: _this3.formSchema(), formValues: _this3.state.modalFormValues, handleOnChange: _this3.handleOnChange, draggable: false })
        ),
        React.createElement(
          'button',
          { type: 'button', className: 'btn-primary pull-right', style: { paddingRight: '10px', paddingTop: '5px', marginRight: '30px', display: 'inline-block' }, onClick: function onClick() {
              return _this3.handleToggleDialog(false);
            } },
          React.createElement(
            'span',
            null,
            'Ok'
          )
        )
      )
    );
  };
};

export default Conditionalinput;