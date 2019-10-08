'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var portal = void 0;

var Portal = function (_Component) {
  _inherits(Portal, _Component);

  function Portal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Portal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Portal.__proto__ || Object.getPrototypeOf(Portal)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      id: ''
    }, _this.element = document.createElement('div'), _this.setStyles = function () {
      var _this$props$style = _this.props.style,
          style = _this$props$style === undefined ? {} : _this$props$style;

      // setting position to place portal

      var offset = {};
      var target = document.getElementById(_this.props.id);
      if (_this.props.id && target) {
        target = target.getBoundingClientRect();

        offset['marginLeft'] = target.x;
        offset['marginTop'] = target.top + target.height;

        // eslint-disable-next-line
        var cssText = 'position: absolute;z-index: 9000;margin-left:' + offset.marginLeft + 'px;margin-top:' + offset.marginTop + 'px';

        _this.element.setAttribute('style', cssText);
      }

      return _extends({}, style);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Portal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var portalTarget = this.props.portalTarget;

      var id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

      this.element.style.cssText = 'position: absolute;z-index: 9000';
      this.element.id = id;

      portal = document.getElementsByTagName(portalTarget)[0];
      if (portal) {
        portal.appendChild(this.element);
      }

      this.setState({ id: id });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      if (this.props.portalTarget && !prevProps.portalTarget) {
        portal = document.getElementsByTagName(this.props.portalTarget)[0];
        portal.appendChild(this.element);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      portal.removeChild(this.element);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className;


      return (0, _reactDom.createPortal)(_react2.default.createElement(
        'div',
        { style: _extends({}, this.setStyles()), className: className },
        children
      ), this.element);
    }
  }]);

  return Portal;
}(_react.Component);

Portal.propTypes = {
  children: _propTypes2.default.any,
  className: _propTypes2.default.string,
  id: _propTypes2.default.string,
  portalTarget: _propTypes2.default.string,
  style: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.func])
};
Portal.defaultProps = {
  id: 'portal',
  portalTarget: 'body'
};
exports.default = Portal;