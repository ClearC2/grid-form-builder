import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _Object$values from "@babel/runtime-corejs3/core-js-stable/object/values";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

(function () {
  var enterModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.enterModule : undefined;
  enterModule && enterModule(module);
})();

var __signature__ = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default.signature : function (a) {
  return a;
};

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';

var noop = function noop() {};

var Pane =
/*#__PURE__*/
function (_Component) {
  _inherits(Pane, _Component);

  function Pane() {
    var _getPrototypeOf2, _context;

    var _this;

    _classCallCheck(this, Pane);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pane)).call.apply(_getPrototypeOf2, _concatInstanceProperty(_context = [this]).call(_context, args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      selected: {},
      selectAll: false,
      search: false,
      searchText: ''
    });

    _defineProperty(_assertThisInitialized(_this), "onFlush", function () {
      var _context2;

      var valueKey = _this.props.valueKey;

      var items = _filterInstanceProperty(_context2 = _this.items()).call(_context2, function (item) {
        return _this.state.selected[item[valueKey]];
      });

      if (_this.state.search) {
        _this.props.onAction(items);
      } else {
        var _context3;

        _this.props.onAction(_mapInstanceProperty(_context3 = _this.items()).call(_context3, function (c) {
          return c;
        }));
      }

      _this.setState({
        selectAll: false,
        selected: {},
        searchText: ''
      });
    });

    _defineProperty(_assertThisInitialized(_this), "items", function () {
      var _this$props = _this.props,
          items = _this$props.items,
          labelKey = _this$props.labelKey;
      var _this$state = _this.state,
          search = _this$state.search,
          searchText = _this$state.searchText;

      if (search) {
        items = _filterInstanceProperty(items).call(items, function (item) {
          var _context4;

          return _includesInstanceProperty(_context4 = String(item[labelKey]).toLowerCase()).call(_context4, searchText.toLowerCase());
        });
      }

      return items;
    });

    return _this;
  }

  _createClass(Pane, [{
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
      return React.createElement("div", {
        ref: function ref(div) {
          return paneRef(div);
        },
        style: boxStyle
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col-xs-3 col-md-3"
      }, paneLabel), React.createElement("div", {
        className: "col-xs-9 col-md-9 text-right"
      }, React.createElement("a", {
        className: "pointer",
        onClick: this.onFlush
      }, actionElement), "\xA0\xA0\xA0", React.createElement("span", {
        className: "red icon-search-1 pointer",
        onClick: function onClick() {
          return _this2.setState({
            search: !_this2.state.search,
            searchText: ''
          });
        }
      }))), React.createElement("hr", {
        style: {
          margin: 0
        }
      }), React.createElement("div", {
        style: innerDivStyle
      }, this.state.search ? React.createElement("span", null, React.createElement("input", {
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
      })) : null, _mapInstanceProperty(items).call(items, function (option) {
        return React.createElement("span", {
          style: {
            cursor: 'pointer'
          },
          key: option[valueKey]
        }, React.createElement("a", {
          className: "pointer",
          onClick: function onClick() {
            return onAction([option]);
          }
        }, option[labelKey]), React.createElement("br", null));
      }), items.length === 0 ? React.createElement("br", null) : null));
    }
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return Pane;
}(Component);

_defineProperty(Pane, "propTypes", {
  items: PropTypes.array,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  onAction: PropTypes.func,
  actionElement: PropTypes.any,
  paneLabel: PropTypes.any,
  boxStyle: PropTypes.object,
  height: PropTypes.number,
  paneRef: PropTypes.func,
  resize: PropTypes.func
});

_defineProperty(Pane, "defaultProps", {
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
  _inherits(PickList, _Component2);

  function PickList() {
    var _getPrototypeOf3, _context5;

    var _this3;

    _classCallCheck(this, PickList);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = _possibleConstructorReturn(this, (_getPrototypeOf3 = _getPrototypeOf(PickList)).call.apply(_getPrototypeOf3, _concatInstanceProperty(_context5 = [this]).call(_context5, args)));

    _defineProperty(_assertThisInitialized(_this3), "adjustHeight", function () {
      if (_this3.props.height) {
        return;
      }

      var $value = $(_this3.valueDiv);
      var $options = $(_this3.optionsDiv);
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

    _defineProperty(_assertThisInitialized(_this3), "add", function (options) {
      var _this3$props = _this3.props,
          value = _this3$props.value,
          valueKey = _this3$props.valueKey,
          onChange = _this3$props.onChange;

      var originalValue = _Object$assign([], value);

      var values = _spliceInstanceProperty(value).call(value, 0);

      _forEachInstanceProperty(options).call(options, function (option) {
        var found = _findInstanceProperty(values).call(values, function (o) {
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

          var _values = _Object$values(_mapInstanceProperty(originalValue).call(originalValue, function (ov) {
            return ov[valueKey];
          }));

          var result = _filterInstanceProperty(_context6 = _this3.props.options).call(_context6, function (opt) {
            return !_includesInstanceProperty(_values).call(_values, opt[valueKey]);
          });

          onChange(_concatInstanceProperty(_context7 = []).call(_context7, _toConsumableArray(originalValue), _toConsumableArray(result)));
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this3), "remove", function (options) {
      var _this3$props2 = _this3.props,
          value = _this3$props2.value,
          valueKey = _this3$props2.valueKey,
          onChange = _this3$props2.onChange;

      var values = _spliceInstanceProperty(value).call(value, 0);

      var keys = _mapInstanceProperty(options).call(options, function (opt) {
        return opt[valueKey];
      });

      _forEachInstanceProperty(keys).call(keys, function (key) {
        var _context8;

        var index = _indexOfInstanceProperty(_context8 = _mapInstanceProperty(values).call(values, function (o) {
          return o[valueKey];
        })).call(_context8, key);

        if (index > -1) {
          _spliceInstanceProperty(values).call(values, index, 1);
        }
      });

      onChange(values);
    });

    return _this3;
  }

  _createClass(PickList, [{
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
      return React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
      }, React.createElement(Pane, _extends({}, this.props, {
        paneLabel: leftPaneLabel,
        items: options,
        paneRef: function paneRef(div) {
          _this4.optionsDiv = div;
        },
        onAction: function onAction(options) {
          return _this4.add(options);
        },
        actionElement: "Add All"
      }))), React.createElement("div", {
        className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
      }, React.createElement(Pane, _extends({}, this.props, {
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
  }, {
    key: "__reactstandin__regenerateByEval",
    // @ts-ignore
    value: function __reactstandin__regenerateByEval(key, code) {
      // @ts-ignore
      this[key] = eval(code);
    }
  }]);

  return PickList;
}(Component);

_defineProperty(PickList, "propTypes", {
  options: PropTypes.array,
  value: PropTypes.array,
  labelKey: PropTypes.string,
  valueKey: PropTypes.string,
  onChange: PropTypes.func,
  boxStyle: PropTypes.object,
  height: PropTypes.number,
  leftPaneLabel: PropTypes.any,
  rightPaneLabel: PropTypes.any
});

_defineProperty(PickList, "defaultProps", {
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

export { PickList as default };
;

(function () {
  var reactHotLoader = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.default : undefined;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(noop, "noop", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/ReportBuilder/PickList.js");
  reactHotLoader.register(Pane, "Pane", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/ReportBuilder/PickList.js");
  reactHotLoader.register(PickList, "PickList", "/Users/davidadams/code/grid-form-builder/src/QueryBuilder/ReportBuilder/PickList.js");
})();

;

(function () {
  var leaveModule = typeof reactHotLoaderGlobal !== 'undefined' ? reactHotLoaderGlobal.leaveModule : undefined;
  leaveModule && leaveModule(module);
})();