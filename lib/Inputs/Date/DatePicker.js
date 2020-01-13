'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('daterangepicker');

require('../../../styles/daterangepicker.css');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function DatePicker(props) {
  var elementId = props.elementId,
      handleOnChange = props.handleOnChange,
      dateFormat = props.dateFormat,
      changeShowPicker = props.changeShowPicker,
      name = props.name,
      timePicker = props.timePicker;


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
    var $input = (0, _jquery2.default)('#' + elementId);
    return function () {
      return $input.daterangepicker({
        singleDatePicker: true,
        showDropdowns: true,
        autoUpdateInput: false,
        timePicker: timePicker,
        drops: determinePickerOpenDirection()
      }, function (date) {
        if (date && date.isValid && date.isValid()) {
          handleOnChange({
            target: {
              name: name,
              value: date.format(dateFormat)
            }
          });
        }
        $input.on('hide.daterangepicker', function () {
          changeShowPicker(false);
        });
      });
    };
  }, [elementId, timePicker, determinePickerOpenDirection, handleOnChange, name, dateFormat, changeShowPicker]);

  (0, _react.useEffect)(function () {
    initializePicker();
  }, [initializePicker]);

  return null;
};

exports.default = DatePicker;


DatePicker.propTypes = {
  elementId: _propTypes2.default.string,
  dateFormat: _propTypes2.default.string,
  handleOnChange: _propTypes2.default.func,
  changeShowPicker: _propTypes2.default.func,
  name: _propTypes2.default.string,
  timePicker: _propTypes2.default.bool
};