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
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import PortalTooltip from './Tooltip';
import LabelContainer from './Inputs/core/LabelContainer';
import InputContainer from './Inputs/core/InputContainer';
import { randomId, uppercaseFirstLetter } from './utils';
import { mapInputType } from './Inputs';
import { fromJS } from 'immutable';
const GFBInput = props => {
  const {
    name,
    label,
    style = {},
    validate,
    required,
    value = '',
    onClick,
    cellTooltip,
    link = {},
    cascade = {},
    onChange,
    tabIndex,
    interactive = true,
    handleRTEImageClick = () => null,
    dateFormat = 'M/D/YYYY',
    dateTimeFormat = 'M/D/YYYY h:mm a',
    timeFormat = 'h:mm a',
    draggable,
    icon,
    tooltips,
    delimiter
  } = props;
  let {
    className = '',
    type = 'input',
    autoComplete = false,
    values = {}
  } = props;
  if (!values.toJS) values = fromJS(values);
  if (!autoComplete) autoComplete = 'off';
  const cellId = useRef(randomId());
  if (!type) type = 'input';
  if (typeof type === 'string') {
    type = uppercaseFirstLetter(type);
  } else {
    type = 'Input';
  }
  const Type = mapInputType(type);
  const {
    innerCell = {}
  } = style;
  className = className + ' gfb-inner-cell';
  if (type === 'Checkbox') {
    className = className + ' gfb-inline-cell gfb-checkbox';
  }
  if (type === 'Metadata') {
    className = className + ' gfb-inline-cell';
  }
  const config = _objectSpread(_objectSpread(_objectSpread({}, props), props.config), {}, {
    required,
    link,
    cascade,
    type,
    icon,
    tooltips,
    label,
    name,
    delimiter
  });
  return /*#__PURE__*/React.createElement("div", {
    style: innerCell,
    className: className,
    onClick: onClick,
    "data-tip": true,
    "data-for": cellId.current
  }, /*#__PURE__*/React.createElement(PortalTooltip, {
    id: cellId.current,
    message: cellTooltip
  }), /*#__PURE__*/React.createElement(LabelContainer, {
    config: config,
    handleLinkClick: link.handleLinkClick,
    handleCascadeKeywordClick: cascade.handleCascadeKeywordClick,
    value: value
  }), /*#__PURE__*/React.createElement(InputContainer, {
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
  }, /*#__PURE__*/React.createElement(Type, null)));
};
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  icon: PropTypes.string,
  tooltips: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  delimiter: PropTypes.string,
  config: PropTypes.object
};
export default GFBInput;