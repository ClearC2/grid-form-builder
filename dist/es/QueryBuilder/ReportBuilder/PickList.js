import _extends from "@babel/runtime-corejs3/helpers/esm/extends";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import _Object$values from "@babel/runtime-corejs3/core-js-stable/object/values";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
const noop = () => {};
class Pane extends Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      selected: {},
      selectAll: false,
      search: false,
      searchText: ''
    });
    _defineProperty(this, "onFlush", () => {
      var _context;
      const {
        valueKey
      } = this.props;
      const items = _filterInstanceProperty(_context = this.items()).call(_context, item => this.state.selected[item[valueKey]]);
      if (this.state.search) {
        this.props.onAction(items);
      } else {
        var _context2;
        this.props.onAction(_mapInstanceProperty(_context2 = this.items()).call(_context2, c => c));
      }
      this.setState({
        selectAll: false,
        selected: {},
        searchText: ''
      });
    });
    _defineProperty(this, "items", () => {
      let {
        items,
        labelKey
      } = this.props;
      const {
        search
      } = this.state;
      let {
        searchText = ''
      } = this.state;
      if (typeof searchText !== 'string') searchText = '';
      if (search) {
        items = _filterInstanceProperty(items).call(items, item => {
          var _context3;
          return _includesInstanceProperty(_context3 = String(item[labelKey] || '').toLowerCase()).call(_context3, searchText.toLowerCase());
        });
      }
      return items;
    });
  }
  render() {
    const {
      boxStyle,
      valueKey,
      labelKey,
      actionElement,
      height,
      paneRef,
      paneLabel,
      onAction
    } = this.props;
    const items = this.items();
    const innerDivStyle = {
      height,
      overflow: height ? 'auto' : null
    };
    return /*#__PURE__*/React.createElement("div", {
      ref: div => paneRef(div),
      style: boxStyle
    }, /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-xs-3 col-md-3"
    }, paneLabel), /*#__PURE__*/React.createElement("div", {
      className: `col-xs-9 col-md-9 text-right`
    }, /*#__PURE__*/React.createElement("a", {
      className: "pointer",
      onClick: this.onFlush
    }, actionElement), "\xA0\xA0\xA0", /*#__PURE__*/React.createElement("span", {
      className: "red icon-search-1 pointer",
      onClick: () => this.setState({
        search: !this.state.search,
        searchText: ''
      })
    }))), /*#__PURE__*/React.createElement("hr", {
      style: {
        margin: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: innerDivStyle
    }, this.state.search ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("input", {
      type: "text",
      className: "form-control input-sm",
      placeholder: "Search",
      value: this.state.searchText,
      style: {
        fontSize: 12,
        height: 20
      },
      onChange: e => this.setState({
        searchText: e.target.value,
        selected: {},
        selectAll: false
      })
    })) : null, _mapInstanceProperty(items).call(items, option => /*#__PURE__*/React.createElement("span", {
      style: {
        cursor: 'pointer'
      },
      key: option[valueKey]
    }, /*#__PURE__*/React.createElement("a", {
      className: "pointer",
      onClick: () => onAction([option])
    }, option[labelKey]), /*#__PURE__*/React.createElement("br", null))), items.length === 0 ? /*#__PURE__*/React.createElement("br", null) : null));
  }
}
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
export default class PickList extends Component {
  constructor() {
    super(...arguments);
    _defineProperty(this, "adjustHeight", () => {
      if (this.props.height) {
        return;
      }
      const $value = $(this.valueDiv);
      const $options = $(this.optionsDiv);
      $value.css('height', '');
      $options.css('height', '');
      const valueHeight = $value.height();
      const optionsHeight = $options.height();
      if (valueHeight > optionsHeight) {
        $options.height(valueHeight);
      } else {
        $value.height(optionsHeight);
      }
    });
    _defineProperty(this, "add", options => {
      const {
        value,
        valueKey,
        onChange
      } = this.props;
      const originalValue = _Object$assign([], value);
      const values = _spliceInstanceProperty(value).call(value, 0);
      _forEachInstanceProperty(options).call(options, option => {
        const found = _findInstanceProperty(values).call(values, o => o[valueKey] === option[valueKey]);
        if (!found) {
          values.unshift(option);
        }
      });
      if (options.length === 1) {
        onChange(values);
      } else {
        if (originalValue.length !== this.props.options.length) {
          var _context4;
          let _values = _Object$values(_mapInstanceProperty(originalValue).call(originalValue, ov => ov[valueKey]));
          if (!_Array$isArray(_values)) _values = [];
          const result = _filterInstanceProperty(_context4 = this.props.options).call(_context4, opt => !_includesInstanceProperty(_values).call(_values, opt[valueKey]));
          onChange([...originalValue, ...result]);
        }
      }
    });
    _defineProperty(this, "remove", options => {
      const {
        value,
        valueKey,
        onChange
      } = this.props;
      const values = _spliceInstanceProperty(value).call(value, 0);
      const keys = _mapInstanceProperty(options).call(options, opt => opt[valueKey]);
      _forEachInstanceProperty(keys).call(keys, key => {
        var _context5;
        const index = _indexOfInstanceProperty(_context5 = _mapInstanceProperty(values).call(values, o => o[valueKey])).call(_context5, key);
        if (index > -1) {
          _spliceInstanceProperty(values).call(values, index, 1);
        }
      });
      onChange(values);
    });
  }
  componentDidMount() {
    this.adjustHeight();
  }
  componentDidUpdate() {
    this.adjustHeight();
  }
  render() {
    const {
      leftPaneLabel,
      rightPaneLabel,
      options,
      value
    } = this.props;
    return /*#__PURE__*/React.createElement("div", {
      className: "row"
    }, /*#__PURE__*/React.createElement("div", {
      className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
    }, /*#__PURE__*/React.createElement(Pane, _extends({}, this.props, {
      paneLabel: leftPaneLabel,
      items: options,
      paneRef: div => {
        this.optionsDiv = div;
      },
      onAction: options => this.add(options),
      actionElement: "Add All"
    }))), /*#__PURE__*/React.createElement("div", {
      className: "col-xs-6 col-sm-6 col-md-6 col-lg-6"
    }, /*#__PURE__*/React.createElement(Pane, _extends({}, this.props, {
      paneLabel: rightPaneLabel,
      items: value,
      paneRef: div => {
        this.valueDiv = div;
      },
      onAction: options => this.remove(options),
      actionElement: "Remove All"
    }))));
  }
}
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