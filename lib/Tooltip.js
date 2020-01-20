'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Portal = require('./Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactTooltip = require('react-tooltip');

var _reactTooltip2 = _interopRequireDefault(_reactTooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PortalTooltip = function PortalTooltip(props) {
  var message = props.message,
      id = props.id;

  return message && id ? _react2.default.createElement(
    _Portal2.default,
    null,
    _react2.default.createElement(
      _reactTooltip2.default,
      { id: id },
      _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: message } })
    )
  ) : null;
};

PortalTooltip.propTypes = {
  message: _propTypes2.default.string,
  id: _propTypes2.default.string
};

exports.default = PortalTooltip;