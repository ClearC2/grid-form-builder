'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); // eslint-disable-line


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Portal = require('../../Portal');

var _Portal2 = _interopRequireDefault(_Portal);

var _reactColor = require('react-color');

require('../../../styles/colorpicker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorPicker = (0, _react.forwardRef)(function (props, ref) {
  var inputId = props.inputId,
      onChange = props.onChange,
      value = props.value,
      name = props.name;

  var _useState = (0, _react.useState)('compact'),
      _useState2 = _slicedToArray(_useState, 2),
      picker = _useState2[0],
      setPicker = _useState2[1];

  var togglePickerType = (0, _react.useCallback)(function () {
    var newPicker = picker === 'compact' ? 'stretch' : 'compact';
    setPicker(newPicker);
  }, [picker]);

  var handleOnChange = (0, _react.useCallback)(function (e) {
    var hex = e.hex;

    onChange({
      target: {
        name: name,
        value: hex
      }
    });
  }, [onChange, name]);

  var Picker = picker === 'compact' ? _reactColor.CompactPicker : _reactColor.SketchPicker;
  return _react2.default.createElement(
    _Portal2.default,
    { id: inputId, ref: ref },
    _react2.default.createElement(
      'div',
      { className: 'gfb-color-picker-container' },
      _react2.default.createElement(
        'div',
        { className: 'gfb-color-picker-type-toggle' },
        _react2.default.createElement(
          'button',
          { className: 'btn btn-primary', onClick: togglePickerType },
          'Toggle Picker Type'
        )
      ),
      _react2.default.createElement(Picker, {
        onChange: handleOnChange,
        color: value
      })
    )
  );
});

exports.default = ColorPicker;


ColorPicker.propTypes = {
  inputId: _propTypes2.default.string,
  pickerId: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string
};