"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty2 = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty2(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-property"));

var _defineProperties = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/define-properties"));

var _getOwnPropertyDescriptors = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _getOwnPropertyDescriptor = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _getOwnPropertySymbols = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/typeof"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _FormBuilder = require("../../FormBuilder");

var _InputContainer = _interopRequireDefault(require("./InputContainer"));

var _LabelContainer = _interopRequireDefault(require("./LabelContainer"));

var _index = require("../index");

var _reactDnd = require("react-dnd");

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

var _utils = require("../../utils");

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

var InnerCell = function InnerCell(props) {
  var field = props.field,
      handleAnywhereClick = props.handleAnywhereClick,
      index = props.index,
      interactive = props.interactive,
      draggable = props.draggable,
      readonly = props.readonly,
      didDrop = props.didDrop,
      isOver = props.isOver,
      connectDropTarget = props.connectDropTarget,
      handleDragDropOnInput = props.handleDragDropOnInput,
      _props$droppedItem = props.droppedItem,
      droppedItem = _props$droppedItem === void 0 ? null : _props$droppedItem,
      handleLinkClick = props.handleLinkClick,
      handleCascadeKeywordClick = props.handleCascadeKeywordClick,
      handleOnChange = props.handleOnChange,
      requiredWarning = props.requiredWarning,
      tabIndex = props.tabIndex,
      dateFormat = props.dateFormat,
      dateTimeFormat = props.dateTimeFormat,
      timeFormat = props.timeFormat,
      handleRTEImageClick = props.handleRTEImageClick,
      autoComplete = props.autoComplete,
      device = props.device;
  var _field$config = field.config,
      config = _field$config === void 0 ? {} : _field$config;

  var _useContext = (0, _react.useContext)(_FormBuilder.FormValueContext),
      _useContext2 = (0, _slicedToArray2.default)(_useContext, 1),
      formValues = _useContext2[0];

  var cellId = (0, _react.useRef)((0, _utils.randomId)()); // we want to make fields readonly if draggable is on but it mutates the schema on the callback so every input is readonly on update
  // we will come up with a way to do this without modifying the schema - JRA 12/10/2019

  if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true;
  }

  var Type = (0, _index.mapInputType)(config.type);
  var value = formValues.get(config.name, '');
  (0, _react.useEffect)(function () {
    if (didDrop && !previousDrop.current.didDrop && !isOver && previousDrop.current.isOver) {
      // clone these objects before we send them up, we don't want them mutating them and causing unexpected behavior down here - JRA 12/05/2019
      var source = (0, _typeof2.default)(droppedItem) === 'object' && (0, _typeof2.default)(droppedItem.widget) === 'object' ? _objectSpread({}, droppedItem.widget) : null;
      var target = (0, _typeof2.default)(field) === 'object' && (0, _typeof2.default)(field.config) === 'object' ? _objectSpread({}, field.config) : null;
      handleDragDropOnInput({
        source: source,
        target: target
      });
    }
  }, [didDrop, isOver, handleDragDropOnInput, field, droppedItem]);
  var previousDrop = (0, _react.useRef)({
    didDrop: false,
    isOver: false
  });
  (0, _react.useEffect)(function () {
    previousDrop.current = {
      didDrop: didDrop,
      isOver: isOver
    };
  }, [didDrop, isOver]);
  var onGridElementClick = (0, _react.useCallback)(function (e) {
    var config = (0, _typeof2.default)(field) === 'object' && (0, _typeof2.default)(field.config) === 'object' ? _objectSpread({}, field.config) : {};
    config.index = index;

    if (draggable) {// if the user clicks into a field that is draggable, the input loses focus
      // do we want to figure out a way to refocus the field here so they can edit the value even though the whole cell is draggable? - JRA 12/06/2019
      // e.stopPropagation()
    }

    handleAnywhereClick(config, e);
  }, [handleAnywhereClick, index, field, draggable]);
  var onChange = (0, _react.useCallback)(function (e) {
    if ((0, _typeof2.default)(e) !== 'object') e = {};
    if ((0, _typeof2.default)(e.target) !== 'object') e.target = {};
    if (!e.target.name) e.target.name = config.name;
    if (!e.target.value) e.target.value = '';
    handleOnChange(e);
  }, [handleOnChange, config.name]);
  var className = 'gfb-inner-cell';

  if (typeof config.type === 'string') {
    var type = config.type.toLowerCase();

    if (type === 'checkbox') {
      className = className + ' gfb-inline-cell gfb-checkbox';

      if (config.required && requiredWarning && (value + '').length === 0) {
        className = className + ' gfb-checkbox-label-with-validation';
      }
    }

    if (type === 'metadata') {
      className = className + ' gfb-inline-cell';
    }
  }

  var _config$style = config.style,
      style = _config$style === void 0 ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === void 0 ? {} : _config$tooltips;
  var _style$innerCell = style.innerCell,
      innerCell = _style$innerCell === void 0 ? {} : _style$innerCell;
  var cellTooltip = tooltips.cell;
  return connectDropTarget((0, _core.jsx)("div", {
    style: innerCell,
    className: className,
    onClick: onGridElementClick,
    "data-tip": true,
    "data-for": cellId.current
  }, (0, _core.jsx)(_Tooltip.default, {
    id: cellId.current,
    message: cellTooltip
  }), (0, _core.jsx)(_LabelContainer.default, {
    config: config,
    handleLinkClick: handleLinkClick,
    handleCascadeKeywordClick: handleCascadeKeywordClick,
    value: value
  }), (0, _core.jsx)(_InputContainer.default, {
    config: config,
    value: value,
    values: formValues,
    onChange: onChange,
    requiredWarning: requiredWarning,
    tabIndex: tabIndex,
    draggable: draggable,
    dateFormat: dateFormat,
    dateTimeFormat: dateTimeFormat,
    timeFormat: timeFormat,
    handleRTEImageClick: handleRTEImageClick,
    autoComplete: autoComplete,
    interactive: interactive,
    device: device
  }, (0, _core.jsx)(Type, null))));
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    droppedItem: monitor.getDropResult(),
    didDrop: monitor.didDrop(),
    isOver: monitor.isOver()
  };
}

var boxTarget = {
  drop: function drop(props, monitor) {
    return {
      widget: monitor.getItem()
    };
  }
};

var _default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(InnerCell);

exports.default = _default;
InnerCell.propTypes = {
  field: _propTypes.default.object,
  handleAnywhereClick: _propTypes.default.func,
  index: _propTypes.default.number,
  interactive: _propTypes.default.bool,
  draggable: _propTypes.default.bool,
  readonly: _propTypes.default.bool,
  didDrop: _propTypes.default.bool,
  handleDragDropOnInput: _propTypes.default.func,
  handleOnChange: _propTypes.default.func,
  requiredWarning: _propTypes.default.bool,
  tabIndex: _propTypes.default.number,
  dateFormat: _propTypes.default.string,
  dateTimeFormat: _propTypes.default.string,
  timeFormat: _propTypes.default.string,
  handleRTEImageClick: _propTypes.default.func,
  autoComplete: _propTypes.default.string,
  device: _propTypes.default.object
};