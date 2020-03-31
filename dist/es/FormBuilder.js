import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime-corejs3/helpers/esm/objectWithoutProperties";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _setTimeout from "@babel/runtime-corejs3/core-js-stable/set-timeout";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context4; _forEachInstanceProperty(_context4 = ownKeys(Object(source), true)).call(_context4, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context5; _forEachInstanceProperty(_context5 = ownKeys(Object(source))).call(_context5, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import React, { Component, useState, useEffect, useCallback, useRef, createContext } from 'react';
import PropTypes from 'prop-types';
import RGL from 'react-grid-layout';
import { emailValidator, searchForLayoutArray, updateLayoutArray } from './utils';
import sizeMe from 'react-sizeme';
import { List, fromJS, Map, Set } from 'immutable';
import $ from 'jquery';
import { convertFieldToSearch } from './QueryBuilder/Utils';
import InnerCell from './Inputs';
import { FaTrash as Trash } from 'react-icons/fa';
import useTheme, { ThemeProvider } from './theme/useTheme';
var inputEventListenerDebouncer = null;
export var FormValueContext = createContext([Map(), function () {}]);
var debug = false;

var debugLog = function debugLog() {
  var _console;

  if (debug) (_console = console).log.apply(_console, arguments); //eslint-disable-line
};

var FormBuilder = function FormBuilder(props) {
  var rowHeight = props.rowHeight,
      columns = props.columns,
      formSchema = props.formSchema,
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
      handleLinkClick = props.handleLinkClick,
      conditionalFieldValues = props.conditionalFieldValues,
      conditionalSearch = props.conditionalSearch,
      inline = props.inline,
      handleOnChange = props.handleOnChange,
      interactive = props.interactive,
      draggable = props.draggable,
      readonly = props.readonly,
      droppable = props.droppable,
      activeItem = props.activeItem,
      _props$rglAutoSize = props.rglAutoSize,
      rglAutoSize = _props$rglAutoSize === void 0 ? true : _props$rglAutoSize,
      rglStyle = props.rglStyle,
      _props$verticalCompac = props.verticalCompact,
      verticalCompact = _props$verticalCompac === void 0 ? false : _props$verticalCompac,
      compactType = props.compactType,
      dateFormat = props.dateFormat,
      dateTimeFormat = props.dateTimeFormat,
      timeFormat = props.timeFormat,
      autoComplete = props.autoComplete,
      style = props.style,
      _props$device = props.device,
      device = _props$device === void 0 ? {
    cordova: false,
    model: 'browser',
    platform: 'browser',
    uuid: 'browser',
    version: 'browser'
  } : _props$device;

  var _useState = useState({
    layout: List(),
    elements: []
  }),
      _useState2 = _slicedToArray(_useState, 2),
      grid = _useState2[0],
      updateGrid = _useState2[1];

  var _useState3 = useState(!!validate),
      _useState4 = _slicedToArray(_useState3, 2),
      requiredWarning = _useState4[0],
      updateRequiredWarning = _useState4[1];

  var _useState5 = useState(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType),
      _useState6 = _slicedToArray(_useState5, 2),
      compact = _useState6[0],
      updateCompact = _useState6[1];

  var _useState7 = useState(FormBuilder.count),
      _useState8 = _slicedToArray(_useState7, 1),
      myOffset = _useState8[0];

  var _useState9 = useState("gfb-".concat(Math.floor(Math.random() * 10000) + 1)),
      _useState10 = _slicedToArray(_useState9, 1),
      id = _useState10[0]; // creates a unique id for this grid for the screen scraper


  var ReactGridLayout = useRef(null);

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var handleAnywhereClick = useCallback(function (config, e) {
    debugLog('handleAnywhereClick');
    onClick(config, e);
  }, [onClick]);
  var handleDragDropOnInput = useCallback(function (_ref) {
    var source = _ref.source,
        target = _ref.target;
    debugLog('handleDragDropOnInput');
    handleOnDrop({
      source: source,
      target: target
    });
  }, [handleOnDrop]);
  var handleCascadeKeywordClick = useCallback(function (e) {
    debugLog('handleCascadeKeywordClick');
    handleCascade(e);
  }, [handleCascade]);
  var handleRTEImageClick = useCallback(function (name) {
    debugLog('handleRTEImageClick');
    onRTEImageClick(name);
  }, [onRTEImageClick]);
  useEffect(function () {
    debugLog('updateCompact');
    updateCompact(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType);
  }, [verticalCompact, compactType]);
  useEffect(function () {
    debugLog('updateRequiredWarning 2');
    updateRequiredWarning(requiredFlag);
  }, [requiredFlag]);
  useEffect(function () {
    debugLog('updateRequiredWarning');
    updateRequiredWarning(validate);
  }, [validate]);
  useEffect(function () {
    debugLog('FormBuilder.count'); // this count is used to set myOffset, which serves as a starting point for tab indexing

    FormBuilder.count++;
  }, []);
  useEffect(function () {
    debugLog('inputEventListenerDebouncer'); // this is used to attach css classes for browsers that do not support :focus-within
    // this is not best practice, you should always try to avoid screen scraping the dom in react

    clearTimeout(inputEventListenerDebouncer);
    inputEventListenerDebouncer = _setTimeout(function () {
      var inputs = $("#".concat(id, " :input"));
      inputs.off('focus');
      inputs.off('blur');
      inputs.on('focus', function (e) {
        $(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within');
      });
      inputs.on('blur', function (e) {
        $(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within');
      });
    }, 750);
    return function () {
      var inputs = $("#".concat(id, " :input"));
      inputs.off('focus');
      inputs.off('blur');
    }; // this is expensive, only do this on mount
  }, []); // eslint-disable-line

  useEffect(function () {
    debugLog('rebuilding all grid elements (expensive)');
    var schema = searchForLayoutArray(formSchema);
    var layout = [];
    var elements = [];
    var specifiedTabs = Set(); // this is for building up unique tab indices

    _forEachInstanceProperty(schema).call(schema, function (field) {
      var _field$config = field.config,
          config = _field$config === void 0 ? {} : _field$config;
      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex);
    });

    var tabNumber = 1;

    _forEachInstanceProperty(schema).call(schema, function (field, i) {
      if (conditionalSearch) {
        field = convertFieldToSearch(field);
      }

      var _field = field,
          _field$dimensions = _field.dimensions,
          dimensions = _field$dimensions === void 0 ? {
        x: 0,
        y: i,
        w: 12,
        h: 1
      } : _field$dimensions;
      var config = _objectSpread({}, field.config) || {}; // prevent mutation of the original config

      if (_typeof(dimensions) === 'object') {
        dimensions.i = i + '';
        var tabindex = config.tabindex;

        if (!tabindex) {
          // if a tab index wasn't specified, lets start assigning tab indicies based on what is available
          // at this point we are just going to find the next available index and assign it to this input
          // myOffset is not meant to be added, it is appended to the front to make this form 1 order of magnitude higher than the last form that was rendered
          while (specifiedTabs.has(tabNumber)) {
            tabNumber++;
          }

          tabindex = myOffset + '' + tabNumber;
          specifiedTabs = specifiedTabs.add(tabNumber);
          tabNumber++;
        } else {
          tabindex = myOffset + '' + tabindex;
        }

        var _config$rteImageUrl = config.rteImageUrl,
            rteImageUrl = _config$rteImageUrl === void 0 ? '' : _config$rteImageUrl;
        var isActive = (typeof activeItem === 'string' || typeof activeItem === 'number') && +activeItem === i;
        var className = isActive ? 'drag-item-active' : '';
        if (config.tooltip) className = className + ' gfb-has-tooltip';

        var removeSelf = function removeSelf(e) {
          onClick({
            index: null
          }, e);
          removeItem(i);
        };

        elements.push(React.createElement("div", {
          key: i + '',
          className: className,
          css: theme.gridItem
        }, draggable && isActive && React.createElement("div", {
          className: "active-gfb-item-action-menu",
          onClick: removeSelf
        }, React.createElement("div", {
          className: "item-action-button action-button-remove"
        }, React.createElement(Trash, {
          height: 20,
          width: 20,
          color: "white"
        }))), React.createElement(InnerCell, {
          field: field,
          handleOnChange: handleOnChange,
          requiredWarning: requiredWarning,
          handleLinkClick: handleLinkClick,
          handleAnywhereClick: handleAnywhereClick,
          handleCascadeKeywordClick: handleCascadeKeywordClick,
          handleDragDropOnInput: handleDragDropOnInput,
          handleRTEImageClick: handleRTEImageClick,
          rowHeight: rowHeight,
          conditionalSearch: conditionalSearch || conditionalFieldValues,
          interactive: interactive,
          readonly: readonly,
          draggable: draggable,
          tabIndex: +tabindex,
          index: i,
          isActive: isActive,
          removeSelf: removeSelf,
          dateFormat: dateFormat,
          dateTimeFormat: dateTimeFormat,
          timeFormat: timeFormat,
          autoComplete: autoComplete,
          device: device,
          rteImageUrl: rteImageUrl
        })));
        layout.push(dimensions);
      }
    });

    updateGrid({
      layout: fromJS(layout),
      elements: elements
    });
  }, [// eslint-disable-line
  conditionalFieldValues, conditionalSearch, formSchema, handleAnywhereClick, handleCascadeKeywordClick, handleDragDropOnInput, handleRTEImageClick, requiredWarning, rowHeight, handleOnChange, interactive, draggable, readonly, myOffset, activeItem, handleLinkClick, autoComplete]);
  var removeItem = useCallback(function (i) {
    if (typeof handleOnDimensionChange === 'function') {
      var schema = searchForLayoutArray(formSchema);

      _spliceInstanceProperty(schema).call(schema, i, 1);

      var newFormSchema = updateLayoutArray(formSchema, schema);
      updateGrid({
        layout: List(),
        elements: []
      }); // clearing these out first so nothing funky happens with the indexes - JRA 11/13/2019

      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A grid item attempted to remove itself but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line

      updateGrid({
        layout: List(),
        elements: []
      });

      _setTimeout(function () {
        return updateGrid({
          layout: fromJS(grid.layout),
          elements: grid.elements
        });
      });
    }
  }, [formSchema, updateGrid, handleOnDimensionChange, grid]);
  var onItemLayoutUpdate = useCallback(function (newLayout) {
    debugLog('onItemLayoutUpdate');

    if (typeof handleOnDimensionChange === 'function') {
      var schema = searchForLayoutArray(formSchema);

      _forEachInstanceProperty(newLayout).call(newLayout, function (item) {
        var dimensions = _objectSpread({}, item);

        var index = +dimensions.i;
        delete dimensions.i;
        schema[index].dimensions = dimensions;
      });

      var newFormSchema = updateLayoutArray(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A change was detected to the layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line

      updateGrid({
        layout: List(),
        elements: []
      });

      _setTimeout(function () {
        return updateGrid({
          layout: fromJS(grid.layout),
          elements: grid.elements
        });
      });
    }
  }, [grid, updateGrid, handleOnDimensionChange, formSchema]);
  var onDrop = useCallback(function (dimensions) {
    debugLog('onDrop');

    if (typeof handleOnDimensionChange === 'function') {
      var config = _objectSpread({}, dropItemConfig);

      var schema = searchForLayoutArray(formSchema);

      if (ReactGridLayout.current) {
        // dropping a new item most likely caused collisions, so lets ref up the layout and update everything that got moved if we can - JRA 11/07/2019
        var newLayout = ReactGridLayout.current.state.layout;

        _forEachInstanceProperty(newLayout).call(newLayout, function (item) {
          if (+item.i >= 0) {
            var _dimensions = _objectSpread({}, item);

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
      var newFormSchema = updateLayoutArray(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      console.warn('A new item was dropped into the current layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
    }
  }, [formSchema, dropItemConfig, handleOnDimensionChange]);
  debugLog('render');
  return React.createElement("div", {
    id: id,
    className: "grid-form-builder-parent",
    ref: setContainerRef,
    style: style
  }, React.createElement(RGL, {
    ref: ReactGridLayout,
    autoSize: rglAutoSize,
    style: rglStyle,
    width: size.width,
    cols: columns,
    rowHeight: rowHeight || (inline ? 27 : 45),
    layout: grid.layout.toJS(),
    onDragStop: onItemLayoutUpdate,
    onResizeStop: onItemLayoutUpdate,
    droppingItem: _objectSpread({}, dropItemDimensions, {
      i: '-1'
    }),
    isDroppable: droppable,
    onDrop: onDrop,
    isDraggable: draggable,
    isResizable: draggable,
    compactType: compact
  }, grid.elements));
};

FormBuilder.propTypes = {
  formSchema: PropTypes.object,
  formValues: PropTypes.object,
  handleOnChange: PropTypes.func,
  rowHeight: PropTypes.number,
  columns: PropTypes.number,
  size: PropTypes.object,
  handleOnDimensionChange: PropTypes.func,
  dropItemDimensions: PropTypes.object,
  dropItemConfig: PropTypes.object,
  validate: PropTypes.bool,
  requiredFlag: PropTypes.bool,
  setContainerRef: PropTypes.func,
  onClick: PropTypes.func,
  handleOnDrop: PropTypes.func,
  handleCascade: PropTypes.func,
  handleRTEImageClick: PropTypes.func,
  handleLinkClick: PropTypes.func,
  conditionalFieldValues: PropTypes.bool,
  conditionalSearch: PropTypes.bool,
  inline: PropTypes.bool,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  readonly: PropTypes.bool,
  droppable: PropTypes.bool,
  activeItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rglAutoSize: PropTypes.bool,
  rglStyle: PropTypes.object,
  verticalCompact: PropTypes.bool,
  compactType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  autoComplete: PropTypes.string,
  style: PropTypes.object,
  device: PropTypes.object
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
  draggable: false,
  interactive: true,
  dateFormat: 'M/D/YYYY',
  dateTimeFormat: 'M/D/YYYY h:mm a',
  timeFormat: 'h:mm a',
  autoComplete: 'ac_off',
  style: {}
};
FormBuilder.count = 1;
var SizeMeHOC = sizeMe()(FormBuilder);

var FormValidator =
/*#__PURE__*/
function (_Component) {
  _inherits(FormValidator, _Component);

  function FormValidator() {
    var _getPrototypeOf2, _context;

    var _this;

    _classCallCheck(this, FormValidator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FormValidator)).call.apply(_getPrototypeOf2, _concatInstanceProperty(_context = [this]).call(_context, args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      validate: false,
      requiredWarning: false,
      formValues: _this.props.formValues ? _this.props.formValues.toJS ? _this.props.formValues : fromJS(_this.props.formValues) : Map()
    });

    _defineProperty(_assertThisInitialized(_this), "onSubmit", function () {
      var _this$props = _this.props,
          _this$props$formSchem = _this$props.formSchema,
          formSchema = _this$props$formSchem === void 0 ? Map() : _this$props$formSchem,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === void 0 ? Map() : _this$props$formValue,
          handleSubmit = _this$props.handleSubmit;
      formValues = formValues.toJS ? formValues : fromJS(formValues);
      var layout = searchForLayoutArray(formSchema);

      var formIncomplete = _someInstanceProperty(layout).call(layout, function (field) {
        var _field$config2 = field.config,
            config = _field$config2 === void 0 ? {} : _field$config2;
        var _config$required = config.required,
            required = _config$required === void 0 ? false : _config$required;
        if (!required) return false;
        if (required && formValues.get(field.name, '').length === 0) return true;
      });

      if (formIncomplete) {
        _this.setState({
          requiredWarning: true
        });
      } else {
        handleSubmit();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "validate", function () {
      var _this$props2 = _this.props,
          _this$props2$formSche = _this$props2.formSchema,
          formSchema = _this$props2$formSche === void 0 ? Map() : _this$props2$formSche,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === void 0 ? Map() : _this$props2$formValu;
      formValues = formValues.toJS ? formValues : fromJS(formValues);
      var layout = searchForLayoutArray(formSchema);
      var reasons = [];

      _forEachInstanceProperty(layout).call(layout, function (field) {
        var _field$config3 = field.config,
            config = _field$config3 === void 0 ? {} : _field$config3;
        var _config$required2 = config.required,
            required = _config$required2 === void 0 ? false : _config$required2,
            name = config.name,
            _config$label = config.label,
            label = _config$label === void 0 ? name : _config$label,
            type = config.type;

        if (required && (formValues.get(name, '') + '').length === 0) {
          reasons.push({
            reason: 'required',
            message: "".concat(label, " cannot be blank."),
            description: "The field ".concat(name, " is marked as required, but its value is empty.")
          });
        }

        if (type === 'email' && (formValues.get(name, '') + '').length > 0 && !emailValidator(formValues.get(name, ''))) {
          reasons.push({
            reason: 'incorrect format',
            message: "".concat(label, " is invalid"),
            description: "The field ".concat(name, " has an invalid email")
          });
        }
      });

      if (reasons.length > 0) {
        _this.setState({
          requiredWarning: true,
          validate: true
        }, function () {// this.grid && this.grid.scrollIntoView() // this breaks c2 cards for some very strange reason. The header bar of dialogs overflows outside of the dialog container for no apparent reason - JRA 12/13/2019
        });
      }

      return reasons;
    });

    _defineProperty(_assertThisInitialized(_this), "setContainerRef", function (ref) {
      _this.grid = ref;
    });

    _defineProperty(_assertThisInitialized(_this), "updateFormValues", function (formValues) {
      return _this.setState(function () {
        return {
          formValues: formValues.toJS ? formValues : fromJS(formValues)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLinkClick", function (link) {
      var formValues = _this.state.formValues;
      var handleLinkClick = _this.props.handleLinkClick;
      var values = formValues.toJS ? formValues : fromJS(formValues);
      var _link$type = link.type,
          type = _link$type === void 0 ? '' : _link$type;
      var _link$id = link.id,
          id = _link$id === void 0 ? null : _link$id;

      if (typeof id === 'string') {
        id = [id];
      }

      var value = '';

      if (_Array$isArray(id)) {
        _forEachInstanceProperty(id).call(id, function (string) {
          if (typeof string === 'string' || typeof string === 'number') {
            var val = values.get(string);

            if (typeof link.id === 'string' && !val) {
              value = null;
            } else {
              var _val = values.get(string, string);

              if (typeof _val === 'string' || typeof _val === 'number') {
                value = value + _val;
              }
            }
          }
        });
      }

      handleLinkClick({
        type: type,
        id: value
      });
    });

    return _this;
  }

  _createClass(FormValidator, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(p, s) {
      var _context2,
          _this2 = this,
          _context3;

      if (p.formValues !== this.props.formValues) {
        this.updateFormValues(p.formValues); // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019

        return false;
      }

      var update = _someInstanceProperty(_context2 = _Object$keys(this.props)).call(_context2, function (prop) {
        if (_this2.props[prop] && p[prop] && typeof _this2.props[prop].toJS === 'function' && typeof p[prop].toJS === 'function') {
          return !_this2.props[prop].equals(p[prop]);
        } else {
          return _this2.props[prop] !== p[prop];
        }
      });

      if (!update) update = _someInstanceProperty(_context3 = _Object$keys(this.state)).call(_context3, function (state) {
        return _this2.state[state] !== s[state];
      });
      return update;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          requiredWarning = _this$state.requiredWarning,
          formValues = _this$state.formValues,
          validate = _this$state.validate;

      var _this$props3 = this.props,
          values = _this$props3.formValues,
          theme = _this$props3.theme,
          rest = _objectWithoutProperties(_this$props3, ["formValues", "theme"]);

      return React.createElement(ThemeProvider, {
        theme: theme
      }, React.createElement(FormValueContext.Provider, {
        value: [formValues, this.updateFormValues]
      }, React.createElement(SizeMeHOC, _extends({}, rest, {
        validate: this.props.validate || validate,
        requiredWarning: requiredWarning,
        setContainerRef: this.setContainerRef,
        handleLinkClick: this.handleLinkClick
      }))));
    }
  }]);

  return FormValidator;
}(Component);

_defineProperty(FormValidator, "propTypes", {
  formSchema: PropTypes.object,
  formValues: PropTypes.object,
  handleOnChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  onClick: PropTypes.func,
  handleOnDrop: PropTypes.func,
  handleCascade: PropTypes.func,
  handleRTEImageClick: PropTypes.func,
  handleOnDimensionChange: PropTypes.func,
  dropItemDimensions: PropTypes.object,
  dropItemConfig: PropTypes.object,
  validate: PropTypes.bool,
  requiredFlag: PropTypes.bool,
  handleLinkClick: PropTypes.func,
  inline: PropTypes.bool,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  readonly: PropTypes.bool,
  droppable: PropTypes.bool,
  activeItem: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  rglAutoSize: PropTypes.bool,
  rglStyle: PropTypes.object,
  verticalCompact: PropTypes.bool,
  compactType: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  autoComplete: PropTypes.string,
  theme: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
});

_defineProperty(FormValidator, "defaultProps", {
  handleSubmit: function handleSubmit() {
    console.warn('onSubmit was called but no handleSubmit function was provided.');
  } // eslint-disable-line

});

export { FormValidator as default };