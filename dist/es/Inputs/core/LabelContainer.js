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

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context, _context2; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty(_context = ownKeys(Object(source), !0)).call(_context, function (key) { _defineProperty(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty(_context2 = ownKeys(Object(source))).call(_context2, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { mapIcon } from '../../Icons';
import PortalTooltip from '../../Tooltip';
import { randomId } from '../../utils';
import useTheme from '../../theme/useTheme';

var LabelContainer = function LabelContainer(props) {
  var config = props.config,
      handleLinkClick = props.handleLinkClick,
      handleCascadeKeywordClick = props.handleCascadeKeywordClick,
      value = props.value;
  var _config$icon = config.icon,
      Icon = _config$icon === void 0 ? '' : _config$icon,
      _config$cascade = config.cascade,
      cascade = _config$cascade === void 0 ? {} : _config$cascade,
      _config$link = config.link,
      link = _config$link === void 0 ? {} : _config$link,
      _config$type = config.type,
      type = _config$type === void 0 ? '' : _config$type;
  var required = config.required,
      _config$style = config.style,
      style = _config$style === void 0 ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === void 0 ? {} : _config$tooltips;
  type = type.toLowerCase();
  var _cascade$icon = cascade.icon,
      CascadeIcon = _cascade$icon === void 0 ? '' : _cascade$icon,
      cascadeTooltip = cascade.tooltip;
  var _link$icon = link.icon,
      LinkIcon = _link$icon === void 0 ? '' : _link$icon,
      linkTooltip = link.tooltip;
  var iconTooltip = tooltips.icon,
      labelTooltip = tooltips.label;
  Icon = mapIcon(Icon);
  LinkIcon = mapIcon(LinkIcon);
  CascadeIcon = mapIcon(CascadeIcon);
  var name = config.name,
      _config$label = config.label,
      label = _config$label === void 0 ? name : _config$label;
  var iconId = useRef(randomId());
  var linkId = useRef(randomId());
  var cascadeId = useRef(randomId());
  var labelId = useRef(randomId());

  var _useTheme = useTheme(),
      theme = _useTheme.theme;

  var onLinkClick = useCallback(function () {
    handleLinkClick(config.link);
  }, [handleLinkClick, config.link]);
  var onCascadeKeywordClick = useCallback(function () {
    handleCascadeKeywordClick(_objectSpread({
      currentValue: value
    }, config));
  }, [handleCascadeKeywordClick, value, config]);
  var onLabelTextClick = useCallback(function () {
    if (LinkIcon) onLinkClick();
    if (CascadeIcon) onCascadeKeywordClick();
  }, [LinkIcon, onLinkClick, CascadeIcon, onCascadeKeywordClick]);
  var className = 'gfb-inner-cell-label';

  if (type === 'icon' || type === 'header') {
    className = className + ' gfb-full-cell-label';
  }

  if (type === 'metadata') {
    className = className + ' gfb-small';
  }

  var size = _indexOfInstanceProperty(className).call(className, 'full-cell-label') > -1 ? 40 : 15;
  var _style$label = style.label,
      labelStyle = _style$label === void 0 ? {} : _style$label,
      _style$icon = style.icon,
      iconStyle = _style$icon === void 0 ? {} : _style$icon,
      _style$link = style.link,
      linkStyle = _style$link === void 0 ? {} : _style$link,
      _style$cascade = style.cascade,
      cascadeStyle = _style$cascade === void 0 ? {} : _style$cascade,
      _style$cellLabel = style.cellLabel,
      cellStyle = _style$cellLabel === void 0 ? {} : _style$cellLabel;
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