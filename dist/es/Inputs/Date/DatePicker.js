import _findInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/find";
import { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'daterangepicker';
import '../../../styles/daterangepicker.css';
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
      $input.on('hide.daterangepicker', function () {
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