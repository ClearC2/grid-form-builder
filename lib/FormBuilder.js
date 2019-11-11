'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormValueContext = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactGridLayout = require('react-grid-layout');

var _reactGridLayout2 = _interopRequireDefault(_reactGridLayout);

var _utils = require('./utils');

var _FieldDefinitions = require('./FieldDefinitions');

var _Icons = require('./Icons');

var _reactSizeme = require('react-sizeme');

var _reactSizeme2 = _interopRequireDefault(_reactSizeme);

var _immutable = require('immutable');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _Utils = require('./QueryBuilder/Utils');

var _InputContainer = require('./InputContainer');

var _InputContainer2 = _interopRequireDefault(_InputContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var inputEventListenerDebouncer = null;

var FormValueContext = exports.FormValueContext = (0, _react.createContext)([(0, _immutable.Map)(), function () {}]);

var debug = false;

var debugLog = function debugLog() {
  var _console;

  if (debug) (_console = console).log.apply(_console, arguments); //eslint-disable-line
};

var FormBuilder = function FormBuilder(props) {
  var rowHeight = props.rowHeight,
      columns = props.columns,
      formSchema = props.formSchema,
      formValues = props.formValues,
      size = props.size,
      handleOnDimensionChange = props.handleOnDimensionChange,
      dropItemDimensions = props.dropItemDimensions,
      dropItemConfig = props.dropItemConfig,
      validate = props.validate,
      requiredFlag = props.requiredFlag,
      setContainerRef = props.setContainerRef,
      onClick = props.onClick,
      handleOnDrop = props.handleOnDrop,
      handleCascade = props.handleCascade,
      onRTEImageClick = props.handleRTEImageClick,
      onLinkClick = props.handleLinkClick,
      conditionalFieldValues = props.conditionalFieldValues,
      conditionalSearch = props.conditionalSearch,
      inline = props.inline,
      handleOnChange = props.handleOnChange,
      interactive = props.interactive,
      draggable = props.draggable,
      readonly = props.readonly,
      droppable = props.droppable;

  var _useState = (0, _react.useState)({ layout: (0, _immutable.List)(), elements: [] }),
      _useState2 = _slicedToArray(_useState, 2),
      grid = _useState2[0],
      updateGrid = _useState2[1];

  var _useState3 = (0, _react.useState)(!!validate),
      _useState4 = _slicedToArray(_useState3, 2),
      requiredWarning = _useState4[0],
      updateRequiredWarning = _useState4[1];

  var _useState5 = (0, _react.useState)(FormBuilder.count),
      _useState6 = _slicedToArray(_useState5, 1),
      myOffset = _useState6[0];

  var _useState7 = (0, _react.useState)('gfb-' + (Math.floor(Math.random() * 10000) + 1)),
      _useState8 = _slicedToArray(_useState7, 1),
      id = _useState8[0]; // creates a unique id for this grid for the screen scraper


  var ReactGridLayout = (0, _react.useRef)(null);

  var _useState9 = (0, _react.useState)(formValues ? formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues) : (0, _immutable.Map)()),
      _useState10 = _slicedToArray(_useState9, 2),
      formValueState = _useState10[0],
      updateFormValueState = _useState10[1]; // eslint-disable-line

  var handleAnywhereClick = (0, _react.useCallback)(function (config, e) {
    debugLog('handleAnywhereClick');
    onClick(config, e);
  }, [onClick]);

  var handleDragDropOnInput = (0, _react.useCallback)(function (_ref) {
    var source = _ref.source,
        target = _ref.target;

    debugLog('handleDragDropOnInput');
    handleOnDrop({ source: source, target: target });
  }, [handleOnDrop]);

  var handleCascadeKeywordClick = (0, _react.useCallback)(function (e) {
    debugLog('handleCascadeKeywordClick');
    handleCascade(e);
  }, [handleCascade]);

  var handleRTEImageClick = (0, _react.useCallback)(function () {
    debugLog('handleRTEImageClick');
    onRTEImageClick();
  }, [onRTEImageClick]);

  var handleLinkClick = function handleLinkClick(link) {
    // not memoing, it is using current values and I don't want to redraw everything every render just so this link works - JRA 11/07/2019
    debugLog('handleLinkClick');
    var values = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
    var _link$type = link.type,
        type = _link$type === undefined ? '' : _link$type,
        _link$id = link.id,
        id = _link$id === undefined ? null : _link$id;

    var value = values.get(id, null);
    onLinkClick({
      type: type,
      id: value
    });
  };

  (0, _react.useEffect)(function () {
    var values = formValues ? formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues) : (0, _immutable.Map)();
    updateFormValueState(values);
  }, [formValues]);

  (0, _react.useEffect)(function () {
    debugLog('updateRequiredWarning');
    updateRequiredWarning(validate);
  }, [validate]);

  (0, _react.useEffect)(function () {
    debugLog('updateRequiredWarning 2');
    updateRequiredWarning(requiredFlag);
  }, [requiredFlag]);

  (0, _react.useEffect)(function () {
    debugLog('FormBuilder.count');
    // this count is used to set myOffset, which serves as a starting point for tab indexing
    FormBuilder.count++;
  }, []);

  (0, _react.useEffect)(function () {
    debugLog('inputEventListenerDebouncer');
    // this is used to attach css classes for browsers that do not support :focus-within
    // this is not best practice, you should always try to avoid screen scraping the dom in react
    clearTimeout(inputEventListenerDebouncer);
    inputEventListenerDebouncer = setTimeout(function () {
      var inputs = (0, _jquery2.default)('#' + id + ' :input');
      inputs.off('focus');
      inputs.off('blur');
      inputs.on('focus', function (e) {
        (0, _jquery2.default)(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within');
      });
      inputs.on('blur', function (e) {
        (0, _jquery2.default)(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within');
      });
    }, 750);
    return function () {
      var inputs = (0, _jquery2.default)('#' + id + ' :input');
      inputs.off('focus');
      inputs.off('blur');
    };
    // this is expensive, only do this on mount
  }, []); // eslint-disable-line

  (0, _react.useEffect)(function () {
    // this is insane, surely this can be cleaned up, just leaving it in for now for speed of delivery - JRA 11/07/2019
    debugLog('rebuilding all grid elements (expensive)');
    var schema = (0, _utils.searchForLayoutArray)(formSchema);
    var layout = [];
    var elements = [];
    var specifiedTabs = (0, _immutable.Set)(); // this is for building up unique tab indicies
    schema.forEach(function (field) {
      var _field$config = field.config,
          config = _field$config === undefined ? {} : _field$config;

      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex);
    });
    var tabNumber = 1;
    schema.forEach(function (field, i) {
      if (conditionalSearch) {
        field = (0, _Utils.convertFieldToSearch)(field);
      }
      var _field = field,
          _field$dimensions = _field.dimensions,
          dimensions = _field$dimensions === undefined ? { x: 0, y: i, w: 12, h: 1 } : _field$dimensions;

      var config = _extends({}, field.config) || {}; // prevent mutation of the original config
      if (config.type && config.type.toLowerCase() === 'richtextarea') {
        // ck editor was removed. if any form schemas still use Richtextarea, they should use Richtextareaquill now.
        config.type = 'Richtextareaquill';
      }
      var _config$type = config.type,
          type = _config$type === undefined ? 'input' : _config$type;

      type = (0, _utils.uppercaseFirstLetter)(type);
      if (type === 'Textarea' && dimensions.h < 2) dimensions.h = 2;
      if (interactive && type === 'select') {
        type = 'ImportSelect';
      }
      var Component = (0, _FieldDefinitions.mapInputType)(type);
      if (!Component) {
        console.warn(field, 'was skipped because it did not contain a valid input type.'); // eslint-disable-line
      }
      if ((typeof dimensions === 'undefined' ? 'undefined' : _typeof(dimensions)) === 'object' && !!Component) {
        dimensions.i = i + '';
        var _config$icon = config.icon,
            icon = _config$icon === undefined ? '' : _config$icon,
            _config$cascade = config.cascade,
            cascade = _config$cascade === undefined ? {} : _config$cascade,
            tabIndex = config.tabindex,
            _config$autoComplete = config.autoComplete,
            autoComplete = _config$autoComplete === undefined ? 'off' : _config$autoComplete,
            _config$link = config.link,
            link = _config$link === undefined ? {} : _config$link;
        var _cascade$keyword = cascade.keyword,
            keyword = _cascade$keyword === undefined ? null : _cascade$keyword,
            _cascade$icon = cascade.icon,
            cascadeIcon = _cascade$icon === undefined ? '' : _cascade$icon;
        var _link$icon = link.icon,
            linkIcon = _link$icon === undefined ? '' : _link$icon;

        linkIcon = (0, _Icons.mapIcon)(linkIcon);
        icon = (0, _Icons.mapIcon)(icon);
        cascadeIcon = (0, _Icons.mapIcon)(cascadeIcon);
        if (!tabIndex) {
          // if a tab index wasn't specified, lets start assigning tab indicies based on what is available
          // at this point we are just going to find the next available index and assign it to this input
          // myOffset is not meant to be added, it is appended to the front to make this form 1 order of magnitude higher than the last form that was rendered
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++;
          }
          tabIndex = myOffset + '' + tabNumber;
          specifiedTabs = specifiedTabs.add(tabNumber);
          tabNumber++;
        } else {
          tabIndex = myOffset + '' + tabIndex;
        }
        elements.push(_react2.default.createElement(
          'div',
          { key: i + '' },
          _react2.default.createElement(
            _InputContainer2.default,
            {
              formSchema: formSchema,
              config: config,
              handleOnChange: handleOnChange,
              requiredWarning: requiredWarning,
              handleLinkClick: handleLinkClick,
              handleAnywhereClick: handleAnywhereClick,
              handleCascadeKeywordClick: handleCascadeKeywordClick,
              handleDragDropOnInput: handleDragDropOnInput,
              handleRTEImageClick: handleRTEImageClick,
              rowHeight: rowHeight,
              inline: inline,
              conditionalSearch: conditionalSearch || conditionalFieldValues,
              LinkIcon: linkIcon,
              autoComplete: autoComplete,
              Icon: icon,
              cascadingKeyword: keyword,
              CascadeIcon: cascadeIcon,
              interactive: interactive,
              readonly: readonly,
              draggable: draggable,
              tabIndex: +tabIndex
            },
            _react2.default.createElement(Component, null)
          )
        ));
        layout.push(dimensions);
      }
    });
    updateGrid({ layout: (0, _immutable.fromJS)(layout), elements: elements });
  }, [// eslint-disable-line
  conditionalFieldValues, conditionalSearch, formSchema, handleAnywhereClick, handleCascadeKeywordClick, handleDragDropOnInput, handleRTEImageClick, requiredWarning, rowHeight, inline, handleOnChange, interactive, draggable, readonly, myOffset]);

  var onItemLayoutUpdate = (0, _react.useCallback)(function (newLayout) {
    debugLog('onItemLayoutUpdate');
    if (typeof handleOnDimensionChange === 'function') {
      var schema = (0, _utils.searchForLayoutArray)(formSchema);
      newLayout.forEach(function (item) {
        var dimensions = _extends({}, item);
        var index = +dimensions.i;
        delete dimensions.i;
        schema[index].dimensions = dimensions;
      });
      var newFormSchema = (0, _utils.updateLayoutArray)(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A change was detected to the layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
      updateGrid({ layout: (0, _immutable.List)(), elements: [] });
      setTimeout(function () {
        return updateGrid({ layout: (0, _immutable.fromJS)(grid.layout), elements: grid.elements });
      });
    }
  }, [grid, updateGrid, handleOnDimensionChange, formSchema]);

  var onDrop = (0, _react.useCallback)(function (dimensions) {
    debugLog('onDrop');
    if (typeof handleOnDimensionChange === 'function') {
      var config = _extends({}, dropItemConfig);
      var schema = (0, _utils.searchForLayoutArray)(formSchema);
      if (ReactGridLayout.current) {
        // dropping a new item most likely caused collisions, so lets ref up the layout and update everything that got moved if we can - JRA 11/07/2019
        var newLayout = ReactGridLayout.current.state.layout;
        newLayout.forEach(function (item) {
          if (+item.i >= 0) {
            var _dimensions = _extends({}, item);
            var index = +_dimensions.i;
            delete _dimensions.i;
            schema[index].dimensions = _dimensions;
          }
        });
      }
      var newItem = {
        dimensions: dimensions,
        config: config
      };
      schema.push(newItem);
      var newFormSchema = (0, _utils.updateLayoutArray)(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      console.warn('A new item was dropped into the current layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
    }
  }, [formSchema, dropItemConfig, handleOnDimensionChange]);

  debugLog('render');

  return _react2.default.createElement(
    'div',
    {
      id: id,
      className: 'grid-form-builder-parent',
      ref: setContainerRef
    },
    _react2.default.createElement(
      _reactGridLayout2.default,
      {
        ref: ReactGridLayout,
        autoSize: true,
        width: size.width,
        cols: columns,
        rowHeight: rowHeight || (inline ? 27 : 45),
        layout: grid.layout.toJS(),
        onDragStop: onItemLayoutUpdate,
        onResizeStop: onItemLayoutUpdate,
        droppingItem: _extends({}, dropItemDimensions, { i: '-1' }),
        isDroppable: droppable,
        onDrop: onDrop,
        isDraggable: draggable,
        isResizable: draggable
      },
      grid.elements
    )
  );
};

FormBuilder.propTypes = {
  formSchema: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  handleOnChange: _propTypes2.default.func,
  rowHeight: _propTypes2.default.number,
  columns: _propTypes2.default.number,
  size: _propTypes2.default.object,
  handleOnDimensionChange: _propTypes2.default.func,
  dropItemDimensions: _propTypes2.default.object,
  dropItemConfig: _propTypes2.default.object,
  validate: _propTypes2.default.bool,
  requiredFlag: _propTypes2.default.bool,
  setContainerRef: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  handleOnDrop: _propTypes2.default.func,
  handleCascade: _propTypes2.default.func,
  handleRTEImageClick: _propTypes2.default.func,
  handleLinkClick: _propTypes2.default.func,
  conditionalFieldValues: _propTypes2.default.bool,
  conditionalSearch: _propTypes2.default.bool,
  inline: _propTypes2.default.bool,
  interactive: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  droppable: _propTypes2.default.bool
};

FormBuilder.defaultProps = {
  columns: 12,
  formSchema: {},
  dropItemDimensions: {
    h: 1,
    w: 6
  },
  dropItemConfig: {
    name: 'new-input',
    label: 'New Field',
    type: 'input'
  },
  handleSubmit: function handleSubmit() {
    console.warn('onSubmit was called but no handleSubmit function was provided.'); // eslint-disable-line
  },
  handleOnChange: function handleOnChange() {
    return null;
  },
  onClick: function onClick() {
    return null;
  },
  handleOnDrop: function handleOnDrop() {
    return null;
  },
  handleCascade: function handleCascade() {
    return null;
  },
  handleRTEImageClick: function handleRTEImageClick() {
    return null;
  },
  handleLinkClick: function handleLinkClick() {
    return null;
  },
  draggable: false
};

FormBuilder.count = 1;

var SizeMeHOC = (0, _reactSizeme2.default)()(FormBuilder);

var FormValidator = function (_Component) {
  _inherits(FormValidator, _Component);

  function FormValidator() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, FormValidator);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = FormValidator.__proto__ || Object.getPrototypeOf(FormValidator)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
      requiredWarning: false,
      formValues: _this.props.formValues ? _this.props.formValues.toJS ? _this.props.formValues : (0, _immutable.fromJS)(_this.props.formValues) : (0, _immutable.Map)()
    }, _this.onSubmit = function () {
      var _this$props = _this.props,
          _this$props$formSchem = _this$props.formSchema,
          formSchema = _this$props$formSchem === undefined ? (0, _immutable.Map)() : _this$props$formSchem,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === undefined ? (0, _immutable.Map)() : _this$props$formValue,
          handleSubmit = _this$props.handleSubmit;

      formValues = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
      var layout = (0, _utils.searchForLayoutArray)(formSchema);
      var formIncomplete = layout.some(function (field) {
        var _field$config2 = field.config,
            config = _field$config2 === undefined ? {} : _field$config2;
        var _config$required = config.required,
            required = _config$required === undefined ? false : _config$required;

        if (!required) return false;
        if (required && formValues.get(field.name, '').length === 0) return true;
      });
      if (formIncomplete) {
        _this.setState({ requiredWarning: true });
      } else {
        handleSubmit();
      }
    }, _this.validate = function () {
      var _this$props2 = _this.props,
          _this$props2$formSche = _this$props2.formSchema,
          formSchema = _this$props2$formSche === undefined ? (0, _immutable.Map)() : _this$props2$formSche,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === undefined ? (0, _immutable.Map)() : _this$props2$formValu;

      formValues = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
      var layout = (0, _utils.searchForLayoutArray)(formSchema);
      var reasons = [];
      layout.forEach(function (field) {
        var _field$config3 = field.config,
            config = _field$config3 === undefined ? {} : _field$config3;
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
    }, _this.setContainerRef = function (ref) {
      _this.grid = ref;
    }, _this.updateFormValues = function (formValues) {
      return _this.setState(function () {
        return {
          formValues: formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues)
        };
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }
  // this class provides the necessary class methods that were previously being used in ref's to make this backwards compatible


  _createClass(FormValidator, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(p, s) {
      var _this2 = this;

      if (p.formValues !== this.props.formValues) {
        this.updateFormValues(p.formValues); // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019
        return false;
      }
      var update = Object.keys(this.props).some(function (prop) {
        return _this2.props[prop] !== p[prop];
      });
      if (!update) update = Object.keys(this.state).some(function (state) {
        return _this2.state[state] !== s[state];
      });
      return update;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          requiredWarning = _state.requiredWarning,
          formValues = _state.formValues;

      var _props = this.props,
          values = _props.formValues,
          rest = _objectWithoutProperties(_props, ['formValues']);

      return _react2.default.createElement(
        FormValueContext.Provider,
        { value: [formValues, this.updateFormValues] },
        _react2.default.createElement(SizeMeHOC, _extends({}, rest, { requiredWarning: requiredWarning, setContainerRef: this.setContainerRef }))
      );
    }
  }]);

  return FormValidator;
}(_react.Component);

FormValidator.propTypes = {
  formSchema: _propTypes2.default.object,
  formValues: _propTypes2.default.object,
  handleOnChange: _propTypes2.default.func,
  handleSubmit: _propTypes2.default.func,
  onClick: _propTypes2.default.func,
  handleOnDrop: _propTypes2.default.func,
  handleCascade: _propTypes2.default.func,
  handleRTEImageClick: _propTypes2.default.func,
  handleOnDimensionChange: _propTypes2.default.func,
  dropItemDimensions: _propTypes2.default.object,
  dropItemConfig: _propTypes2.default.object,
  validate: _propTypes2.default.bool,
  requiredFlag: _propTypes2.default.bool,
  handleLinkClick: _propTypes2.default.func,
  inline: _propTypes2.default.bool,
  interactive: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  droppable: _propTypes2.default.bool
};
FormValidator.defaultProps = {
  handleSubmit: function handleSubmit() {
    console.warn('onSubmit was called but no handleSubmit function was provided.');
  } // eslint-disable-line
};
exports.default = FormValidator;