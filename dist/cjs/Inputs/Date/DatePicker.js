"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs3/helpers/interopRequireDefault");

var _Object$defineProperty = require("@babel/runtime-corejs3/core-js-stable/object/define-property");

_Object$defineProperty(exports, "__esModule", {
  value: true
});

exports.default = void 0;

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
      format = props.format;
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
      $input.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        timePicker: timePicker,
        drops: determinePickerOpenDirection(),
        startDate: startDate
      }, function (date) {
        if (date && date.isValid && date.isValid()) {
          handleOnChange({
            target: {
              name: name,
              value: date.format(format)
            }
          });
        }
      });
      $input.on('show.daterangepicker', function () {
        if (!showCalendar) {
          var $portal = (0, _jquery.default)('.daterangepicker');

          if ($portal) {
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
      $input.on('hide.daterangepicker', function () {
        changeShowPicker(false);
      });
    };
  }, [elementId, timePicker, determinePickerOpenDirection, handleOnChange, name, format, changeShowPicker, showCalendar]);
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
  format: _propTypes.default.string
};