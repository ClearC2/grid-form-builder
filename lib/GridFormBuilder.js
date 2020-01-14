'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _WidgetGrid = require('./WidgetGrid');

var _WidgetGrid2 = _interopRequireDefault(_WidgetGrid);

var _immutable = require('immutable');

var _utils = require('./utils');

var _Utils = require('./QueryBuilder/Utils');

var _Icons = require('./Icons');

var _FieldDefinitions = require('./FieldDefinitions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
      // eslint-disable-next-line
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
        if (required && type === 'email' && !(0, _utils.emailValidator)(formValues.get(name, ''))) {
          reasons.push({
            reason: 'incorrect format',
            message: label + ' is invalid',
            description: 'The field ' + name + ' has an invalid email'
          });
        }
      });
      if (reasons.length > 0) {
        _this.setState({ requiredWarning: true }, function () {
          _this.grid.scrollIntoView();
        });
      }
      return reasons;
    };

    _this.uppercaseFirstLetter = function (string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
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

    _this.handleLinkClick = function (link) {
      var _this$props3 = _this.props,
          _this$props3$formValu = _this$props3.formValues,
          formValues = _this$props3$formValu === undefined ? (0, _immutable.Map)() : _this$props3$formValu,
          _this$props3$handleLi = _this$props3.handleLinkClick,
          handleLinkClick = _this$props3$handleLi === undefined ? function () {
        return null;
      } : _this$props3$handleLi;

      formValues = typeof formValues.isMap === 'function' ? formValues : (0, _immutable.Map)(formValues);
      var _link$type = link.type,
          type = _link$type === undefined ? '' : _link$type,
          _link$id = link.id,
          id = _link$id === undefined ? null : _link$id;

      var value = formValues.get(id, null);
      handleLinkClick({
        type: type,
        id: value
      });
    };

    _this.render = function () {
      _this.attachInputFocusListeners();
      var _this$props4 = _this.props,
          _this$props4$formSche = _this$props4.formSchema,
          formSchema = _this$props4$formSche === undefined ? (0, _immutable.Map)() : _this$props4$formSche,
          _this$props4$formValu = _this$props4.formValues,
          formValues = _this$props4$formValu === undefined ? (0, _immutable.Map)() : _this$props4$formValu,
          _this$props4$handleOn = _this$props4.handleOnChange,
          handleOnChange = _this$props4$handleOn === undefined ? function () {} : _this$props4$handleOn,
          _this$props4$formName = _this$props4.formName,
          formName = _this$props4$formName === undefined ? 'form' : _this$props4$formName,
          _this$props4$draggabl = _this$props4.draggable,
          draggable = _this$props4$draggabl === undefined ? false : _this$props4$draggabl,
          _this$props4$inline = _this$props4.inline,
          inline = _this$props4$inline === undefined ? false : _this$props4$inline,
          _this$props4$style = _this$props4.style,
          style = _this$props4$style === undefined ? {} : _this$props4$style,
          _this$props4$marginX = _this$props4.marginX,
          marginX = _this$props4$marginX === undefined ? 40 : _this$props4$marginX,
          _this$props4$marginY = _this$props4.marginY,
          marginY = _this$props4$marginY === undefined ? 5 : _this$props4$marginY,
          rowHeight = _this$props4.rowHeight,
          readonly = _this$props4.readonly,
          _this$props4$interact = _this$props4.interactive,
          interactive = _this$props4$interact === undefined ? true : _this$props4$interact,
          _this$props4$handleRT = _this$props4.handleRTEImageClick,
          handleRTEImageClick = _this$props4$handleRT === undefined ? function () {} : _this$props4$handleRT;
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
      layout.forEach(function (field) {
        var _field$config3 = field.config,
            config = _field$config3 === undefined ? {} : _field$config3;

        if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex);
      });
      var tabNumber = 1;
      layout.map(function (field, i) {
        if (field.config.type && field.config.type.toLowerCase() === 'richtextarea') {
          // ck editor was removed. if any form schemas still use Richtextarea, they should use Richtextareaquill now.
          field.config.type = 'Richtextareaquill';
        }
        if (_this.props.conditionalSearch) {
          field = (0, _Utils.convertFieldToSearch)(field);
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
            autoComplete = _config$autoComplete === undefined ? 'ac_off' : _config$autoComplete,
            _config$link = config.link,
            link = _config$link === undefined ? {} : _config$link;

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

        var _link$icon = link.icon,
            linkIcon = _link$icon === undefined ? '' : _link$icon;

        linkIcon = _this.uppercaseFirstLetter(linkIcon);
        icon = _this.uppercaseFirstLetter(icon);
        cascadeIcon = _this.uppercaseFirstLetter(cascadeIcon);
        if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2;
        var Input = _FieldDefinitions.FormComponents[type] ? _FieldDefinitions.FormComponents[type] : _FieldDefinitions.FormComponents.Input;

        icon = _Icons.IconLibrary[icon] ? _Icons.IconLibrary[icon] : null;
        cascadeIcon = _Icons.IconLibrary[cascadeIcon] ? _Icons.IconLibrary[cascadeIcon] : null;
        linkIcon = _Icons.IconLibrary[linkIcon] ? _Icons.IconLibrary[linkIcon] : null;
        if (Type === 'Customcomponent') {
          normalFields.push(_react2.default.createElement(Input, {
            handleLinkClick: _this.handleLinkClick,
            LinkIcon: linkIcon,
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
          normalFields.push(_react2.default.createElement(Input, {
            handleLinkClick: _this.handleLinkClick,
            LinkIcon: linkIcon,
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
        {
          id: _this.state.id,
          className: 'grid-form-builder-parent',
          ref: function ref(r) {
            _this.grid = r;
          },
          style: _extends({
            height: '100%',
            minWidth: inline ? 700 : 440
          }, style) },
        _react2.default.createElement(
          _WidgetGrid2.default,
          _extends({}, P, {
            compName: formName,
            verticalCompact: false,
            margin: [marginX, marginY],
            rowHeight: rowHeight || (inline ? 27 : 45)
          }),
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
  } //eslint-disable-line


  return FormBuilder;
}(_react.Component);

FormBuilder.propTypes = {
  conditionalFieldValues: _propTypes2.default.bool,
  conditionalSearch: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  formName: _propTypes2.default.string.isRequired,
  formSchema: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  handleCascade: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  handleOnDrop: _propTypes2.default.func,
  handleRTEImageClick: _propTypes2.default.func,
  handleSubmit: _propTypes2.default.func,
  inline: _propTypes2.default.bool,
  interactive: _propTypes2.default.bool,
  marginX: _propTypes2.default.number,
  marginY: _propTypes2.default.number,
  noStore: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  prepops: _propTypes2.default.object,
  readonly: _propTypes2.default.bool,
  rowHeight: _propTypes2.default.number,
  style: _propTypes2.default.object,
  validate: _propTypes2.default.bool
};
FormBuilder.defaultProps = {
  inline: false
};
FormBuilder.count = 0;