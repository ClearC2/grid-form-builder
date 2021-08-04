"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs3/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/extends"));

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/toConsumableArray"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/array/is-array"));

var _values2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/values"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _splice = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/splice"));

var _assign = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/assign"));

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _filter = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/filter"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf4 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jquery = _interopRequireDefault(require("jquery"));

var noop = function noop() {};

var Pane =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Pane, _Component);

  function Pane() {
    var _getPrototypeOf2, _context;

    var _this;

    (0, _classCallCheck2.default)(this, Pane);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(Pane)).call.apply(_getPrototypeOf2, (0, _concat.default)(_context = [this]).call(_context, args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      selected: {},
      selectAll: false,
      search: false,
      searchText: ''
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onFlush", function () {
      var _context2;

      var valueKey = _this.props.valueKey;
      var items = (0, _filter.default)(_context2 = _this.items()).call(_context2, function (item) {
        return _this.state.selected[item[valueKey]];
      });

      if (_this.state.search) {
        _this.props.onAction(items);
      } else {
        var _context3;

        _this.props.onAction((0, _map.default)(_context3 = _this.items()).call(_context3, function (c) {
          return c;
        }));
      }

      _this.setState({
        selectAll: false,
        selected: {},
        searchText: ''
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "items", function () {
      var _this$props = _this.props,
          items = _this$props.items,
          labelKey = _this$props.labelKey;
      var search = _this.state.search;
      var _this$state$searchTex = _this.state.searchText,
          searchText = _this$state$searchTex === void 0 ? '' : _this$state$searchTex;
      if (typeof searchText !== 'string') searchText = '';

      if (search) {
        items = (0, _filter.default)(items).call(items, function (item) {
          var _context4;

          return (0, _includes.default)(_context4 = String(item[labelKey] || '').toLowerCase()).call(_context4, searchText.toLowerCase());
        });
      }

      return items;
    });
    return _this;
  }

  (0, _createClass2.default)(Pane, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props2 = this.props,
          boxStyle = _this$props2.boxStyle,
          valueKey = _this$props2.valueKey,
          labelKey = _this$props2.labelKey,
          actionElement = _this$props2.actionElement,
          height = _this$props2.height,
          paneRef = _this$props2.paneRef,
          paneLabel = _this$props2.paneLabel,
          onAction = _this$props2.onAction;
      var items = this.items();
      var innerDivStyle = {
        height: height,
        overflow: height ? 'auto' : null
      };
      return _react.default.createElement("div", {
        ref: function ref(div) {
          return paneRef(div);
        },
        style: boxStyle
      }, _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("div", {
        className: "col-xs-3 col-md-3"
      }, paneLabel), _react.default.createElement("div", {
        className: "col-xs-9 col-md-9 text-right"
      }, _react.default.createElement("a", {
        className: "pointer",
        onClick: this.onFlush
      }, actionElement), "\xA0\xA0\xA0", _react.default.createElement("span", {
        className: "red icon-search-1 pointer",
        onClick: function onClick() {
          return _this2.setState({
            search: !_this2.state.search,
            searchText: ''
          });
        }
      }))), _react.default.createElement("hr", {
        style: {
          margin: 0
        }
      }), _react.default.createElement("div", {
        style: innerDivStyle
      }, this.state.search ? _react.default.createElement("span", null, _react.default.createElement("input", {
        type: "text",
        className: "form-control input-sm",
        placeholder: "Search",
        value: this.state.searchText,
        style: {
          fontSize: 12,
          height: 20
        },
        onChange: function onChange(e) {
          return _this2.setState({
            searchText: e.target.value,
            selected: {},
            selectAll: false
          });
        }
      })) : null, (0, _map.default)(items).call(items, function (option) {
        return _react.default.createElement("span", {
          style: {
            cursor: 'pointer'
          },
          key: option[valueKey]
        }, _react.default.createElement("a", {
          className: "pointer",
          onClick: function onClick() {
            return onAction([option]);
          }
        }, option[labelKey]), _react.default.createElement("br", null));
      }), items.length === 0 ? _react.default.createElement("br", null) : null));
    }
  }]);
  return Pane;
}(_react.Component);

(0, _defineProperty2.default)(Pane, "propTypes", {
  items: _propTypes.default.array,
  valueKey: _propTypes.default.string,
  labelKey: _propTypes.default.string,
  onAction: _propTypes.default.func,
  actionElement: _propTypes.default.any,
  paneLabel: _propTypes.default.any,
  boxStyle: _propTypes.default.object,
  height: _propTypes.default.number,
  paneRef: _propTypes.default.func,
  resize: _propTypes.default.func
});
(0, _defineProperty2.default)(Pane, "defaultProps", {
  items: [],
  valueKey: 'value',
  labelKey: 'label',
  onAction: noop,
  actionElement: 'Submit',
  paneLabel: 'Items',
  paneRef: noop,
  resize: noop
});

var PickList =
/*#__PURE__*/
function (_Component2) {
  (0, _inherits2.default)(PickList, _Component2);

  function PickList() {
    var _getPrototypeOf3, _context5;

    var _this3;

    (0, _classCallCheck2.default)(this, PickList);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(PickList)).call.apply(_getPrototypeOf3, (0, _concat.default)(_context5 = [this]).call(_context5, args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "adjustHeight", function () {
      if (_this3.props.height) {
        return;
      }

      var $value = (0, _jquery.default)(_this3.valueDiv);
      var $options = (0, _jquery.default)(_this3.optionsDiv);
      $value.css('height', '');
      $options.css('height', '');
      var valueHeight = $value.height();
      var optionsHeight = $options.height();

      if (valueHeight > optionsHeight) {
        $options.height(valueHeight);
      } else {
        $value.height(optionsHeight);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "add", function (options) {
      var _this3$props = _this3.props,
          value = _this3$props.value,
          valueKey = _this3$props.valueKey,
          onChange = _this3$props.onChange;
      var originalValue = (0, _assign.default)([], value);
      var values = (0, _splice.default)(value).call(value, 0);
      (0, _forEach.default)(options).call(options, function (option) {
        var found = (0, _find.default)(values).call(values, function (o) {
          return o[valueKey] === option[valueKey];
        });

        if (!found) {
          values.unshift(option);
        }
      });

      if (options.length === 1) {
        onChange(values);
      } else {
        if (originalValue.length !== _this3.props.options.length) {
          var _context6, _context7;

          var _values = (0, _values2.default)((0, _map.default)(originalValue).call(originalValue, function (ov) {
            return ov[valueKey];
          }));

          if (!(0, _isArray.default)(_values)) _values = [];
          var result = (0, _filter.default)(_context6 = _this3.props.options).call(_context6, function (opt) {
            return !(0, _includes.default)(_values).call(_values, opt[valueKey]);
          });
          onChange((0, _concat.default)(_context7 = []).call(_context7, (0, _toConsumableArray2.default)(originalValue), (0, _toConsumableArray2.default)(result)));
        }
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this3), "remove", function (options) {
      var _this3$props2 = _this3.props,
          value = _this3$props2.value,
          valueKey = _this3$props2.valueKey,
          onChange = _this3$props2.onChange;
      var values = (0, _splice.default)(value).call(value, 0);
      var keys = (0, _map.default)(options).call(options, function (opt) {
        return opt[valueKey];
      });
      (0, _forEach.default)(keys).call(keys, function (key) {
        var _context8;

        var index = (0, _indexOf.default)(_context8 = (0, _map.default)(values).call(values, function (o) {
          return o[valueKey];
        })).call(_context8, key);

        if (index > -1) {
          (0, _splice.default)(values).call(values, index, 1);
        }
      });
      onChange(values);
    });
    return _this3;
  }

  (0, _createClass2.default)(PickList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.adjustHeight();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.adjustHeight();
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _this$props3 = this.props,
          leftPaneLabel = _this$props3.leftPaneLabel,
          rightPaneLabel = _this$props3.rightPaneLabel,
          options = _this$props3.options,
          value = _this$props3.value;
      return _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("div", {
        className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
      }, _react.default.createElement(Pane, (0, _extends2.default)({}, this.props, {
        paneLabel: leftPaneLabel,
        items: options,
        paneRef: function paneRef(div) {
          _this4.optionsDiv = div;
        },
        onAction: function onAction(options) {
          return _this4.add(options);
        },
        actionElement: "Add All"
      }))), _react.default.createElement("div", {
        className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
      }, _react.default.createElement(Pane, (0, _extends2.default)({}, this.props, {
        paneLabel: rightPaneLabel,
        items: value,
        paneRef: function paneRef(div) {
          _this4.valueDiv = div;
        },
        onAction: function onAction(options) {
          return _this4.remove(options);
        },
        actionElement: "Remove All"
      }))));
    }
  }]);
  return PickList;
}(_react.Component);

exports.default = PickList;
(0, _defineProperty2.default)(PickList, "propTypes", {
  options: _propTypes.default.array,
  value: _propTypes.default.array,
  labelKey: _propTypes.default.string,
  valueKey: _propTypes.default.string,
  onChange: _propTypes.default.func,
  boxStyle: _propTypes.default.object,
  height: _propTypes.default.number,
  leftPaneLabel: _propTypes.default.any,
  rightPaneLabel: _propTypes.default.any
});
(0, _defineProperty2.default)(PickList, "defaultProps", {
  options: [],
  labelKey: 'label',
  valueKey: 'value',
  value: [],
  onChange: noop,
  boxStyle: {
    border: '1px solid #D5D5D5',
    padding: 5
  },
  height: null,
  leftPaneLabel: 'Options',
  rightPaneLabel: 'Selected'
});