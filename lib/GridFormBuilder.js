var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WidgetGrid from './WidgetGrid';
import { Map, Set } from 'immutable';
import Input from './FieldDefinitions/Input';
import Textarea from './FieldDefinitions/Textarea';
import Richtextarea from './FieldDefinitions/Richtextarea';
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
import Icon from './FieldDefinitions/Icon';
import { timeStamp } from './utils';

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
// v fields that cannot be transformed into conditional inputs v
var unconditionalFields = Set(['header', 'conditionalinput', 'checkbox', 'textarea']);
var FormComponents = { Input: Input, Textarea: Textarea, Richtextarea: Richtextarea, Datetime: Datetime, Date: Date, Select: Select, Radio: Radio, Checkbox: Checkbox, Multicheckbox: Multicheckbox, Header: Header, Typeahead: Typeahead, Listselect: Listselect, Conditionalinput: Conditionalinput, Multiselect: Multiselect, Phone: Phone, Icon: Icon };
export function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  FormComponents = _extends({}, FormComponents, defs);
}

var FormBuilder = function (_Component) {
  _inherits(FormBuilder, _Component);

  function FormBuilder(props) {
    _classCallCheck(this, FormBuilder);

    var _this = _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call(this, props));

    _this.onSubmit = function () {
      var _this$props = _this.props,
          _this$props$formSchem = _this$props.formSchema,
          formSchema = _this$props$formSchem === undefined ? Map() : _this$props$formSchem,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? Map() : _this$props$formValue,
          _this$props$handleSub = _this$props.handleSubmit,
          handleSubmit = _this$props$handleSub === undefined ? function () {
        console.warn('onSubmit was called but no handleSubmit function was provided.');
      } : _this$props$handleSub;

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
      if (formIncomplete) _this.setState({ requiredWarning: true });else handleSubmit();
    };

    _this.validate = function () {
      var _this$props2 = _this.props,
          _this$props2$formSche = _this$props2.formSchema,
          formSchema = _this$props2$formSche === undefined ? Map() : _this$props2$formSche,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? Map() : _this$props2$formValu;

      formValues = typeof formValues.isMap === 'function' ? formValues : Map(formValues);
      formSchema = typeof formSchema.toJS === 'function' ? formSchema.toJS() : formSchema;
      var _formSchema2 = formSchema,
          form = _formSchema2.form,
          jsonschema = _formSchema2.jsonschema;

      jsonschema = jsonschema || form || {};
      var _jsonschema2 = jsonschema,
          _jsonschema2$layout = _jsonschema2.layout,
          layout = _jsonschema2$layout === undefined ? [] : _jsonschema2$layout;

      layout = typeof layout.toJS === 'function' ? layout.toJS() : layout;
      var reasons = [];
      layout.map(function (field) {
        var _field$config2 = field.config,
            config = _field$config2 === undefined ? {} : _field$config2;
        var _config$required2 = config.required,
            required = _config$required2 === undefined ? false : _config$required2,
            name = config.name,
            _config$label = config.label,
            label = _config$label === undefined ? name : _config$label;

        if (required && formValues.get(name, '').length === 0) {
          reasons.push({
            reason: 'required',
            message: label + ' cannot be blank.',
            description: 'The field ' + name + ' is marked as required, but its value is empty.'
          });
        }
      });
      if (reasons.length > 0) {
        _this.setState({ requiredWarning: true });
      }
      return reasons;
    };

    _this.uppercaseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    };

    _this.convertFieldToSearch = function () {
      var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!unconditionalFields.has(field.config.type ? field.config.type.toLowerCase() : 'input')) {
        if (!field.config.forceUnconditional && !field.config.forceunconditional) {
          if (field.config.type === 'typeahead' && field.config.typeahead && !field.config.typeahead.fieldId) {
            field.config.typeahead.fieldId = 'value';
            field.config.multi = true;
          }
          if (field.config.type === 'radio') {
            // inputs that are normally radios should be multicheckboxes in search
            field.config.type = 'multicheckbox';
          }
          if (field.config.type === 'select') {
            field.config.type = 'multiselect';
          }
          field.config.inputType = field.config.type || 'input';
          field.config.type = 'conditionalInput';
        }
      }
      field.config.readonly = false;
      field.config.disabled = false;
      return field;
    };

    _this.handleAnywhereClick = function (config, e) {
      var _this$props$onClick = _this.props.onClick,
          onClick = _this$props$onClick === undefined ? function () {
        return null;
      } : _this$props$onClick;

      onClick(config, e);
    };

    _this.handleDragDropOnInput = function (_ref) {
      var source = _ref.source,
          target = _ref.target;
      var _this$props$handleOnD = _this.props.handleOnDrop,
          handleOnDrop = _this$props$handleOnD === undefined ? function () {
        return null;
      } : _this$props$handleOnD;

      handleOnDrop({ source: source, target: target });
    };

    _this.handleCascadeKeywordClick = function (e) {
      var _this$props$handleCas = _this.props.handleCascade,
          handleCascade = _this$props$handleCas === undefined ? function () {
        return null;
      } : _this$props$handleCas;

      handleCascade(e);
    };

    _this.render = function () {
      console.log(_this.props.formName, _this.state.timestamp, FormBuilder.count);
      var _this$props3 = _this.props,
          _this$props3$formSche = _this$props3.formSchema,
          formSchema = _this$props3$formSche === undefined ? Map() : _this$props3$formSche,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? Map() : _this$props3$formValu,
          _this$props3$handleOn = _this$props3.handleOnChange,
          handleOnChange = _this$props3$handleOn === undefined ? function () {} : _this$props3$handleOn,
          _this$props3$formName = _this$props3.formName,
          formName = _this$props3$formName === undefined ? 'form' : _this$props3$formName,
          _this$props3$draggabl = _this$props3.draggable,
          draggable = _this$props3$draggabl === undefined ? false : _this$props3$draggabl,
          _this$props3$inline = _this$props3.inline,
          inline = _this$props3$inline === undefined ? false : _this$props3$inline,
          _this$props3$style = _this$props3.style,
          style = _this$props3$style === undefined ? {} : _this$props3$style,
          _this$props3$marginX = _this$props3.marginX,
          marginX = _this$props3$marginX === undefined ? 40 : _this$props3$marginX,
          _this$props3$marginY = _this$props3.marginY,
          marginY = _this$props3$marginY === undefined ? 5 : _this$props3$marginY,
          rowHeight = _this$props3.rowHeight,
          readonly = _this$props3.readonly,
          _this$props3$interact = _this$props3.interactive,
          interactive = _this$props3$interact === undefined ? true : _this$props3$interact;
      var requiredWarning = _this.state.requiredWarning;

      formValues = typeof formValues.isMap === 'function' ? formValues : Map(formValues);
      formSchema = typeof formSchema.toJS === 'function' ? formSchema.toJS() : formSchema;
      var dateFields = [];
      var normalFields = [];
      var _formSchema3 = formSchema,
          form = _formSchema3.form,
          jsonschema = _formSchema3.jsonschema;

      jsonschema = jsonschema || form || {};
      var _jsonschema3 = jsonschema,
          _jsonschema3$layout = _jsonschema3.layout,
          layout = _jsonschema3$layout === undefined ? [] : _jsonschema3$layout;
      // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017

      var specifiedTabs = Set();
      layout.map(function (field) {
        var _field$config3 = field.config,
            config = _field$config3 === undefined ? {} : _field$config3;

        if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex);
      });
      var tabNumber = 1;
      layout.map(function (field, i) {
        if (_this.props.conditionalSearch) {
          field = _this.convertFieldToSearch(field);
        }
        var _field = field,
            _field$config4 = _field.config,
            config = _field$config4 === undefined ? {} : _field$config4,
            _field$dimensions = _field.dimensions,
            dimensions = _field$dimensions === undefined ? { x: 0, y: i, h: 1, w: 6 } : _field$dimensions,
            _field$type = _field.type,
            Type = _field$type === undefined ? 'field' : _field$type;
        var _config$type = config.type,
            type = _config$type === undefined ? 'input' : _config$type,
            _config$icon = config.icon,
            icon = _config$icon === undefined ? '' : _config$icon,
            _config$cascade = config.cascade,
            cascade = _config$cascade === undefined ? {} : _config$cascade,
            tabIndex = config.tabindex;

        if (!tabIndex) {
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++;
          }
          tabIndex = FormBuilder.count + '' + tabNumber;
          specifiedTabs = specifiedTabs.add(tabNumber);
          tabNumber++;
        } else {
          tabIndex = FormBuilder.count + '' + tabNumber;
        }
        if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) config.readonly = true;
        var _cascade$keyword = cascade.keyword,
            keyword = _cascade$keyword === undefined ? null : _cascade$keyword,
            _cascade$icon = cascade.icon,
            cascadeIcon = _cascade$icon === undefined ? '' : _cascade$icon;

        type = interactive ? _this.uppercaseFirstLetter(type) : 'input';
        icon = _this.uppercaseFirstLetter(icon);
        cascadeIcon = _this.uppercaseFirstLetter(cascadeIcon);
        if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2;
        var Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input;
        icon = IconLibrary[icon] ? IconLibrary[icon] : null;
        cascadeIcon = IconLibrary[cascadeIcon] ? IconLibrary[cascadeIcon] : null;
        if (type.indexOf('Date') >= 0 || type.indexOf('Typeahead') >= 0 || type.indexOf('Multiselect') >= 0) {
          dateFields.unshift(React.createElement(Component, {
            requiredWarning: requiredWarning,
            rowHeight: rowHeight,
            inline: inline,
            draggable: draggable,
            key: '' + i,
            handleOnChange: handleOnChange,
            handleAnywhereClick: _this.handleAnywhereClick,
            formValues: formValues,
            config: config,
            Icon: icon,
            cascadingKeyword: keyword,
            CascadeIcon: cascadeIcon,
            handleCascadeKeywordClick: _this.handleCascadeKeywordClick,
            handleDragDropOnInput: _this.handleDragDropOnInput,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions),
            tabIndex: +tabIndex
          }));
        } else if (Type === 'Customcomponent') {
          normalFields.push(React.createElement(Component, {
            requiredWarning: requiredWarning,
            rowHeight: rowHeight,
            inline: inline,
            draggable: draggable,
            formSchema: formSchema,
            key: '' + i,
            handleOnChange: handleOnChange,
            handleAnywhereClick: _this.handleAnywhereClick,
            formValues: formValues,
            config: config,
            Icon: icon,
            cascadingKeyword: keyword,
            CascadeIcon: cascadeIcon,
            handleCascadeKeywordClick: _this.handleCascadeKeywordClick,
            handleDragDropOnInput: _this.handleDragDropOnInput,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions),
            tabIndex: +tabIndex
          }));
        } else {
          normalFields.push(React.createElement(Component, {
            requiredWarning: requiredWarning,
            rowHeight: rowHeight,
            inline: inline,
            draggable: draggable,
            key: '' + i,
            handleOnChange: handleOnChange,
            handleAnywhereClick: _this.handleAnywhereClick,
            formValues: formValues,
            config: config,
            Icon: icon,
            cascadingKeyword: keyword,
            CascadeIcon: cascadeIcon,
            handleCascadeKeywordClick: _this.handleCascadeKeywordClick,
            handleDragDropOnInput: _this.handleDragDropOnInput,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions),
            tabIndex: +tabIndex
          }));
        }
      });
      return React.createElement(
        'div',
        { className: 'grid-form-builder-parent', style: _extends({ height: '100%', minWidth: inline ? 700 : 440 }, style) },
        React.createElement(
          WidgetGrid,
          { compName: formName, verticalCompact: false, margin: [marginX, marginY], rowHeight: rowHeight || inline ? 27 : 45 },
          normalFields,
          dateFields
        )
      );
    };

    FormBuilder.count++;
    console.log('constructor', props.formName, props.formSchema);
    _this.state = {
      requiredWarning: false,
      timestamp: timeStamp()
    };
    return _this;
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
  handleSubmit: PropTypes.func,
  conditionalSearch: PropTypes.bool
};
FormBuilder.defaultProps = {
  inline: false
};
FormBuilder.count = 0;
export default FormBuilder;