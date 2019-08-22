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

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _DateWrapper = require('./DateWrapper');

var _DateWrapper2 = _interopRequireDefault(_DateWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatetimeContainer = function (_Component) {
  _inherits(DatetimeContainer, _Component);

  function DatetimeContainer() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, DatetimeContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = DatetimeContainer.__proto__ || Object.getPrototypeOf(DatetimeContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      calendarHeight: _this.props.calendarHeight,
      displayInput: _this.props.displayInput,
      id: '',
      value: ' ',
      visible: false
    }, _this.openMenu = function (id) {
      document.getElementById(id).focus();
      document.getElementById(id).addEventListener('input', function (e) {
        return e.stopPropagation();
      }, false);
      document.getElementById(id).addEventListener('change', function (e) {
        return e.stopPropagation();
      }, false);
      document.addEventListener('scroll', _this.handleScrollEvent);
    }, _this.closeMenu = function (id) {
      if (document.getElementById(id)) {
        document.getElementById(id).removeEventListener('input', function (e) {
          return e.stopPropagation();
        }, false);
        document.getElementById(id).removeEventListener('change', function (e) {
          return e.stopPropagation();
        }, false);
      }
      document.removeEventListener('scroll', _this.handleScrollEvent);
    }, _this.handleScrollEvent = function () {
      _this.state.visible && _this.setState({ visible: false });
      _this.closeMenu();
    }, _this.handleDateChange = function (e) {
      _this.setState({ value: e.target.value });
    }, _this.setVisibility = function () {
      _this.setState({ visible: true });
    }, _this.onClick = function (e) {
      _this.setState({ value: ' ' });
      _this.props.handleDateChange((0, _moment2.default)(e._d));
    }, _this.changeDisplay = function () {
      var displayInput = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      _this.setState({ displayInput: displayInput });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(DatetimeContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.displayInput !== this.props.displayInput) {
        this.changeDisplay(this.props.displayInput);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.closeMenu();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          dateFormat = _props.dateFormat,
          inputStyle = _props.inputStyle,
          props = _objectWithoutProperties(_props, ['dateFormat', 'inputStyle']);

      var _state = this.state,
          displayInput = _state.displayInput,
          id = _state.id;


      var value = this.state.value.trim() || (0, _moment2.default)(this.props.value).format(dateFormat);
      value = displayInput ? value : this.state.value.trim();
      if (typeof value === 'string') {
        value = value.trim() === 'Invalid date' ? '' : value;
      }

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_DateWrapper2.default, _extends({
          autoComplete: 'off',
          changeDisplay: this.changeDisplay,
          closeMenu: this.closeMenu,
          dateFormat: dateFormat,
          id: id,
          onChange: this.handleDateChange,
          onClick: this.onClick,
          openMenu: this.openMenu,
          visible: this.state.visible
        }, props)),
        _react2.default.createElement('input', {
          id: id,
          autoComplete: 'off',
          className: this.props.className + ' ' + this.props.inputClassName,
          disabled: this.props.disabled,
          name: this.props.name,
          onChange: this.handleDateChange,
          onClick: function onClick() {
            return _this2.setVisibility();
          },
          required: this.props.required,
          style: _extends({ paddingLeft: 5 }, inputStyle),
          type: this.props.type,
          value: value,
          onMouseDown: this.props.onMouseDown,
          onKeyDown: this.props.onKeyDown,
          onBlurCapture: this.props.onBlurCapture,
          onBlur: this.props.onBlur,
          key: id
        })
      );
    }
  }]);

  return DatetimeContainer;
}(_react.Component);

DatetimeContainer.propTypes = {
  // input fields
  calendarHeight: _propTypes2.default.number,
  className: _propTypes2.default.string,
  dateFormat: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  displayInput: _propTypes2.default.bool,
  inputClassName: _propTypes2.default.string,
  inputStyle: _propTypes2.default.object,
  name: _propTypes2.default.string,
  required: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
  onMouseDown: _propTypes2.default.func,
  onKeyDown: _propTypes2.default.func,
  onBlurCapture: _propTypes2.default.func,
  onBlur: _propTypes2.default.func,
  // datetime field
  auto: _propTypes2.default.bool,
  down: _propTypes2.default.bool,
  handleDateChange: _propTypes2.default.func,
  up: _propTypes2.default.bool
};
DatetimeContainer.defaultProps = {
  auto: true,
  calendarHeight: 314,
  disabled: false,
  displayInput: true,
  down: false,
  modal: false,
  required: false,
  type: 'text',
  up: false
};
exports.default = DatetimeContainer;