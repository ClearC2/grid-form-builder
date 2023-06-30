"use strict";

var _typeof3 = require("@babel/runtime-corejs3/helpers/typeof");

var _Object$keys2 = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = exports.FormValueContext = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/objectWithoutProperties"));

var _setTimeout2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/set-timeout"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _parseFloat2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-float"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

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

var _excluded = ["size"],
    _excluded2 = ["formValues", "theme"];

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys2(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context6, _context7; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty2(_context6 = ownKeys(Object(source), !0)).call(_context6, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty2(_context7 = ownKeys(Object(source))).call(_context7, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

var inputEventListenerDebouncer = null;
var FormValueContext = /*#__PURE__*/(0, _react.createContext)([(0, _immutable.Map)(), function () {}]);
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
      width = props.width,
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
    layout: [],
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
  var handleRTEImageClick = (0, _react.useCallback)(function (name) {
    debugLog('handleRTEImageClick');
    onRTEImageClick(name);
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

        elements.push( /*#__PURE__*/_react.default.createElement("div", {
          key: i + '',
          className: className,
          css: theme.gridItem
        }, draggable && isActive && /*#__PURE__*/_react.default.createElement("div", {
          className: "active-gfb-item-action-menu",
          onClick: removeSelf
        }, /*#__PURE__*/_react.default.createElement("div", {
          className: "item-action-button action-button-remove"
        }, /*#__PURE__*/_react.default.createElement(_fa.FaTrash, {
          height: 20,
          width: 20,
          color: "white"
        }))), /*#__PURE__*/_react.default.createElement(_Inputs.default, {
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
      layout: layout,
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
        layout: [],
        elements: []
      }); // clearing these out first so nothing funky happens with the indexes - JRA 11/13/2019

      handleOnDimensionChange(newFormSchema);
    } else {
      // this is a hack to break react's internal batching - clear the dashboard and reset it - JRA 11/06/2019
      console.warn('A grid item attempted to remove itself but no handleOnDimensionChange callback was provided to update the schema.'); // eslint-disable-line

      updateGrid({
        layout: [],
        elements: []
      });
      (0, _setTimeout2.default)(function () {
        return updateGrid({
          layout: grid.layout,
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
        layout: [],
        elements: []
      });
      (0, _setTimeout2.default)(function () {
        return updateGrid({
          layout: grid.layout,
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
  dropItemDimensions.i = '-1';
  return /*#__PURE__*/_react.default.createElement("div", {
    id: id,
    className: "grid-form-builder-parent",
    ref: setContainerRef,
    style: style
  }, /*#__PURE__*/_react.default.createElement(_reactGridLayout.default, {
    ref: ReactGridLayout,
    autoSize: rglAutoSize,
    style: rglStyle,
    width: width,
    cols: columns,
    rowHeight: rowHeight || (inline ? 27 : 45),
    layout: grid.layout,
    onDragStop: onItemLayoutUpdate,
    onResizeStop: onItemLayoutUpdate,
    droppingItem: dropItemDimensions,
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
  width: _propTypes.default.number,
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
  dateFormat: 'MM/DD/YYYY',
  dateTimeFormat: 'MM/DD/YYYY h:mm a',
  timeFormat: 'h:mm a',
  autoComplete: 'ac_off',
  style: {}
};
FormBuilder.count = 1;

var PureFormBuilder = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2.default)(PureFormBuilder, _PureComponent);

  var _super = _createSuper(PureFormBuilder);

  function PureFormBuilder() {
    var _context;

    var _this;

    (0, _classCallCheck2.default)(this, PureFormBuilder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, (0, _concat.default)(_context = [this]).call(_context, args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "render", function () {
      return /*#__PURE__*/_react.default.createElement(FormBuilder, _this.props);
    });
    return _this;
  }

  return (0, _createClass2.default)(PureFormBuilder);
}(_react.PureComponent);

var SizeMemoizer = function SizeMemoizer(props) {
  var size = props.size,
      rest = (0, _objectWithoutProperties2.default)(props, _excluded);

  var _useState11 = (0, _react.useState)(size.width),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      width = _useState12[0],
      setWidth = _useState12[1];

  (0, _react.useEffect)(function () {
    var w = Math.ceil(size.width);

    if (w !== width) {
      setWidth(w);
    }
  }, [size, width]);
  return /*#__PURE__*/_react.default.createElement(PureFormBuilder, (0, _extends2.default)({
    width: width
  }, rest));
};

SizeMemoizer.propTypes = {
  size: _propTypes.default.object
};
var SizeMeHOC = (0, _reactSizeme.default)({
  refreshRate: 75
})(SizeMemoizer);

var FormValidator = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(FormValidator, _Component);

  var _super2 = _createSuper(FormValidator);

  function FormValidator() {
    var _context2;

    var _this2;

    (0, _classCallCheck2.default)(this, FormValidator);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this2 = _super2.call.apply(_super2, (0, _concat.default)(_context2 = [this]).call(_context2, args));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "state", {
      validate: false,
      requiredWarning: false,
      formValues: _this2.props.formValues ? _this2.props.formValues.toJS ? _this2.props.formValues : (0, _immutable.fromJS)(_this2.props.formValues) : (0, _immutable.Map)()
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "onSubmit", function () {
      var _this2$props = _this2.props,
          _this2$props$formSche = _this2$props.formSchema,
          formSchema = _this2$props$formSche === void 0 ? (0, _immutable.Map)() : _this2$props$formSche,
          _this2$props$formValu = _this2$props.formValues,
          formValues = _this2$props$formValu === void 0 ? (0, _immutable.Map)() : _this2$props$formValu,
          handleSubmit = _this2$props.handleSubmit;
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
        _this2.setState({
          requiredWarning: true
        });
      } else {
        handleSubmit();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "validate", function () {
      var _this2$props2 = _this2.props,
          _this2$props2$formSch = _this2$props2.formSchema,
          formSchema = _this2$props2$formSch === void 0 ? (0, _immutable.Map)() : _this2$props2$formSch,
          _this2$props2$formVal = _this2$props2.formValues,
          formValues = _this2$props2$formVal === void 0 ? (0, _immutable.Map)() : _this2$props2$formVal;
      formValues = formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues);
      var layout = (0, _utils.searchForLayoutArray)(formSchema);
      var reasons = [];
      (0, _forEach.default)(layout).call(layout, function (field) {
        var _context3;

        var _field$config3 = field.config,
            config = _field$config3 === void 0 ? {} : _field$config3;
        var _config$required2 = config.required,
            required = _config$required2 === void 0 ? false : _config$required2,
            name = config.name,
            _config$label = config.label,
            label = _config$label === void 0 ? name : _config$label,
            type = config.type,
            _config$minimum = config.minimum,
            minimum = _config$minimum === void 0 ? 0 : _config$minimum,
            _config$maximum = config.maximum,
            maximum = _config$maximum === void 0 ? 0 : _config$maximum;

        if (required && (0, _trim.default)(_context3 = formValues.get(name, '') + '').call(_context3).length === 0) {
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

        if (type === 'currency' && (formValues.get(name, '') + '').length > 0) {
          if (minimum) {
            if ((0, _parseFloat2.default)(formValues.get(name, '')) < minimum) {
              reasons.push({
                reason: 'minimum value not meet',
                message: "".concat(label, " is not within the minimum value"),
                description: "The field ".concat(name, " has an invalid value")
              });
            }
          }

          if (maximum) {
            if ((0, _parseFloat2.default)(formValues.get(name, '')) > maximum) {
              reasons.push({
                reason: 'maximum value exceeded',
                message: "".concat(label, " is beyond the maximum value"),
                description: "The field ".concat(name, " has an invalid value")
              });
            }
          }
        }
      });

      if (reasons.length > 0) {
        _this2.setState({
          requiredWarning: true,
          validate: true
        }, function () {// this.grid && this.grid.scrollIntoView() // this breaks c2 cards for some very strange reason. The header bar of dialogs overflows outside of the dialog container for no apparent reason - JRA 12/13/2019
        });
      }

      return reasons;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "setContainerRef", function (ref) {
      _this2.grid = ref;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "updateFormValues", function (formValues) {
      return _this2.setState(function () {
        return {
          formValues: formValues.toJS ? formValues : (0, _immutable.fromJS)(formValues)
        };
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this2), "handleLinkClick", function (link) {
      var formValues = _this2.state.formValues;
      var handleLinkClick = _this2.props.handleLinkClick;
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
    return _this2;
  }

  (0, _createClass2.default)(FormValidator, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(p, s) {
      var _context4,
          _this3 = this,
          _context5;

      if (p.formValues !== this.props.formValues) {
        this.updateFormValues(p.formValues); // this kills the extra render from values updating, the context updating will render - JRA 11/07/2019

        return false;
      }

      var update = (0, _some.default)(_context4 = (0, _keys.default)(this.props)).call(_context4, function (prop) {
        if (_this3.props[prop] && p[prop] && typeof _this3.props[prop].toJS === 'function' && typeof p[prop].toJS === 'function') {
          return !_this3.props[prop].equals(p[prop]);
        } else {
          return _this3.props[prop] !== p[prop];
        }
      });
      if (!update) update = (0, _some.default)(_context5 = (0, _keys.default)(this.state)).call(_context5, function (state) {
        return _this3.state[state] !== s[state];
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
      var _this$props = this.props,
          values = _this$props.formValues,
          theme = _this$props.theme,
          rest = (0, _objectWithoutProperties2.default)(_this$props, _excluded2);
      return /*#__PURE__*/_react.default.createElement(_useTheme2.ThemeProvider, {
        theme: theme
      }, /*#__PURE__*/_react.default.createElement(FormValueContext.Provider, {
        value: [formValues, this.updateFormValues]
      }, /*#__PURE__*/_react.default.createElement(SizeMeHOC, (0, _extends2.default)({}, rest, {
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
(0, _defineProperty2.default)(FormValidator, "propTypes", {
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
(0, _defineProperty2.default)(FormValidator, "defaultProps", {
  handleSubmit: function handleSubmit() {
    console.warn('onSubmit was called but no handleSubmit function was provided.');
  } // eslint-disable-line

});