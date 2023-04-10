"use strict";

var _typeof = require("@babel/runtime-corejs3/helpers/typeof");

var _WeakMap = require("@babel/runtime-corejs3/core-js-stable/weak-map");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _Object$getOwnPropertyDescriptor = require("@babel/runtime-corejs3/core-js-stable/object/get-own-property-descriptor");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _indexOf = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/index-of"));

var _concat = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/concat"));

var _some = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/some"));

var _map = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/map"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime-corejs3/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Portal = _interopRequireDefault(require("../../Portal"));

var _moment = _interopRequireDefault(require("moment"));

require("../../styles/month-picker.css");

var _fa = require("react-icons/fa");

function _getRequireWildcardCache(nodeInterop) { if (typeof _WeakMap !== "function") return null; var cacheBabelInterop = new _WeakMap(); var cacheNodeInterop = new _WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = _Object$defineProperty && _Object$getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? _Object$getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { _Object$defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MonthPicker = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var _inputRef$current;

  var elementId = props.elementId,
      pastYears = props.pastYears,
      futureYears = props.futureYears,
      startDate = props.startDate,
      changeShowPicker = props.changeShowPicker,
      showPicker = props.showPicker,
      onChange = props.onChange,
      name = props.name,
      format = props.format,
      setManualBlurCheck = props.setManualBlurCheck,
      inputRef = props.inputRef;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      yearOptions = _useState2[0],
      setYearOptions = _useState2[1];

  var _useState3 = (0, _react.useState)(+(0, _moment.default)().format('YYYY')),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      currentYear = _useState4[0],
      setCurrentYear = _useState4[1];

  var _useState5 = (0, _react.useState)(+(0, _moment.default)().format('MM')),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      currentMonth = _useState6[0],
      setCurrentMonth = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isDirty = _useState8[0],
      setIsDirty = _useState8[1];

  var isSelectedMonth = (0, _react.useCallback)(function (month) {
    return month === currentMonth;
  }, [currentMonth]);
  var incrementYear = (0, _react.useCallback)(function () {
    var index = (0, _indexOf.default)(yearOptions).call(yearOptions, currentYear);
    var year = currentYear;
    if (index + 1 === yearOptions.length) year = yearOptions[0];else year = yearOptions[index + 1];
    setCurrentYear(year);
    setCurrentMonth(0);
  }, [yearOptions, currentYear]);
  var decrementYear = (0, _react.useCallback)(function () {
    var index = (0, _indexOf.default)(yearOptions).call(yearOptions, currentYear);
    var year = currentYear;
    if (index === 0) year = yearOptions[yearOptions.length - 1];else year = yearOptions[index - 1];
    setCurrentYear(year);
    setCurrentMonth(0);
  }, [yearOptions, currentYear]);
  var cancelDateChange = (0, _react.useCallback)(function () {
    changeShowPicker(false);
  }, [changeShowPicker]);
  var applyDateChange = (0, _react.useCallback)(function () {
    if (currentYear && currentMonth) {
      var _context;

      setManualBlurCheck(false);
      onChange({
        target: {
          name: name,
          value: (0, _moment.default)((0, _concat.default)(_context = "".concat(currentMonth, "/")).call(_context, currentYear), 'M/YYYY').format(format)
        }
      });
      changeShowPicker(false);
    }
  }, [changeShowPicker, currentMonth, currentYear, format, name, onChange, setManualBlurCheck]);
  var windowClickListener = (0, _react.useMemo)(function () {
    return function (e) {
      var pathHandler = e.path || e.composedPath();
      var insideClick = (0, _some.default)(pathHandler).call(pathHandler, function (path) {
        return path.id && (path.id === elementId.current || path.id === ref.current.state.id);
      });

      if (!insideClick) {
        if (isDirty && currentYear && currentMonth) {
          var _context2;

          setManualBlurCheck(false);
          onChange({
            target: {
              name: name,
              value: (0, _moment.default)((0, _concat.default)(_context2 = "".concat(currentMonth, "/")).call(_context2, currentYear), 'M/YYYY').format(format)
            }
          });
        }

        changeShowPicker(false);
      }
    };
  }, [elementId, ref, changeShowPicker, onChange, currentYear, currentMonth, name, format, setManualBlurCheck, isDirty]);
  (0, _react.useEffect)(function () {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
    return function () {
      window.removeEventListener('mousedown', windowClickListener);
    };
  }, [showPicker, windowClickListener]);
  (0, _react.useEffect)(function () {
    var options = [];
    var thisYear = +(0, _moment.default)().format('YYYY');

    for (var i = +pastYears; i > 0; i--) {
      options.push(thisYear - i);
    }

    for (var _i = 0; _i <= futureYears; _i++) {
      options.push(thisYear + _i);
    }

    setYearOptions(options);
  }, [pastYears, futureYears]);
  (0, _react.useEffect)(function () {
    var date = startDate || (0, _moment.default)();
    var year = +date.format('YYYY');
    var month = +date.format('MM');
    setCurrentYear(year);
    setCurrentMonth(month);
  }, [startDate]);

  if ((0, _indexOf.default)(yearOptions).call(yearOptions, currentYear) === -1) {
    yearOptions.unshift(currentYear);
  }

  var portalTop = 0;
  var inputPosition = (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.getBoundingClientRect().y;

  if (inputPosition + 254 > window.innerHeight) {
    // if the picker is going to go off screen, move it above the input - JRA 04/10/2023
    portalTop = -254;
  }

  return /*#__PURE__*/_react.default.createElement(_Portal.default, {
    id: elementId,
    ref: ref,
    style: {
      portalTop: portalTop
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-year-header"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-left-month-arrow",
    onClick: decrementYear
  }, /*#__PURE__*/_react.default.createElement(_fa.FaChevronLeft, null)), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-selected-year"
  }, /*#__PURE__*/_react.default.createElement("select", {
    value: currentYear,
    onChange: function onChange(e) {
      setIsDirty(true);
      setCurrentYear(+e.target.value);
      setCurrentMonth(0);
    },
    className: "gfb-month-picker-year-select"
  }, (0, _map.default)(yearOptions).call(yearOptions, function (year, i) {
    return /*#__PURE__*/_react.default.createElement("option", {
      key: i,
      value: year
    }, year);
  }))), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-right-month-arrow",
    onClick: incrementYear
  }, /*#__PURE__*/_react.default.createElement(_fa.FaChevronRight, null))), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-month-cluster"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(1) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(1);
    }
  }, "Jan"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(2) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(2);
    }
  }, "Feb"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(3) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(3);
    }
  }, "Mar")), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(4) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(4);
    }
  }, "Apr"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(5) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(5);
    }
  }, "May"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(6) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(6);
    }
  }, "June")), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(7) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(7);
    }
  }, "July"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(8) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(8);
    }
  }, "Aug"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(9) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(9);
    }
  }, "Sep")), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(10) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(10);
    }
  }, "Oct"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(11) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(11);
    }
  }, "Nov"), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(12) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(12);
    }
  }, "Dec"))), /*#__PURE__*/_react.default.createElement("div", {
    className: "gfb-month-picker-footer"
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "gfb-month-button-cancel cancelBtn btn btn-sm btn-default",
    type: "button",
    onClick: cancelDateChange
  }, "Cancel"), /*#__PURE__*/_react.default.createElement("button", {
    className: "gfb-month-button-apply applyBtn btn btn-sm btn-primary",
    type: "button",
    onClick: applyDateChange
  }, "Apply"))));
});
var _default = MonthPicker;
exports.default = _default;
MonthPicker.propTypes = {
  elementId: _propTypes.default.string,
  onChange: _propTypes.default.func,
  changeShowPicker: _propTypes.default.func,
  startDate: _propTypes.default.instanceOf(_moment.default),
  format: _propTypes.default.string,
  pastYears: _propTypes.default.number,
  futureYears: _propTypes.default.number,
  showPicker: _propTypes.default.bool,
  name: _propTypes.default.string,
  setManualBlurCheck: _propTypes.default.func,
  inputRef: _propTypes.default.object
};