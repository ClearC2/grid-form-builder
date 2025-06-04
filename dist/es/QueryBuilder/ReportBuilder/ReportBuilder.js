import _Object$getOwnPropertySymbols from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _Object$getOwnPropertyDescriptor from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor";
import _Object$getOwnPropertyDescriptors from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors";
import _Object$defineProperties from "@babel/runtime-corejs3/core-js-stable/object/define-properties";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _sortInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/sort";
function ownKeys(e, r) { var t = _Object$keys(e); if (_Object$getOwnPropertySymbols) { var o = _Object$getOwnPropertySymbols(e); r && (o = _filterInstanceProperty(o).call(o, function (r) { return _Object$getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var _context7, _context8; var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? _forEachInstanceProperty(_context7 = ownKeys(Object(t), !0)).call(_context7, function (r) { _defineProperty(e, r, t[r]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(e, _Object$getOwnPropertyDescriptors(t)) : _forEachInstanceProperty(_context8 = ownKeys(Object(t))).call(_context8, function (r) { _Object$defineProperty(e, r, _Object$getOwnPropertyDescriptor(t, r)); }); } return e; }
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { List } from 'immutable';
import ColumnPicker from './ColumnPicker';
import AggregationPicker from './AggregationPicker';
export class ReportBuilder extends Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "buildStringColDef", col => {
      var _context;
      let def = _objectSpread(_objectSpread({}, col), {}, {
        headerName: col.label.split(' (')[0],
        field: col.value
      });
      if (def.type && !_includesInstanceProperty(_context = def.type).call(_context, 'Column')) {
        delete def.type;
      }
      return def;
    });
    _defineProperty(this, "buildDateColDef", col => {
      var _context2;
      let def = _objectSpread(_objectSpread({}, col), {}, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        filter: 'date'
      });
      if (def.type && !_includesInstanceProperty(_context2 = def.type).call(_context2, 'Column')) {
        delete def.type;
      }
      return def;
    });
    _defineProperty(this, "buildBoolColDef", col => {
      var _context3;
      let def = _objectSpread(_objectSpread({}, col), {}, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        valueGetter: col => {
          if (col && col.data && col.colDef && col.colDef.field) {
            let val = '';
            switch (`${col.data[col.colDef.field]}`) {
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
    _defineProperty(this, "buildColumnDefs", cols => {
      let colDefs = [];
      for (let i in cols) {
        let col = cols[i];
        switch (col.type) {
          case 'string':
            colDefs.push(this.buildStringColDef(col));
            break;
          case 'datetime':
          case 'date':
            colDefs.push(this.buildDateColDef(col));
            break;
          case 'bool':
            colDefs.push(this.buildBoolColDef(col));
            break;
          default:
            colDefs.push(this.buildStringColDef(col));
        }
      }
      return colDefs;
    });
    _defineProperty(this, "onColumnChange", colList => {
      // colList.sort((a, b) => a.label < b.label ? -1 : 1)
      if (this.props.onColDefChange) {
        this.props.onColDefChange(this.buildColumnDefs(colList));
      }
      if (this.props.onColumnChange) {
        this.props.onColumnChange(colList);
      }
    });
    _defineProperty(this, "unselectedOptions", () => {
      var _context4;
      let unselected = [];
      _forEachInstanceProperty(_context4 = this.props.availableColumns).call(_context4, col => {
        var _context5;
        if (!_someInstanceProperty(_context5 = this.props.selectedColumns).call(_context5, c => {
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
      props.onColDefChange(this.buildColumnDefs(props.selectedColumns));
    }
  }
  UNSAFE_componentWillReceiveProps(props) {
    if (_JSON$stringify(this.props.selectedColumns) !== _JSON$stringify(props.selectedColumns)) {
      if (this.props.onColDefChange) {
        this.props.onColDefChange(this.buildColumnDefs(props.selectedColumns));
      }
    }
  }
  render() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        width: '99%',
        margin: 'auto',
        border: '2px solid #A0A0A0'
      }
    }, /*#__PURE__*/React.createElement("h4", {
      style: {
        margin: '5px'
      }
    }, this.props.title || 'Report Builder'), !this.props.suppressColumnPicker && /*#__PURE__*/React.createElement(ColumnPicker, {
      title: this.props.columnPickerTitle,
      availableColumns: this.unselectedOptions(),
      selectedColumns: this.props.selectedColumns,
      onChange: this.onColumnChange,
      columnPickerHeight: this.props.columnPickerHeight
    }), !this.props.suppressAggregationPicker && /*#__PURE__*/React.createElement(AggregationPicker, null));
  }
}
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
export const FIELD_TYPE_MAP = {
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
  var _context6;
  let fieldNames = _Object$keys(fieldDefs.data);
  let availableColumns = [];
  for (let i in fieldNames) {
    let fieldDef = fieldDefs.data[fieldNames[i]];
    let rawLabel = fieldDef.fieldlabel;
    availableColumns.push({
      label: withFieldNames ? `${rawLabel} (${fieldNames[i]})` : rawLabel,
      value: fieldNames[i],
      type: FIELD_TYPE_MAP[`${fieldDef.datatype}`],
      format: fieldDef.format === 'phone' ? 'dashes' : fieldDef.format
    });
  }
  return _sortInstanceProperty(_context6 = List(availableColumns)).call(_context6, (a, b) => a.label.localeCompare(b.label)).toJS();
}
export function buildDefaultColumnsFromQuery(query) {
  let availableColumns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  let selected = [];
  if (query.query) {
    let conditions = query.query.conditions;
    for (let i in conditions) {
      let c = conditions[i];
      if (c) {
        if (availableColumns) {
          for (let j in availableColumns) {
            let column = availableColumns[j];
            if (column &&
            // column.label === c.name ||
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