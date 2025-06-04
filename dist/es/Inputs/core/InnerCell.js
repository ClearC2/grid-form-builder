import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
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
import { Map } from 'immutable';
const InnerCell = props => {
  const {
    field,
    handleAnywhereClick,
    index,
    interactive,
    draggable,
    readonly,
    didDrop,
    isOver,
    connectDropTarget,
    handleDragDropOnInput,
    droppedItem = null,
    handleLinkClick,
    handleCascadeKeywordClick,
    handleOnChange,
    requiredWarning,
    tabIndex,
    dateFormat,
    dateTimeFormat,
    timeFormat,
    handleRTEImageClick,
    autoComplete,
    device,
    fieldDefinitions,
    c2class
  } = props;
  const {
    config = {}
  } = field;
  const [formValues] = useContext(FormValueContext);
  const cellId = useRef(randomId());

  // we want to make fields readonly if draggable is on but it mutates the schema on the callback so every input is readonly on update
  // we will come up with a way to do this without modifying the schema - JRA 12/10/2019
  if (readonly || +formValues.get('cfd_userisreadonly', '0') === 1) {
    config.readonly = true;
  }
  const Type = mapInputType(config.type);
  const value = formValues.get(config.name, '');
  useEffect(() => {
    if (didDrop && !previousDrop.current.didDrop && !isOver && previousDrop.current.isOver) {
      // clone these objects before we send them up, we don't want them mutating them and causing unexpected behavior down here - JRA 12/05/2019
      const source = typeof droppedItem === 'object' && typeof droppedItem.widget === 'object' ? _objectSpread({}, droppedItem.widget) : null;
      const target = typeof field === 'object' && typeof field.config === 'object' ? _objectSpread({}, field.config) : null;
      handleDragDropOnInput({
        source,
        target
      });
    }
  }, [didDrop, isOver, handleDragDropOnInput, field, droppedItem]);
  const previousDrop = useRef({
    didDrop: false,
    isOver: false
  });
  useEffect(() => {
    previousDrop.current = {
      didDrop,
      isOver
    };
  }, [didDrop, isOver]);
  const onGridElementClick = useCallback(e => {
    const config = typeof field === 'object' && typeof field.config === 'object' ? _objectSpread({}, field.config) : {};
    config.index = index;
    if (draggable) {
      // if the user clicks into a field that is draggable, the input loses focus
      // do we want to figure out a way to refocus the field here so they can edit the value even though the whole cell is draggable? - JRA 12/06/2019
      // e.stopPropagation()
    }
    handleAnywhereClick(config, e);
  }, [handleAnywhereClick, index, field, draggable]);
  const onChange = useCallback(e => {
    if (typeof e !== 'object') e = {};
    if (typeof e.target !== 'object') e.target = {};
    if (!e.target.name) e.target.name = config.name;
    if (!e.target.value) e.target.value = '';
    handleOnChange(e);
  }, [handleOnChange, config.name]);
  let className = 'gfb-inner-cell';
  if (typeof config.type === 'string') {
    const type = config.type.toLowerCase();
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
  const {
    style = {},
    tooltips = {}
  } = config;
  const {
    innerCell = {}
  } = style;
  const {
    cell: cellTooltip
  } = tooltips;
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
    device: device,
    fieldDefinitions: fieldDefinitions,
    c2class: c2class
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
const boxTarget = {
  drop(props, monitor) {
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
  device: PropTypes.object,
  fieldDefinitions: PropTypes.instanceOf(Map),
  c2class: PropTypes.string
};