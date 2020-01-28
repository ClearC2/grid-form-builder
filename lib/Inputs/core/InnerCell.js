'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /** @jsx jsx */


var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormBuilder = require('../../FormBuilder');

var _InputContainer = require('./InputContainer');

var _InputContainer2 = _interopRequireDefault(_InputContainer);

var _LabelContainer = require('./LabelContainer');

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _index = require('../index');

var _reactDnd = require('react-dnd');

var _Tooltip = require('../../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require('../../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
      droppedItem = _props$droppedItem === undefined ? null : _props$droppedItem,
      handleLinkClick = props.handleLinkClick,
      handleCascadeKeywordClick = props.handleCascadeKeywordClick,
      handleOnChange = props.handleOnChange,
      requiredWarning = props.requiredWarning,
      tabIndex = props.tabIndex,
      dateFormat = props.dateFormat,
      dateTimeFormat = props.dateTimeFormat,
      timeFormat = props.timeFormat,
      handleRTEImageClick = props.handleRTEImageClick,
      autoComplete = props.autoComplete;
  var config = field.config;

  var _useContext = (0, _react.useContext)(_FormBuilder.FormValueContext),
      _useContext2 = _slicedToArray(_useContext, 1),
      formValues = _useContext2[0];

  var cellId = (0, _react.useRef)((0, _utils.randomId)());

  // we want to make fields readonly if draggable is on but it mutates the schema on the callback so every input is readonly on update
  // we will come up with a way to do this without modifying the schema - JRA 12/10/2019
  if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true;
  }

  var Type = (0, _index.mapInputType)(config.type);

  var value = formValues.get(config.name, '');

  (0, _react.useEffect)(function () {
    if (didDrop && !previousDrop.current.didDrop && !isOver && previousDrop.current.isOver) {
      // clone these objects before we send them up, we don't want them mutating them and causing unexpected behavior down here - JRA 12/05/2019
      var source = (typeof droppedItem === 'undefined' ? 'undefined' : _typeof(droppedItem)) === 'object' && _typeof(droppedItem.widget) === 'object' ? _extends({}, droppedItem.widget) : null;
      var target = (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' && _typeof(field.config) === 'object' ? _extends({}, field.config) : null;
      handleDragDropOnInput({ source: source, target: target });
    }
  }, [didDrop, isOver, handleDragDropOnInput, field, droppedItem]);

  var previousDrop = (0, _react.useRef)({ didDrop: false, isOver: false });
  (0, _react.useEffect)(function () {
    previousDrop.current = {
      didDrop: didDrop,
      isOver: isOver
    };
  }, [didDrop, isOver]);

  var onGridElementClick = (0, _react.useCallback)(function (e) {
    var config = (typeof field === 'undefined' ? 'undefined' : _typeof(field)) === 'object' && _typeof(field.config) === 'object' ? _extends({}, field.config) : {};
    config.index = index;
    if (draggable) {
      // if the user clicks into a field that is draggable, the input loses focus
      // do we want to figure out a way to refocus the field here so they can edit the value even though the whole cell is draggable? - JRA 12/06/2019
      // e.stopPropagation()
    }
    handleAnywhereClick(config, e);
  }, [handleAnywhereClick, index, field, draggable]);

  var onChange = (0, _react.useCallback)(function (e) {
    if ((typeof e === 'undefined' ? 'undefined' : _typeof(e)) !== 'object') e = {};
    if (_typeof(e.target) !== 'object') e.target = {};
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
      style = _config$style === undefined ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === undefined ? {} : _config$tooltips;
  var _style$innerCell = style.innerCell,
      innerCell = _style$innerCell === undefined ? {} : _style$innerCell;
  var cellTooltip = tooltips.cell;

  return connectDropTarget((0, _core.jsx)(
    'div',
    {
      style: innerCell,
      className: className,
      onClick: onGridElementClick,
      'data-tip': true,
      'data-for': cellId.current
    },
    (0, _core.jsx)(_Tooltip2.default, { id: cellId.current, message: cellTooltip }),
    (0, _core.jsx)(_LabelContainer2.default, {
      config: config,
      handleLinkClick: handleLinkClick,
      handleCascadeKeywordClick: handleCascadeKeywordClick,
      value: value
    }),
    (0, _core.jsx)(
      _InputContainer2.default,
      {
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
        interactive: interactive
      },
      (0, _core.jsx)(Type, null)
    )
  ));
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

exports.default = (0, _reactDnd.DropTarget)('FormBuilderDraggable', boxTarget, collect)(InnerCell);


InnerCell.propTypes = {
  field: _propTypes2.default.object,
  handleAnywhereClick: _propTypes2.default.func,
  index: _propTypes2.default.number,
  interactive: _propTypes2.default.bool,
  draggable: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  didDrop: _propTypes2.default.bool,
  handleDragDropOnInput: _propTypes2.default.func,
  handleOnChange: _propTypes2.default.func,
  requiredWarning: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.number,
  dateFormat: _propTypes2.default.string,
  dateTimeFormat: _propTypes2.default.string,
  timeFormat: _propTypes2.default.string,
  handleRTEImageClick: _propTypes2.default.func,
  autoComplete: _propTypes2.default.string
};