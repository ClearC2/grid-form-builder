var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import WidgetGrid from './WidgetGrid';
import { Map, List } from 'immutable';
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

var validComponents = Map();
export function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Map();

  defs = fromJS(defs);
  validComponents = defs;
}

export var updateFormValues = function updateFormValues(fieldsToUpdate, currentFormValues) {
  var fields = fieldsToUpdate;
  if (!Array.isArray(fields)) fields = [fields];
  var formValues = currentFormValues;
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
      var _this$props$opts = _this.props.opts,
          opts = _this$props$opts === undefined ? {} : _this$props$opts; // field, formValues = Map(), handleOnChange = () => {},

      var _opts$props = opts.props,
          props = _opts$props === undefined ? {} : _opts$props,
          _opts$component = opts.component,
          component = _opts$component === undefined ? '' : _opts$component; // label = field, style = {}, labelStyle = {}, Icon = null, iconProps = {},

      var Component = validComponents.get((component + '').toLowerCase());
      if (Component) {
        return React.createElement(
          'div',
          { style: { display: 'flex', flex: 1, flexDirection: 'row' } },
          React.createElement(Component, _extends({}, props, _this.props))
        );
      } else {
        return React.createElement('div', null);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return Customcomponent;
}(Component);

var FormComponents = { Input: Input, Textarea: Textarea, Datetime: Datetime, Date: Date, Select: Select, Radio: Radio, Checkbox: Checkbox, Multicheckbox: Multicheckbox, Header: Header, Typeahead: Typeahead, Listselect: Listselect, Conditionalinput: Conditionalinput, Multiselect: Multiselect, Customcomponent: Customcomponent };

var FormBuilder = function (_Component2) {
  _inherits(FormBuilder, _Component2);

  function FormBuilder() {
    var _ref2;

    var _temp2, _this2, _ret2;

    _classCallCheck(this, FormBuilder);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref2 = FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call.apply(_ref2, [this].concat(args))), _this2), _this2.uppercaseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }, _this2.render = function () {
      var _this2$props = _this2.props,
          _this2$props$formSche = _this2$props.formSchema,
          formSchema = _this2$props$formSche === undefined ? {} : _this2$props$formSche,
          _this2$props$formValu = _this2$props.formValues,
          formValues = _this2$props$formValu === undefined ? Map() : _this2$props$formValu,
          _this2$props$handleOn = _this2$props.handleOnChange,
          handleOnChange = _this2$props$handleOn === undefined ? function () {} : _this2$props$handleOn,
          _this2$props$prepops = _this2$props.prepops,
          prepops = _this2$props$prepops === undefined ? Map() : _this2$props$prepops,
          _this2$props$formName = _this2$props.formName,
          formName = _this2$props$formName === undefined ? 'form' : _this2$props$formName,
          _this2$props$draggabl = _this2$props.draggable,
          draggable = _this2$props$draggabl === undefined ? false : _this2$props$draggabl;

      formValues = typeof formValues.isMap === 'function' ? formValues : Map(formValues);
      prepops = typeof prepops.isMap === 'function' ? prepops : Map(prepops);
      var dateFields = [];
      var normalFields = [];
      // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017
      Object.keys(formSchema).map(function (field, i) {
        var _formSchema$field = formSchema[field],
            _formSchema$field$typ = _formSchema$field.type,
            type = _formSchema$field$typ === undefined ? 'input' : _formSchema$field$typ,
            _formSchema$field$dim = _formSchema$field.dimensions,
            dimensions = _formSchema$field$dim === undefined ? { x: 0, y: i, h: 1, w: 6 } : _formSchema$field$dim;

        type = _this2.uppercaseFirstLetter(type);
        if (type === 'Textarea' && dimensions.h < 4) dimensions.h = 4;
        if (type === 'Radio') {
          var _formSchema$field$opt = formSchema[field].options,
              options = _formSchema$field$opt === undefined ? List() : _formSchema$field$opt;

          dimensions.h = options.size ? options.size : options.length ? options.length : 1;
        }
        var Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input;
        if (type.indexOf('Date') >= 0 || type.indexOf('Typeahead') >= 0) dateFields.unshift(React.createElement(Component, { draggable: draggable, key: field, handleOnChange: handleOnChange, formValues: formValues, prepops: prepops.get(formSchema[field].prepops), field: field, opts: formSchema[field], defaultDataGrid: _extends({ i: field, isResizable: false, isDraggable: draggable }, dimensions) }));else normalFields.push(React.createElement(Component, { draggable: draggable, key: field, handleOnChange: handleOnChange, formValues: formValues, prepops: prepops.get(formSchema[field].prepops), field: field, opts: formSchema[field], defaultDataGrid: _extends({ i: field, isResizable: false, isDraggable: draggable }, dimensions) }));
      });
      return React.createElement(
        'div',
        { style: { height: '100%', minWidth: 350 } },
        React.createElement(
          WidgetGrid,
          { compName: formName, verticalCompact: false, margin: [40, 5], rowHeight: 27 },
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
  draggable: PropTypes.bool
};
export default FormBuilder;