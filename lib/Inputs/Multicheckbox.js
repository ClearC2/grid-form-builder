'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var Multicheckbox = function Multicheckbox(props) {
  var name = props.name,
      onChange = props.onChange,
      readonly = props.readonly,
      disabled = props.disabled,
      autofocus = props.autofocus,
      keyword = props.keyword,
      inline = props.inline,
      autoComplete = props.autoComplete,
      _props$interactive = props.interactive,
      interactive = _props$interactive === undefined ? true : _props$interactive;
  var _keyword$options = keyword.options,
      options = _keyword$options === undefined ? [] : _keyword$options;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      updateValue = _useState2[1];

  (0, _react.useEffect)(function () {
    var val = props.value;
    if (typeof val === 'string') val = val.split('¤');
    val = val.filter(function (val) {
      return !!val;
    });
    updateValue(val);
  }, [props.value, props.value.length]);

  var handleOnChange = (0, _react.useCallback)(function (e) {
    if (!disabled && !readonly) {
      var clickedValue = e.target.value;

      var newvalue = [].concat(_toConsumableArray(value));
      if (newvalue.indexOf(clickedValue) > -1) {
        newvalue = newvalue.filter(function (val) {
          return val !== clickedValue;
        });
      } else {
        newvalue.push(clickedValue);
      }
      onChange({
        target: {
          name: name,
          value: newvalue
        }
      });
    }
  }, [name, onChange, value, disabled, readonly]);

  var valueContainerClassName = 'gfb-input__value-container gfb-value-multi-input-container';
  if (inline) {
    valueContainerClassName = valueContainerClassName + ' gfb-inline-values-container';
  }
  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer' },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner' },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input__control gfb-boxless-input' },
        _react2.default.createElement(
          'div',
          { className: valueContainerClassName },
          options.map(function (option, i) {
            var checked = value.indexOf(option.value) > -1 || value.indexOf(option.value + '') > -1; // the option value may be a number but the field have the value as a string
            var className = 'gfb-input__single-value gfb-input__input gfb-multi-input-input';
            if (checked) className = className + ' gfb-multi-input-selected';
            if (disabled || readonly) className = className + ' gfb-disabled-input';
            return _react2.default.createElement(
              'label',
              { key: i, className: 'gfb-multi-input-label-wrapper ' + className },
              _react2.default.createElement('input', {
                className: className,
                name: name,
                value: option.value,
                checked: checked,
                onChange: handleOnChange,
                disabled: readonly || disabled,
                autoFocus: autofocus,
                type: 'checkbox',
                autoComplete: autoComplete
              }),
              option.label ? option.label : option.value
            );
          })
        ),
        _react2.default.createElement('div', { className: 'gfb-input__indicators' })
      )
    )
  );
};

exports.default = Multicheckbox;


Multicheckbox.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  keyword: _propTypes2.default.object,
  inline: _propTypes2.default.bool,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool
};