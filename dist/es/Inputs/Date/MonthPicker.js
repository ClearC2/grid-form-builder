import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _indexOfInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/index-of";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _someInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/some";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import React, { forwardRef, useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Portal from '../../Portal';
import moment from 'moment';
import '../../styles/month-picker.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
var MonthPicker = /*#__PURE__*/forwardRef(function (props, ref) {
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

  var _useState = useState([]),
      _useState2 = _slicedToArray(_useState, 2),
      yearOptions = _useState2[0],
      setYearOptions = _useState2[1];

  var _useState3 = useState(+moment().format('YYYY')),
      _useState4 = _slicedToArray(_useState3, 2),
      currentYear = _useState4[0],
      setCurrentYear = _useState4[1];

  var _useState5 = useState(+moment().format('MM')),
      _useState6 = _slicedToArray(_useState5, 2),
      currentMonth = _useState6[0],
      setCurrentMonth = _useState6[1];

  var _useState7 = useState(false),
      _useState8 = _slicedToArray(_useState7, 2),
      isDirty = _useState8[0],
      setIsDirty = _useState8[1];

  var isSelectedMonth = useCallback(function (month) {
    return month === currentMonth;
  }, [currentMonth]);
  var incrementYear = useCallback(function () {
    var index = _indexOfInstanceProperty(yearOptions).call(yearOptions, currentYear);

    var year = currentYear;
    if (index + 1 === yearOptions.length) year = yearOptions[0];else year = yearOptions[index + 1];
    setCurrentYear(year);
    setCurrentMonth(0);
  }, [yearOptions, currentYear]);
  var decrementYear = useCallback(function () {
    var index = _indexOfInstanceProperty(yearOptions).call(yearOptions, currentYear);

    var year = currentYear;
    if (index === 0) year = yearOptions[yearOptions.length - 1];else year = yearOptions[index - 1];
    setCurrentYear(year);
    setCurrentMonth(0);
  }, [yearOptions, currentYear]);
  var cancelDateChange = useCallback(function () {
    changeShowPicker(false);
  }, [changeShowPicker]);
  var applyDateChange = useCallback(function () {
    if (currentYear && currentMonth) {
      var _context;

      setManualBlurCheck(false);
      onChange({
        target: {
          name: name,
          value: moment(_concatInstanceProperty(_context = "".concat(currentMonth, "/")).call(_context, currentYear), 'M/YYYY').format(format)
        }
      });
      changeShowPicker(false);
    }
  }, [changeShowPicker, currentMonth, currentYear, format, name, onChange, setManualBlurCheck]);
  var windowClickListener = useMemo(function () {
    return function (e) {
      var pathHandler = e.path || e.composedPath();

      var insideClick = _someInstanceProperty(pathHandler).call(pathHandler, function (path) {
        return path.id && (path.id === elementId.current || path.id === ref.current.state.id);
      });

      if (!insideClick) {
        if (isDirty && currentYear && currentMonth) {
          var _context2;

          setManualBlurCheck(false);
          onChange({
            target: {
              name: name,
              value: moment(_concatInstanceProperty(_context2 = "".concat(currentMonth, "/")).call(_context2, currentYear), 'M/YYYY').format(format)
            }
          });
        }

        changeShowPicker(false);
      }
    };
  }, [elementId, ref, changeShowPicker, onChange, currentYear, currentMonth, name, format, setManualBlurCheck, isDirty]);
  useEffect(function () {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
    return function () {
      window.removeEventListener('mousedown', windowClickListener);
    };
  }, [showPicker, windowClickListener]);
  useEffect(function () {
    var options = [];
    var thisYear = +moment().format('YYYY');

    for (var i = +pastYears; i > 0; i--) {
      options.push(thisYear - i);
    }

    for (var _i = 0; _i <= futureYears; _i++) {
      options.push(thisYear + _i);
    }

    setYearOptions(options);
  }, [pastYears, futureYears]);
  useEffect(function () {
    var date = startDate || moment();
    var year = +date.format('YYYY');
    var month = +date.format('MM');
    setCurrentYear(year);
    setCurrentMonth(month);
  }, [startDate]);

  if (_indexOfInstanceProperty(yearOptions).call(yearOptions, currentYear) === -1) {
    yearOptions.unshift(currentYear);
  }

  var portalTop = 0;
  var inputPosition = (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.getBoundingClientRect().y;

  if (inputPosition + 254 > window.innerHeight) {
    // if the picker is going to go off screen, move it above the input - JRA 04/10/2023
    portalTop = -254;
  }

  return /*#__PURE__*/React.createElement(Portal, {
    id: elementId,
    ref: ref,
    style: {
      portalTop: portalTop
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-year-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-left-month-arrow",
    onClick: decrementYear
  }, /*#__PURE__*/React.createElement(FaChevronLeft, null)), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-selected-year"
  }, /*#__PURE__*/React.createElement("select", {
    value: currentYear,
    onChange: function onChange(e) {
      setIsDirty(true);
      setCurrentYear(+e.target.value);
      setCurrentMonth(0);
    },
    className: "gfb-month-picker-year-select"
  }, _mapInstanceProperty(yearOptions).call(yearOptions, function (year, i) {
    return /*#__PURE__*/React.createElement("option", {
      key: i,
      value: year
    }, year);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-right-month-arrow",
    onClick: incrementYear
  }, /*#__PURE__*/React.createElement(FaChevronRight, null))), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-month-cluster"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(1) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(1);
    }
  }, "Jan"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(2) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(2);
    }
  }, "Feb"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(3) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(3);
    }
  }, "Mar")), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(4) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(4);
    }
  }, "Apr"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(5) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(5);
    }
  }, "May"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(6) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(6);
    }
  }, "June")), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(7) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(7);
    }
  }, "July"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(8) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(8);
    }
  }, "Aug"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(9) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(9);
    }
  }, "Sep")), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluser-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(10) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(10);
    }
  }, "Oct"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(11) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(11);
    }
  }, "Nov"), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-cluster-month-button".concat(isSelectedMonth(12) ? ' month-selected' : ''),
    onClick: function onClick() {
      setIsDirty(true);
      setCurrentMonth(12);
    }
  }, "Dec"))), /*#__PURE__*/React.createElement("div", {
    className: "gfb-month-picker-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "gfb-month-button-cancel cancelBtn btn btn-sm btn-default",
    type: "button",
    onClick: cancelDateChange
  }, "Cancel"), /*#__PURE__*/React.createElement("button", {
    className: "gfb-month-button-apply applyBtn btn btn-sm btn-primary",
    type: "button",
    onClick: applyDateChange
  }, "Apply"))));
});
export default MonthPicker;
MonthPicker.propTypes = {
  elementId: PropTypes.string,
  onChange: PropTypes.func,
  changeShowPicker: PropTypes.func,
  startDate: PropTypes.instanceOf(moment),
  format: PropTypes.string,
  pastYears: PropTypes.number,
  futureYears: PropTypes.number,
  showPicker: PropTypes.bool,
  name: PropTypes.string,
  setManualBlurCheck: PropTypes.func,
  inputRef: PropTypes.object
};