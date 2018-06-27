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

var CONDITIONS = {
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
  }
};

var Conditionalinput = function (_Component) {
  _inherits(Conditionalinput, _Component);

  function Conditionalinput(props) {
    _classCallCheck(this, Conditionalinput);

    var _this = _possibleConstructorReturn(this, (Conditionalinput.__proto__ || Object.getPrototypeOf(Conditionalinput)).call(this, props));

    _this.closeDialogOnEnterPress = function (event) {
      return _this.state.showDialog && event.key === 'Enter' && _this.handleToggleDialog(false);
    };

    _this.handleToggleDialog = function () {
      var newState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !_this.state.showDialog;

      _this.setState({ showDialog: newState });
    };

    _this.maxFieldCount = function () {
      return CONDITIONS[_this.condition()].maxFields;
    };

    _this.minFieldCount = function () {
      return CONDITIONS[_this.condition()].minFields;
    };

    _this.parentFieldName = function () {
      return _this.props.config.name;
    };

    _this.parentLabel = function () {
      return _this.props.config.label || _this.props.config.name;
    };

    _this.inputType = function () {
      return _this.props.config.inputType || 'input';
    };

    _this.condition = function () {
      return _this.state.formValues.get('condition', '');
    };

    _this.getEventFieldIndex = function (e) {
      var name = e.target.name.split('-');
      return name[name.length - 1];
    };

    _this.convertListToOptions = function (list) {
      return list.map(function (opt) {
        return { value: opt, label: opt };
      });
    };

    _this.inputTypeOptionsList = function (type) {
      var options = [];
      Object.keys(CONDITIONS).forEach(function (key) {
        if (!Set(CONDITIONS[key].invalidInputTypes).has(type)) {
          options.push(key);
        }
      });
      return options;
    };

    _this.calculateModalHeight = function () {
      var titleAndConditionHeight = 145;
      var singleFieldHight = _this.calculateFieldHeight(_this.inputType()) * 32;
      var nFields = ONLY_CATEGORICAL_INPUT.has(_this.inputType()) ? 1 : Math.max(_this.state.values.size || 0, 1);
      nFields = Math.min(nFields, _this.maxFieldCount());
      var footerHeight = 50;
      var size = titleAndConditionHeight + singleFieldHight * nFields + footerHeight;
      return size > 500 ? '500' : '' + size;
    };

    _this.calculateFieldHeight = function (type) {
      if (type === 'radio' || type === 'listselect' || type === 'multicheckbox') {
        return _this.props.config.keyword.options.length;
      }
      return 1;
    };

    _this.formSchema = function () {
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
                name: _this.parentFieldName(),
                type: 'header',
                label: _this.parentLabel() + ' condition:'
              }
            }, {
              type: 'field',
              dimensions: { x: 1, y: 1, h: 1, w: 6 },
              config: {
                name: 'condition',
                label: 'Condition',
                type: 'select',
                keyword: {
                  category: 'NONE',
                  options: _this.convertListToOptions(_this.inputTypeOptionsList(_this.inputType()))
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
      var maxFieldCount = _this.maxFieldCount();
      var minFieldCount = _this.minFieldCount();
      var fieldCount = 0;
      if (fieldCount < _this.maxFieldCount()) {
        schema.form.jsonschema.layout.push({
          type: 'field',
          dimensions: { x: 1, y: 2, h: _this.calculateFieldHeight(_this.inputType()), w: 8 },
          config: _extends({}, _this.props.config, {
            readonly: false,
            name: _this.parentFieldName() + '-0',
            label: '' + _this.parentLabel(),
            type: _this.inputType()
          })
        });
        fieldCount++;
      }
      if (MULTI_FIELD_INPUTS.has(_this.inputType())) {
        while (fieldCount < minFieldCount || fieldCount < maxFieldCount && fieldCount < _this.state.values.size + 1) {
          var newField = {
            type: 'field',
            dimensions: { x: 1, y: fieldCount + 2, h: _this.calculateFieldHeight(_this.inputType()), w: 8 },
            config: {
              readonly: false,
              name: _this.parentFieldName() + '-' + fieldCount,
              label: CONDITIONS[_this.condition()].joinString || '     ...or',
              type: _this.inputType()
            }
          };
          if (_this.props.config.typeahead) {
            newField.config.typeahead = _this.props.config.typeahead;
          }
          schema.form.jsonschema.layout.push(newField);
          fieldCount++;
        }
      }
      return schema.form;
    };

    _this.handleConditionChange = function (e) {
      if (e.target.value === 'is between' || e.target.value === 'is not between') {
        var change = _this.state.formValues.set(e.target.name, e.target.value);
        var i = 2;
        while (i < _this.state.values.size) {
          change = change.delete(_this.parentFieldName() + '-' + i);
          i++;
        }
        _this.setState({ formValues: change, values: change });
      } else {
        _this.setState({ formValues: _this.state.formValues.set(e.target.name, e.target.value) });
      }
      if (_this.props.handleOnChange) {
        _this.props.handleOnChange({ target: { value: e.target.value, name: _this.parentFieldName() + '-CONDITION' } });
        if (e.target.value === 'is blank' || e.target.value === 'is not blank') {
          _this.props.handleOnChange({ target: { value: [], name: _this.parentFieldName() } });
        }
        if (e.target.value === 'is between' || e.target.value === 'is not between') {
          _this.props.handleOnChange({
            target: {
              value: _this.state.formValues.get(_this.parentFieldName(), List()).slice(0, 2),
              name: _this.parentFieldName()
            }
          });
        }
      }
    };

    _this.squashValues = function (deletedIndex, list, fieldPrefix) {
      var i = typeof deletedIndex === 'string' ? parseInt(deletedIndex) : deletedIndex;
      var copyField = fieldPrefix ? fieldPrefix + (i + 1) : i + 1;
      var pasteField = fieldPrefix ? fieldPrefix + i : i;
      while (i + 1 < _this.state.values.size) {
        copyField = fieldPrefix ? fieldPrefix + (i + 1) : i + 1;
        pasteField = fieldPrefix ? fieldPrefix + i : i;
        list = list.set(pasteField, list.get(copyField));
        i++;
      }
      list = list.delete(copyField);
      return list;
    };

    _this.handleOnChange = function (e) {
      if (e.target.name === 'condition') {
        _this.handleConditionChange(e);
        return;
      }
      var newTypeaheadValues = List(); // list of all the values
      if (_this.inputType() === 'typeahead') {
        if (_this.parentFieldName() !== e.target.name.split('-')[0]) {
          return; // escape if its an extraneous typeahead field)
        }
        if (e.target.id !== undefined) {
          if (e.target.id === null) {
            newTypeaheadValues = _this.state.typeaheadValues.delete(_this.getEventFieldIndex(e));
            newTypeaheadValues = _this.squashValues(_this.getEventFieldIndex(e), newTypeaheadValues);
          } else {
            newTypeaheadValues = _this.state.typeaheadValues.set(_this.getEventFieldIndex(e), e.target.id);
          }
        }
      }
      /* Categorical input come back as arrays and are always one field, and should be put directly into values.
        Other fields have one value per input field, and can have many fields, so have to be put into an array
        based on their input field index.
       */
      var newValues = List();
      var newFormValues = _this.state.formValues.set(e.target.name, e.target.value);
      if (SINGLE_FIELD_INPUTS.has(_this.inputType())) {
        newValues = e.target.value;
      } else {
        if (e.target.value === '') {
          newValues = _this.state.values.delete(_this.getEventFieldIndex(e));
          newValues = _this.squashValues(_this.getEventFieldIndex(e), newValues);
          newFormValues = _this.squashValues(_this.getEventFieldIndex(e), newFormValues, _this.parentFieldName() + '-');
        } else {
          newValues = _this.state.values.set(_this.getEventFieldIndex(e), e.target.value);
        }
      }
      _this.setState({
        formValues: newFormValues, // to update mini form
        values: newValues, // to update parent readable values
        typeaheadValues: newTypeaheadValues
      });

      if (_this.props.handleOnChange) {
        if (newValues instanceof Map || newValues instanceof List) {
          newValues = newValues.toJS();
        }
        var valEvent = {
          target: {
            value: _this.inputType() === 'typeahead' ? newTypeaheadValues : newValues,
            name: _this.parentFieldName()
          }
        };
        _this.props.handleOnChange(valEvent);
        var conditionEvent = {
          target: {
            value: _this.condition(),
            name: _this.parentFieldName() + '-CONDITION'
          }
        };
        _this.props.handleOnChange(conditionEvent);
      }
    };

    _this.hideDisplay = function () {
      if (_this.condition() === 'is blank' || _this.condition() === 'is not blank') {
        return false;
      } else {
        return _this.state.values.size === 0;
      }
    };

    _this.render = function () {
      var _this$props = _this.props,
          inline = _this$props.inline,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
          _this$props$config = _this$props.config,
          config = _this$props$config === undefined ? {} : _this$props$config,
          _this$props$Icon = _this$props.Icon,
          Icon = _this$props$Icon === undefined ? null : _this$props$Icon,
          requiredWarning = _this$props.requiredWarning;
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
              _this.handleToggleDialog(true);
            }, id: 'conditionalInput-' + name + '-id', style: styles.input },
          _this.hideDisplay() ? '' : 'Values...'
        ),
        _this.state.showDialog && React.createElement(
          Dialog,
          {
            ref: 'conditionalInput-' + name + '-dialog',
            size: {
              width: '40%',
              height: _this.calculateModalHeight()
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
                return _this.handleToggleDialog(false);
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
            React.createElement(FormBuilder, { inline: true, formName: 'conditionalInput-' + name, formSchema: _this.formSchema(), formValues: _this.state.formValues, handleOnChange: _this.handleOnChange, draggable: false })
          ),
          React.createElement(
            'button',
            { type: 'button', className: 'btn-primary pull-right', style: { paddingRight: '10px', paddingTop: '5px', marginRight: '30px', display: 'inline-block' }, onClick: function onClick() {
                return _this.handleToggleDialog(false);
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

    _this.state = {
      formValues: Map({
        condition: 'contains'
      }),
      values: List(),
      showDialog: false,
      typeaheadValues: List()
    };
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
      if (props.formValues.get(this.parentFieldName(), '') === '') {
        this.setState({
          formValues: Map({
            condition: this.inputTypeOptionsList(this.inputType())[0]
          })
        });
      }
    }

    // hideDisplay is a bool deciding whether to show colored 'Values...' text in form field or not

  }]);

  return Conditionalinput;
}(Component);

export default Conditionalinput;