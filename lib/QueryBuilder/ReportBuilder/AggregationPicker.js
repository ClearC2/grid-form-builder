'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AggregationPicker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PickList = require('./PickList');

var _PickList2 = _interopRequireDefault(_PickList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AggregationPicker = exports.AggregationPicker = function (_Component) {
  _inherits(AggregationPicker, _Component);

  function AggregationPicker() {
    _classCallCheck(this, AggregationPicker);

    return _possibleConstructorReturn(this, (AggregationPicker.__proto__ || Object.getPrototypeOf(AggregationPicker)).apply(this, arguments));
  }

  _createClass(AggregationPicker, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: { border: '1px solid darkgrey', margin: '3px' } },
        _react2.default.createElement(
          'div',
          { style: { margin: '10px' } },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'h3',
              null,
              this.props.title || 'Aggregations'
            )
          ),
          _react2.default.createElement(_PickList2.default, {
            options: this.props.availableColumns,
            labelKey: this.props.valueKey || 'value',
            valueKey: this.props.labelKey || 'label',
            value: this.props.selectedColumns,
            onChange: this.props.onChange,
            height: 200,
            leftPaneLabel: 'Available'
          })
        )
      );
    }
  }]);

  return AggregationPicker;
}(_react.Component);

AggregationPicker.propTypes = {
  title: _propTypes2.default.string,
  availableColumns: _propTypes2.default.array.isRequired,
  selectedColumns: _propTypes2.default.array.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  valueKey: _propTypes2.default.string,
  labelKey: _propTypes2.default.string
};
exports.default = AggregationPicker;