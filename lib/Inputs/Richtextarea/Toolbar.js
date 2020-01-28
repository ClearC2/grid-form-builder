'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('@emotion/core');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _fa = require('react-icons/fa');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toolbar = function Toolbar(_ref) {
  var id = _ref.id;
  return (0, _core.jsx)(
    'div',
    { id: id, style: { backgroundColor: '#fafafa' } },
    (0, _core.jsx)(
      'select',
      { className: 'ql-header', defaultValue: 'normal', onChange: function onChange(e) {
          return e.persist();
        } },
      (0, _core.jsx)('option', { value: '1' }),
      (0, _core.jsx)('option', { value: '2' }),
      (0, _core.jsx)('option', { value: '3' }),
      (0, _core.jsx)('option', { value: 'normal' })
    ),
    (0, _core.jsx)('button', { className: 'ql-bold' }),
    (0, _core.jsx)('button', { className: 'ql-italic' }),
    (0, _core.jsx)('button', { className: 'ql-underline' }),
    (0, _core.jsx)('button', { className: 'ql-link' }),
    (0, _core.jsx)('button', { className: 'ql-list', value: 'bullet' }),
    (0, _core.jsx)('button', { className: 'ql-list', value: 'ordered' }),
    (0, _core.jsx)('button', { className: 'ql-blockquote' }),
    (0, _core.jsx)(
      'button',
      { className: 'ql-insertImage' },
      (0, _core.jsx)(_fa.FaImage, null)
    )
  );
}; /** @jsx jsx */
exports.default = Toolbar;


Toolbar.propTypes = {
  id: _propTypes2.default.string
};