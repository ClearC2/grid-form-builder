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

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _defineProperty3 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _core = require("@emotion/core");

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Icons = require("../../Icons");

var _Tooltip = _interopRequireDefault(require("../../Tooltip"));

var _utils = require("../../utils");

var _useTheme2 = _interopRequireDefault(require("../../theme/useTheme"));

function ownKeys(object, enumerableOnly) { var keys = (0, _keys.default)(object); if (_getOwnPropertySymbols.default) { var symbols = (0, _getOwnPropertySymbols.default)(object); if (enumerableOnly) symbols = (0, _filter.default)(symbols).call(symbols, function (sym) { return (0, _getOwnPropertyDescriptor.default)(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context; (0, _forEach.default)(_context = ownKeys(Object(source), true)).call(_context, function (key) { (0, _defineProperty3.default)(target, key, source[key]); }); } else if (_getOwnPropertyDescriptors.default) { (0, _defineProperties.default)(target, (0, _getOwnPropertyDescriptors.default)(source)); } else { var _context2; (0, _forEach.default)(_context2 = ownKeys(Object(source))).call(_context2, function (key) { (0, _defineProperty2.default)(target, key, (0, _getOwnPropertyDescriptor.default)(source, key)); }); } } return target; }

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
  Icon = (0, _Icons.mapIcon)(Icon);
  LinkIcon = (0, _Icons.mapIcon)(LinkIcon);
  CascadeIcon = (0, _Icons.mapIcon)(CascadeIcon);
  var name = config.name,
      _config$label = config.label,
      label = _config$label === void 0 ? name : _config$label;
  var iconId = (0, _react.useRef)((0, _utils.randomId)());
  var linkId = (0, _react.useRef)((0, _utils.randomId)());
  var cascadeId = (0, _react.useRef)((0, _utils.randomId)());
  var labelId = (0, _react.useRef)((0, _utils.randomId)());

  var _useTheme = (0, _useTheme2.default)(),
      theme = _useTheme.theme;

  var onLinkClick = (0, _react.useCallback)(function () {
    handleLinkClick(config.link);
  }, [handleLinkClick, config.link]);
  var onCascadeKeywordClick = (0, _react.useCallback)(function () {
    handleCascadeKeywordClick(_objectSpread({
      currentValue: value
    }, config));
  }, [handleCascadeKeywordClick, value, config]);
  var onLabelTextClick = (0, _react.useCallback)(function () {
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

  var size = (0, _indexOf.default)(className).call(className, 'full-cell-label') > -1 ? 40 : 15;
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
  return (0, _core.jsx)("div", {
    className: className,
    style: cellStyle,
    css: theme.cellLabel
  }, (0, _core.jsx)(_Tooltip.default, {
    id: iconId.current,
    message: iconTooltip
  }), (0, _core.jsx)(_Tooltip.default, {
    id: linkId.current,
    message: linkTooltip
  }), (0, _core.jsx)(_Tooltip.default, {
    id: cascadeId.current,
    message: cascadeTooltip
  }), (0, _core.jsx)(_Tooltip.default, {
    id: labelId.current,
    message: labelTooltip
  }), Icon && (0, _core.jsx)(Icon, {
    size: size,
    style: iconStyle,
    "data-tip": true,
    "data-for": iconId.current,
    css: theme.icon
  }), required && (0, _core.jsx)("strong", {
    className: "gfb-validation-indicator"
  }, "*"), label && type !== 'header' && (0, _core.jsx)("strong", {
    onClick: onLabelTextClick,
    className: LinkIcon || CascadeIcon ? 'cursor-hand gfb-field-label' : 'gfb-field-label',
    style: labelStyle,
    "data-tip": true,
    "data-for": labelId.current,
    css: theme.label
  }, label), label && type === 'header' && (0, _core.jsx)("h3", {
    onClick: onLabelTextClick,
    className: LinkIcon || CascadeIcon ? 'cursor-hand' : '',
    style: labelStyle,
    "data-tip": true,
    "data-for": labelId.current,
    css: theme.label
  }, label), LinkIcon && (0, _core.jsx)(LinkIcon, {
    className: "cursor-hand",
    onClick: onLinkClick,
    style: linkStyle,
    "data-tip": true,
    "data-for": linkId.current,
    css: theme.link
  }), CascadeIcon && (0, _core.jsx)(CascadeIcon, {
    className: "cursor-hand",
    onClick: onCascadeKeywordClick,
    style: cascadeStyle,
    "data-tip": true,
    "data-for": cascadeId.current,
    css: theme.cascade
  }));
};

var _default = LabelContainer;
exports.default = _default;
LabelContainer.propTypes = {
  config: _propTypes.default.object,
  handleLinkClick: _propTypes.default.func,
  handleCascadeKeywordClick: _propTypes.default.func,
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number, _propTypes.default.array, _propTypes.default.object, _propTypes.default.bool]),
  type: _propTypes.default.string
};