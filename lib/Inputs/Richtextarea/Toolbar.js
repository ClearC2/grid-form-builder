'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _image = require('react-icons/lib/fa/image');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = function Toolbar(_ref) {
  var id = _ref.id;
  return _react2.default.createElement(
    'div',
    { id: id, style: { backgroundColor: '#fafafa' } },
    _react2.default.createElement(
      'select',
      { className: 'ql-header', defaultValue: 'normal', onChange: function onChange(e) {
          return e.persist();
        } },
      _react2.default.createElement('option', { value: '1' }),
      _react2.default.createElement('option', { value: '2' }),
      _react2.default.createElement('option', { value: '3' }),
      _react2.default.createElement('option', { value: 'normal' })
    ),
    _react2.default.createElement('button', { className: 'ql-bold' }),
    _react2.default.createElement('button', { className: 'ql-italic' }),
    _react2.default.createElement('button', { className: 'ql-underline' }),
    _react2.default.createElement('button', { className: 'ql-link' }),
    _react2.default.createElement('button', { className: 'ql-list', value: 'bullet' }),
    _react2.default.createElement('button', { className: 'ql-list', value: 'ordered' }),
    _react2.default.createElement('button', { className: 'ql-blockquote' }),
    _react2.default.createElement(
      'button',
      { className: 'ql-insertImage' },
      _react2.default.createElement(_image2.default, null)
    )
  );
};

exports.default = Toolbar;


Toolbar.propTypes = {
  id: _propTypes2.default.string
};