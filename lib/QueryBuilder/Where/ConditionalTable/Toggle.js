'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactToggleButton = require('react-toggle-button');

var _reactToggleButton2 = _interopRequireDefault(_reactToggleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Toggle = function (_Component) {
  _inherits(Toggle, _Component);

  function Toggle() {
    _classCallCheck(this, Toggle);

    return _possibleConstructorReturn(this, (Toggle.__proto__ || Object.getPrototypeOf(Toggle)).apply(this, arguments));
  }

  _createClass(Toggle, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_reactToggleButton2.default, {
        activeLabel: this.props.activeLabel,
        inactiveLabel: this.props.inactiveLabel,
        value: this.props.value,
        onToggle: this.props.onToggle,
        activeLabelStyle: { color: '#FFFFFF' },
        inactiveLabelStyle: { color: '#FFFFFF' },
        colors: {
          activeThumb: {
            base: '#1e8fc6' // 'rgb(62,130,247)'
          },
          inactiveThumb: {
            base: '#1e8fc6' // 'rgb(62,130,247)'
          },
          active: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)'
          },
          inactive: {
            base: 'rgb(65,66,68)',
            hover: 'rgb(95,96,98)'
          }
        }
      });
    }
  }]);

  return Toggle;
}(_react.Component);

Toggle.propTypes = {
  value: _propTypes2.default.bool.isRequired,
  onToggle: _propTypes2.default.func.isRequired,
  activeLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
  inactiveLabel: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
};
exports.default = Toggle;