var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

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
        var node = ReactDOM.findDOMNode(_this);
        if (node instanceof window.HTMLElement) _this.setState({ width: node.offsetWidth });
      }, _this.render = function () {
        if (_this.props.measureBeforeMount && !_this.mounted) {
          return React.createElement('div', { className: _this.props.className, style: _this.props.style });
        }

        return React.createElement(ComposedComponent, _extends({}, _this.props, _this.state));
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    // making these class variables rather than state variables to cut down on renders (performance)


    return _class;
  }(React.Component), _class.defaultProps = {
    measureBeforeMount: false
  }, _class.propTypes = {
    measureBeforeMount: PropTypes.bool
  }, _temp2;
};

export default WidthProvider;