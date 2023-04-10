"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _Reflect$construct = require("@babel/runtime-corejs3/core-js-stable/reflect/construct");

var _Object$keys2 = require("@babel/runtime-corejs3/core-js-stable/object/keys");

var _Object$getOwnPropertySymbols = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-symbols");

var _filterInstanceProperty = require("@babel/runtime-corejs3/core-js-stable/instance/filter");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _forEachInstanceProperty2 = require("@babel/runtime-corejs3/core-js-stable/instance/for-each");

var _Object$getOwnPropertyDescriptors = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptors");

var _Object$defineProperties = require("@babel/runtime-corejs3/core-js-stable/object/define-properties");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.ReportBuilder = exports.FIELD_TYPE_MAP = void 0;
exports.buildAvailableColumnsFromFieldDefs = buildAvailableColumnsFromFieldDefs;
exports.buildDefaultColumnsFromQuery = buildDefaultColumnsFromQuery;

var _includes = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/includes"));

var _forEach = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/for-each"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _stringify = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/json/stringify"));

var _keys = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/object/keys"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _sort = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/sort"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/defineProperty"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _react = _interopRequireWildcard(require("react"));

var _immutable = require("immutable");

var _ColumnPicker = _interopRequireDefault(require("./ColumnPicker"));

var _AggregationPicker = _interopRequireDefault(require("./AggregationPicker"));

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = _Object$keys2(object); if (_Object$getOwnPropertySymbols) { var symbols = _Object$getOwnPropertySymbols(object); enumerableOnly && (symbols = _filterInstanceProperty(symbols).call(symbols, function (sym) { return _Object$getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var _context8, _context9; var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? _forEachInstanceProperty2(_context8 = ownKeys(Object(source), !0)).call(_context8, function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : _Object$getOwnPropertyDescriptors ? _Object$defineProperties(target, _Object$getOwnPropertyDescriptors(source)) : _forEachInstanceProperty2(_context9 = ownKeys(Object(source))).call(_context9, function (key) { _Object$defineProperty(target, key, _Object$getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2.default)(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(_Reflect$construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var ReportBuilder = /*#__PURE__*/function (_Component) {
  (0, _inherits2.default)(ReportBuilder, _Component);

  var _super = _createSuper(ReportBuilder);

  function ReportBuilder(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ReportBuilder);
    _this = _super.call(this, props);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildStringColDef", function (col) {
      var _context;

      var def = _objectSpread(_objectSpread({}, col), {}, {
        headerName: col.label.split(' (')[0],
        field: col.value
      });

      if (def.type && !(0, _includes.default)(_context = def.type).call(_context, 'Column')) {
        delete def.type;
      }

      return def;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildDateColDef", function (col) {
      var _context2;

      var def = _objectSpread(_objectSpread({}, col), {}, {
        headerName: col.label.split(' (')[0],
        field: col.value,
        filter: 'date'
      });

      if (def.type && !(0, _includes.default)(_context2 = def.type).call(_context2, 'Column')) {
        delete def.type;
      }

      return def;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildBoolColDef", function (col) {
      var _context3;

      var def = _objectSpread(_objectSpread({}, col), {}, {
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

      if (def.type && !(0, _includes.default)(_context3 = def.type).call(_context3, 'Column')) {
        delete def.type;
      }

      return def;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "buildColumnDefs", function (cols) {
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onColumnChange", function (colList) {
      // colList.sort((a, b) => a.label < b.label ? -1 : 1)
      if (_this.props.onColDefChange) {
        _this.props.onColDefChange(_this.buildColumnDefs(colList));
      }

      if (_this.props.onColumnChange) {
        _this.props.onColumnChange(colList);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "unselectedOptions", function () {
      var _context4;

      var unselected = [];
      (0, _forEach.default)(_context4 = _this.props.availableColumns).call(_context4, function (col) {
        var _context5;

        if (!(0, _some.default)(_context5 = _this.props.selectedColumns).call(_context5, function (c) {
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

  (0, _createClass2.default)(ReportBuilder, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(props) {
      if ((0, _stringify.default)(this.props.selectedColumns) !== (0, _stringify.default)(props.selectedColumns)) {
        if (this.props.onColDefChange) {
          this.props.onColDefChange(this.buildColumnDefs(props.selectedColumns));
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement("div", {
        style: {
          width: '99%',
          margin: 'auto',
          border: '2px solid #A0A0A0'
        }
      }, /*#__PURE__*/_react.default.createElement("h4", {
        style: {
          margin: '5px'
        }
      }, this.props.title || 'Report Builder'), !this.props.suppressColumnPicker && /*#__PURE__*/_react.default.createElement(_ColumnPicker.default, {
        title: this.props.columnPickerTitle,
        availableColumns: this.unselectedOptions(),
        selectedColumns: this.props.selectedColumns,
        onChange: this.onColumnChange,
        columnPickerHeight: this.props.columnPickerHeight
      }), !this.props.suppressAggregationPicker && /*#__PURE__*/_react.default.createElement(_AggregationPicker.default, null));
    }
  }]);
  return ReportBuilder;
}(_react.Component);

exports.ReportBuilder = ReportBuilder;
(0, _defineProperty2.default)(ReportBuilder, "propTypes", {
  title: _propTypes.default.string,
  suppressColumnPicker: _propTypes.default.bool,
  columnPickerTitle: _propTypes.default.string,
  availableColumns: _propTypes.default.array,
  selectedColumns: _propTypes.default.array,
  onColumnChange: _propTypes.default.func,
  onColDefChange: _propTypes.default.func,
  suppressAggregationPicker: _propTypes.default.bool,
  columnPickerHeight: _propTypes.default.number
});
(0, _defineProperty2.default)(ReportBuilder, "defaultProps", {
  suppressAggregationPicker: true
});
var FIELD_TYPE_MAP = {
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
exports.FIELD_TYPE_MAP = FIELD_TYPE_MAP;

function buildAvailableColumnsFromFieldDefs(fieldDefs, withFieldNames) {
  var _context7;

  var fieldNames = (0, _keys.default)(fieldDefs.data);
  var availableColumns = [];

  for (var i in fieldNames) {
    var _context6;

    var fieldDef = fieldDefs.data[fieldNames[i]];
    var rawLabel = fieldDef.fieldlabel;
    availableColumns.push({
      label: withFieldNames ? (0, _concat.default)(_context6 = "".concat(rawLabel, " (")).call(_context6, fieldNames[i], ")") : rawLabel,
      value: fieldNames[i],
      type: FIELD_TYPE_MAP["".concat(fieldDef.datatype)],
      format: fieldDef.format === 'phone' ? 'dashes' : fieldDef.format
    });
  }

  return (0, _sort.default)(_context7 = (0, _immutable.List)(availableColumns)).call(_context7, function (a, b) {
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