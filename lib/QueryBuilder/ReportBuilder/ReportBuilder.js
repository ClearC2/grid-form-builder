'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FIELD_TYPE_MAP = exports.ReportBuilder = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.buildAvailableColumnsFromFieldDefs = buildAvailableColumnsFromFieldDefs;
exports.buildDefaultColumnsFromQuery = buildDefaultColumnsFromQuery;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _ColumnPicker = require('./ColumnPicker');

var _ColumnPicker2 = _interopRequireDefault(_ColumnPicker);

var _AggregationPicker = require('./AggregationPicker');

var _AggregationPicker2 = _interopRequireDefault(_AggregationPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReportBuilder = exports.ReportBuilder = function (_Component) {
  _inherits(ReportBuilder, _Component);

  function ReportBuilder(props) {
    _classCallCheck(this, ReportBuilder);

    var _this = _possibleConstructorReturn(this, (ReportBuilder.__proto__ || Object.getPrototypeOf(ReportBuilder)).call(this, props));

    _this.buildStringColDef = function (col) {
      return _extends({}, col, {
        headerName: col.label.split(' (')[0],
        field: col.value
      });
    };

    _this.buildDateColDef = function (col) {
      return _extends({}, col, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        filter: 'date'
      });
    };

    _this.buildBoolColDef = function (col) {
      return _extends({}, col, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        valueGetter: function valueGetter(col) {
          if (col && col.data && col.colDef && col.colDef.field) {
            var val = '';
            switch ('' + col.data[col.colDef.field]) {
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
    };

    _this.buildColumnDefs = function (cols) {
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
    };

    _this.onColumnChange = function (colList) {
      // colList.sort((a, b) => a.label < b.label ? -1 : 1)
      if (_this.props.onColDefChange) {
        _this.props.onColDefChange(_this.buildColumnDefs(colList));
      }
      if (_this.props.onColumnChange) {
        _this.props.onColumnChange(colList);
      }
    };

    _this.unselectedOptions = function () {
      var unselected = [];
      _this.props.availableColumns.forEach(function (col) {
        if (!_this.props.selectedColumns.some(function (c) {
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
    };

    if (props.onColDefChange && props.selectedColumns) {
      props.onColDefChange(_this.buildColumnDefs(props.selectedColumns));
    }
    return _this;
  }

  _createClass(ReportBuilder, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (JSON.stringify(this.props.selectedColumns) !== JSON.stringify(props.selectedColumns)) {
        if (this.props.onColDefChange) {
          this.props.onColDefChange(this.buildColumnDefs(props.selectedColumns));
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { width: '99%', margin: 'auto', border: '2px solid #A0A0A0' } },
        _react2.default.createElement(
          'h4',
          { style: { margin: '5px' } },
          this.props.title || 'Report Builder'
        ),
        !this.props.suppressColumnPicker && _react2.default.createElement(_ColumnPicker2.default, {
          title: this.props.columnPickerTitle,
          availableColumns: this.unselectedOptions(),
          selectedColumns: this.props.selectedColumns,
          onChange: this.onColumnChange,
          columnPickerHeight: this.props.columnPickerHeight
        }),
        !this.props.suppressAggregationPicker && _react2.default.createElement(_AggregationPicker2.default, null)
      );
    }
  }]);

  return ReportBuilder;
}(_react.Component);

ReportBuilder.propTypes = {
  title: _propTypes2.default.string,
  suppressColumnPicker: _propTypes2.default.bool,
  columnPickerTitle: _propTypes2.default.string,
  availableColumns: _propTypes2.default.array,
  selectedColumns: _propTypes2.default.array,
  onColumnChange: _propTypes2.default.func,
  onColDefChange: _propTypes2.default.func,
  suppressAggregationPicker: _propTypes2.default.bool,
  columnPickerHeight: _propTypes2.default.number
};
ReportBuilder.defaultProps = {
  suppressAggregationPicker: true
};
var FIELD_TYPE_MAP = exports.FIELD_TYPE_MAP = {
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

function buildAvailableColumnsFromFieldDefs(fieldDefs, withFieldNames) {
  var fieldNames = Object.keys(fieldDefs.data);
  var availableColumns = [];
  for (var i in fieldNames) {
    var fieldDef = fieldDefs.data[fieldNames[i]];
    var rawLabel = fieldDef.fieldlabel;
    availableColumns.push({
      label: withFieldNames ? rawLabel + ' (' + fieldNames[i] + ')' : rawLabel,
      value: fieldNames[i],
      type: FIELD_TYPE_MAP['' + fieldDef.datatype],
      format: fieldDef.format === 'phone' ? 'dashes' : fieldDef.format
    });
  }
  return (0, _immutable.List)(availableColumns).sort(function (a, b) {
    return a.label.localeCompare(b.label);
  }).toJS();
}

function buildDefaultColumnsFromQuery(query) {
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