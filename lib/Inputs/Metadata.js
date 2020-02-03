'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = require('@emotion/core');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _useTheme2 = require('../theme/useTheme');

var _useTheme3 = _interopRequireDefault(_useTheme2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Metadata = function Metadata(props) {
  var _props$value = props.value,
      value = _props$value === undefined ? '' : _props$value,
      _props$style = props.style,
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
      indicators = _style$indicators === undefined ? {} : _style$indicators;

  var _useTheme = (0, _useTheme3.default)(),
      theme = _useTheme.theme;

  return (0, _core.jsx)(
    'div',
    { className: 'gfb-input-outer', style: inputOuter, css: theme.inputOuter },
    (0, _core.jsx)(
      'div',
      { className: 'gfb-input-inner', style: inputInner, css: theme.inputInner },
      (0, _core.jsx)(
        'div',
        { className: 'gfb-input__control gfb-boxless-input', style: inputControl, css: theme.inputControl },
        (0, _core.jsx)(
          'div',
          { className: 'gfb-input__value-container', style: valueContainer, css: theme.valueContainer },
          (0, _core.jsx)(
            'strong',
            { style: valueStyle, css: theme.value },
            value
          )
        ),
        (0, _core.jsx)('div', { className: 'gfb-input__indicators', style: indicators, css: theme.indicators })
      )
    )
  );
}; /** @jsx jsx */
exports.default = Metadata;


Metadata.propTypes = {
  name: _propTypes2.default.string,
  value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number, _propTypes2.default.array, _propTypes2.default.object]),
  style: _propTypes2.default.object
};