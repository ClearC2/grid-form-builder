'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ColorPicker = require('./ColorPicker');

var _ColorPicker2 = _interopRequireDefault(_ColorPicker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ColorInput = function ColorInput(props) {
  var name = props.name,
      value = props.value,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      placeholder = props.placeholder,
      tabIndex = props.tabIndex,
      onChange = props.onChange,
      autoComplete = props.autoComplete;

  var className = 'gfb-input__single-value gfb-input__input';
  if (readonly || disabled) className = className + ' gfb-disabled-input';

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showPicker = _useState2[0],
      setShowPicker = _useState2[1];

  var inputId = (0, _react.useRef)(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
  var portalRef = (0, _react.useRef)();

  var windowClickListener = (0, _react.useMemo)(function () {
    return function (e) {
      var insideClick = e.path.some(function (path) {
        return path.id === inputId.current || path.id === portalRef.current.state.id;
      });
      if (!insideClick) {
        setShowPicker(false);
      }
    };
  }, []);

  (0, _react.useEffect)(function () {
    if (showPicker) window.addEventListener('mousedown', windowClickListener);else window.removeEventListener('mousedown', windowClickListener);
  }, [showPicker, windowClickListener]);

  var handleOnInputChange = (0, _react.useCallback)(function (e) {
    var newValue = e.target.value;

    if (typeof newValue === 'string') newValue = newValue.toUpperCase();
    onChange({
      target: {
        name: name,
        value: newValue
      }
    });
    if (!showPicker) setShowPicker(true);
  }, [showPicker, setShowPicker, name, onChange]);

  var handleOnFocus = (0, _react.useCallback)(function () {
    if (!readonly && !disabled) {
      setShowPicker(true);
    }
  }, [setShowPicker, readonly, disabled]);

  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer' },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner' },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input__control' },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container' },
          _react2.default.createElement('input', {
            id: inputId.current,
            className: className,
            name: name,
            value: value,
            onChange: handleOnInputChange,
            disabled: readonly || disabled,
            autoFocus: autofocus,
            placeholder: placeholder,
            tabIndex: tabIndex,
            onFocus: handleOnFocus,
            autoComplete: autoComplete
          }),
          showPicker && _react2.default.createElement(_ColorPicker2.default, {
            ref: portalRef,
            inputId: inputId.current,
            value: value,
            onChange: handleOnInputChange,
            name: name
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__indicators' },
          _react2.default.createElement('div', {
            className: 'gfb-color-input-indicator',
            style: { backgroundColor: value },
            onClick: handleOnFocus
          })
        )
      )
    )
  );
};

exports.default = ColorInput;


ColorInput.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string
};