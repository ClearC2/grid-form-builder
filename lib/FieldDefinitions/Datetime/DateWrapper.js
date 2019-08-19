'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _DateRangePicker = require('./DateRangePicker');

var _DateRangePicker2 = _interopRequireDefault(_DateRangePicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DateWrapper = function (_Component) {
  _inherits(DateWrapper, _Component);

  function DateWrapper() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DateWrapper);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DateWrapper.__proto__ || Object.getPrototypeOf(DateWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      mount: false,
      visible: false
    }, _this.isInputVisible = function () {
      _this.setState({ visible: !!document.getElementById(_this.props.id) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DateWrapper, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ mount: true });
      this.isInputVisible();
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var old = this.props.value;
      var next = nextProps.value;
      var reload = !this.state.mount || nextProps.value && !this.props.value;
      reload = reload || !this.state.visible && nextState.visible;

      if (!reload && old && next && old._d && next._d) {
        return !!old.diff(next);
      }

      if (!this.state.visible) {
        this.isInputVisible();
      }

      return reload;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.setState({ mount: false });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        null,
        this.state.visible && _react2.default.createElement(_DateRangePicker2.default, this.props)
      );
    }
  }]);

  return DateWrapper;
}(_react.Component);

DateWrapper.propTypes = {
  id: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
};
exports.default = DateWrapper;