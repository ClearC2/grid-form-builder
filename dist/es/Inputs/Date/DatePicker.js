import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import { useMemo, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import 'daterangepicker';
import '../../styles/daterangepicker.css';
import $ from 'jquery';
import moment from 'moment';

var DatePicker = function DatePicker(props) {
  var elementId = props.elementId,
      handleOnChange = props.handleOnChange,
      changeShowPicker = props.changeShowPicker,
      name = props.name,
      timePicker = props.timePicker,
      showCalendar = props.showCalendar,
      startDate = props.startDate,
      format = props.format;
  var valueDidChange = useRef(false); // JRA 02/07/2020 - when the user selects the the selected day, the calendar closes without a change event
  // this is undesirable as the fallback date is today's date, and if the user opens a blank date field and picks today, a change event is not fired
  // in order to get around this issue, this component will check on the calendar hide event if a change had been made or not, and if not, send back the current startDate as a change event

  var determinePickerOpenDirection = useMemo(function () {
    var $input = $("#".concat(elementId))[0];
    var viewportHeight = window.innerHeight;
    var direction = 'down';

    if ($input && $input.getBoundingClientRect && viewportHeight && $input.getBoundingClientRect().y > viewportHeight / 2) {
      direction = 'up';
    }

    return function () {
      return direction;
    };
  }, [elementId]);
  var initializePicker = useMemo(function () {
    return function () {
      var $input = $("#".concat(elementId));
      $input.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        timePicker: timePicker,
        drops: determinePickerOpenDirection(),
        startDate: startDate
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
        if (!showCalendar) {
          var $portal = $('.daterangepicker');

          if ($portal) {
            var $calendar = _findInstanceProperty($portal).call($portal, '.calendar-table');

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
  }, [elementId, timePicker, determinePickerOpenDirection, handleOnChange, name, format, changeShowPicker, showCalendar]);
  useEffect(function () {
    initializePicker();
    return function () {
      var $portal = $('.daterangepicker');
      if ($portal) $portal.remove();
      var $input = $("#".concat(elementId));
      if ($input) $input.off();
    };
  }, [elementId, initializePicker]);
  return null;
};

export default DatePicker;
DatePicker.propTypes = {
  elementId: PropTypes.string,
  handleOnChange: PropTypes.func,
  changeShowPicker: PropTypes.func,
  name: PropTypes.string,
  timePicker: PropTypes.bool,
  startDate: PropTypes.instanceOf(moment),
  format: PropTypes.string
};