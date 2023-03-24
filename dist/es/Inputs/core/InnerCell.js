import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useContext, useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FormValueContext } from '../../FormBuilder';
import InputContainer from './InputContainer';
import LabelContainer from './LabelContainer';
import { mapInputType } from '../index';
import { DropTarget } from 'react-dnd';
import PortalTooltip from '../../Tooltip';
import { randomId } from '../../utils';

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

  var _useContext = useContext(FormValueContext),
      _useContext2 = _slicedToArray(_useContext, 1),
      formValues = _useContext2[0];

  var cellId = useRef(randomId()); // we want to make fields readonly if draggable is on but it mutates the schema on the callback so every input is readonly on update
  // we will come up with a way to do this without modifying the schema - JRA 12/10/2019

  if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true;
  }

  var Type = mapInputType(config.type);
  var value = formValues.get(config.name, '');
  useEffect(function () {
    if (didDrop && !previousDrop.current.didDrop && !isOver && previousDrop.current.isOver) {
      // clone these objects before we send them up, we don't want them mutating them and causing unexpected behavior down here - JRA 12/05/2019
      var source = _typeof(droppedItem) === 'object' && _typeof(droppedItem.widget) === 'object' ? _objectSpread({}, droppedItem.widget) : null;
      var target = _typeof(field) === 'object' && _typeof(field.config) === 'object' ? _objectSpread({}, field.config) : null;
      handleDragDropOnInput({
        source: source,
        target: target
      });
    }
  }, [didDrop, isOver, handleDragDropOnInput, field, droppedItem]);
  var previousDrop = useRef({
    didDrop: false,
    isOver: false
  });
  useEffect(function () {
    previousDrop.current = {
      didDrop: didDrop,
      isOver: isOver
    };
  }, [didDrop, isOver]);
  var onGridElementClick = useCallback(function (e) {
    var config = _typeof(field) === 'object' && _typeof(field.config) === 'object' ? _objectSpread({}, field.config) : {};
    config.index = index;

    if (draggable) {// if the user clicks into a field that is draggable, the input loses focus
      // do we want to figure out a way to refocus the field here so they can edit the value even though the whole cell is draggable? - JRA 12/06/2019
      // e.stopPropagation()
    }

    handleAnywhereClick(config, e);
  }, [handleAnywhereClick, index, field, draggable]);
  var onChange = useCallback(function (e) {
    if (_typeof(e) !== 'object') e = {};
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
      style = _config$style === void 0 ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === void 0 ? {} : _config$tooltips;
  var _style$innerCell = style.innerCell,
      innerCell = _style$innerCell === void 0 ? {} : _style$innerCell;
  var cellTooltip = tooltips.cell;
  return connectDropTarget(jsx("div", {
    style: innerCell,
    className: className,
    onClick: onGridElementClick,
    "data-tip": true,
    "data-for": cellId.current
  }, jsx(PortalTooltip, {
    id: cellId.current,
    message: cellTooltip
  }), jsx(LabelContainer, {
    config: config,
    handleLinkClick: handleLinkClick,
    handleCascadeKeywordClick: handleCascadeKeywordClick,
    value: value
  }), jsx(InputContainer, {
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
  }, jsx(Type, null))));
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
export default DropTarget('FormBuilderDraggable', boxTarget, collect)(InnerCell);
InnerCell.propTypes = {
  field: PropTypes.object,
  handleAnywhereClick: PropTypes.func,
  index: PropTypes.number,
  interactive: PropTypes.bool,
  draggable: PropTypes.bool,
  readonly: PropTypes.bool,
  didDrop: PropTypes.bool,
  handleDragDropOnInput: PropTypes.func,
  handleOnChange: PropTypes.func,
  requiredWarning: PropTypes.bool,
  tabIndex: PropTypes.number,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.string,
  device: PropTypes.object
};