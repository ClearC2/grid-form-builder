var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WidgetGrid from './WidgetGrid';
import { Map, fromJS } from 'immutable';
import Input from './FieldDefinitions/Input';
import Textarea from './FieldDefinitions/Textarea';
import Datetime from './FieldDefinitions/Datetime';
import Date from './FieldDefinitions/Date';
import Select from './FieldDefinitions/Select';
import Radio from './FieldDefinitions/Radio';
import Checkbox from './FieldDefinitions/Checkbox';
import Multicheckbox from './FieldDefinitions/Multicheckbox';
import Header from './FieldDefinitions/Header';
import Typeahead from './FieldDefinitions/Typeahead';
import Listselect from './FieldDefinitions/Listselect';
import Conditionalinput from './FieldDefinitions/Conditionalinput';
import Multiselect from './FieldDefinitions/Multiselect';
import Phone from './FieldDefinitions/Phone';

var validComponents = Map();
export function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map();

  defs = fromJS(defs);
  validComponents = defs;
}

var IconLibrary = {};
export function initComponentIconLibrary() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if ((typeof defs === 'undefined' ? 'undefined' : _typeof(defs)) !== 'object') {
    IconLibrary = {};
    return;
  }
  var formattedKeys = {};
  Object.keys(defs).map(function (name) {
    var component = defs[name];
    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
    formattedKeys[name] = component;
  });
  IconLibrary = formattedKeys;
}

export var updateFormValues = function updateFormValues(fieldsToUpdate, currentFormValues) {
  var fields = fieldsToUpdate;
  if (!Array.isArray(fields)) fields = [fields];
  var formValues = currentFormValues;
  if (typeof formValues === 'undefined') {
    console.error('You did something wrong, grid form builder is trying to update values but there are no values.');
    return Map();
  }
  fields.map(function (field) {
    formValues = formValues.set(field.target.name, field.target.value);
  });
  return formValues;
};

var Customcomponent = function (_Component) {
  _inherits(Customcomponent, _Component);

  function Customcomponent() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Customcomponent);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Customcomponent.__proto__ || Object.getPrototypeOf(Customcomponent)).call.apply(_ref, [this].concat(args))), _this), _this.render = function () {
      var Component = validComponents.get((_this.props.config.component + '').toLowerCase());
      if (Component) {
        return React.createElement(
          'div',
          { style: { display: 'flex', flex: 1, flexDirection: 'row' } },
          React.createElement(Component, _this.props)
        );
      } else {
        return React.createElement('div', null);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Customcomponent;
}(Component);

var FormComponents = { Input: Input, Textarea: Textarea, Datetime: Datetime, Date: Date, Select: Select, Radio: Radio, Checkbox: Checkbox, Multicheckbox: Multicheckbox, Header: Header, Typeahead: Typeahead, Listselect: Listselect, Conditionalinput: Conditionalinput, Multiselect: Multiselect, Customcomponent: Customcomponent, Phone: Phone };

var FormBuilder = function (_Component2) {
  _inherits(FormBuilder, _Component2);

  function FormBuilder() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, FormBuilder);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call.apply(_ref2, [this].concat(args))), _this2), _this2.state = {
      requiredWarning: false
    }, _this2.onSubmit = function () {
      var _this2$props = _this2.props,
          _this2$props$formSche = _this2$props.formSchema,
          formSchema = _this2$props$formSche === undefined ? Map() : _this2$props$formSche,
          _this2$props$formValu = _this2$props.formValues,
          formValues = _this2$props$formValu === undefined ? Map() : _this2$props$formValu,
          _this2$props$handleSu = _this2$props.handleSubmit,
          handleSubmit = _this2$props$handleSu === undefined ? function () {
        console.warn('onSubmit was called but no handleSubmit function was provided.');
      } : _this2$props$handleSu;

      formValues = typeof formValues.isMap === 'function' ? formValues : Map(formValues);
      formSchema = typeof formSchema.toJS === 'function' ? formSchema.toJS() : formSchema;
      var _formSchema = formSchema,
          form = _formSchema.form,
          jsonschema = _formSchema.jsonschema;

      jsonschema = jsonschema || form || {};
      var _jsonschema = jsonschema,
          _jsonschema$layout = _jsonschema.layout,
          layout = _jsonschema$layout === undefined ? [] : _jsonschema$layout;

      layout = typeof layout.toJS === 'function' ? layout.toJS() : layout;
      var formIncomplete = layout.some(function (field) {
        var _field$config = field.config,
            config = _field$config === undefined ? {} : _field$config;
        var _config$required = config.required,
            required = _config$required === undefined ? false : _config$required;

        if (!required) return false;
        if (required && formValues.get(field.name, '').length === 0) return true;
      });
      if (formIncomplete) _this2.setState({ requiredWarning: true });else handleSubmit();
    }, _this2.uppercaseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }, _this2.render = function () {
      var _this2$props2 = _this2.props,
          _this2$props2$formSch = _this2$props2.formSchema,
          formSchema = _this2$props2$formSch === undefined ? Map() : _this2$props2$formSch,
          _this2$props2$formVal = _this2$props2.formValues,
          formValues = _this2$props2$formVal === undefined ? Map() : _this2$props2$formVal,
          _this2$props2$handleO = _this2$props2.handleOnChange,
          handleOnChange = _this2$props2$handleO === undefined ? function () {} : _this2$props2$handleO,
          _this2$props2$formNam = _this2$props2.formName,
          formName = _this2$props2$formNam === undefined ? 'form' : _this2$props2$formNam,
          _this2$props2$draggab = _this2$props2.draggable,
          draggable = _this2$props2$draggab === undefined ? false : _this2$props2$draggab,
          _this2$props2$inline = _this2$props2.inline,
          inline = _this2$props2$inline === undefined ? false : _this2$props2$inline,
          _this2$props2$style = _this2$props2.style,
          style = _this2$props2$style === undefined ? {} : _this2$props2$style;
      var requiredWarning = _this2.state.requiredWarning;

      formValues = typeof formValues.isMap === 'function' ? formValues : Map(formValues);
      formSchema = typeof formSchema.toJS === 'function' ? formSchema.toJS() : formSchema;
      var dateFields = [];
      var normalFields = [];
      var _formSchema2 = formSchema,
          form = _formSchema2.form,
          jsonschema = _formSchema2.jsonschema;

      jsonschema = jsonschema || form || {};
      var _jsonschema2 = jsonschema,
          _jsonschema2$layout = _jsonschema2.layout,
          layout = _jsonschema2$layout === undefined ? [] : _jsonschema2$layout;
      // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017

      layout.map(function (field, i) {
        var _field$config2 = field.config,
            config = _field$config2 === undefined ? {} : _field$config2,
            _field$dimensions = field.dimensions,
            dimensions = _field$dimensions === undefined ? { x: 0, y: i, h: 1, w: 6 } : _field$dimensions;
        var _config$type = config.type,
            type = _config$type === undefined ? 'input' : _config$type,
            _config$icon = config.icon,
            icon = _config$icon === undefined ? '' : _config$icon;

        type = _this2.uppercaseFirstLetter(type);
        icon = _this2.uppercaseFirstLetter(icon);
        if (type === 'Textarea' && dimensions.h < 4) dimensions.h = 4;
        var Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input;
        icon = IconLibrary[icon] ? IconLibrary[icon] : null;
        if (type.indexOf('Date') >= 0 || type.indexOf('Typeahead') >= 0 || type.indexOf('Multiselect') >= 0) {
          dateFields.unshift(React.createElement(Component, {
            requiredWarning: requiredWarning,
            inline: inline,
            draggable: draggable,
            key: '' + i,
            handleOnChange: handleOnChange,
            formValues: formValues,
            config: config,
            Icon: icon,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions)
          }));
        } else if (type === 'Customcomponent') {
          normalFields.push(React.createElement(Component, {
            requiredWarning: requiredWarning,
            inline: inline,
            draggable: draggable,
            formSchema: formSchema,
            key: '' + i,
            handleOnChange: handleOnChange,
            formValues: formValues,
            config: config,
            Icon: icon,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions)
          }));
        } else {
          normalFields.push(React.createElement(Component, {
            requiredWarning: requiredWarning,
            inline: inline,
            draggable: draggable,
            key: '' + i,
            handleOnChange: handleOnChange,
            formValues: formValues,
            config: config,
            Icon: icon,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions)
          }));
        }
      });
      return React.createElement(
        'div',
        { style: _extends({ height: '100%', minWidth: inline ? 700 : 400 }, style) },
        React.createElement(
          WidgetGrid,
          { compName: formName, verticalCompact: false, margin: [40, 5], rowHeight: inline ? 27 : 45 },
          normalFields,
          dateFields
        )
      );
    }, _temp2), _possibleConstructorReturn(_this2, _ret2);
  }

  return FormBuilder;
}(Component);

FormBuilder.propTypes = {
  formName: PropTypes.string.isRequired,
  formSchema: PropTypes.object,
  formValues: PropTypes.object,
  prepops: PropTypes.object,
  handleOnChange: PropTypes.func,
  draggable: PropTypes.bool,
  inline: PropTypes.bool,
  handleSubmit: PropTypes.func
};
FormBuilder.defaultProps = {
  inline: false
};
export default FormBuilder;