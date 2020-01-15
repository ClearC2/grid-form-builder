'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('daterangepicker');

require('./daterangepicker.css');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    var $input = (0, _jquery2.default)('#' + elementId)[0];
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
      var $input = (0, _jquery2.default)('#' + elementId);

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
          var $portal = (0, _jquery2.default)('.daterangepicker');
          if ($portal) {
            var $calendar = $portal.find('.calendar-table');
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
      var $portal = (0, _jquery2.default)('.daterangepicker');
      if ($portal) $portal.remove();
      var $input = (0, _jquery2.default)('#' + elementId);
      if ($input) $input.off();
    };
  }, [elementId, initializePicker]);

  return null;
};

exports.default = DatePicker;


DatePicker.propTypes = {
  elementId: _propTypes2.default.string,
  handleOnChange: _propTypes2.default.func,
  changeShowPicker: _propTypes2.default.func,
  name: _propTypes2.default.string,
  timePicker: _propTypes2.default.bool,
  startDate: _propTypes2.default.instanceOf(_moment2.default),
  format: _propTypes2.default.string
};