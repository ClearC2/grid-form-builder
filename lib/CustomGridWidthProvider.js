'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidthProvider = function WidthProvider(ComposedComponent) {
  var _class, _temp2;

  return _temp2 = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        width: 1280
      }, _this.mounted = false, _this.parent = null, _this.parentWidth = 0, _this.componentDidMount = function () {
        // mounted bool causes first render to be correct size, rather than initial render being the wrong size then correcting itself
        _this.mounted = true;
        window.addEventListener('resize', _this.onResize);
        window.addEventListener('mousemove', _this.onResize);
        _this.onResize();
      }, _this.componentWillUnmount = function () {
        window.removeEventListener('resize', _this.onResize);
        window.removeEventListener('mouseenter', _this.onResize);
        _this.mounted = false;
      }, _this.onResize = function () {
        if (!_this.mounted) return;
        var node = _reactDom2.default.findDOMNode(_this);
        if (node instanceof window.HTMLElement) _this.setState({ width: node.offsetWidth });
      }, _this.render = function () {
        if (_this.props.measureBeforeMount && !_this.mounted) {
          return _react2.default.createElement('div', { className: _this.props.className, style: _this.props.style });
        }

        return _react2.default.createElement(ComposedComponent, _extends({}, _this.props, _this.state));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // making these class variables rather than state variables to cut down on renders (performance)


    return _class;
  }(_react2.default.Component), _class.defaultProps = {
    measureBeforeMount: false
  }, _class.propTypes = {
    measureBeforeMount: _propTypes2.default.bool
  }, _temp2;
};

exports.default = WidthProvider;