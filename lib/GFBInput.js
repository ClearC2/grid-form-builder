import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; _forEachInstanceProperty(_context = ownKeys(Object(source), true)).call(_context, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context2; _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PortalTooltip from './Tooltip';
import LabelContainer from './Inputs/core/LabelContainer';
import InputContainer from './Inputs/core/InputContainer';
import { randomId, uppercaseFirstLetter } from './utils';
import { mapInputType } from './Inputs';
import { fromJS } from 'immutable';

var GFBInput = function GFBInput(props) {
  var name = props.name,
      label = props.label,
      _props$style = props.style,
      style = _props$style === void 0 ? {} : _props$style,
      validate = props.validate,
      required = props.required,
      _props$value = props.value,
      value = _props$value === void 0 ? '' : _props$value,
      onClick = props.onClick,
      cellTooltip = props.cellTooltip,
      _props$link = props.link,
      link = _props$link === void 0 ? {} : _props$link,
      _props$cascade = props.cascade,
      cascade = _props$cascade === void 0 ? {} : _props$cascade,
      onChange = props.onChange,
      tabIndex = props.tabIndex,
      _props$interactive = props.interactive,
      interactive = _props$interactive === void 0 ? true : _props$interactive,
      _props$handleRTEImage = props.handleRTEImageClick,
      handleRTEImageClick = _props$handleRTEImage === void 0 ? function () {
    return null;
  } : _props$handleRTEImage,
      _props$dateFormat = props.dateFormat,
      dateFormat = _props$dateFormat === void 0 ? 'M/D/YYYY' : _props$dateFormat,
      _props$dateTimeFormat = props.dateTimeFormat,
      dateTimeFormat = _props$dateTimeFormat === void 0 ? 'M/D/YYYY h:mm a' : _props$dateTimeFormat,
      _props$timeFormat = props.timeFormat,
      timeFormat = _props$timeFormat === void 0 ? 'h:mm a' : _props$timeFormat,
      draggable = props.draggable,
      icon = props.icon,
      tooltips = props.tooltips,
      delimiter = props.delimiter;

  var _props$className = props.className,
      className = _props$className === void 0 ? '' : _props$className,
      _props$type = props.type,
      type = _props$type === void 0 ? 'input' : _props$type,
      _props$autoComplete = props.autoComplete,
      autoComplete = _props$autoComplete === void 0 ? false : _props$autoComplete,
      _props$values = _valuesInstanceProperty(props),
      values = _props$values === void 0 ? {} : _props$values;

  if (!values.toJS) values = fromJS(values);
  if (!autoComplete) autoComplete = 'off';
  var cellId = useRef(randomId());
  if (!type) type = 'input';

  if (typeof type === 'string') {
    type = uppercaseFirstLetter(type);
  } else {
    type = 'Input';
  }

  var Type = mapInputType(type);
  var _style$innerCell = style.innerCell,
      innerCell = _style$innerCell === void 0 ? {} : _style$innerCell;
  className = className + ' gfb-inner-cell';

  if (type === 'Checkbox') {
    className = className + ' gfb-inline-cell gfb-checkbox';
  }

  if (type === 'Metadata') {
    className = className + ' gfb-inline-cell';
  }

  var config = _objectSpread({}, props, {
    required: required,
    link: link,
    cascade: cascade,
    type: type,
    icon: icon,
    tooltips: tooltips,
    label: label,
    name: name,
    delimiter: delimiter
  });

  return React.createElement("div", {
    style: innerCell,
    className: className,
    onClick: onClick,
    "data-tip": true,
    "data-for": cellId.current
  }, React.createElement(PortalTooltip, {
    id: cellId.current,
    message: cellTooltip
  }), React.createElement(LabelContainer, {
    config: config,
    handleLinkClick: link.handleLinkClick,
    handleCascadeKeywordClick: cascade.handleCascadeKeywordClick,
    value: value
  }), React.createElement(InputContainer, {
    config: config,
    value: value,
    values: values,
    onChange: onChange,
    requiredWarning: validate,
    tabIndex: tabIndex,
    draggable: draggable,
    dateFormat: dateFormat,
    dateTimeFormat: dateTimeFormat,
    timeFormat: timeFormat,
    handleRTEImageClick: handleRTEImageClick,
    autoComplete: autoComplete,
    interactive: interactive
  }, React.createElement(Type, null)));
};

__signature__(GFBInput, "useRef{cellId}");

GFBInput.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  validate: PropTypes.bool,
  required: PropTypes.bool,
  onClick: PropTypes.func,
  cellTooltip: PropTypes.string,
  onChange: PropTypes.func,
  values: PropTypes.object,
  tabIndex: PropTypes.number,
  draggable: PropTypes.bool,
  dateFormat: PropTypes.string,
  dateTimeFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  handleRTEImageClick: PropTypes.func,
  autoComplete: PropTypes.bool,
  interactive: PropTypes.bool,
  link: PropTypes.object,
  cascade: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.string, PropTypes.number]),
  icon: PropTypes.string,
  tooltips: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  delimiter: PropTypes.string
};
var _default = GFBInput;
export default _default;
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(GFBInput, "GFBInput", "C:\\Development\\Projects\\grid-form-builder\\src\\GFBInput.js");
  reactHotLoader.register(_default, "default", "C:\\Development\\Projects\\grid-form-builder\\src\\GFBInput.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();