"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = exports.FormValueContext = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactGridLayout = _interopRequireDefault(require("react-grid-layout"));

var _utils = require("./utils");

var _reactSizeme = _interopRequireDefault(require("react-sizeme"));

var _immutable = require("immutable");

var _jquery = _interopRequireDefault(require("jquery"));

var _Utils = require("./QueryBuilder/Utils");

var _Inputs = _interopRequireDefault(require("./Inputs"));

var _fa = require("react-icons/fa");

var _useTheme2 = _interopRequireWildcard(require("./theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context4; (0, _forEach.default)(_context4 = ownKeys(Object(source), true)).call(_context4, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context5; (0, _forEach.default)(_context5 = ownKeys(Object(source))).call(_context5, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var inputEventListenerDebouncer = null;
var FormValueContext = (0, _react.createContext)([(0, _immutable.Map)(), function () {}]);
exports.FormValueContext = FormValueContext;
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

  var _useState = (0, _react.useState)({
    layout: (0, _immutable.List)(),
    elements: []
  }),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      grid = _useState2[0],
      updateGrid = _useState2[1];

  var _useState3 = (0, _react.useState)(!!validate),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      requiredWarning = _useState4[0],
      updateRequiredWarning = _useState4[1];

  var _useState5 = (0, _react.useState)(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      compact = _useState6[0],
      updateCompact = _useState6[1];

  var _useState7 = (0, _react.useState)(FormBuilder.count),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 1),
      myOffset = _useState8[0];

  var _useState9 = (0, _react.useState)("gfb-".concat(Math.floor(Math.random() * 10000) + 1)),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 1),
      id = _useState10[0]; // creates a unique id for this grid for the screen scraper


  var ReactGridLayout = (0, _react.useRef)(null);

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var handleAnywhereClick = (0, _react.useCallback)(function (config, e) {
    debugLog('handleAnywhereClick');
    onClick(config, e);
  }, [onClick]);
  var handleDragDropOnInput = (0, _react.useCallback)(function (_ref) {
    var source = _ref.source,
        target = _ref.target;
    debugLog('handleDragDropOnInput');
    handleOnDrop({
      source: source,
      target: target
    });
  }, [handleOnDrop]);
  var handleCascadeKeywordClick = (0, _react.useCallback)(function (e) {
    debugLog('handleCascadeKeywordClick');
    handleCascade(e);
  }, [handleCascade]);
  var handleRTEImageClick = (0, _react.useCallback)(function () {
    debugLog('handleRTEImageClick');
    onRTEImageClick();
  }, [onRTEImageClick]);
  (0, _react.useEffect)(function () {
    debugLog('updateCompact');
    updateCompact(verticalCompact ? 'vertical' : typeof compactType === 'undefined' ? null : compactType);
  }, [verticalCompact, compactType]);
  (0, _react.useEffect)(function () {
    debugLog('updateRequiredWarning 2');
    updateRequiredWarning(requiredFlag);
  }, [requiredFlag]);
  (0, _react.useEffect)(function () {
    debugLog('updateRequiredWarning');
    updateRequiredWarning(validate);
  }, [validate]);
  (0, _react.useEffect)(function () {
    debugLog('FormBuilder.count'); // this count is used to set myOffset, which serves as a starting point for tab indexing

    FormBuilder.count++;
  }, []);
  (0, _react.useEffect)(function () {
    debugLog('inputEventListenerDebouncer'); // this is used to attach css classes for browsers that do not support :focus-within
    // this is not best practice, you should always try to avoid screen scraping the dom in react

    clearTimeout(inputEventListenerDebouncer);
    inputEventListenerDebouncer = (0, _setTimeout2.default)(function () {
      var inputs = (0, _jquery.default)("#".concat(id, " :input"));
      inputs.off('focus');
      inputs.off('blur');
      inputs.on('focus', function (e) {
        (0, _jquery.default)(e.target).parents('.react-grid-item').addClass('react-grid-item-focus-within');
      });
      inputs.on('blur', function (e) {
        (0, _jquery.default)(e.target).parents('.react-grid-item').removeClass('react-grid-item-focus-within');
      });
    }, 750);
    return function () {
      var inputs = (0, _jquery.default)("#".concat(id, " :input"));
      inputs.off('focus');
      inputs.off('blur');
    }; // this is expensive, only do this on mount
  }, []); // eslint-disable-line

  (0, _react.useEffect)(function () {
    debugLog('rebuilding all grid elements (expensive)');
    var schema = (0, _utils.searchForLayoutArray)(formSchema);
    var layout = [];
    var elements = [];
    var specifiedTabs = (0, _immutable.Set)(); // this is for building up unique tab indices

    (0, _forEach.default)(schema).call(schema, function (field) {
      var _field$config = field.config,
          config = _field$config === void 0 ? {} : _field$config;
      if (config.tabindex) specifiedTabs = specifiedTabs.add(config.tabindex);
    });
    var tabNumber = 1;
    (0, _forEach.default)(schema).call(schema, function (field, i) {
      if (conditionalSearch) {
        field = (0, _Utils.convertFieldToSearch)(field);
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

      if ((0, _typeof2.default)(dimensions) === 'object') {
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

        var isActive = (typeof activeItem === 'string' || typeof activeItem === 'number') && +activeItem === i;
        var className = isActive ? 'drag-item-active' : '';
        if (config.tooltip) className = className + ' gfb-has-tooltip';

        var removeSelf = function removeSelf(e) {
          onClick({
            index: null
          }, e);
          removeItem(i);
        };

        elements.push(_react.default.createElement("div", {
          key: i + '',
          className: className,
          css: theme.gridItem
        }, draggable && isActive && _react.default.createElement("div", {
          className: "active-gfb-item-action-menu",
          onClick: removeSelf
        }, _react.default.createElement("div", {
          className: "item-action-button action-button-remove"
        }, _react.default.createElement(_fa.FaTrash, {
          height: 20,
          width: 20,
          color: "white"
        }))), _react.default.createElement(_Inputs.default, {
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
          device: device
        })));
        layout.push(dimensions);
      }
    });
    updateGrid({
      layout: (0, _immutable.fromJS)(layout),
      elements: elements
    });
  }, [// eslint-disable-line
  conditionalFieldValues, conditionalSearch, formSchema, handleAnywhereClick, handleCascadeKeywordClick, handleDragDropOnInput, handleRTEImageClick, requiredWarning, rowHeight, handleOnChange, interactive, draggable, readonly, myOffset, activeItem, handleLinkClick, autoComplete]);
  var removeItem = (0, _react.useCallback)(function (i) {
    if (typeof handleOnDimensionChange === 'function') {
      var schema = (0, _utils.searchForLayoutArray)(formSchema);
      (0, _splice.default)(schema).call(schema, i, 1);
      var newFormSchema = (0, _utils.updateLayoutArray)(formSchema, schema);
      updateGrid({
        layout: (0, _immutable.List)(),
        elements: []
      }); // clearing these out first so nothing funky happens with the indexes - JRA 11/13/2019

      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A grid item attempted to remove itself but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line

      updateGrid({
        layout: (0, _immutable.List)(),
        elements: []
      });
      (0, _setTimeout2.default)(function () {
        return updateGrid({
          layout: (0, _immutable.fromJS)(grid.layout),
          elements: grid.elements
        });
      });
    }
  }, [formSchema, updateGrid, handleOnDimensionChange, grid]);
  var onItemLayoutUpdate = (0, _react.useCallback)(function (newLayout) {
    debugLog('onItemLayoutUpdate');

    if (typeof handleOnDimensionChange === 'function') {
      var schema = (0, _utils.searchForLayoutArray)(formSchema);
      (0, _forEach.default)(newLayout).call(newLayout, function (item) {
        var dimensions = _objectSpread({}, item);

        var index = +dimensions.i;
        delete dimensions.i;
        schema[index].dimensions = dimensions;
      });
      var newFormSchema = (0, _utils.updateLayoutArray)(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A change was detected to the layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line

      updateGrid({
        layout: (0, _immutable.List)(),
        elements: []
      });
      (0, _setTimeout2.default)(function () {
        return updateGrid({
          layout: (0, _immutable.fromJS)(grid.layout),
          elements: grid.elements
        });
      });
    }
  }, [grid, updateGrid, handleOnDimensionChange, formSchema]);
  var onDrop = (0, _react.useCallback)(function (dimensions) {
    debugLog('onDrop');

    if (typeof handleOnDimensionChange === 'function') {
      var config = _objectSpread({}, dropItemConfig);

      var schema = (0, _utils.searchForLayoutArray)(formSchema);

      if (ReactGridLayout.current) {
        // dropping a new item most likely caused collisions, so lets ref up the layout and update everything that got moved if we can - JRA 11/07/2019
        var newLayout = ReactGridLayout.current.state.layout;
        (0, _forEach.default)(newLayout).call(newLayout, function (item) {
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
      var newFormSchema = (0, _utils.updateLayoutArray)(formSchema, schema);
      handleOnDimensionChange(newFormSchema);
    } else {
      console.warn('A new item was dropped into the current layout but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line
    }
  }, [formSchema, dropItemConfig, handleOnDimensionChange]);
  debugLog('render');
  return _react.default.createElement("div", {
    id: id,
    className: "grid-form-builder-parent",
    ref: setContainerRef,
    style: style
  }, _react.default.createElement(_reactGridLayout.default, {
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
  formSchema: _propTypes.default.object,
  formValues: _propTypes.default.object,
  handleOnChange: _propTypes.default.func,
  rowHeight: _propTypes.default.number,
  columns: _propTypes.default.number,
  size: _propTypes.default.object,
  handleOnDimensionChange: _propTypes.default.func,
  dropItemDimensions: _propTypes.default.object,
  dropItemConfig: _propTypes.default.object,
  validate: _propTypes.default.bool,
  requiredFlag: _propTypes.default.bool,
  setContainerRef: _propTypes.default.func,
  onClick: _propTypes.default.func,
  handleOnDrop: _propTypes.default.func,
  handleCascade: _propTypes.default.func,
  handleRTEImageClick: _propTypes.default.func,
  handleLinkClick: _propTypes.default.func,
  conditionalFieldValues: _propTypes.default.bool,
  conditionalSearch: _propTypes.default.bool,
  inline: _propTypes.default.bool,
  interactive: _propTypes.default.bool,
  draggable: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  droppable: _propTypes.default.bool,
  activeItem: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  rglAutoSize: _propTypes.default.bool,
  rglStyle: _propTypes.default.object,
  verticalCompact: _propTypes.default.bool,
  compactType: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  autoComplete: _propTypes.default.string,
  style: _propTypes.default.object,
  device: _propTypes.default.object
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
var SizeMeHOC = (0, _reactSizeme.default)()(FormBuilder);

var FormValidator =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(FormValidator, _Component);

  function FormValidator() {
    var _getPrototypeOf2, _context;

    var _this;

    (0, _classCallCheck2.default)(this, FormValidator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(FormValidator)).call.apply(_getPrototypeOf2, (0, _concat.default)(_context = [this]).call(_context, args)));
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "state", {
      validate: false,
      requiredWarning: false,
      formValues: _this.props.formValues ? _this.props.formValues.toJS ? _this.props.formValues : (0, _immutable.fromJS)(_this.props.formValues) : (0, _immutable.Map)()
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "onSubmit", function () {
      var _this$props = _this.props,
          _this$props$formSchem = _this$props.formSchema,
          formSchema = _this$props$formSchem === void 0 ? (0, _immutable.Map)() : _this$props$formSchem,
          _this$props$formValue = _this$props.formValues,
          formValues = _this$props$formValue === void 0 ? (0, _immutable.Map)() : _this$props$formValue,
          handleSubmit = _this$props.handleSubmit;
      formValues = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
      var layout = (0, _utils.searchForLayoutArray)(formSchema);
      var formIncomplete = (0, _some.default)(layout).call(layout, function (field) {
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
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "validate", function () {
      var _this$props2 = _this.props,
          _this$props2$formSche = _this$props2.formSchema,
          formSchema = _this$props2$formSche === void 0 ? (0, _immutable.Map)() : _this$props2$formSche,
          _this$props2$formValu = _this$props2.formValues,
          formValues = _this$props2$formValu === void 0 ? (0, _immutable.Map)() : _this$props2$formValu;
      formValues = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
      var layout = (0, _utils.searchForLayoutArray)(formSchema);
      var reasons = [];
      (0, _forEach.default)(layout).call(layout, function (field) {
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

        if (type === 'email' && (formValues.get(name, '') + '').length > 0 && !(0, _utils.emailValidator)(formValues.get(name, ''))) {
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
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "setContainerRef", function (ref) {
      _this.grid = ref;
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "updateFormValues", function (formValues) {
      return _this.setState(function () {
        return {
          formValues: formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues)
        };
      });
    });
    (0, _defineProperty3.default)((0, _assertThisInitialized2.default)(_this), "handleLinkClick", function (link) {
      var formValues = _this.state.formValues;
      var handleLinkClick = _this.props.handleLinkClick;
      var values = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
      var _link$type = link.type,
          type = _link$type === void 0 ? '' : _link$type;
      var _link$id = link.id,
          id = _link$id === void 0 ? null : _link$id;

      if (typeof id === 'string') {
        id = [id];
      }

      var value = '';

      if ((0, _isArray.default)(id)) {
        (0, _forEach.default)(id).call(id, function (string) {
          if (typeof string === 'string' || typeof string === 'number') {
            var val = values.get(string, string);

            if (typeof val === 'string' || typeof val === 'number') {
              value = value + val;
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

  (0, _createClass2.default)(FormValidator, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(p, s) {
      var _context2,
          _this2 = this,
          _context3;

      if (p.formValues !== this.props.formValues) {
        this.updateFormValues(p.formValues); // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019

        return false;
      }

      var update = (0, _some.default)(_context2 = (0, _keys.default)(this.props)).call(_context2, function (prop) {
        if (_this2.props[prop] && p[prop] && typeof _this2.props[prop].toJS === 'function' && typeof p[prop].toJS === 'function') {
          return !_this2.props[prop].equals(p[prop]);
        } else {
          return _this2.props[prop] !== p[prop];
        }
      });
      if (!update) update = (0, _some.default)(_context3 = (0, _keys.default)(this.state)).call(_context3, function (state) {
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
          rest = (0, _objectWithoutProperties2.default)(_this$props3, ["formValues", "theme"]);
      return _react.default.createElement(_useTheme2.ThemeProvider, {
        theme: theme
      }, _react.default.createElement(FormValueContext.Provider, {
        value: [formValues, this.updateFormValues]
      }, _react.default.createElement(SizeMeHOC, (0, _extends2.default)({}, rest, {
        validate: this.props.validate || validate,
        requiredWarning: requiredWarning,
        setContainerRef: this.setContainerRef,
        handleLinkClick: this.handleLinkClick
      }))));
    }
  }]);
  return FormValidator;
}(_react.Component);

exports.default = FormValidator;
(0, _defineProperty3.default)(FormValidator, "propTypes", {
  formSchema: _propTypes.default.object,
  formValues: _propTypes.default.object,
  handleOnChange: _propTypes.default.func,
  handleSubmit: _propTypes.default.func,
  onClick: _propTypes.default.func,
  handleOnDrop: _propTypes.default.func,
  handleCascade: _propTypes.default.func,
  handleRTEImageClick: _propTypes.default.func,
  handleOnDimensionChange: _propTypes.default.func,
  dropItemDimensions: _propTypes.default.object,
  dropItemConfig: _propTypes.default.object,
  validate: _propTypes.default.bool,
  requiredFlag: _propTypes.default.bool,
  handleLinkClick: _propTypes.default.func,
  inline: _propTypes.default.bool,
  interactive: _propTypes.default.bool,
  draggable: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  droppable: _propTypes.default.bool,
  activeItem: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  rglAutoSize: _propTypes.default.bool,
  rglStyle: _propTypes.default.object,
  verticalCompact: _propTypes.default.bool,
  compactType: _propTypes.default.oneOfType([_propTypes.default.bool, _propTypes.default.string]),
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  autoComplete: _propTypes.default.string,
  theme: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.object])
});
(0, _defineProperty3.default)(FormValidator, "defaultProps", {
  handleSubmit: function handleSubmit() {
    console.warn('onSubmit was called but no handleSubmit function was provided.');
  } // eslint-disable-line

});