'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateFormValues = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.initComponentIconLibrary = initComponentIconLibrary;
exports.initCustomFormComponents = initCustomFormComponents;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _WidgetGrid = require('./WidgetGrid');

var _WidgetGrid2 = _interopRequireDefault(_WidgetGrid);

var _immutable = require('immutable');

var _Input = require('./FieldDefinitions/Input');

var _Input2 = _interopRequireDefault(_Input);

var _Number = require('./FieldDefinitions/Number');

var _Number2 = _interopRequireDefault(_Number);

var _Email = require('./FieldDefinitions/Email');

var _Email2 = _interopRequireDefault(_Email);

var _Currency = require('./FieldDefinitions/Currency');

var _Currency2 = _interopRequireDefault(_Currency);

var _Textarea = require('./FieldDefinitions/Textarea');

var _Textarea2 = _interopRequireDefault(_Textarea);

var _Richtextarea = require('./FieldDefinitions/Richtextarea');

var _Richtextarea2 = _interopRequireDefault(_Richtextarea);

var _Richtextareaquill = require('./FieldDefinitions/Richtextareaquill');

var _Richtextareaquill2 = _interopRequireDefault(_Richtextareaquill);

var _Datetime = require('./FieldDefinitions/Datetime');

var _Datetime2 = _interopRequireDefault(_Datetime);

var _Date = require('./FieldDefinitions/Date');

var _Date2 = _interopRequireDefault(_Date);

var _Time = require('./FieldDefinitions/Time');

var _Time2 = _interopRequireDefault(_Time);

var _Select = require('./FieldDefinitions/Select');

var _Select2 = _interopRequireDefault(_Select);

var _ImportSelect = require('./FieldDefinitions/ImportSelect');

var _ImportSelect2 = _interopRequireDefault(_ImportSelect);

var _Radio = require('./FieldDefinitions/Radio');

var _Radio2 = _interopRequireDefault(_Radio);

var _Checkbox = require('./FieldDefinitions/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Multicheckbox = require('./FieldDefinitions/Multicheckbox');

var _Multicheckbox2 = _interopRequireDefault(_Multicheckbox);

var _Header = require('./FieldDefinitions/Header');

var _Header2 = _interopRequireDefault(_Header);

var _Typeahead = require('./FieldDefinitions/Typeahead');

var _Typeahead2 = _interopRequireDefault(_Typeahead);

var _Listselect = require('./FieldDefinitions/Listselect');

var _Listselect2 = _interopRequireDefault(_Listselect);

var _Conditionalinput = require('./FieldDefinitions/Conditionalinput');

var _Conditionalinput2 = _interopRequireDefault(_Conditionalinput);

var _Multiselect = require('./FieldDefinitions/Multiselect');

var _Multiselect2 = _interopRequireDefault(_Multiselect);

var _Phone = require('./FieldDefinitions/Phone');

var _Phone2 = _interopRequireDefault(_Phone);

var _Icon = require('./FieldDefinitions/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Metadata = require('./FieldDefinitions/Metadata');

var _Metadata2 = _interopRequireDefault(_Metadata);

var _Total = require('./FieldDefinitions/Total');

var _Total2 = _interopRequireDefault(_Total);

var _Percentage = require('./FieldDefinitions/Percentage');

var _Percentage2 = _interopRequireDefault(_Percentage);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IconLibrary = {};
function initComponentIconLibrary() {
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

var updateFormValues = exports.updateFormValues = function updateFormValues(fieldsToUpdate, currentFormValues) {
  var fields = fieldsToUpdate;
  if (!Array.isArray(fields)) fields = [fields];
  var formValues = currentFormValues;
  if (typeof formValues === 'undefined') {
    console.error('You did something wrong, grid form builder is trying to update values but there are no values.');
    return (0, _immutable.Map)();
  }
  fields.map(function (field) {
    formValues = formValues.set(field.target.name, field.target.value);
  });
  return formValues;
};
// v fields that cannot be transformed into conditional inputs v
var unconditionalFields = (0, _immutable.Set)(['header', 'conditionalinput', 'checkbox', 'textarea']);
var FormComponents = {
  Input: _Input2.default,
  Email: _Email2.default,
  Currency: _Currency2.default,
  Textarea: _Textarea2.default,
  Richtextarea: _Richtextarea2.default,
  Richtextareaquill: _Richtextareaquill2.default,
  Datetime: _Datetime2.default,
  Time: _Time2.default,
  Date: _Date2.default,
  Select: _Select2.default,
  Radio: _Radio2.default,
  Checkbox: _Checkbox2.default,
  Multicheckbox: _Multicheckbox2.default,
  Metadata: _Metadata2.default,
  Header: _Header2.default,
  Typeahead: _Typeahead2.default,
  Listselect: _Listselect2.default,
  Conditionalinput: _Conditionalinput2.default,
  Multiselect: _Multiselect2.default,
  Phone: _Phone2.default,
  Icon: _Icon2.default,
  Number: _Number2.default,
  ImportSelect: _ImportSelect2.default,
  Total: _Total2.default,
  Percentage: _Percentage2.default
};
function initCustomFormComponents() {
  var defs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  defs = typeof defs.toJS === 'function' ? defs.toJS() : defs;
  FormComponents = _extends({}, FormComponents, defs);
}

var FormBuilder = function (_Component) {
  _inherits(FormBuilder, _Component);

  function FormBuilder(props) {
    _classCallCheck(this, FormBuilder);

    var _this = _possibleConstructorReturn(this, (FormBuilder.__proto__ || Object.getPrototypeOf(FormBuilder)).call(this, props));

    _this.componentDidUpdate = function (p) {
      if (p.validate !== _this.props.validate) {
        _this.setState({ requiredWarning: _this.props.validate });
      }
    };

    _this.componentWillUnmount = function () {
      _this.detatchInputFocusListeners();
    };

    _this.attachBuffer = null;

    _this.attachInputFocusListeners = function () {
      clearTimeout(_this.attachBuffer);
      _this.attachBuffer = null;
      _this.attachBuffer = setTimeout(function () {
        var id = _this.state.id;

        var inputs = (0, _jquery2.default)('#' + id + ' :input');
        inputs.off('focus');
        inputs.off('blur');
        inputs.on('focus', function (e) {
          (0, _jquery2.default)(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within');
        });
        inputs.on('blur', function (e) {
          (0, _jquery2.default)(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within');
        });
      }, 500);
    };

    _this.detatchInputFocusListeners = function () {
      var id = _this.state.id;

      var inputs = (0, _jquery2.default)('#' + id + ' :input');
      inputs.off('focus');
      inputs.off('blur');
    };

    _this.onSubmit = function () {
      var _this$props = _this.props,
          _this$props$formSchem = _this$props.formSchema,
          formSchema = _this$props$formSchem === undefined ? (0, _immutable.Map)() : _this$props$formSchem,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? (0, _immutable.Map)() : _this$props$formValue,
          _this$props$handleSub = _this$props.handleSubmit,
          handleSubmit = _this$props$handleSub === undefined ? function () {
        console.warn('onSubmit was called but no handleSubmit function was provided.');
      } : _this$props$handleSub;

      formValues = typeof formValues.isMap === 'function' ? formValues : (0, _immutable.Map)(formValues);
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
          formSchema = _this$props2$formSche === undefined ? (0, _immutable.Map)() : _this$props2$formSche,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? (0, _immutable.Map)() : _this$props2$formValu;

      formValues = typeof formValues.isMap === 'function' ? formValues : (0, _immutable.Map)(formValues);
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
            label = _config$label === undefined ? name : _config$label,
            type = config.type;

        if (required && formValues.get(name, '').length === 0) {
          reasons.push({
            reason: 'required',
            message: label + ' cannot be blank.',
            description: 'The field ' + name + ' is marked as required, but its value is empty.'
          });
        }
        if (type === 'email' && !(0, _utils.emailValidator)(formValues.get(name, ''))) {
          reasons.push({
            reason: 'incorrect format',
            message: label + ' is invalid',
            description: 'The field ' + name + ' has an invalid email'
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
          if (field.config.type === 'typeahead') {
            if (field.config.typeahead && !field.config.typeahead.fieldId) {
              field.config.typeahead.fieldId = 'value';
            }
            field.config.multi = true;
          }
          if (field.config.type === 'radio') {
            // inputs that are normally radios should be multicheckboxes in search
            field.config.type = 'multicheckbox';
          }
          if (field.config.type === 'select') {
            field.config.type = 'multiselect';
          }
          if (field.config.type === 'email') {
            field.config.type = 'input';
          }
          if (field.config.type === 'metadata') {
            if (field.config.conditionalConfig) {
              var conditionalConfig = _extends({}, field.config.conditionalConfig);
              var metaConfig = _extends({}, field.config);
              delete metaConfig.conditionalConfig;
              field.config = conditionalConfig;
              field.config.metaConfig = metaConfig;
            } else {
              field.config.type = 'input';
            }
          }
          field.config.inputType = field.config.type || 'input';
          field.config.type = 'conditionalInput';
        }
      }
      field.config.required = false;
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

    _this.handleRTEImageClick = function (e) {
      var _this$props$handleRTE = _this.props.handleRTEImageClick,
          handleRTEImageClick = _this$props$handleRTE === undefined ? function () {
        return null;
      } : _this$props$handleRTE;

      handleRTEImageClick();
    };

    _this.render = function () {
      _this.attachInputFocusListeners();
      var _this$props3 = _this.props,
          _this$props3$formSche = _this$props3.formSchema,
          formSchema = _this$props3$formSche === undefined ? (0, _immutable.Map)() : _this$props3$formSche,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? (0, _immutable.Map)() : _this$props3$formValu,
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
          interactive = _this$props3$interact === undefined ? true : _this$props3$interact,
          _this$props3$handleRT = _this$props3.handleRTEImageClick,
          handleRTEImageClick = _this$props3$handleRT === undefined ? function () {} : _this$props3$handleRT;
      var requiredWarning = _this.state.requiredWarning;

      formValues = typeof formValues.isMap === 'function' ? formValues : (0, _immutable.Map)(formValues);
      formSchema = typeof formSchema.toJS === 'function' ? formSchema.toJS() : formSchema;
      var normalFields = [];
      var _formSchema3 = formSchema,
          form = _formSchema3.form,
          jsonschema = _formSchema3.jsonschema;

      jsonschema = jsonschema || form || {};
      var _jsonschema3 = jsonschema,
          _jsonschema3$layout = _jsonschema3.layout,
          layout = _jsonschema3$layout === undefined ? [] : _jsonschema3$layout;
      // breaking this into two separate arrays so react-datetime plugin elements are drawn last. This fixes a problem where the calendar renders underneath (regardless of z-index) previously rendered inputs - JRA 09/12/2017

      var specifiedTabs = (0, _immutable.Set)();
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
        // AutoComplete OFF does not turn off autocomplete browser feature, you need to pass anything other than 'off' to turn off autocomplete because latest browsers stopped supporting 'off'

        var _config$type = config.type,
            type = _config$type === undefined ? 'input' : _config$type,
            _config$icon = config.icon,
            icon = _config$icon === undefined ? '' : _config$icon,
            _config$cascade = config.cascade,
            cascade = _config$cascade === undefined ? {} : _config$cascade,
            tabIndex = config.tabindex,
            _config$autoComplete = config.autoComplete,
            autoComplete = _config$autoComplete === undefined ? 'off' : _config$autoComplete;

        if (!tabIndex) {
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++;
          }
          tabIndex = _this.state.myOffset + '' + tabNumber;
          specifiedTabs = specifiedTabs.add(tabNumber);
          tabNumber++;
        } else {
          tabIndex = _this.state.myOffset + '' + tabIndex;
        }
        if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) config.readonly = true;
        var _cascade$keyword = cascade.keyword,
            keyword = _cascade$keyword === undefined ? null : _cascade$keyword,
            _cascade$icon = cascade.icon,
            cascadeIcon = _cascade$icon === undefined ? '' : _cascade$icon;


        if (interactive || type === 'header') {
          type = _this.uppercaseFirstLetter(type);
        } else if (type === 'select') {
          type = 'ImportSelect';
        } else {
          type = 'input';
        }

        icon = _this.uppercaseFirstLetter(icon);
        cascadeIcon = _this.uppercaseFirstLetter(cascadeIcon);
        if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2;
        var Component = FormComponents[type] ? FormComponents[type] : FormComponents.Input;
        icon = IconLibrary[icon] ? IconLibrary[icon] : null;
        cascadeIcon = IconLibrary[cascadeIcon] ? IconLibrary[cascadeIcon] : null;
        if (Type === 'Customcomponent') {
          normalFields.push(_react2.default.createElement(Component, {
            autoComplete: autoComplete,
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
            handleRTEImageClick: handleRTEImageClick,
            handleDragDropOnInput: _this.handleDragDropOnInput,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions),
            tabIndex: +tabIndex
          }));
        } else {
          normalFields.push(_react2.default.createElement(Component, {
            autoComplete: autoComplete,
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
            handleRTEImageClick: handleRTEImageClick,
            handleDragDropOnInput: _this.handleDragDropOnInput,
            defaultDataGrid: _extends({ i: '' + i, isResizable: false, isDraggable: draggable }, dimensions),
            interactive: interactive,
            tabIndex: +tabIndex,
            conditionalSearch: _this.props.conditionalSearch || _this.props.conditionalFieldValues
          }));
        }
      });
      var P = {};
      if (_this.props.noStore) P.store = { subscribe: function subscribe() {}, getState: function getState() {
          return (0, _immutable.Map)();
        }, dispatch: function dispatch() {} };
      return _react2.default.createElement(
        'div',
        { id: _this.state.id, className: 'grid-form-builder-parent', style: _extends({ height: '100%', minWidth: inline ? 700 : 440 }, style) },
        _react2.default.createElement(
          _WidgetGrid2.default,
          _extends({}, P, { compName: formName, verticalCompact: false, margin: [marginX, marginY], rowHeight: rowHeight || (inline ? 27 : 45) }),
          normalFields
        )
      );
    };

    FormBuilder.count++;
    _this.state = {
      id: 'gfb-' + (Math.floor(Math.random() * 10000) + 1),
      requiredWarning: !!props.validate,
      myOffset: FormBuilder.count
    };
    return _this;
  }

  return FormBuilder;
}(_react.Component);

FormBuilder.propTypes = {
  formName: _propTypes2.default.string.isRequired,
  formSchema: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  prepops: _propTypes2.default.object,
  handleOnChange: _propTypes2.default.func,
  draggable: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  handleSubmit: _propTypes2.default.func,
  conditionalSearch: _propTypes2.default.bool,
  conditionalFieldValues: _propTypes2.default.bool,
  noStore: _propTypes2.default.bool
};
FormBuilder.defaultProps = {
  inline: false
};
FormBuilder.count = 0;
exports.default = FormBuilder;