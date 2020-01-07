'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Icons = require('../../Icons');

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
      link = _config$link === undefined ? {} : _config$link;
  var _cascade$icon = cascade.icon,
      CascadeIcon = _cascade$icon === undefined ? '' : _cascade$icon;
  var _link$icon = link.icon,
      LinkIcon = _link$icon === undefined ? '' : _link$icon;

  Icon = (0, _Icons.mapIcon)(Icon);
  LinkIcon = (0, _Icons.mapIcon)(LinkIcon);
  CascadeIcon = (0, _Icons.mapIcon)(CascadeIcon);
  var name = config.name,
      _config$label = config.label,
      label = _config$label === undefined ? name : _config$label;


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

  return _react2.default.createElement(
    'div',
    { className: 'gfb-inner-cell-label' },
    Icon && _react2.default.createElement(Icon, null),
    _react2.default.createElement(
      'strong',
      {
        onClick: onLabelTextClick,
        className: LinkIcon || CascadeIcon ? 'cursor-hand' : ''
      },
      label
    ),
    LinkIcon && _react2.default.createElement(LinkIcon, { className: 'cursor-hand', onClick: onLinkClick }),
    CascadeIcon && _react2.default.createElement(CascadeIcon, { className: 'cursor-hand', onClick: onCascadeKeywordClick })
  );
};

exports.default = LabelContainer;


LabelContainer.propTypes = {
  config: _propTypes2.default.object,
  handleLinkClick: _propTypes2.default.func,
  handleCascadeKeywordClick: _propTypes2.default.func,
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string, _propTypes2.default.array, _propTypes2.default.object])
};