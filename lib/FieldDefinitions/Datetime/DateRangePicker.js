'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _daterangepicker = require('daterangepicker');

var _daterangepicker2 = _interopRequireDefault(_daterangepicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*eslint-disable*/


function setDirection(props) {
  var auto = props.auto,
      down = props.down,
      id = props.id,
      modal = props.modal,
      up = props.up;

  var fieldId = modal ? id + 'modal' : id;
  var element = document.getElementById(fieldId);
  if (element) {
    element = element.getBoundingClientRect();
    var direction = 'down';

    if (auto && !down && !up) {
      if (element.bottom + props.calendarHeight > window.innerHeight) {
        direction = 'up';
      } else {
        direction = 'down';
      }
    } else {
      direction = up ? 'up' : 'down';
    }

    return direction;
  }
}

var RenderDateRangePicker = function (_Component) {
  _inherits(RenderDateRangePicker, _Component);

  function RenderDateRangePicker() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RenderDateRangePicker);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RenderDateRangePicker.__proto__ || Object.getPrototypeOf(RenderDateRangePicker)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      direction: setDirection(_this.props)
    }, _this.DateRangePicker = function () {
      var click = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var _this$props = _this.props,
          id = _this$props.id,
          obj = _objectWithoutProperties(_this$props, ['id']);

      (0, _jquery2.default)('#' + id).daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        minYear: 2000,
        maxYear: 2030,
        timePicker: true,
        timePickerSeconds: true,
        alwaysShowCalendars: true,
        autoUpdateInput: false,
        startDate: _this.props.value || (0, _moment2.default)(),
        drops: _this.state.direction,
        locale: {
          format: _this.props.dateFormat
        }
      }, function (start, end, label) {
        obj.closeMenu(id);
      });

      (0, _jquery2.default)('#' + id).on('show.daterangepicker', function (ev, picker) {
        _this.setState({ direction: setDirection(_this.props) });
        if (!_this.props.timeFormat) {
          var element = document.getElementById('datepicker-' + _this.props.id);
          element = element.getElementsByClassName('calendar-time')[0];
          !!element && element.setAttribute('class', 'daterangepicker hide-time');
        }
        obj.openMenu(id);
      });

      (0, _jquery2.default)('#' + id).on('hide.daterangepicker', function (ev, picker) {
        obj.closeMenu(id);
      });

      (0, _jquery2.default)('#' + id).on('apply.daterangepicker', function (ev, picker) {
        (0, _jquery2.default)('#' + id).val(picker.startDate.format(_this.props.dateFormat));
        _this.props.changeDisplay(true);
        obj.onClick(picker.startDate);
      });

      var elements = document.getElementsByClassName('daterangepicker');
      elements = elements[elements.length - 1];
      !!elements && elements.setAttribute('id', 'datepicker-' + _this.props.id);

      if (click) {
        (0, _jquery2.default)('#' + id).click();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RenderDateRangePicker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.DateRangePicker();
      (0, _jquery2.default)('#' + this.props.id).click();
      this.setState({ mount: true });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      var element = document.getElementById('datepicker-' + this.props.id);
      if (element) {
        element.parentElement.removeChild(element);
      }
      this.DateRangePicker(prevState.direction !== this.state.direction);
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState, nextContext) {
      var old = this.props.value;
      var next = nextProps.value;

      if (old && next && old._d && next._d) {
        return !!old.diff(next);
      }

      return this.state.direction !== nextState.direction || !this.props.value && nextProps.value;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var element = document.getElementById('datepicker-' + this.props.id);
      if (element) {
        element.parentElement.removeChild(element);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return RenderDateRangePicker;
}(_react.Component);

RenderDateRangePicker.propTypes = {
  id: _propTypes2.default.string,
  changeDisplay: _propTypes2.default.func,
  dateFormat: _propTypes2.default.string,
  timeFormat: _propTypes2.default.bool,
  value: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string])
};
RenderDateRangePicker.defaultProps = {
  timeFormat: true
};
exports.default = RenderDateRangePicker;