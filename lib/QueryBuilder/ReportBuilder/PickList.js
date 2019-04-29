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

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noop = function noop() {};

var Pane = function (_Component) {
  _inherits(Pane, _Component);

  function Pane() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Pane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Pane.__proto__ || Object.getPrototypeOf(Pane)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      selected: {},
      selectAll: false,
      search: false,
      searchText: ''
    }, _this.onFlush = function () {
      var valueKey = _this.props.valueKey;

      var items = _this.items().filter(function (item) {
        return _this.state.selected[item[valueKey]];
      });
      _this.props.onAction(items);
      _this.setState({ selectAll: false, selected: {}, searchText: '' });
    }, _this.items = function () {
      var _this$props = _this.props,
          items = _this$props.items,
          labelKey = _this$props.labelKey;
      var _this$state = _this.state,
          search = _this$state.search,
          searchText = _this$state.searchText;

      if (search) {
        items = items.filter(function (item) {
          return String(item[labelKey]).toLowerCase().includes(searchText.toLowerCase());
        });
      }
      return items;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Pane, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          boxStyle = _props.boxStyle,
          valueKey = _props.valueKey,
          labelKey = _props.labelKey,
          actionElement = _props.actionElement,
          height = _props.height,
          paneRef = _props.paneRef,
          paneLabel = _props.paneLabel,
          onAction = _props.onAction;

      var items = this.items();
      var innerDivStyle = { height: height, overflow: height ? 'auto' : null };
      return _react2.default.createElement(
        'div',
        { ref: function ref(div) {
            return paneRef(div);
          }, style: boxStyle },
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'div',
            { className: 'col-xs-3 col-md-3' },
            paneLabel
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-xs-9 col-md-9 text-right' },
            _react2.default.createElement(
              'a',
              { className: 'pointer', onClick: this.onFlush },
              actionElement
            ),
            '\xA0\xA0\xA0',
            _react2.default.createElement('span', {
              className: 'red icon-search-1 pointer',
              onClick: function onClick() {
                return _this2.setState({ search: !_this2.state.search, searchText: '' });
              }
            })
          )
        ),
        _react2.default.createElement('hr', { style: { margin: 0 } }),
        _react2.default.createElement(
          'div',
          { style: innerDivStyle },
          this.state.search ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('input', {
              type: 'text',
              className: 'form-control input-sm',
              placeholder: 'Search',
              value: this.state.searchText,
              style: { fontSize: 12, height: 20 },
              onChange: function onChange(e) {
                return _this2.setState({
                  searchText: e.target.value,
                  selected: {},
                  selectAll: false
                });
              }
            })
          ) : null,
          items.map(function (option) {
            return _react2.default.createElement(
              'span',
              { style: { cursor: 'pointer' }, key: option[valueKey] },
              _react2.default.createElement(
                'a',
                { className: 'pointer', onClick: function onClick() {
                    return onAction([option]);
                  } },
                option[labelKey]
              ),
              _react2.default.createElement('br', null)
            );
          }),
          items.length === 0 ? _react2.default.createElement('br', null) : null
        )
      );
    }
  }]);

  return Pane;
}(_react.Component);

Pane.propTypes = {
  items: _propTypes2.default.array,
  valueKey: _propTypes2.default.string,
  labelKey: _propTypes2.default.string,
  onAction: _propTypes2.default.func,
  actionElement: _propTypes2.default.any,
  paneLabel: _propTypes2.default.any,
  boxStyle: _propTypes2.default.object,
  height: _propTypes2.default.number,
  paneRef: _propTypes2.default.func,
  resize: _propTypes2.default.func
};
Pane.defaultProps = {
  items: [],
  valueKey: 'value',
  labelKey: 'label',
  onAction: noop,
  actionElement: 'Submit',
  paneLabel: 'Items',
  paneRef: noop,
  resize: noop
};

var PickList = function (_Component2) {
  _inherits(PickList, _Component2);

  function PickList() {
    var _ref2;

    var _temp2, _this3, _ret2;

    _classCallCheck(this, PickList);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this3 = _possibleConstructorReturn(this, (_ref2 = PickList.__proto__ || Object.getPrototypeOf(PickList)).call.apply(_ref2, [this].concat(args))), _this3), _this3.adjustHeight = function () {
      if (_this3.props.height) {
        return;
      }
      var $value = (0, _jquery2.default)(_this3.valueDiv);
      var $options = (0, _jquery2.default)(_this3.optionsDiv);
      $value.css('height', '');
      $options.css('height', '');
      var valueHeight = $value.height();
      var optionsHeight = $options.height();

      if (valueHeight > optionsHeight) {
        $options.height(valueHeight);
      } else {
        $value.height(optionsHeight);
      }
    }, _this3.add = function (options) {
      var _this3$props = _this3.props,
          value = _this3$props.value,
          valueKey = _this3$props.valueKey,
          onChange = _this3$props.onChange;

      var originalValue = Object.assign([], value);
      var values = value.splice(0);
      options.forEach(function (option) {
        var found = values.find(function (o) {
          return o[valueKey] === option[valueKey];
        });
        if (!found) {
          values.push(option);
        }
      });

      if (options.length === 1) {
        onChange(values);
      } else {
        if (originalValue.length !== _this3.props.options.length) {
          var _values = Object.values(originalValue.map(function (ov) {
            return ov[valueKey];
          }));
          var result = _this3.props.options.filter(function (opt) {
            return !_values.includes(opt[valueKey]);
          });
          onChange([].concat(_toConsumableArray(originalValue), _toConsumableArray(result)));
        }
      }
    }, _this3.remove = function (options) {
      var _this3$props2 = _this3.props,
          value = _this3$props2.value,
          valueKey = _this3$props2.valueKey,
          onChange = _this3$props2.onChange;

      var values = value.splice(0);
      var keys = options.map(function (opt) {
        return opt[valueKey];
      });
      keys.forEach(function (key) {
        var index = values.map(function (o) {
          return o[valueKey];
        }).indexOf(key);
        if (index > -1) {
          values.splice(index, 1);
        }
      });
      if (options.length === 1) {
        onChange(values);
      }
    }, _temp2), _possibleConstructorReturn(_this3, _ret2);
  }

  _createClass(PickList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.adjustHeight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.adjustHeight();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props2 = this.props,
          leftPaneLabel = _props2.leftPaneLabel,
          rightPaneLabel = _props2.rightPaneLabel,
          options = _props2.options,
          value = _props2.value;

      return _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-6 col-sm-6 col-md-6 col-lg-6' },
          _react2.default.createElement(Pane, _extends({}, this.props, {
            paneLabel: leftPaneLabel,
            items: options,
            paneRef: function paneRef(div) {
              return _this4.optionsDiv = div;
            },
            onAction: function onAction(options) {
              return _this4.add(options);
            },
            actionElement: 'Add All'
          }))
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-6 col-sm-6 col-md-6 col-lg-6' },
          _react2.default.createElement(Pane, _extends({}, this.props, {
            paneLabel: rightPaneLabel,
            items: value,
            paneRef: function paneRef(div) {
              return _this4.valueDiv = div;
            },
            onAction: function onAction(options) {
              return _this4.remove(options);
            },
            actionElement: 'Remove All'
          }))
        )
      );
    }
  }]);

  return PickList;
}(_react.Component);

PickList.propTypes = {
  options: _propTypes2.default.array,
  value: _propTypes2.default.array,
  labelKey: _propTypes2.default.string,
  valueKey: _propTypes2.default.string,
  onChange: _propTypes2.default.func,
  boxStyle: _propTypes2.default.object,
  height: _propTypes2.default.number,
  leftPaneLabel: _propTypes2.default.any,
  rightPaneLabel: _propTypes2.default.any
};
PickList.defaultProps = {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
  value: [],
  onChange: noop,
  boxStyle: { border: '1px solid #D5D5D5', padding: 5 },
  height: null,
  leftPaneLabel: 'Options',
  rightPaneLabel: 'Selected'
};
exports.default = PickList;