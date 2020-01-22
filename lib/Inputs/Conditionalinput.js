'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ConditionalDialog = require('./ConditionalDialog');

var _ConditionalDialog2 = _interopRequireDefault(_ConditionalDialog);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConditionalInput = function ConditionalInput(props) {
  var _props$style = props.style,
      style = _props$style === undefined ? {} : _props$style;
  var _style$value = style.value,
      valueStyle = _style$value === undefined ? {} : _style$value,
      _style$inputOuter = style.inputOuter,
      inputOuter = _style$inputOuter === undefined ? {} : _style$inputOuter,
      _style$inputInner = style.inputInner,
      inputInner = _style$inputInner === undefined ? {} : _style$inputInner,
      _style$inputControl = style.inputControl,
      inputControl = _style$inputControl === undefined ? {} : _style$inputControl,
      _style$valueContainer = style.valueContainer,
      valueContainer = _style$valueContainer === undefined ? {} : _style$valueContainer,
      _style$indicators = style.indicators,
      indicators = _style$indicators === undefined ? {} : _style$indicators; // eslint-disable-line

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      showDialog = _useState2[0],
      setShowDialog = _useState2[1];

  var handleClose = (0, _react.useCallback)(function (newFieldVal) {
    setShowDialog(false);
  }, []);

  (0, _react.useEffect)(function () {
    // const v = props.values[props.name]
    if (props.name) {
      var defaults = (0, _immutable.Map)({ condition: 'contains', values: (0, _immutable.List)() });
      if (typeof props.value === 'string') {
        if (props.value !== '') {
          defaults = defaults.set('values', (0, _immutable.List)([props.value]));
        } else {
          defaults = defaults.set('values', (0, _immutable.List)());
        }
      } else if (props.value instanceof _immutable.List || Array.isArray(props.value)) {
        defaults = defaults.set('values', (0, _immutable.fromJS)(props.value));
      }
      props.onChange({ target: { name: props.name, value: defaults } });
    }
  }, [props.name]);

  return _react2.default.createElement(
    'div',
    { className: 'gfb-input-outer', style: inputOuter },
    _react2.default.createElement(
      'div',
      { className: 'gfb-input-inner', style: inputInner },
      _react2.default.createElement(
        'div',
        { className: 'gfb-input__control', style: inputControl },
        _react2.default.createElement(
          'div',
          { className: 'gfb-input__value-container', onClick: function onClick() {
              return setShowDialog(true);
            }, style: valueContainer },
          props.values.getIn([props.name, 'values'], (0, _immutable.List)()).size > 0 ? 'Values...' : ''
        ),
        showDialog && _react2.default.createElement(_ConditionalDialog2.default, _extends({ handleClose: handleClose }, props))
      )
    )
  );
};

exports.default = ConditionalInput;


ConditionalInput.propTypes = {
  onChange: _propTypes2.default.func,
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  values: _propTypes2.default.object,
  disabled: _propTypes2.default.bool,
  readonly: _propTypes2.default.bool,
  autofocus: _propTypes2.default.bool,
  placeholder: _propTypes2.default.string,
  tabIndex: _propTypes2.default.number,
  autoComplete: _propTypes2.default.string,
  interactive: _propTypes2.default.bool,
  requiredWarning: _propTypes2.default.bool,
  style: _propTypes2.default.object
};