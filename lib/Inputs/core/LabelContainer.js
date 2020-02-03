'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /** @jsx jsx */


var _core = require('@emotion/core');

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icons = require('../../Icons');

var _Tooltip = require('../../Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require('../../utils');

var _useTheme2 = require('../../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LabelContainer = function LabelContainer(props) {
  var config = props.config,
      handleLinkClick = props.handleLinkClick,
      handleCascadeKeywordClick = props.handleCascadeKeywordClick,
      value = props.value;
  var _config$icon = config.icon,
      Icon = _config$icon === undefined ? '' : _config$icon,
      _config$cascade = config.cascade,
      cascade = _config$cascade === undefined ? {} : _config$cascade,
      _config$link = config.link,
      link = _config$link === undefined ? {} : _config$link,
      _config$type = config.type,
      type = _config$type === undefined ? '' : _config$type;
  var required = config.required,
      _config$style = config.style,
      style = _config$style === undefined ? {} : _config$style,
      _config$tooltips = config.tooltips,
      tooltips = _config$tooltips === undefined ? {} : _config$tooltips;

  type = type.toLowerCase();
  var _cascade$icon = cascade.icon,
      CascadeIcon = _cascade$icon === undefined ? '' : _cascade$icon,
      cascadeTooltip = cascade.tooltip;
  var _link$icon = link.icon,
      LinkIcon = _link$icon === undefined ? '' : _link$icon,
      linkTooltip = link.tooltip;
  var iconTooltip = tooltips.icon,
      labelTooltip = tooltips.label;

  Icon = (0, _Icons.mapIcon)(Icon);
  LinkIcon = (0, _Icons.mapIcon)(LinkIcon);
  CascadeIcon = (0, _Icons.mapIcon)(CascadeIcon);
  var name = config.name,
      _config$label = config.label,
      label = _config$label === undefined ? name : _config$label;

  var iconId = (0, _react.useRef)((0, _utils.randomId)());
  var linkId = (0, _react.useRef)((0, _utils.randomId)());
  var cascadeId = (0, _react.useRef)((0, _utils.randomId)());
  var labelId = (0, _react.useRef)((0, _utils.randomId)());

  var _useTheme = (0, _useTheme3.default)(),
      theme = _useTheme.theme;

  var onLinkClick = (0, _react.useCallback)(function () {
    handleLinkClick(config.link);
  }, [handleLinkClick, config.link]);

  var onCascadeKeywordClick = (0, _react.useCallback)(function () {
    handleCascadeKeywordClick(_extends({ currentValue: value }, config));
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

  var size = className.indexOf('full-cell-label') > -1 ? 40 : 15;

  var _style$label = style.label,
      labelStyle = _style$label === undefined ? {} : _style$label,
      _style$icon = style.icon,
      iconStyle = _style$icon === undefined ? {} : _style$icon,
      _style$link = style.link,
      linkStyle = _style$link === undefined ? {} : _style$link,
      _style$cascade = style.cascade,
      cascadeStyle = _style$cascade === undefined ? {} : _style$cascade,
      _style$cellLabel = style.cellLabel,
      cellStyle = _style$cellLabel === undefined ? {} : _style$cellLabel;


  return (0, _core.jsx)(
    'div',
    { className: className, style: cellStyle, css: theme.cellLabel },
    (0, _core.jsx)(_Tooltip2.default, { id: iconId.current, message: iconTooltip }),
    (0, _core.jsx)(_Tooltip2.default, { id: linkId.current, message: linkTooltip }),
    (0, _core.jsx)(_Tooltip2.default, { id: cascadeId.current, message: cascadeTooltip }),
    (0, _core.jsx)(_Tooltip2.default, { id: labelId.current, message: labelTooltip }),
    Icon && (0, _core.jsx)(Icon, {
      size: size,
      style: iconStyle,
      'data-tip': true,
      'data-for': iconId.current,
      css: theme.icon
    }),
    required && (0, _core.jsx)(
      'strong',
      { className: 'gfb-validation-indicator' },
      '*'
    ),
    label && type !== 'header' && (0, _core.jsx)(
      'strong',
      {
        onClick: onLabelTextClick,
        className: LinkIcon || CascadeIcon ? 'cursor-hand gfb-field-label' : 'gfb-field-label',
        style: labelStyle,
        'data-tip': true,
        'data-for': labelId.current,
        css: theme.label
      },
      label
    ),
    label && type === 'header' && (0, _core.jsx)(
      'h3',
      {
        onClick: onLabelTextClick,
        className: LinkIcon || CascadeIcon ? 'cursor-hand' : '',
        style: labelStyle,
        'data-tip': true,
        'data-for': labelId.current,
        css: theme.label
      },
      label
    ),
    LinkIcon && (0, _core.jsx)(LinkIcon, {
      className: 'cursor-hand',
      onClick: onLinkClick,
      style: linkStyle,
      'data-tip': true,
      'data-for': linkId.current,
      css: theme.link
    }),
    CascadeIcon && (0, _core.jsx)(CascadeIcon, {
      className: 'cursor-hand',
      onClick: onCascadeKeywordClick,
      style: cascadeStyle,
      'data-tip': true,
      'data-for': cascadeId.current,
      css: theme.cascade
    })
  );
};

exports.default = LabelContainer;


LabelContainer.propTypes = {
  config: _propTypes2.default.object,
  handleLinkClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object]),
  type: _propTypes2.default.string
};