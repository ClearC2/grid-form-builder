"use strict";

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

var _startsWith = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/starts-with"));

var _parseInt2 = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/parse-int"));

var _trim = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/trim"));

var _find = _interopRequireDefault(require("@babel/runtime-corejs3/core-js-stable/instance/find"));

var _react = require("react");

var _propTypes = _interopRequireDefault(require("prop-types"));

require("daterangepicker");

require("../../styles/daterangepicker.css");

var _jquery = _interopRequireDefault(require("jquery"));

var _moment = _interopRequireDefault(require("moment"));

var DatePicker = function DatePicker(props) {
  var elementId = props.elementId,
      handleOnChange = props.handleOnChange,
      changeShowPicker = props.changeShowPicker,
      name = props.name,
      timePicker = props.timePicker,
      showCalendar = props.showCalendar,
      startDate = props.startDate,
      format = props.format,
      minDate = props.minDate,
      maxDate = props.maxDate,
      canPickYear = props.canPickYear;
  var valueDidChange = (0, _react.useRef)(false); // JRA 02/07/2020 - selecting the date that is already selected closes the calendar without a change event
  // this is undesirable as the fallback date is today's date, and if the user opens a blank date field and picks today, a change event is not fired
  // in order to get around this issue, this component will check on the calendar hide event if a change had been made or not, and if not, send back the current startDate as a change event

  var determinePickerOpenDirection = (0, _react.useMemo)(function () {
    var $input = (0, _jquery.default)("#".concat(elementId))[0];
    var viewportHeight = window.innerHeight;
    var direction = 'down';

    if ($input && $input.getBoundingClientRect && viewportHeight && $input.getBoundingClientRect().y > viewportHeight / 2) {
      direction = 'up';
    }

    return function () {
      return direction;
    };
  }, [elementId]);
  var initializePicker = (0, _react.useMemo)(function () {
    return function () {
      var $input = (0, _jquery.default)("#".concat(elementId));

      var calculateDate = function calculateDate(dateVal) {
        if (dateVal === 'today') {
          return (0, _moment.default)();
        }

        if (typeof dateVal === 'string' && (0, _startsWith.default)(dateVal).call(dateVal, 'today +')) {
          var _context;

          var daysToAdd = (0, _parseInt2.default)((0, _trim.default)(_context = dateVal.split('+')[1]).call(_context), 10);
          return (0, _moment.default)().add(daysToAdd, 'days');
        }

        if (dateVal === 'this month') {
          return (0, _moment.default)().endOf('month');
        }

        return dateVal;
      };

      var calculatedMinDate = calculateDate(minDate);
      var calculatedMaxDate = calculateDate(maxDate);
      $input.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        timePicker: timePicker,
        drops: determinePickerOpenDirection(),
        startDate: startDate,
        minDate: calculatedMinDate,
        maxDate: calculatedMaxDate
      }, function (date) {
        if (date && date.isValid && date.isValid()) {
          valueDidChange.current = true;
          handleOnChange({
            target: {
              name: name,
              value: date.format(format)
            }
          });
        }
      });
      $input.on('show.daterangepicker', function () {
        var $portal = (0, _jquery.default)('.daterangepicker');

        if ($portal) {
          if (!canPickYear) {
            $portal.addClass('year-picker-hidden');
          }

          if (!showCalendar) {
            var $calendar = (0, _find.default)($portal).call($portal, '.calendar-table');

            if ($calendar) {
              $calendar.hide();
              $portal.addClass('calendar-hidden');
              var direction = determinePickerOpenDirection();

              if (direction === 'up') {
                var top = +$portal.css('top').replace('px', '') || 0;
                $portal.css('top', top + 277);
              }
            }
          }
        }
      });
      $input.on('hide.daterangepicker', function (e, calendar) {
        if (!valueDidChange.current) {
          handleOnChange({
            target: {
              name: name,
              value: calendar.startDate.format(format)
            }
          });
        }

        changeShowPicker(false);
      });
    };
  }, [elementId, timePicker, determinePickerOpenDirection, handleOnChange, name, format, changeShowPicker, showCalendar, canPickYear, minDate, maxDate]);
  (0, _react.useEffect)(function () {
    initializePicker();
    return function () {
      var $portal = (0, _jquery.default)('.daterangepicker');
      if ($portal) $portal.remove();
      var $input = (0, _jquery.default)("#".concat(elementId));
      if ($input) $input.off();
    };
  }, [elementId, initializePicker]);
  return null;
};

var _default = DatePicker;
exports.default = _default;
DatePicker.propTypes = {
  elementId: _propTypes.default.string,
  handleOnChange: _propTypes.default.func,
  changeShowPicker: _propTypes.default.func,
  name: _propTypes.default.string,
  timePicker: _propTypes.default.bool,
  startDate: _propTypes.default.instanceOf(_moment.default),
  format: _propTypes.default.string,
  canPickYear: _propTypes.default.bool,
  minDate: _propTypes.default.string,
  maxDate: _propTypes.default.string,
  showCalendar: _propTypes.default.bool
};