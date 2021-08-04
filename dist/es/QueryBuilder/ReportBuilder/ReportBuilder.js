import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime-corejs3/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";

function ownKeys(object, enumerableOnly) { var keys = _Object$keys(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); if (enumerableOnly) symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { var _context8; _forEachInstanceProperty(_context8 = ownKeys(Object(source), true)).call(_context8, function (key) { _defineProperty(target, key, source[key]); }); } else if (_Object$getOwnPropertyDescriptors) { _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)); } else { var _context9; _forEachInstanceProperty(_context9 = ownKeys(Object(source))).call(_context9, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } } return target; }

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'immutable';
import ColumnPicker from './ColumnPicker';
import AggregationPicker from './AggregationPicker';
export var ReportBuilder =
/*#__PURE__*/
function (_Component) {
  _inherits(ReportBuilder, _Component);

  function ReportBuilder(props) {
    var _this;

    _classCallCheck(this, ReportBuilder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ReportBuilder).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "buildStringColDef", function (col) {
      var _context;

      var def = _objectSpread({}, col, {
        headerName: col.label.split(' (')[0],
        field: col.value
      });

      if (def.type && !_includesInstanceProperty(_context = def.type).call(_context, 'Column')) {
        delete def.type;
      }

      return def;
    });

    _defineProperty(_assertThisInitialized(_this), "buildDateColDef", function (col) {
      var _context2;

      var def = _objectSpread({}, col, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        filter: 'date'
      });

      if (def.type && !_includesInstanceProperty(_context2 = def.type).call(_context2, 'Column')) {
        delete def.type;
      }

      return def;
    });

    _defineProperty(_assertThisInitialized(_this), "buildBoolColDef", function (col) {
      var _context3;

      var def = _objectSpread({}, col, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        valueGetter: function valueGetter(col) {
          if (col && col.data && col.colDef && col.colDef.field) {
            var val = '';

            switch ("".concat(col.data[col.colDef.field])) {
              case '0':
                val = 'False';
                break;

              case '1':
                val = 'True';
                break;

              default:
                val = col.data[col.colDef.field];
            }

            return val;
          } else {
            console.warn('Query-builder was unable to read col.data[col.colDef.field] of a boolean field. returning blank string', col); // eslint-disable-line

            return '';
          }
        }
      });

      if (def.type && !_includesInstanceProperty(_context3 = def.type).call(_context3, 'Column')) {
        delete def.type;
      }

      return def;
    });

    _defineProperty(_assertThisInitialized(_this), "buildColumnDefs", function (cols) {
      var colDefs = [];

      for (var i in cols) {
        var col = cols[i];

        switch (col.type) {
          case 'string':
            colDefs.push(_this.buildStringColDef(col));
            break;

          case 'datetime':
          case 'date':
            colDefs.push(_this.buildDateColDef(col));
            break;

          case 'bool':
            colDefs.push(_this.buildBoolColDef(col));
            break;

          default:
            colDefs.push(_this.buildStringColDef(col));
        }
      }

      return colDefs;
    });

    _defineProperty(_assertThisInitialized(_this), "onColumnChange", function (colList) {
      // colList.sort((a, b) => a.label < b.label ? -1 : 1)
      if (_this.props.onColDefChange) {
        _this.props.onColDefChange(_this.buildColumnDefs(colList));
      }

      if (_this.props.onColumnChange) {
        _this.props.onColumnChange(colList);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "unselectedOptions", function () {
      var _context4;

      var unselected = [];

      _forEachInstanceProperty(_context4 = _this.props.availableColumns).call(_context4, function (col) {
        var _context5;

        if (!_someInstanceProperty(_context5 = _this.props.selectedColumns).call(_context5, function (c) {
          if (c.value) {
            return c.value === col.value;
          } else {
            return c === col;
          }
        })) {
          unselected.push(col);
        }
      });

      return unselected;
    });

    if (props.onColDefChange && props.selectedColumns) {
      props.onColDefChange(_this.buildColumnDefs(props.selectedColumns));
    }

    return _this;
  }

  _createClass(ReportBuilder, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(props) {
      if (_JSON$stringify(this.props.selectedColumns) !== _JSON$stringify(props.selectedColumns)) {
        if (this.props.onColDefChange) {
          this.props.onColDefChange(this.buildColumnDefs(props.selectedColumns));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        style: {
          width: '99%',
          margin: 'auto',
          border: '2px solid #A0A0A0'
        }
      }, React.createElement("h4", {
        style: {
          margin: '5px'
        }
      }, this.props.title || 'Report Builder'), !this.props.suppressColumnPicker && React.createElement(ColumnPicker, {
        title: this.props.columnPickerTitle,
        availableColumns: this.unselectedOptions(),
        selectedColumns: this.props.selectedColumns,
        onChange: this.onColumnChange,
        columnPickerHeight: this.props.columnPickerHeight
      }), !this.props.suppressAggregationPicker && React.createElement(AggregationPicker, null));
    }
  }]);

  return ReportBuilder;
}(Component);

_defineProperty(ReportBuilder, "propTypes", {
  title: PropTypes.string,
  suppressColumnPicker: PropTypes.bool,
  columnPickerTitle: PropTypes.string,
  availableColumns: PropTypes.array,
  selectedColumns: PropTypes.array,
  onColumnChange: PropTypes.func,
  onColDefChange: PropTypes.func,
  suppressAggregationPicker: PropTypes.bool,
  columnPickerHeight: PropTypes.number
});

_defineProperty(ReportBuilder, "defaultProps", {
  suppressAggregationPicker: true
});

export var FIELD_TYPE_MAP = {
  '11': 'string',
  '10': 'string',
  '0': 'string',
  '1': 'bool',
  '2': 'integer',
  '3': 'decimal',
  '4': 'float',
  '7': 'datetime',
  '5': 'date',
  '6': 'time'
};
export function buildAvailableColumnsFromFieldDefs(fieldDefs, withFieldNames) {
  var _context7;

  var fieldNames = _Object$keys(fieldDefs.data);

  var availableColumns = [];

  for (var i in fieldNames) {
    var _context6;

    var fieldDef = fieldDefs.data[fieldNames[i]];
    var rawLabel = fieldDef.fieldlabel;
    availableColumns.push({
      label: withFieldNames ? _concatInstanceProperty(_context6 = "".concat(rawLabel, " (")).call(_context6, fieldNames[i], ")") : rawLabel,
      value: fieldNames[i],
      type: FIELD_TYPE_MAP["".concat(fieldDef.datatype)],
      format: fieldDef.format === 'phone' ? 'dashes' : fieldDef.format
    });
  }

  return _sortInstanceProperty(_context7 = List(availableColumns)).call(_context7, function (a, b) {
    return a.label.localeCompare(b.label);
  }).toJS();
}
export function buildDefaultColumnsFromQuery(query) {
  var availableColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var selected = [];

  if (query.query) {
    var conditions = query.query.conditions;

    for (var i in conditions) {
      var c = conditions[i];

      if (c) {
        if (availableColumns) {
          for (var j in availableColumns) {
            var column = availableColumns[j];

            if (column && // column.label === c.name ||
            column.value === c.name // ||
            // column.label.split(` (${column.value})`)[0] === c.name
            ) {
              selected.push(column);
            }
          }
        }
      }
    }
  } else {
    console.warn('Could not find query.query; please provide the raw query returned by ConditionalTable '); // eslint-disable-line
  }

  return selected;
}