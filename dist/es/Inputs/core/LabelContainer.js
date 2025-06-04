import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context, _context2; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(t), !0)).call(_context, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context2 = ownKeys(Object(t))).call(_context2, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { mapIcon } from '../../Icons';
import PortalTooltip from '../../Tooltip';
import { randomId } from '../../utils';
import useTheme from '../../theme/useTheme';
const LabelContainer = props => {
  const {
    config,
    handleLinkClick,
    handleCascadeKeywordClick,
    value
  } = props;
  let {
    icon: Icon = '',
    cascade = {},
    link = {},
    type = ''
  } = config;
  const {
    required,
    style = {},
    tooltips = {}
  } = config;
  type = type.toLowerCase();
  let {
    icon: CascadeIcon = '',
    tooltip: cascadeTooltip
  } = cascade;
  let {
    icon: LinkIcon = '',
    tooltip: linkTooltip
  } = link;
  const {
    icon: iconTooltip,
    label: labelTooltip
  } = tooltips;
  Icon = mapIcon(Icon);
  LinkIcon = mapIcon(LinkIcon);
  CascadeIcon = mapIcon(CascadeIcon);
  const {
    name,
    label = name
  } = config;
  const iconId = useRef(randomId());
  const linkId = useRef(randomId());
  const cascadeId = useRef(randomId());
  const labelId = useRef(randomId());
  const {
    theme
  } = useTheme();
  const onLinkClick = useCallback(() => {
    handleLinkClick(config.link);
  }, [handleLinkClick, config.link]);
  const onCascadeKeywordClick = useCallback(() => {
    handleCascadeKeywordClick(_objectSpread({
      currentValue: value
    }, config));
  }, [handleCascadeKeywordClick, value, config]);
  const onLabelTextClick = useCallback(() => {
    if (LinkIcon) onLinkClick();
    if (CascadeIcon) onCascadeKeywordClick();
  }, [LinkIcon, onLinkClick, CascadeIcon, onCascadeKeywordClick]);
  let className = 'gfb-inner-cell-label';
  if (type === 'icon' || type === 'header') {
    className = className + ' gfb-full-cell-label';
  }
  if (type === 'metadata') {
    className = className + ' gfb-small';
  }
  const size = _indexOfInstanceProperty(className).call(className, 'full-cell-label') > -1 ? 40 : 15;
  const {
    label: labelStyle = {},
    icon: iconStyle = {},
    link: linkStyle = {},
    cascade: cascadeStyle = {},
    cellLabel: cellStyle = {}
  } = style;
  return jsx("div", {
    className: className,
    style: cellStyle,
    css: theme.cellLabel
  }, jsx(PortalTooltip, {
    id: iconId.current,
    message: iconTooltip
  }), jsx(PortalTooltip, {
    id: linkId.current,
    message: linkTooltip
  }), jsx(PortalTooltip, {
    id: cascadeId.current,
    message: cascadeTooltip
  }), jsx(PortalTooltip, {
    id: labelId.current,
    message: labelTooltip
  }), Icon && jsx(Icon, {
    size: size,
    style: iconStyle,
    "data-tip": true,
    "data-for": iconId.current,
    css: theme.icon
  }), required && jsx("strong", {
    className: "gfb-validation-indicator"
  }, "*"), label && type !== 'header' && jsx("strong", {
    onClick: onLabelTextClick,
    className: LinkIcon || CascadeIcon ? 'cursor-hand gfb-field-label' : 'gfb-field-label',
    style: labelStyle,
    "data-tip": true,
    "data-for": labelId.current,
    css: theme.label
  }, label), label && type === 'header' && jsx("h3", {
    onClick: onLabelTextClick,
    className: LinkIcon || CascadeIcon ? 'cursor-hand' : '',
    style: labelStyle,
    "data-tip": true,
    "data-for": labelId.current,
    css: theme.label
  }, label), LinkIcon && jsx(LinkIcon, {
    className: "cursor-hand",
    onClick: onLinkClick,
    style: linkStyle,
    "data-tip": true,
    "data-for": linkId.current,
    css: theme.link
  }), CascadeIcon && jsx(CascadeIcon, {
    className: "cursor-hand",
    onClick: onCascadeKeywordClick,
    style: cascadeStyle,
    "data-tip": true,
    "data-for": cascadeId.current,
    css: theme.cascade
  }));
};
export default LabelContainer;
LabelContainer.propTypes = {
  config: PropTypes.object,
  handleLinkClick: PropTypes.func,
  handleCascadeKeywordClick: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array, PropTypes.object, PropTypes.bool]),
  type: PropTypes.string
};