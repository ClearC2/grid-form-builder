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

var _fa = require('react-icons/fa');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValidationErrorIcon = function ValidationErrorIcon(props) {
  var message = props.message;

  var id = (0, _react.useRef)((0, _utils.randomId)());
  return _react2.default.createElement(
    'div',
    { className: 'gfb-input__indicator gfb-validation-error-indicator' },
    _react2.default.createElement(_fa.FaExclamationTriangle, { id: id.current, 'data-tip': true, 'data-for': id.current, color: 'red' }),
    message && _react2.default.createElement(
      _Portal2.default,
      { id: id.current },
      _react2.default.createElement(
        _reactTooltip2.default,
        { id: id.current, type: 'error' },
        _react2.default.createElement(
          'span',
          null,
          message
        )
      )
    )
  );
};

ValidationErrorIcon.propTypes = {
  message: _propTypes2.default.string
};

exports.default = ValidationErrorIcon;